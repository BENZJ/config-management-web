<template>
  <div class="sidebar-menu">
    <h1>
      <el-icon size="20" @click="toggleInputVisible"> <!-- 绑定点击事件 -->
        <Plus />
      </el-icon>
      <!-- 使用 v-if 控制输入框的显示和隐藏 -->
      <input v-if="isInputVisible" ref="input" @blur="handleInputBlur" @keyup.enter="handleInputEnter"/>
    </h1>
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
import { get ,post } from '@/utils/http';

export default {
  data() {
    return {
      menuList: [],
      selectedMenuItemId: null,
      isInputVisible: false, // 控制输入框显示和隐藏
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
        const res = await get('/iteration/list', {});
        this.menuList = res.data.data;
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
    },
    toggleInputVisible() {
      // 点击加号图标时切换输入框的显示和隐藏状态
      this.isInputVisible = !this.isInputVisible;
      if (this.isInputVisible) {
        // 显示输入框时，将焦点设置到输入框
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    },
    async handleInputBlur() {
      // 失去焦点时触发，发送 POST 请求
      if (this.isInputVisible) {
        const inputValue = this.$refs.input.value.trim();
        if (inputValue) {
          try {
            // 发送 POST 请求创建新的迭代
            const res = await post('/iteration/create', { name: inputValue });
            console.log('创建迭代成功', res.data);
            // 请求完成后重新获取迭代列表
            await this.fetchMenuList();
          } catch (error) {
            console.error('创建迭代失败', error);
          }
        }
        // 隐藏输入框
        this.isInputVisible = false;
      }
    },

    handleInputEnter() {
      // 按下回车键时触发，处理和失去焦点时相同的逻辑
      this.handleInputBlur();
    },
  },
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

  input {
    margin-left: 10px;
    padding: 5px;
    border: 1px solid #ccc;
  }
</style>
