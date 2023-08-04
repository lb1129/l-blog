# 备注

## 云上开启 Nodejs12

在云函数云对象 package.json 配置

```json
{
  "cloudfunction-config": {
    // Nodejs12
    "runtime": "Nodejs12"
  }
}
```

## 云函数云对象调试

在云函数云对象目录上右键，然后点击 配置运行测试参数，将生成 `xx.param.js`

云函数 `xx.param.js` 配置入参

```js
{
}
```

云对象 `xx.param.js` 配置要运行的云对象函数

```js
login();

// register();
```

配置好 `xx.param.js` 后，在云函数 index.js 云对象 index.obj.js 文件上添加断点 然后在云函数云对象目录上右键，然后点击 调试运行-本地(云函数|云对象) 进入 断点调试

## 跨域配置

由于浏览器跨域限制，需要将请求云服务的网站域名 在 uniCloud 的 web 控制台 跨域配置 里进行添加
