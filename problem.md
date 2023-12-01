**问题解决 🚧**
> vscode无法调试 
修改vue.config.js 
```js
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  }
}
```
> 富文本编辑器问题
vue3不能用codemirrorbug https://zhuanlan.zhihu.com/p/648931507

>ERROR ResizeObserver loop completed with undelivered notifications
详见https://blog.csdn.net/qq_65032048/article/details/133083131

>文本编辑器CodeMirror显示内容
https://blog.csdn.net/weixin_44278630/article/details/123124203

>post方法mockbug
```javascript
mockDataPost.forEach(item => {
  console.log("mock" , item)
  mock.onPost(item.url, item.params).reply(function (config) {   //这个item.params放上有问题！！！！
    return [item.data(config).code, item.data(config).data];
    // return [typeof item.data === 'function'? item.data(config).code : item.data.code, typeof item.data === 'function'? item.data(config).data: item.data.data];
  });
});

用这样子的写法 
mockDataPost.forEach(item => {
  console.log("mock" , item)
  mock.onPost(item.url).reply(function (config) {   //这个item.params放上有问题！！！！
    return [item.data(config).code, item.data(config).data];
    // return [typeof item.data === 'function'? item.data(config).code : item.data.code, typeof item.data === 'function'? item.data(config).data: item.data.data];
  });
});

```
