import { createApp } from 'vue';
import { instance } from '@/utils/http';
// import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// 创建一个 Vue 实例，用于将 axios 挂载到 app 上
const app = createApp({});
// app.config.globalProperties.$http = instance;

// 创建一个 MockAdapter 实例
const mock = new MockAdapter(instance);
// const mockpost = new MockAdapter(post);

// get方法的模拟数据
const mockData = [
  {
    url: '/api/example',
    params: {},
    data: {
      code: 200,
      data: [
        { id: 1, name: '2023-11-24迭代' },
        { id: 2, name: '2023-10-24迭代' },
        { id: 3, name: '2023-09-24迭代' },
        { id: 4, name: '2023-08-29迭代' },
      ],
    },
  },
  {
    // getFileList 配置使用函数判断入参
    url: '/api/getFileList',
    params: (config) => config.params.id,
    data: (config) => {
      const id = config.params.id;
      if (id === 1) {
        return {
          code: 200,
          data: [
            { id: 1, fileName: 'org-java-ddl.sql' },
            { id: 2, fileName: 'org-java-dml.sql' },
            { id: 3, fileName: 'org-java.properties' },
          ],
        };
      } else if (id === 2) {
        return {
          code: 200,
          data: [
            { id: 1, fileName: 'org-java-ddl.sql' },
            { id: 2, fileName: 'org-java-dml.sql' },
          ],
        };
      } else {
        // 其他情况的处理
        return {
          code: 200,
          data: [
            { id: 1, fileName: 'org-java-ddl.sql' },
          ],
        };
      }
    },
  },
  {
    // getFileList 配置使用函数判断入参
    url: '/api/getFileDate',
    params: (config) => config.params.fileId,
    data: (config) => {
      const fileId = config.params.fileId;
      if (fileId === 1) {
        return {
          code: 200,
          data:  [
            { id: 1, content: '文件1文件1文件1文件1文件1文件1文件1文件1文件1文件1文件1文件1文件1文件1文件1文件1文件1', modifier: 'admin', modifyTime: '2023-11-24' },
            { id: 2, content: '文件1', modifier: 'admin', modifyTime: '2023-11-24' }
          ],
        };
      } else if (fileId === 2) {
        return {
          code: 200,
          data:[
            { id: 1, content: '文件2', modifier: 'admin', modifyTime: '2023-11-24' },
            { id: 2, content: '文件2', modifier: 'admin', modifyTime: '2023-11-24' },
            { id: 3, content: '文件2', modifier: 'admin', modifyTime: '2023-11-24' },
          ],
        };
      } else {
        // 其他情况的处理
        return {
          code: 200,
          data: [
            { id: 1, content: '文件xxx', modifier: 'admin', modifyTime: '2023-11-24' },
            { id: 2, content: '文件xxx', modifier: 'admin', modifyTime: '2023-11-24' }
          ],
        };
      }
    },
  }
];

// 注册模拟接口
mockData.forEach(item => {
  mock.onGet(item.url, item.params).reply((config) => {
    return [typeof item.data === 'function' ? item.data(config).code : item.data.code, typeof item.data === 'function' ? item.data(config).data: item.data.data];
  });
});
export default app;