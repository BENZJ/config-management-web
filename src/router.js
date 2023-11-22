// router.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue'; // 导入 Home 组件
import AboutPage from './views/AboutPage.vue'; // 导入 About 组件


const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage }
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

export default router;