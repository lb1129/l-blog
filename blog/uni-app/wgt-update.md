# wgt 热更新

App 端 针对前端资源进行热更新 打开 App 如果有新的 wgt 版本 则弹窗提示更新 无需从应用商城更新

## 前端

### 创建 common/wgtUpdate.js

```js
import i18n from "@/locale/i18n.js";
import { wgtUpdateServe } from "@/serves/other.js";

const wgtUpdate = () => {
  plus.runtime.getProperty(plus.runtime.appid, async (widgetInfo) => {
    try {
      const wgtUpdateRes = await wgtUpdateServe(widgetInfo.version);
      const modalRes = await uni.showModal({
        //提醒用户更新
        title: i18n.global.t("tip"),
        content: i18n.global.t("haveNewVersion"),
      });
      if (modalRes.confirm) {
        const downloadResult = await uni.downloadFile({
          url: wgtUpdateRes.data,
        });
        if (downloadResult.statusCode === 200) {
          plus.runtime.install(
            downloadResult.tempFilePath,
            {
              force: false,
            },
            () => {
              plus.runtime.restart();
            },
            (e) => {
              uni.showToast({
                icon: "none",
                title: i18n.global.t("updateFailed"),
              });
            }
          );
        }
      }
    } catch (e) {}
  });
};

export default wgtUpdate;
```

### 使用 wgtUpdate.js

App.vue

```vue
<script>
// #ifdef APP-PLUS
import wgtUpdate from "@/common/wgtUpdate.js";
// #endif
export default {
  onLaunch() {
    // #ifdef APP-PLUS
    wgtUpdate();
    // #endif
  },
};
</script>
```

## 服务端

### 创建 wgtUpdate 云函数

index.js

```js
"use strict";
const { success, fail } = require("response-common");
const wgtInfo = require("./wgtInfo.json");
/**
 * wgt更新
 * @param {object} ops {version: string}
 * @returns {object} {errCode: number, errMsg: string, data: any}
 */
exports.main = async (event = {}, context) => {
  const { version } = event;
  if (wgtInfo.version !== version) {
    return success(wgtInfo.url);
  }
  return fail("已是最新版本");
};
```

### 创建 wgtInfo.json

```json
{
  "version": "1.0.0",
  "url": "https://云存储下载域名/xxx.wgt"
}
```

## 更新流程

1. 修改 manifest.json 中 versionName
2. 点击顶部发行 然后点击原生 App-制作应用 wgt 包
3. 将制作好的 wgt 包 在 uniCloud 的 web 控制台 云存储 下进行上传
4. 将 wgtUpdate 云函数目录内 wgtInfo.json version 值 修改为 versionName 值
