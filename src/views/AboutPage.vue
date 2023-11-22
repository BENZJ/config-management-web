<!-- About.vue -->

<template>
  <h2>配置管理系统</h2>
    <div class="container">
      
      <!-- 页面内容 -->
      <div class="navbar">
      <SidebarMenu />
      </div>
      <div class="content-container">
      <!-- 右侧内容 -->
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import SidebarMenu from '../components/SidebarMenu.vue';
  export default {
    components: {
      SidebarMenu
    }
  };
  </script>
  
  <style>
.container {
  display: flex;
}

.navbar {
  width: 200px;
  padding: 20px;
}

.content-container {
  flex: 1;
  padding: 20px;
}
  </style>
  