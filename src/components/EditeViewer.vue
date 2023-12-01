<template>
 <el-dialog v-model="internalVisible" title="文件预览" width="80%" :style="{ height: '600px' }" @close="closeDialog">
    <codemirror v-model:value="code"
     :options="cmOption" 
     :height="400" 
     class="CodeMirror"
     />
    <template #footer>
        <el-button @click="closeDialog">保存</el-button>
        <el-button @click="closeDialog">关闭</el-button>
      </template>
  </el-dialog>
</template>

<script>
// import dedent from 'dedent';
// import CodeMirror from "codemirror";
import Codemirror from "codemirror-editor-vue3";
import 'codemirror/theme/solarized.css';

export default {
  name: 'EditeViewer',
  props: {
    dialogVisible: Boolean,
    fileContent: String,
    recordId: Number,
  },
  components: {
    Codemirror,
  },
  data() {
    return {
      fileType: '',
      internalVisible: false, // 使用额外的变量存储对话框的状态
      cmOption: {
        tabSize: 4,
        autorefresh: true,
        styleActiveLine: true,
        lineNumbers: false,
        // gutters: ["CodeMirror-line", "my-custom-gutter"],
        // line: true,
        mode: 'text/x-mysql',
        theme: 'solarized light',
      },
      code: '', // 使用 code 数据属性存储文件内容
    };
  },
  watch: {
    dialogVisible(val) {
      // 在 dialogVisible 发生变化时更新额外的变量
      this.internalVisible = val;
    },
    fileContent(newContent) {
      // 当 fileContent 变化时更新 code
      this.code = newContent;
    },
    // recordId(newRecordId) {
    //   // 根据新的 recordId 获取内容（如果需要）
    //   // 你可能需要在这里进行 API 调用以获取内容
    //   // 并相应地更新 this.code
    // },
  },
  methods:{
    closeDialog() {
      this.internalVisible = false;
      this.$nextTick(() => {
        this.$emit('update:dialogVisible', this.internalVisible);
      });
    },
  },
  // mounted() {

  // }
};
</script>

<style scoped>
/* 样式可以根据需求自行定义 */
.CodeMirror { text-align: left }
.CodeMirror-line  {
  padding-right: 30px !important;
}
.CodeMirror-linenumbers {
  color: #000;       /* 行号颜色 */
  font-size: 14px;   /* 行号字体大小 */
}
</style>