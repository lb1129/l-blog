# 拦截器

对异步接口进行拦截，可做前置处理，后置处理

## 创建 chooseImage 拦截器

当应用无访问摄像头/相册权限，引导跳到设置界面

```js
import permission from "@/common/permission";

// 当应用无访问摄像头/相册权限，引导跳到设置界面
uni.addInterceptor("chooseImage", {
  fail(e) {
    if (
      uni.getSystemInfoSync().platform == "android" &&
      e.errMsg == "chooseImage:fail No Permission"
    ) {
      if (e.code === 11) {
        uni.showModal({
          title: "无法访问摄像头",
          content: "当前无摄像头访问权限，建议前往设置",
          confirmText: "前往设置",
          success(e) {
            if (e.confirm) {
              permission.gotoAppSetting();
            }
          },
        });
      } else {
        uni.showModal({
          title: "无法访问相册",
          content: "当前无系统相册访问权限，建议前往设置",
          confirmText: "前往设置",
          success(e) {
            if (e.confirm) {
              permission.gotoAppSetting();
            }
          },
        });
      }
    } else if (
      e.errCode === 2 &&
      e.errMsg == "chooseImage:fail No filming permission"
    ) {
      // 注：e.errCode === 8 ios无从相册选择图片的权限 api已内置无需自己用拦截器实现
      uni.showModal({
        title: "无法访问相册",
        content: "当前无系统相册访问权限，建议前往设置",
        confirmText: "前往设置",
        success(e) {
          if (e.confirm) {
            permission.gotoAppSetting();
          }
        },
      });
    }
  },
});
```

## 创建 request 拦截器

```js
import { tokenStorage } from "@/storage/index.js";
import config from "@/config.json";
import { isFunction } from "lodash-es";

const baseUrl = config.baseUrl;
const timeout = config.timeout;

uni.addInterceptor("request", {
  invoke(args) {
    if (!/^http/.test(args.url)) {
      // 补全url
      args.url = `${baseUrl}${args.url}`;
      if (!args.header) args.header = {};
      // 请求头 Bearer token
      args.header.Authorization = `Bearer ${tokenStorage.get()}`;
      // 请求头 语言
      args.header["Accept-Language"] = uni.getLocale();
    }
    if (!args.timeout) args.timeout = timeout;
    uni.showLoading();
  },
  success(res, req) {
    // 服务器只要响应 不管http状态码多少 都会进来
    if (process.env.NODE_ENV === "development") {
      console.log(req.url);
      console.log(res.data);
    }
    // 使用 callback 形式
    const useCallback = req.success || req.fail || req.complete;
    if (useCallback) {
      // 401 跳转登录页
      if (res.statusCode === 401) {
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        if (page && page.route !== "pages/login/login") {
          tokenStorage.clear();
          uni.reLaunch({
            url: "/pages/login/login",
          });
        }
      }
    }
    if (!req.hiddenErrMsg) {
      if (res.statusCode >= 300 && res.statusCode !== 401) {
        uni.showToast({
          icon: "none",
          title: res.statusCode === 500 ? "server error" : res.data.errMsg,
        });
      }
    }
    uni.hideLoading();
  },
  fail(e) {
    // 服务器未响应错误 服务器不存在 timeout 服务器宕机
    if (process.env.NODE_ENV === "development")
      uni.showToast({
        icon: "none",
        title: e.errMsg,
      });
    uni.hideLoading();
  },
  async returnValue(p) {
    // 推荐外部使用 promise | async await 处理异步
    // 如果外部使用 callback 则由外部处理 http状态
    if (isFunction(p.then)) {
      const res = await p;
      // 成功 返回 data
      if (res.statusCode >= 200 && res.statusCode < 300) {
        return res.data;
      } else {
        // 401 跳转登录页
        if (res.statusCode === 401) {
          const pages = getCurrentPages();
          const page = pages[pages.length - 1];
          if (page && page.route !== "pages/login/login") {
            tokenStorage.clear();
            uni.reLaunch({
              url: "/pages/login/login",
            });
          }
        }
        throw res;
      }
    } else {
      return p;
    }
  },
});
```

## 拦截器初始化

App.vue

```vue
<script>
// #ifdef APP-PLUS
import "@/interceptor/chooseImage/index.js";
// #endif
import "@/interceptor/request/index.js";
</script>
```
