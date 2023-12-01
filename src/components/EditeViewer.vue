<template>
  <el-dialog v-model="internalVisible" title="文件预览" width="80%" :style="{ height: '750px' }" @close="closeDialog">
    <codemirror v-model:value="code" :options="cmOption" :height="400" class="CodeMirror" />
    <el-form :model="formData" label-width="80px">
      <el-form-item label="人员姓名">
        <el-input v-model="formData.personName" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm">保存</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script>
// import dedent from 'dedent';
// import CodeMirror from "codemirror";
import Codemirror from "codemirror-editor-vue3";
import 'codemirror/theme/solarized.css';
import { post } from '@/utils/http';

export default {
  name: 'EditeViewer',
  props: {
    dialogVisible: Boolean,
    fileContent: String,
    recordId: Number,
    recordName: String,
    recordRemark: String,
  },
  components: {
    Codemirror,
  },
  data() {
    return {
      formData: {
        recordId: '',
        personName: '',
        remark: '',
        // 新添加的额外参数
        extraParam: '',
      },
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
    recordId(val){
      this.formData.recordId = val;
    },
    recordRemark(val){
      this.formData.remark = val;
    },
    recordName(val){
      this.formData.personName = val;
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
  methods: {
    submitForm() {
      // 创建一个用于发送 POST 请求的数据对象
      const postData = {
        personName: this.formData.personName,
        remark: this.formData.remark,
        extraParam: this.formData.extraParam, // 将额外参数添加到请求中
        code: this.code, // 将 CodeMirror 编辑的内容添加到请求中
        // 如果需要，添加其他属性
      };

      // 执行 POST 请求
      post('/api/submitForm', postData)
        .then(response => {
          console.log('表单提交成功', response.data);
          // 在成功提交后可以执行其他操作
        })
        .catch(error => {
          console.error('表单提交失败', error);
          // 处理错误或向用户提供反馈
        })
        .finally(() => {
          // 在提交后关闭对话框
          this.closeDialog();
        });
    },
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
.CodeMirror {
  text-align: left
}

.CodeMirror-line {
  padding-right: 30px !important;
}

.CodeMirror-linenumbers {
  color: #000;
  /* 行号颜色 */
  font-size: 14px;
  /* 行号字体大小 */
}
</style>