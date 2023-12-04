<template>
  <div >
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <b>{{ fileName }}</b>
      <div>
        <el-icon class="action-icon" v-show="!showTable" size="20" @click="loadTableData">
          <FolderOpened />
        </el-icon>
        <el-icon class="action-icon" v-show="showTable" size="20" @click="toggleTable">
          <FolderRemove />
        </el-icon>
        <el-icon class="action-icon" @click="previewFile" size="20">
          <Document />
        </el-icon>
        <el-icon  class="action-icon" size="20" @click="addRow()">
            <Plus />
          </el-icon>
      </div>
    </div>

    <el-table :data="tableData" v-show="showTable" style="width: 100%" ref="myTable">
      <!-- <el-table-column prop="id" label="编号"></el-table-column> -->
      <el-table-column label="内容">
        <template #default="{ row }">
          <div>{{ truncateText(row.content, 10) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template #default="{ row }">
          <div>{{ truncateText(row.remark, 10) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="modifier" label="修改人"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-icon class="action-icon" size="20" @click="editRow(row)">
            <Edit />
          </el-icon>
          <el-icon class="action-icon" size="20" @click="showDeleteConfirm(row)">
            <Delete />
          </el-icon>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { get } from '@/utils/http';
import { ElMessageBox } from 'element-plus';

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
        console.log('fileName', this.fileName);
        console.log('fileId', this.fileId);
        console.log('拜访地址', `/api/getFileDate?fileId=${this.fileId}`);
        const response = await get(`/api/getFileDate`, { fileId: this.fileId });
        this.tableData = response.data;
        this.showTable = true;
      } catch (error) {
        console.error('获取文件列表失败', error);
      }
    },
    // handleClick(event) {
    //   const target = event.target;
    //   if (target.classList.contains('icon')) {
    //     // 如果点击的是图标，则阻止冒泡，不执行父级的 toggleTable
    //     event.stopPropagation();
    //   } else {
    //     // 如果点击的不是图标，则执行 toggleTable
    //     this.toggleTable();
    //   }
    // },
    toggleTable() {
      this.showTable = !this.showTable;
    },
    previewFile() {
      // 处理预览文件的逻辑
    },
    editRow(row) {
      // 处理编辑行的逻辑
      console.log('编辑行', row);
      this.$emit('open-edite-viewer', { content: row.content, fileId: this.fileId, rowId: row.id, rowModifier: row.modifier ,rowRemark: row.remark});
    },
    async deleteRow(row) {
      // 处理删除行的逻辑
      try {
        await get(`/api/deleteRow`, {id: row.id});
        this.loadTableData(); // 删除成功后刷新数据
      } catch (error) {
        console.error('删除行失败', error);
      }
    },
    showDeleteConfirm(row) {
      ElMessageBox.confirm('确认删除该行吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteRow(row);
        })
        .catch(() => {
          // 取消删除
        });
    },
    addRow() {
      // 处理添加记录逻辑
      console.log('添加行');
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

.action-icon {
  margin-right: 10px;
  /* 调整右边距，可以根据需要调整间距大小 */
}
</style>
