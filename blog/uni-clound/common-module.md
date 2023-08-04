# 公共模块

可复用的功能封装，例如：统一响应结构，lodash，jwt 等

## 创建公共模块

使用 hbuilder IDE 直接在 common 目录右键新建公共模块即可创建新公共模块  
创建 统一响应结构 response-common

```js
module.exports = {
  success(data = null, errCode = 0, errMsg = "") {
    return {
      errCode,
      errMsg,
      data,
    };
  },
  fail(errMsg = "fail", errCode = 1) {
    return {
      errCode,
      errMsg,
      data: null,
    };
  },
};
```

## 创建依赖第三方的公共模块

使用 hbuilder IDE 直接在 common 目录右键新建公共模块创建 jwt-common

cd 进 jwt-common 目录 在终端执行 `npm i jsonwebtoken` 安装三方依赖

```js
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const privateKey = fs.readFileSync(path.resolve(__dirname, "./pri.key"));
module.exports = {
  sign(payload, expiresIn = "24h") {
    return jwt.sign(payload, privateKey, {
      expiresIn,
    });
  },
  verify(token) {
    try {
      const res = jwt.verify(token, privateKey);
      return res;
    } catch (err) {
      return null;
    }
  },
};
```

## 使用公共模块

使用 hbuilder IDE 直接在 云函数云对象目录右键 选择 管理公共模块或扩展库依赖 即可进入 选择界面

![common-module](/public/assets/uni-clound/common-module.png)

## 关于第三方依赖

建议封装成公共模块，免得在每个需要用到第三方依赖的云函数云对象里去各自安装
