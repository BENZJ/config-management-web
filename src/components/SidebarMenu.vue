<!-- SidebarMenu.vue -->

<template>
    <div class="sidebar-menu">
        <h1>迭代列表</h1>
    </div>
    <div class="sidebar-menu">
      <ul>
        <ul>
            <li v-for="menuItem in menuList" :key="menuItem.id">
              {{ menuItem.name }}
            </li>
        </ul>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        menuList: []
      };
    },
    mounted() {
      // 在组件挂载后发送请求获取菜单列表
      this.fetchMenuList();
    },
    methods: {
      async fetchMenuList() {
      axios.get('/api/example')
        .then(response => {
          // 请求成功处理
          this.menuList = response.data; // 将获取的数据保存到 menuList 中
          console.log(response.data);
        })
        .catch(error => {
          // 请求失败处理
          console.error('Error:', error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* 样式可以根据需求自行定义 */
  .sidebar-menu {
    width: 200px;
    background-color: #f0f0f0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  li:hover {
    background-color: #ddd;
  }
  </style>
  