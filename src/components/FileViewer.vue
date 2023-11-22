<template>
  <div>
    
    <el-dialog v-model="internalVisible" title="文件预览" width="80%" @close="handleBeforeClose">
      <pre>
        <code :class="`language-${fileType}`">{{ fileContent }}</code>
      </pre>
      <template #footer>
        <el-button @click="closeDialog">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Prism from 'prismjs';

export default {
  props: {
    dialogVisible: Boolean,
    fileContent: String,
    fileName: String,
  },
  data() {
    return {
      fileType: '',
      internalVisible: false, // 使用额外的变量存储对话框的状态
    };
  },
  watch: {
    fileName() {
      this.detectFileType();
    },
    dialogVisible(val) {
      // 在 dialogVisible 发生变化时更新额外的变量
      this.internalVisible = val;
      this.$nextTick(() => {
          this.detectFileType();
          this.highlightCode();
        });
    },
  },
  methods: {
    closeDialog() {
      this.internalVisible = false;
      this.$nextTick(() => {
        this.$emit('update:dialogVisible', this.internalVisible);
      });
    },
    handleBeforeClose() {
      this.internalVisible = false;
      this.$nextTick(() => {
        this.$emit('update:dialogVisible', this.internalVisible);
      });
    },
    highlightCode() {
      Prism.highlightAll();
    },
    detectFileType() {
      const fileExtension = this.fileName.split('.').pop();
      const language = this.mapFileExtensionToLanguage(fileExtension);
      this.fileType = language || 'plaintext'; // Default to plaintext if no match
      Prism.highlightAll();
    },
    
    mapFileExtensionToLanguage(extension) {
      // Add more mappings as needed
      switch (extension) {
        case 'sql':
          return 'sql';
        // Add more cases for other file types
        default:
          return '';
      }
    },
  },
  mounted() {
    this.highlightCode();
  },
};
</script>

<style scoped>
/* Add any additional styling as needed */
</style>