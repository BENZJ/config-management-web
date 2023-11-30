<template>

  <div>
    <div style="text-align: right;">
      <p>当前的 ID 值是: {{ this.id }}</p>
      <b>dev.sql</b>
      <el-button v-show="!showTable"  size="default"  @click="loadTableData" type="primary">展开</el-button>
      <el-button v-show="showTable"  size="default" @click="toggleTable" type="danger">隐藏</el-button>
      <el-button @click="previewFile"   size="default" type="danger">预览</el-button>
    </div>
    <el-table :data="tableData" v-show="showTable" style="width: 100%" ref="myTable">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="modifier" label="修改人"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="mini" @click="editRow(row)"> 编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 文件预览弹框 -->
    <EditeViewer v-model:dialogVisible="fileViewerDialogVisible" />
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import EditeViewer from './text-x-mysql.vue';
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
      loadTableData() {
        this.tableData = [
          { id: 1, content: '数据1', modifier: '用户1', modifyTime: '2023-01-01 12:00:00' },
          { id: 2, content: '数据2', modifier: '用户2', modifyTime: '2023-01-02 12:30:00' },
          // ... 其他数据
        ];
        this.showTable = true;

        // 使用 $nextTick 延迟执行 doLayout 方法
        this.$nextTick(() => {
          this.$refs.myTable.doLayout();
        });
      },

      toggleTable() {
        this.showTable = !this.showTable;
      },

      editRow(row) {
        // 编辑行的逻辑
        this.fileViewerDialogVisible = true;
        console.log('编辑行', row);
      },

      deleteRow(row) {
        // 删除行的逻辑
        const index = this.tableData.indexOf(row);
        if (index !== -1) {
          this.tableData.splice(index, 1);
        }

        // 使用 $nextTick 延迟执行 doLayout 方法
        this.$nextTick(() => {
          this.$refs.myTable.doLayout();
        });
      },

      previewFile() {
        // 调用接口获取文件内容
        // 模拟文件内容
        this.fileContent = 'CREATE TABLE `user` ( `id` int(11) NOT NULL AUTO_INCREMENT, `name` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;';
        this.fileName = 'dev.sql'
        this.fileViewerDialogVisible = true;
      },

      // 获取文件列表接口
      async getFileList(id) {
        try {
          console.log('文件列表获取id为', id);
          const res = await get('/api/getFileList', { 'id': id })
          this.tableList = res.data
          console.log('获取文件列表', this.tableList);
        } catch (error) {
          console.error('获取文件列表失败', error);
        }
      },


      ...mapActions(['fetchTableData']),
    },
  };
</script>

<style>
  /* 样式可以根据需要自行调整 */
</style>