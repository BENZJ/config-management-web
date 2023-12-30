// import { createApp } from 'vue';
import { instance } from '@/utils/http';
// import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// 创建一个 Vue 实例，用于将 axios 挂载到 app 上
// const app = createApp({});
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
    url: '/api/getFilePreview',
    params: (config) => config.params.id,
    data: (config) => {
      const id = config.params.id;
      if (id === 1) {
        return {
          code: 200,
          data: "132131231231\n123123123123\n123123123",
        };
      } else if (id === 2) {
        return {
          code: 200,
          data: "absdfsddfdsf\nabsdfsddfdsf\nabsdfsddfdsf",
        };
      } else {
        // 其他情况的处理
        return {
          code: 200,
          data: "bsdfsd\n123123123\ndfdsf\nabsdfsddfdsf\nabsdfsddfdsf",
        };
      }
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
          data: [
            { id: 1, content: '文件1文件1文件1文件1文件1文件1文件1文件1文件1文件1文件1文件1\n \t文件1文件1文件1文件1文件1', modifier: 'admin', modifyTime: '2023-11-24' , remark:'备注'},
            { id: 2, content: '文件1', modifier: 'admin', modifyTime: '2023-11-24', remark:'备注xxx' }
          ],
        };
      } else if (fileId === 2) {
        return {
          code: 200,
          data: [
            { id: 1, content: '文件2', modifier: 'admin', modifyTime: '2023-11-24' , remark:'备注1'},
            { id: 2, content: '文件2', modifier: 'admin', modifyTime: '2023-11-24' , remark:'备注1'},
            { id: 3, content: '文件2', modifier: 'admin', modifyTime: '2023-11-24' , remark:'备注1'},
          ],
        };
      } else {
        // 其他情况的处理
        return {
          code: 200,
          data: [
            { id: 1, content: '文件xxx', modifier: 'admin', modifyTime: '2023-11-24' , remark:'备注2'},
            { id: 2, content: '文件xxx', modifier: 'admin', modifyTime: '2023-11-24' , remark:'备注2'}
          ],
        };
      }
    },
  },
  {
    // 删除行
    url: '/api/deleteRow',
    params: (config) => config.params.id,
    data: (config) => {
      const id = config.params.id;
      return {
        code: 200,
        data: [
          { id: id}
        ],
      };

    }
  },
];
// post方法的模拟数据
const mockDataPost = [
  {
    url: '/api/createIteration',
    params: (config) => {
      const iterationName = config.data ? JSON.parse(config.data).iterationName : null;
      return { iterationName };
    },
    data: (config) => {
      const iterationName = config.data ? JSON.parse(config.data).iterationName : null;
      return {
        code: 200,
        data: {
          iterationName: iterationName,
          // 其他数据字段...
        },
      };
    },
  },
  {
    url: '/api/ttt',
    params: (config) => {
      const iterationName = config.data ? JSON.parse(config.data).iterationName : null;
      return { iterationName };
    },
    data: (config) => {
      const iterationName = config.data ? JSON.parse(config.data).iterationName : null;
      return {
        code: 200,
        data: {
          iterationName: iterationName,
          // 其他数据字段...
        },
      };
    },
  },
]

export default function enableMockAdapter() {
  mockData.forEach(item => {
    mock.onGet(item.url, item.params).reply((config) => {
      return [typeof item.data === 'function' ? item.data(config).code : item.data.code, typeof item.data === 'function' ? item.data(config).data : item.data.data];
    });
  });
  mockDataPost.forEach(item => {
    console.log("mock", item)
    mock.onPost(item.ur).reply(function (config) {
      return [item.data(config).code, item.data(config).data];
      // return [typeof item.data === 'function'? item.data(config).code : item.data.code, typeof item.data === 'function'? item.data(config).data: item.data.data];
    });
  });
}
// 注册模拟接口
