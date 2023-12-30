import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
// import enableMockAdapter from './mock'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import 'prismjs/themes/prism.css';
// import axios from 'axios';
import VueCodemirror from 'vue-codemirror'
import { InstallCodemirro } from "codemirror-editor-vue3";
import 'codemirror/lib/codemirror.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
app.use(ElementPlus);
app.use(InstallCodemirro);
app.use(VueCodemirror);
app.use(router); // 确保在调用 use 之前导入了 router 模块
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
// if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_USE_MOCK === 'true') {
//   enableMockAdapter();
// } else {
//   // 在非开发环境中，正常配置 axios 实例
//   axios.defaults.baseURL = 'https://api.example.com';
//   // ... 其他 axios 配置
// }
app.mount('#app');
