<template>
  <div>
    <div style="text-align: right;;  border: 1px solid #FFF; ">
      <el-icon style="margin-right: 10px;" size="25" default="添加文件"><DocumentAdd /></el-icon>
      <el-icon  style="margin-right: 10px;" size="25" default="打包下载"><Download /></el-icon>
    </div>
    <!-- <p>当前的 ID 值是: {{ this.id }}</p> -->
    <div v-for="file in tableList" :key="file.id" class="file-list-item">
      <ConfigDetail :fileId=file.id :fileName="file.fileName" @open-edite-viewer="openEditeViewer" />
    </div>
    <!-- 文件预览弹框 -->
    <EditeViewer v-model:dialogVisible="fileViewerDialogVisible" :fileContent="currentFileContent" :recordId="recordId"  :recordName="recordUser" :recordRemark="recordRemark"/>
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
      recordId: Number,
      recordUser: String,
      recordRemark: String,
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
      } catch (error) {
        console.error('获取文件列表失败', error);
      }
    },

    openEditeViewer(data) {
      console.log('监听到打开弹窗事件:', data);
      this.currentFileContent = data.content; // 更新当前文件内容
      this.recordId = data.rowId;
      this.recordUser = data.rowModifier;
      this.recordRemark = data.rowRemark;
      this.fileViewerDialogVisible = true; // 显示 EditeViewer.vue 组件的弹窗
    },

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
}</style>