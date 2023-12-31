// http.js
import axios from 'axios';

export const instance = axios.create({
  baseURL: ' http://localhost:8080', // 设置统一的接口前缀
  timeout: 10000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json', // 设置统一的请求头
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 可以在这里添加 loading 状态等
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    // 可以在这里移除 loading 状态等
    return response;
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

// 封装 GET 方法
export const get = (url, params) => {
  return instance.get(url, { params });
};

// 封装 POST 方法
export const post = (url, data) => {
  return instance.post(url, data);
};

