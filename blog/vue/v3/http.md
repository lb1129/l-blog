# http 请求

| 模块名称 | 官方维护 | 支持拦截器 | 支持上传下载进度 | 异步处理机制 |
| -------- | -------- | ---------- | ---------------- | ------------ |
| axios    | 否       | 是         | 是               | promise      |

## config.ts

项目配置如果需要在运行时修改也起效，可选择将配置放入 public/config.json ，然后在入口 main.ts 使用 axios 请求 config.json ，获取内容后将配置合并到 config.ts ，然后创建启动 app

```ts
export default {
  http: {
    baseURL: "",
    uploadURL: "",
    downloadURL: "",
    timeout: 60000,
  },
  themeColor: "",
  // 其他项目配置
};
```

## api.ts

后台接口 url 声明

```ts
// auth 模块
export const isLogin_api = "/api/auth/isLogin";

// oauth模块
export const login_by_wx_api = "/api/oauth/loginByWx";

// user模块
export const userInfo_get_api = "/api/user/getUserInfo";

// 产品模块
export const product_get_by_id_api = "/api/product/getProductById";

// 菜单模块
export const menu_get_api = "/api/menu/getMenu";

// rsa加密公钥
export const rsa_public_key_api = "/api/rsa/getPublicKey";

// 其他
export const sendCode_api = "/api/sendCode";

// 文件上传
export const upload_get_params_api = "/api/getUploadParams";
```

## 对 axios 进行类型扩展

支持直接返回后台接口响应的数据

```ts
import 'axios'

declare module "axios" {
  export interface AxiosInstance {
    <T = any, R = AxiosResponse<T>, D = any>(
      config: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    <T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    request<T = any, R = AxiosResponse<T>, D = any>(
      config: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    get<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    delete<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    head<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    options<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    post<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    put<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    patch<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    postForm<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    putForm<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
    patchForm<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R["data"]>;
  }
}
```

## 对 axios 进行封装

```ts
import axios from "axios";
import config from "@/config";
import { tokenLocalforage } from "@/storage/localforage";
import i18n from "@/i18n";

export interface IResponse<T> {
  data: T;
  errCode: number;
  errMsg: string;
}

axiosInstance.interceptors.request.use(
  async (config) => {
    // 从本地存储获取token
    const token = await tokenLocalforage.get();
    // 如果有 写入 headers.Authorization
    if (token) config.headers.Authorization = `Bearer ${token}`;
    // 希望服务器返回的数据语言类型
    // 结合i18n
    config.headers["Accept-Language"] = i18n.global.locale.value;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    // 使用方直接获取后台接口返回的数据
    return response.data;
  },
  async (error) => {
    // 401 未登录
    if (error.response.status === 401) {
      // 清除 token
      // 重置 store
      // 其他清理工作
      // ...
      // 跳转登录页
    } else {
      // 进行错误提示
      // ...
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

## 使用

```ts
import http, { type IResponse } from "@/http";
import { isLogin_api } from "@/http/api";

export const isLoginServe = () => http.get<IResponse<boolean>>(isLogin_api);
```
