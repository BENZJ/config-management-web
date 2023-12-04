<template>
  <div>
    <div style="text-align: right;;  border: 1px solid #FFF; ">
      <el-icon style="margin-right: 10px;" size="25" default="添加文件">
        <DocumentAdd />
      </el-icon>
      <el-icon style="margin-right: 10px;" size="25" default="打包下载">
        <Download />
      </el-icon>
    </div>
    <!-- <p>当前的 ID 值是: {{ this.id }}</p> -->
    <div v-for="file in tableList" :key="file.id" class="file-list-item">
      <ConfigDetail :ref="configDetailRefs[file.id]" :fileId=file.id :fileName="file.fileName"
        @open-edite-viewer="openEditeViewer" @open-edite-preview="openEditePreview" />
    </div>
    <!-- 文件预览弹框 -->
    <EditeViewer v-model:dialogVisible="fileViewerDialogVisible" :fileId="fileId" :fileContent="currentFileContent"
      :recordId="rowId" :recordName="handerUser" :recordRemark="remark" :editable="editable"
      @edite-row="reloadFileDetail" />
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
        const res = await get('/api/getFileList', { 'id': id })
        console.log('文件列表内容', res.data);
        this.tableList = res.data
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
    async getPreviewFile(id){
      try{
        console.log("预览文件id:",id)
        const res = await get('/api/getFilePreview',{'id': id})
        this.currentFileContent = res.data
      }catch(error){
        console.error('获取文件预览失败', error);
      }
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

    async openEditePreview(data){
      console.log('监听到打开预览弹框事件:', data);
      await this.getPreviewFile(data.fileId)
      // this.currentFileContent = data.content; // 更新当前文件内容
      this.fileViewerDialogVisible = true; // 显示 EditeViewer.vue 组件的弹窗
      this.editable = false;
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