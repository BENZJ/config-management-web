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
