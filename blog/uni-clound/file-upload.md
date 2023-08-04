# 附件上传

外部系统可使用 http 进行附件上传

## 创建 getUploadParams 云函数

```js
"use strict";
const { success, fail } = require("response-common");
const axios = require("axios-common");
const crypto = require("crypto-common");

const sign = function (e, t) {
  let n = "";
  Object.keys(e)
    .sort()
    .forEach(function (t) {
      e[t] && (n = n + "&" + t + "=" + e[t]);
    });
  n = n.slice(1);
  return n;
};

// uniCloud 的 web控制台 总览查看 spaceId clientSecret
const spaceId = "";
const clientSecret = "";

exports.main = async (event = {}, context) => {
  const { ext } = event;

  try {
    const data1 = {
      method: "serverless.auth.user.anonymousAuthorize",
      params: "{}",
      spaceId,
      timestamp: Date.now(),
    };
    const res1 = await axios.post("https://api.next.bspapp.com/client", data1, {
      headers: {
        "x-serverless-sign": crypto
          .HmacMD5(sign(data1, clientSecret), clientSecret)
          .toString(),
      },
    });

    const data2 = {
      method: "serverless.file.resource.generateProximalSign",
      params: JSON.stringify({
        env: "public",
        filename: `${Date.now()}${ext}`,
      }),
      spaceId,
      timestamp: Date.now(),
      token: res1.data.data.accessToken,
    };
    const res2 = await axios.post("https://api.next.bspapp.com/client", data2, {
      headers: {
        "x-basement-token": res1.data.data.accessToken,
        "x-serverless-sign": crypto
          .HmacMD5(sign(data2, clientSecret), clientSecret)
          .toString(),
      },
    });

    const callback = crypto.enc.Base64.stringify(
      crypto.enc.Utf8.parse(
        JSON.stringify({
          callbackUrl: res2.data.data.ossCallbackUrl,
          callbackBody: JSON.stringify({
            fileId: res2.data.data.id,
            spaceId,
          }),
          callbackBodyType: "application/json",
        })
      )
    );

    // headers: {
    // 	'X-OSS-server-side-encrpytion': 'AES256'
    // }

    return success({
      "Cache-Control": "max-age=2592000",
      "Content-Disposition": "attachment",
      OSSAccessKeyId: res2.data.data.accessKeyId,
      Signature: res2.data.data.signature,
      host: res2.data.data.host,
      id: res2.data.data.id,
      key: res2.data.data.ossPath,
      policy: res2.data.data.policy,
      success_action_status: 200,
      "x-oss-security-token": res2.data.data.securityToken,
      callback,
    });
  } catch (e) {
    return fail("上传参数获取失败，请重试");
  }
};
```

## 外部系统 axios

```ts
import http, { type IResponse } from "@/http";
import { upload_get_params_api } from "@/http/api";
import config from "@/config";

interface Params {
  "Cache-Control": string;
  "Content-Disposition": string;
  OSSAccessKeyId: string;
  Signature: string;
  host: string;
  id: string;
  key: string;
  policy: string;
  success_action_status: number;
  "x-oss-security-token": string;
  callback: string;
}

export const uploadServe = async (
  file: File,
  onProgress?: (percent: number) => void
) => {
  const paramsRes = await http.get<IResponse<Params>>(upload_get_params_api, {
    params: {
      ext: file.name.slice(file.name.lastIndexOf(".")),
    },
  });
  const params = paramsRes.data;
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    const val = params[key as keyof Params];
    formData.append(key, val as string);
  });
  formData.append("file", file);
  // uploadURL 云存储上传域名 uniCloud 的 web控制台 总览查看
  await http.post<IResponse<string>>(config.http.uploadURL, formData, {
    onUploadProgress: (e) => {
      if (e.total) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onProgress && onProgress(percent);
      }
    },
  });
  // downloadURL 云存储下载域名 uniCloud 的 web控制台 总览查看
  return `${config.http.downloadURL}/${params.key}`;
};
```
