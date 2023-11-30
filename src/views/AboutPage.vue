<!-- About.vue -->

<template>
  <h2>配置管理系统</h2>
  <div class="container">

    <!-- 页面内容 -->
    <div class="navbar">
      <SidebarMenu @menu-item-clicked="handleMenuItemClicked" />
    </div>
    <div class="content-container">
      <!-- 右侧内容 -->
      <router-view :id="selectedItemId"></router-view>
    </div>
  </div>
</template>

<script>
  import SidebarMenu from '../components/SidebarMenu.vue';
  export default {
    components: {
      SidebarMenu
    },
    data() {
      return {
        selectedItemId: null, // 选中的菜单项的 ID
      };
    },
    methods: {
      handleMenuItemClicked(id) {
        // 在这里处理点击列表项后的逻辑，你可以使用 id 执行相应的操作
        console.log('About.vue 接收到菜单项点击事件，ID为:', id);
        this.selectedItemId = id;
        // 设置当前选中的列表项的 ID
      },
    },
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