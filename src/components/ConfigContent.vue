<template>

  <div>
    <!-- <p>当前的 ID 值是: {{ this.id }}</p> -->
    <div v-for="file in tableList" :key="file.id" class="file-list-item">
      <ConfigDetail :fileId=file.id :fileName="file.fileName" />
    </div>
    <!-- 文件预览弹框 -->
    <EditeViewer v-model:dialogVisible="fileViewerDialogVisible" />
  </div>
</template>

<script>
  // import { mapActions } from 'vuex';
  import EditeViewer from '@/components/text-x-mysql.vue';
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
      }
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

    },
  };
</script>

<style>
  /* 样式可以根据需要自行调整 */
  .file-list-item {
    border: 1px solid #ccc; /* 边框样式 */
    border-radius: 8px; /* 圆角大小，根据需要调整 */
    padding: 10px; /* 内边距，根据需要调整 */
    margin-bottom: 10px; /* 底部外边距，根据需要调整 */
  }
</style>