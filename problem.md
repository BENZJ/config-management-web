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