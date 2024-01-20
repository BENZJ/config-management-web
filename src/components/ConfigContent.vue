<template>
  <div>
    <div style="text-align: right;;  border: 1px solid #FFF; ">
      <el-icon style="margin-right: 10px;" size="25" default="添加文件" @click="showCreateFileDialog">
        <DocumentAdd />
      </el-icon>
      <el-icon style="margin-right: 10px;" size="25" default="打包下载" @click="downLoadAll">
        <Download />
      </el-icon>
    </div>
    <!-- <p>当前的 ID 值是: {{ this.id }}</p> -->
    <div v-for="file in tableList" :key="file.id" class="file-list-item">
      <ConfigDetail :ref="configDetailRefs[file.id]" :fileId=file.id :fileName="file.fileName"
        @open-edite-viewer="openEditeViewer" @open-edite-preview="openEditePreview" @add-row="addRow" />
    </div>
    <!-- 文件预览弹框 -->
    <EditeViewer v-model:dialogVisible="fileViewerDialogVisible" :iteratorId="id" :fileId="fileId" :fileContent="currentFileContent"
      :recordId="rowId" :recordName="handerUser" :recordRemark="remark" :editable="editable"
      @edite-row="reloadFileDetail" />

    <!-- 创建文件对话框 -->
    <el-dialog v-model="createFileDialogVisible" title="创建新文件" @close="closeDialog">
      <el-form :model="newFileForm" label-width="80px" ref="newFileFormRef">
        <el-form-item label="文件名称" prop="fileName">
          <el-input v-model="newFileForm.fileName" />
        </el-form-item>
      </el-form>
      <el-button @click="createFile">创建文件</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
import EditeViewer from '@/components/EditeViewer.vue';
import ConfigDetail from '@/components/ConfigDetail.vue';
import { get } from '@/utils/http';

export default {
  props: {
    id: Number
  },
  data() {
    return {
      showTable: false,
      createFileDialogVisible: false,
      newFileForm: {
        fileName: '',
      },
      tableList: [],
      tableData: [],
      fileViewerDialogVisible: false,
      fileContent: '', // Pass the content of the file
      fileName: '', // Pass the name of the file
      configDetailRefs: {},
      fileId: Number,
      handerUser: String,
      remark: String,
      rowId: Number,
      editable: Boolean, // 新添加的可编辑属性
    };
  },
  components: {
    EditeViewer,
    ConfigDetail,
  },
  mounted() {
    // 在组件挂载后发送请求获取菜单列表
    this.getFileList(this.id);
  },
  watch: {
    // 监听 id 的变化，变化时重新调用 getFileList 方法
    id: function (newId, oldId) {
      if (newId !== oldId) {
        this.getFileList(newId);
      }
    },
  },
  methods: {

    // 获取文件列表接口
    async getFileList(id) {
      try {
        console.log('文件列表获取id为', id);
        const res = await get('/file/list', { 'iterationID': id })
        console.log('文件列表内容', res.data);
        this.tableList = res.data.data
        console.log('获取文件列表', this.tableList);

        // 在获取文件列表后，为每个文件动态创建 ref 并添加到 configDetailRefs 中
        this.tableList.forEach(file => {
          const refName = `ConfigDetail-${file.id}`;
          // 使用 Vue.set 以确保 refName 是响应式的
          this.configDetailRefs[file.id] = refName;
        });
        // console.log('configDetailRefs内容展示', this.configDetailRefs);
        // console.log('ref内容展示', this.$refs);
      } catch (error) {
        console.error('获取文件列表失败', error);
      }
    },
    async getPreviewFile(id) {
      try {
        console.log("预览文件id:", id)
        const res = await get('/fileItem/preview', { 'fileId': id })
        this.currentFileContent = res.data.data
      } catch (error) {
        console.error('获取文件预览失败', error);
      }
    },
    showCreateFileDialog() {
      // 点击添加文件图标按钮时显示创建文件对话框
      this.createFileDialogVisible = true;
    },
    createFile() {
      // 在这里执行创建文件的逻辑，可以向后端发送请求等
      console.log('创建文件：', this.newFileForm.fileName);
      const form = this.$refs.newFileFormRef;
      // 校验表单
      form.validate(valid => {
        if (valid) {
          // 表单验证通过，执行创建文件的逻辑
          const fileName = this.newFileForm.fileName;

          // 检查文件名格式
          if (/^[^\\/?%*:|<>\s]+[.][^\\/?%*:|<>\s]+$/.test(fileName)) {
            // 文件名不包含特殊字符，且有正确的后缀
            console.log('文件名格式正确，可以提交创建文件：', fileName);

            // 在这里执行创建文件的逻辑，例如向后端发送请求等

            // 创建完文件后关闭对话框
            this.createFileDialogVisible = false;
          } else {
            // 文件名格式不正确，给出提示
            this.$message.error('文件名格式不正确，确保文件名不包含特殊字符且有正确的后缀');
          }
        } else {
          // 表单验证不通过，给出提示
          this.$message.error('请输入文件名');
        }
      });
      // 创建完文件后关闭对话框
      this.createFileDialogVisible = false;
    },
    closeDialog() {
      // 在关闭弹窗时清空相关数据
      this.newFileForm.fileName = '';  // 清空文件名
      // 其他需要清空的数据...

      // 关闭弹窗
      this.createFileDialogVisible = false;
    },
    openEditeViewer(data) {
      console.log('监听到打开弹窗事件:', data);
      this.currentFileContent = data.content; // 更新当前文件内容
      this.fileViewerDialogVisible = true; // 显示 EditeViewer.vue 组件的弹窗
      this.editable = true;
      console.log('监听到打开编辑器：', data.fileId);
      this.fileId = data.fileId;
      this.rowId = data.rowId;
      this.handerUser = data.rowModifier;
      this.remark = data.rowRemark;
    },

    async openEditePreview(data) {
      console.log('监听到打开预览弹框事件:', data);
      await this.getPreviewFile(data.fileId)
      // this.currentFileContent = data.content; // 更新当前文件内容
      this.fileViewerDialogVisible = true; // 显示 EditeViewer.vue 组件的弹窗
      this.editable = false;
    },

    addRow(data) {
      console.log('监听到打开预览弹框事件:', data);
      // this.currentFileContent = data.content; // 更新当前文件内容
      this.fileId = data.fileId;
      this.fileViewerDialogVisible = true; // 显示 EditeViewer.vue 组件的弹窗
      this.editable = true;
      this.handerUser = '';
      this.remark = '';
      this.currentFileContent = '';
    },

    reloadFileDetail(data) {
      const refName = this.configDetailRefs[data.fileId];
      // 使用 refs 获取子组件实例
      console.log('data.fileId', data.fileId);
      console.log('refName', refName);
      const configDetailInstance = this.$refs[refName];
      if (configDetailInstance) {
        // 如果找到了对应的子组件实例，调用其方法
        configDetailInstance.loadTableData();
      } else {
        console.error(refName + "对应的子组件实例不存在");
      }
    },
    downLoadAll(){
      console.log('下载全部配置');
    }
  },
};
</script>

<style>
/* 样式可以根据需要自行调整 */
.file-list-item {
  border: 1px solid #ccc;
  /* 边框样式 */
  border-radius: 8px;
  /* 圆角大小，根据需要调整 */
  padding: 10px;
  /* 内边距，根据需要调整 */
  margin-bottom: 10px;
  /* 底部外边距，根据需要调整 */
}
</style>