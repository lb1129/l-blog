# 数据仓库

| 模块名称                                 | 官方维护 |
| ---------------------------------------- | -------- |
| redux@4 react-redux@8 @reduxjs/toolkit@1 | 否       |

## 定义 store state

```ts
import { createAction, createReducer } from "@reduxjs/toolkit";
import type { UserType } from "@/types/user";

export const setUserInfo = createAction<Partial<UserType>>("setUserInfo");

const initialState: UserType = {
  _id: "",
  username: "",
  nickname: "",
  phone: null,
  avatar: "",
  profile: "",
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserInfo, (state, action) => {
    return Object.assign({}, state, action.payload);
  });
});

export default reducer;
```

## 配置

index.ts

```ts
import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./userInfoSlice";

const store = configureStore({
  reducer: {
    userInfo,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

## 利用 context 提供服务

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

## 创建 hooks.ts

```ts
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "./index";

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 使用

函数组件

```tsx
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setUserInfo } from "@/store/userInfoSlice";

export default function FCDemo() {
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  return (
    <>
      <span>{userInfo.nickname}</span>
      <button
        onClick={() => {
          dispatch(setUserInfo({ nickname: "viho" }));
        }}
      >
        set nickname
      </button>
    </>
  );
}
```

类组件

```ts
import React, { Component } from "react";
import { connect, type ConnectedProps } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { setUserInfo } from "@/store/userInfoSlice";
import type { RootState } from "@/store";

const connector = connect(
  (state: RootState) => ({
    userInfo: state.userInfo,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        setUserInfo,
      },
      dispatch
    )
);

type Props = {} & ConnectedProps<typeof connector>;

class ClassDemo extends Component<Props> {
  render() {
    const { userInfo, setUserInfo } = this.props;
    return (
      <>
        <span>{userInfo.nickname}</span>
        <button
          onClick={() => {
            setUserInfo({ nickname: "viho" });
          }}
        >
          set nickname
        </button>
      </>
    );
  }
}

export default connector(ClassDemo);
```
