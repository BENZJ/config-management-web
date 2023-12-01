<!-- SidebarMenu.vue -->

<template>
  <div class="sidebar-menu">
    <h1>迭代列表 <el-icon size="20"><Plus /></el-icon></h1>
  </div>
  <div class="sidebar-menu">
    <ul>
      <li v-for="menuItem in menuList" :key="menuItem.id" @click="handleMenuItemClick(menuItem.id)"
        :class="{ 'highlighted': menuItem.id === selectedMenuItemId }">
        {{ menuItem.name }}
      </li>
    </ul>
  </div>
</template>

<script>
  // import axios from 'axios';
  import { get } from '@/utils/http';
  export default {
    data() {
      return {
        menuList: [],
        selectedMenuItemId: null
      };
    },
    mounted() {
      // 在组件挂载后发送请求获取菜单列表
      this.fetchMenuListAndHandleClick();
    },
    methods: {
      async fetchMenuListAndHandleClick() {
        // 在组件挂载后发送请求获取菜单列表
        await this.fetchMenuList();

        // 如果 menuList 不为空，则取第一个菜单
        if (this.menuList.length > 0) {
          this.handleMenuItemClick(this.menuList[0].id);
        }
      },
      async fetchMenuList() {
        try {
          const res = await get('/api/example', {})
          this.menuList = res.data;
          console.log('获取迭代列表成功', this.menuList);
        } catch (error) {
          console.error('GET请求失败', error);
        }
      },
      handleMenuItemClick(id) {
        // 在这里处理点击列表项的逻辑，你可以使用id执行相应的操作
        console.log('点击了列表项，ID为:', id);
        // 设置当前选中的列表项的 ID 和信息
        this.selectedMenuItemId = id;
        this.$emit('menu-item-clicked', id);
      }
    },
    emits: ['menu-item-clicked'] // 添加 emits 选项声明自定义事件
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

  /* 新增样式，用于高亮显示 */
  .highlighted {
    background-color: #aaf;
  }
</style>