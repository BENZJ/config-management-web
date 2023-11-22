<template>
    
    <div>
        <div style="text-align: right;">
        <b>dev.sql</b>
        <el-button  v-show="!showTable" @click="loadTableData" type="primary">展开</el-button>
        <el-button v-show="showTable"  @click="toggleTable" type="danger">隐藏</el-button>
        <el-button  @click="previewFile" type="danger">预览</el-button>
        </div>
      <el-table :data="tableData" v-show="showTable" style="width: 100%" ref="myTable">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="modifier" label="修改人"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="{ row }">
            <el-button type="primary" size="mini" @click="editRow(row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteRow(row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
     <!-- 文件预览弹框 -->
     <file-viewer
      v-model:dialogVisible="fileViewerDialogVisible"
      :fileContent="fileContent"
      :fileName="fileName"
    />
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import FileViewer from './FileViewer.vue'; 
  
  export default {
    data() {
      return {
        showTable: false,
        tableData: [],
        fileViewerDialogVisible: false,
        fileContent: '', // Pass the content of the file
        fileName: '', // Pass the name of the file
      };
    },
    components: {
      FileViewer,
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
      console.log('fileViewerDialogVisible should be true:', this.fileViewerDialogVisible);
    },
   
      ...mapActions(['fetchTableData']),
    },
  };
  </script>
  
  <style>
  /* 样式可以根据需要自行调整 */
  </style>