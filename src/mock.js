import { createApp } from 'vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// 创建一个 Vue 实例，用于将 axios 挂载到 app 上
const app = createApp({});
app.config.globalProperties.$http = axios;

// 创建一个 MockAdapter 实例
const mock = new MockAdapter(axios);

// 模拟数据
const mockData = {
  // 示例接口
  '/api/example': {
    code: 200,
    data: [
        { id: 1, name: '2023-11-24迭代' },
        { id: 2, name: '2023-10-24迭代' },
        { id: 3, name: '2023-09-24迭代' },
        // 更多菜单项...
      ],
  },
};

// 注册模拟接口
for (const url in mockData) {
  mock.onGet(url).reply(mockData[url].code, mockData[url].data);
}

export default app;