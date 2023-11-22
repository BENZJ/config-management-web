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