// router.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue'; // 导入 Home 组件
import AboutPage from './views/AboutPage.vue'; // 导入 About 组件
import ConfigContent from './components/ConfigContent.vue'; 


const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage,  children: [
    { path: '', component: ConfigContent }
  ] }
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

export default router;