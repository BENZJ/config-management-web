import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './mock'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import 'prismjs/themes/prism.css';

const app = createApp(App);
app.use(ElementPlus)
app.use(router); // 确保在调用 use 之前导入了 router 模块
app.mount('#app');
