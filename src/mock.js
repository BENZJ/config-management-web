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
  //获取迭代列表
  {
    url: '/api/example', params: {}, data: {
      code: 200,
      data: [
        { id: 1, name: '2023-11-24迭代' },
        { id: 2, name: '2023-10-24迭代' },
        { id: 3, name: '2023-09-24迭代' },
      ],
    }
  },

  //获取文件列表
  {
    url: '/api/getFileList', params: {}, data: {
      code: 200,
      data: [
        { id: 1, fileName: 'org-java-ddl.sql' },
        { id: 2, fileName: 'org-java-dml.sql' },
        { id: 3, fileName: 'org-java.properties' }
      ]
    }
  },

  //获取文件列表
  {
    url: '/api/getFileDate', params: {id: 1}, data: {
      code: 200,
      data: [
        { id: 1, content: 'exprot sssfdfsdf,sdfsdf', userName: 'admin', createTime: '2023-11-24' },
        { id: 2, content: 'exprot sssfdfsdf,sdfsdf', userName: 'admin', createTime: '2023-11-24' },
        { id: 3, content: 'exprot sssfdfsdf,sdfsdf', userName: 'admin', createTime: '2023-11-24' },
        // 更多文件
      ]
    }
  },
  {
    url: '/api/getFileDate', params: {id: 2}, data: {
      code: 200,
      data: [
        { id: 1, content: '文件2', userName: 'admin', createTime: '2023-11-24' },
        { id: 2, content: '文件2', userName: 'admin', createTime: '2023-11-24' },
        { id: 3, content: '文件2', userName: 'admin', createTime: '2023-11-24' },
        // 更多文件
      ]
    }
  }

]

// const mockPostDate=[
//   {
//     url: '/modify', params: {}, data: {
//       code: 200,
//       data: [
//         { id: 1, name: '2023-11-24迭代' },
//     }
// }
// ]

console.log('mockData:',mockData)
// 注册模拟接口
mockData.forEach ( item=>{
  console.log('item:',item)
  mock.onGet(item.url, item.params).reply(item.data.code, item.data.data);
});
export default app;