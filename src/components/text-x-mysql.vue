<template>
 <el-dialog v-model="internalVisible" title="文件预览" width="80%" @close="closeDialog">
    <codemirror v-model="code" :options="cmOption" />
  </el-dialog>
</template>

<script>
import dedent from 'dedent';
import Codemirror from "codemirror-editor-vue3";
import 'codemirror/theme/solarized.css';

export default {
  name: 'EditeViewer',
  props: {
    dialogVisible: Boolean,
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
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/x-mysql',
        theme: 'solarized light',
      },
      code: dedent`
        -- SQL模式的CodeMirror
        SELECT SQL_NO_CACHE DISTINCT
            @var1 AS \`val1\`, @'val2', @global.'sql_mode',
            1.1 AS \`float_val\`, .14 AS \`another_float\`, 0.09e3 AS \`int_with_esp\`,
            0xFA5 AS \`hex\`, x'fa5' AS \`hex2\`, 0b101 AS \`bin\`, b'101' AS \`bin2\`,
            DATE '1994-01-01' AS \`sql_date\`, { T "1994-01-01" } AS \`odbc_date\`,
            'my string', _utf8'your string', N'her string',
                TRUE, FALSE, UNKNOWN
          FROM DUAL
          -- '--'后面需要空格
          # 单行注释
          /* 多行
          注释! */
          LIMIT 1 OFFSET 0;
      `,
    };
  },
  watch: {
    dialogVisible(val) {
      // 在 dialogVisible 发生变化时更新额外的变量
      this.internalVisible = val;
    },
  },
  methods:{
    closeDialog() {
      this.internalVisible = false;
      this.$nextTick(() => {
        this.$emit('update:dialogVisible', this.internalVisible);
      });
    },

  }
};
</script>