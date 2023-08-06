# 数据仓库

| 模块名称       | 官方维护 |
| -------------- | -------- |
| @ngrx/store@16 | 否       |

## 定义 store state

user-info/actions.ts

```ts
import { createActionGroup, props, emptyProps } from "@ngrx/store";
import type { UserType } from "@/app/types/user";

export const userInfoActions = createActionGroup({
  source: "UserInfo",
  events: {
    setUserInfo: props<{ payload: Partial<UserType> }>(),
    resetUserInfo: emptyProps(),
  },
});
```

user-info/reducer.ts

```ts
import { createReducer, on } from "@ngrx/store";
import { userInfoActions } from "./actions";
import type { UserType } from "@/app/types/user";

const initialState: UserType = {
  _id: "",
  username: "",
  nickname: "",
  phone: null,
  avatar: "",
  profile: "",
};

export default createReducer(
  initialState,
  on(userInfoActions.setUserInfo, (state, { payload }) => ({
    ...state,
    ...payload,
  })),
  on(userInfoActions.resetUserInfo, () => initialState)
);
```

user-info/selectors.ts

```ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import type { UserType } from "@/app/types/user";

const selectUserInfo = createFeatureSelector<UserType>("userInfo");

export const userInfoSelectors = {
  userInfo: selectUserInfo,
  nickname: createSelector(selectUserInfo, (userInfo) => {
    return userInfo.nickname;
  }),
  avatar: createSelector(selectUserInfo, (userInfo) => {
    return userInfo.avatar;
  }),
};
```

## 配置 reducer 出口

```ts
import userInfo from "./user-info/reducer";

// 所有reducer出口
export default {
  userInfo,
  // ...
};
```

## 在根模块配置

```ts
import { StoreModule } from "@ngrx/store";
import reducers from "@/app/stores/index";

imports: [StoreModule.forRoot(reducers)];
```

## 使用

```ts
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { userInfoSelectors } from "@/app/stores/user-info/selectors";
import { userInfoActions } from "@/app/stores/user-info/actions";

@Component({
  imports: [CommonModule],
  selector: "app-demo",
  templateUrl: `<span>{{ nickname | async }}</span>`,
  standalone: true,
})
export default class DemoComponent {
  nickname = this.store.select(userInfoSelectors.nickname);

  constructor(private store: Store) {
    this.store.select(userInfoSelectors.userInfo).subscribe((userInfo) => {
      // TODO
    });
  }

  setUserInfo() {
    this.store.dispatch(
      userInfoActions.setUserInfo({
        payload: {
          nickname: "viho",
        },
      })
    );
  }

  reset() {
    this.store.dispatch(userInfoActions.resetUserInfo());
  }
}
```
