import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App);
app.use(router); // 确保在调用 use 之前导入了 router 模块
app.mount('#app');
