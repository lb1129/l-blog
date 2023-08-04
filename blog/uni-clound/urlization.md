# 单入口 url 化

只需要一个云函数 url 化，外部系统即可使用 http 调用所有云函数云对象，功能还包括 登录校验，自动从 token 解析出 userId，exclude 指定不可调用的云函数云对象

## 创建 main 云函数

目录结构

```
└─ cloudfunctions
   └─ main
      ├─ authorize.js
      ├─ exclude.js
      └─ index.js
```

## 校验登录的云函数云对象

authorize.js

```js
// 访问以下云函数云对象 如果token无效 直接响应401
// 否则 从 token 取出 userId 做为参数调用云函数云对象 然后走云函数云对象内部逻辑
module.exports = [
  ["auth", "isLogin"],
  ["auth", "logout"],
  ["user", "getUserInfo"],
  ["user", "editUserInfo"],
  ["user", "setPhone"],
  ["user", "setPushClientId"],
  ["push"],
  ["menu", "getMenu"],
  ["product", "getProductById"],
  ["product", "saveProduct"],
  ["product", "deleteProductByIds"],
  ["product", "getProducts"],
  ["message", "setMessageRead"],
  ["message", "getMessageById"],
  ["message", "addMessage"],
  ["message", "deleteMessageByIds"],
  ["message", "getMessages"],
];
```

## 排除的云函数云对象

exclude.js

```js
// 访问以下云函数云对象 直接响应404
module.exports = [
  ["aes", "decrypt"],
  ["rsa", "decrypt"],
];
```

## 实现 单入口 url 化 逻辑

index.js

```js
"use strict";
const { success, fail } = require("response-common");
const { verify } = require("jwt-common");
const exclude = require("./exclude.js");
const authorize = require("./authorize.js");
let upperCaseExclude = {};
exclude.forEach((arr) => {
  upperCaseExclude[arr.map((item) => item.toUpperCase()).join()] = true;
});
let upperCaseAuthorize = {};
authorize.forEach((arr) => {
  upperCaseAuthorize[arr.map((item) => item.toUpperCase()).join()] = true;
});

exports.main = async (event = {}, context) => {
  // url化的出口
  let { path, headers, queryStringParameters, body, isBase64Encoded } = event;

  // 拆解 path
  const pathArr = path.split("/").filter(Boolean);
  const len = pathArr.length;

  // 要排除的云对象方法或云函数
  if (len === 1 || len === 2) {
    if (upperCaseExclude[pathArr.map((path) => path.toUpperCase()).join()]) {
      return {
        mpserverlessComposedResponse: true,
        statusCode: 404,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(fail("404")),
      };
    }
  }

  // 校验token的云对象方法或云函数
  let authorize = {};
  if (len === 1 || len === 2) {
    if (upperCaseAuthorize[pathArr.map((path) => path.toUpperCase()).join()]) {
      const authorization = headers.authorization;
      if (!authorization)
        return {
          mpserverlessComposedResponse: true,
          statusCode: 401,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(fail("未登录")),
        };
      const token = authorization.replace(/^Bearer\s+/, "");
      const res = verify(token);
      if (!res) {
        return {
          mpserverlessComposedResponse: true,
          statusCode: 401,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(fail("未登录")),
        };
      }
      // token session 校验
      const currentToken = await uniCloud.redis().get(res.userId);
      if (!currentToken || currentToken !== token) {
        return {
          mpserverlessComposedResponse: true,
          statusCode: 401,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(fail("未登录")),
        };
      }
      authorize.userId = res.userId;
    }
  }

  // 组合 入参
  // base64编码 解码
  if (isBase64Encoded) {
    body = Buffer.from(body, "base64").toString("utf8");
  }
  // data默认值
  let data = {};
  try {
    // json反序列化
    if (headers["content-type"] === "application/json") {
      data = JSON.parse(body);
    }
    // query body 入参合并
    data = {
      ...queryStringParameters,
      ...data,
      ...authorize,
    };
  } catch (e) {
    data = {
      ...queryStringParameters,
      ...authorize,
    };
  }

  // 为云函数
  if (len === 1) {
    try {
      const fnRes = await uniCloud.callFunction({
        name: pathArr[0],
        data,
      });
      if (fnRes.success) {
        if (!fnRes.result) {
          return {
            mpserverlessComposedResponse: true,
            statusCode: 200,
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(success()),
          };
        }
        if (fnRes.result.errCode === 0) {
          return {
            mpserverlessComposedResponse: true,
            statusCode: 200,
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(fnRes.result),
          };
        }
        return {
          mpserverlessComposedResponse: true,
          statusCode: 400,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(fnRes.result),
        };
      } else {
        return {
          mpserverlessComposedResponse: true,
          statusCode: 500,
        };
      }
    } catch (e) {
      if (e.code === "NOT_FOUND") {
        return {
          mpserverlessComposedResponse: true,
          statusCode: 404,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(fail("404")),
        };
      }
      if (e.message) {
        if (
          e.message === "Method name required" ||
          e.message.indexOf("not_found") !== -1
        ) {
          return {
            mpserverlessComposedResponse: true,
            statusCode: 404,
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(fail("404")),
          };
        }
      }
      return {
        mpserverlessComposedResponse: true,
        statusCode: 500,
      };
    }
  } else if (len === 2) {
    // 为云对象
    const obj = uniCloud.importObject(pathArr[0]);
    try {
      const ObjFnRes = await obj[pathArr[1]](data);
      return {
        mpserverlessComposedResponse: true,
        statusCode: 200,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(ObjFnRes ? ObjFnRes : success()),
      };
    } catch (e) {
      if (e.message) {
        if (
          e.message.indexOf("not_found") !== -1 ||
          e.message.indexOf("not found") !== -1 ||
          e.message.indexOf("private method") !== -1
        )
          return {
            mpserverlessComposedResponse: true,
            statusCode: 404,
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(fail("404")),
          };
      }
      if (e.detail) {
        return {
          mpserverlessComposedResponse: true,
          statusCode: 400,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(e.detail),
        };
      }
      return {
        mpserverlessComposedResponse: true,
        statusCode: 500,
      };
    }
  } else {
    // 否则直接404
    return {
      mpserverlessComposedResponse: true,
      statusCode: 404,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(fail("404")),
    };
  }
};
```

## 配置 main 云函数 url 化

上传 main 云函数，进入 uniCloud 的 web 控制台，在 云函数/云对象 下 查看 函数/对象列表，找到函数名称为 main 的记录，进入详情，云函数 URL 化，设置 URL 的 PATH 部分

![云函数url化](/assets/uni-clound/url.png)

## 通过 http 调用

### Postman

![postman](/assets/uni-clound/postman.png)

### uni.request

```js
import { isLogin_api } from "@/interceptor/request/api.js";

export const isLoginServe = () =>
  uni.request({
    url: isLogin_api,
  });
```

### 外部系统 axios

```ts
import http, { type IResponse } from "@/http";
import { isLogin_api } from "@/http/api";

export const isLoginServe = () => http.get<IResponse<boolean>>(isLogin_api);
```
