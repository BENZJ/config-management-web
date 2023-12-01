<template>
  <div>
    <div style="text-align: right;">
      <b>{{ fileName }}</b>
      <el-button v-show="!showTable" size="default" @click="loadTableData" type="primary">展开</el-button>
      <el-button v-show="showTable" size="default" @click="toggleTable" type="danger">隐藏</el-button>
      <el-button @click="previewFile" size="default" type="danger">预览</el-button>
    </div>
    <el-table :data="tableData" v-show="showTable" style="width: 100%" ref="myTable">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column label="内容">
        <template #default="{ row }">
        <div>{{ truncateText(row.content, 10) }}</div>
      </template>
      </el-table-column>
      <el-table-column prop="modifier" label="修改人"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-icon  size="20" @click="editRow(row)"><Edit /></el-icon>
          <el-icon  size="20" @click="deleteRow(row)"><Delete /></el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { get } from '@/utils/http';

export default {
  props: {
    fileName: String,
    fileId: Number,
  },
  data() {
    return {
      showTable: false,
      tableData: [],
    };
  },
  methods: {
    async loadTableData() {
      try {
        console.log('fileName',this.fileName);
        console.log('fileId',this.fileId);
        console.log('拜访地址',`/api/getFileDate?fileId=${this.fileId}`);
        const response = await get(`/api/getFileDate`,{fileId:this.fileId});
        this.tableData = response.data;
        this.showTable = true;
      } catch (error) {
        console.error('获取文件列表失败', error);
      }
    },
    toggleTable() {
      this.showTable = !this.showTable;
    },
    previewFile() {
      // 处理预览文件的逻辑
    },
    editRow(row) {
      // 处理编辑行的逻辑
      console.log('编辑行', row);
      this.$emit('open-edite-viewer', { content: row.content });
    },
    deleteRow(row) {
      // 处理删除行的逻辑
      console.log('删除行', row);
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    },
  },
  setup() {
    // 在组件挂载后执行的逻辑
    onMounted(async () => {
      // 如果需要在组件挂载后执行一些初始化逻辑，可以在这里调用
    });
  },
};
</script>

<style scoped>
/* 样式可以根据需要自行定义 */
</style>
