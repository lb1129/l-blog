# keep-alive

| 模块名称   | 官方维护 | 支持路由组件 | 支持普通组件 |
| ---------- | -------- | ------------ | ------------ |
| 自定义组件 | 否       | 是           | 是           |

## 实现

原理：把需要缓存的组件用 keep-alive 组件包裹，keep-alive 组件把 children 发送到上层 AliveScope 组件中渲染，AliveScope 渲染完成后把真实 DOM 节点返回给 keep-alive 组件，keep-alive 组件利用 DOM 操作将 children DOM 插回原位

其他关键点：

1. 使用 react 的依赖注入
2. 模拟并保持目标元素会影响子级布局的样式
3. keep-alive 组件缓存新组件前或卸载前需将上一次的真实 DOM 还原给 AliveScope，来保证来自 React 的 DOM 操作正常执行

```ts
import React, { Component, createContext, type HTMLAttributes } from "react";

interface CacheValueType {
  wrap: HTMLElement | null;
  node: HTMLElement | null;
}

type KeepFnType = (
  id: string,
  children: React.ReactNode,
  target: HTMLElement | null
) => Promise<CacheValueType>;

const KeepAliveContext = createContext<{
  keep: KeepFnType;
  deleteCache: (id: string) => void;
}>({
  keep: () =>
    Promise.resolve({
      wrap: null,
      node: null,
    }),
  deleteCache: () => {},
});

export class AliveScope extends Component<{
  children: React.ReactNode;
}> {
  cache: Record<string, CacheValueType> = {};
  state: Record<
    string,
    { id: string; children: React.ReactNode; target: HTMLElement | null }
  > = {};

  // keep
  keep: KeepFnType = (id, children, target) =>
    new Promise<CacheValueType>((resolve) =>
      this.setState(
        {
          [id]: { id, children, target },
        },
        () => {
          // node创建完成后 将wrap隐藏 防止对布局造成影响
          const wrap = this.cache[id].wrap;
          if (wrap) wrap.style.display = "none";
          // 返回缓存的wrap node
          resolve(this.cache[id]);
        }
      )
    );

  // 删除缓存
  deleteCache = (id: string) => {
    delete this.cache[id];
    delete this.state[id];
    this.forceUpdate();
  };

  render() {
    return (
      <KeepAliveContext.Provider
        value={{ keep: this.keep, deleteCache: this.deleteCache }}
      >
        {this.props.children}
        {Object.values(this.state).map(({ id, children, target }) => {
          // 保持目标元素会影响子级布局的样式
          let style: HTMLAttributes<HTMLDivElement>["style"] = {};
          if (target) {
            style.width = target.style.width;
            style.height = target.style.height;
            style.display = target.style.display;
            style.position = target.style
              .position as React.CSSProperties["position"];
          }
          if (!this.cache[id])
            this.cache[id] = {
              wrap: null,
              node: null,
            };
          return (
            <div
              style={style}
              key={id}
              ref={(wrap) => {
                if (this.cache[id]) this.cache[id].wrap = wrap;
              }}
            >
              <div
                style={style}
                ref={(node) => {
                  if (this.cache[id]) this.cache[id].node = node;
                }}
              >
                {children}
              </div>
            </div>
          );
        })}
      </KeepAliveContext.Provider>
    );
  }
}

interface KeepAliveProps {
  id: string;
  include?: string[];
  children: React.ReactNode;
}

class KeepAlive extends Component<KeepAliveProps> {
  context!: React.ContextType<typeof KeepAliveContext>;

  // 真实节点（Provider创建）
  node: HTMLElement | null = null;
  // 真实节点的容器（Provider创建）
  wrap: HTMLElement | null = null;
  // 占位节点
  placeholder: HTMLElement | null = null;

  inject = async () => {
    const { keep } = this.context;
    const { id, children } = this.props;
    if (id) {
      const { wrap, node } = await keep(id, children, this.placeholder);
      if (node) {
        this.placeholder!.appendChild(node);
        this.node = node;
        this.wrap = wrap;
      }
    }
  };

  resetDom() {
    // 给Provider还原dom 确保react dom 卸载正常执行
    if (this.wrap && this.node) this.wrap.appendChild(this.node);
  }

  cacheHandler(id: string, include?: string[]) {
    // 如果无需缓存 则清除缓存
    const { deleteCache } = this.context;
    let needCache: boolean;
    if (!include) needCache = true;
    else if (include.includes(id)) needCache = true;
    else needCache = false;
    if (!needCache) {
      deleteCache(id);
    }
  }

  componentWillUnmount() {
    this.resetDom();
    this.cacheHandler(this.props.id, this.props.include);
  }

  componentDidUpdate(prevProps: Readonly<KeepAliveProps>): void {
    if (prevProps.id !== this.props.id) {
      this.resetDom();
      this.cacheHandler(prevProps.id, this.props.include);
      this.inject();
    }
  }

  componentDidMount() {
    this.inject();
  }

  render() {
    return (
      <div
        style={{ height: "100%" }}
        ref={(placeholder) => {
          this.placeholder = placeholder;
        }}
      />
    );
  }
}

KeepAlive.contextType = KeepAliveContext;

export default KeepAlive;
```

## 路由组件上使用

```tsx
import React, { useState, useEffect } from "react";
import { useOutlet, useMatches } from "react-router-dom";
import KeepAlive, { AliveScope } from "@/components/KeepAlive";

export default function FCDome() {
  const [currentRouteId, setCurrentRouteId] = useState("");
  const [keepAliveInclude, setKeepAliveInclude] = useState<string[]>([]);
  const currentOutlet = useOutlet();
  const matches = useMatches();

  useEffect(() => {
    const route = matches[matches.length - 1];
    // 根据业务需要 通过id缓存该路由组件
    setKeepAliveInclude([route.id]);
    setCurrentRouteId(route.id);
  }, [matches]);

  return (
    <AliveScope>
      <KeepAlive include={keepAliveInclude} id={currentRouteId}>
        {currentOutlet}
      </KeepAlive>
    </AliveScope>
  );
}
```

## 普通组件上使用

```tsx
import React, { useState } from "react";
import KeepAlive, { AliveScope } from "@/components/KeepAlive";

export default function FCDemo() {
  const [id, setId] = useState("first");

  return (
    <AliveScope>
      <button
        onClick={() => {
          setId((oldValue) => (oldValue === "first" ? "last" : "first"));
        }}
      >
        toggle
      </button>
      <KeepAlive id={id}>
        {id === "first" ? <input key='first' /> : <input key='last' />}
      </KeepAlive>
    </AliveScope>
  );
}
```

## 其他说明

`AliveScope` 组件下可以放多个 `KeepAlive` 组件  
`KeepAlive` 组件必须传入 id，id 与组件相关联

关注 react18 官方 [Offscreen](https://react.dev/blog/2022/06/15/react-labs-what-we-have-been-working-on-june-2022#offscreen)
