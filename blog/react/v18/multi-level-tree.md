# 多层级树

## jsx 递归

函数组件

```tsx
import React, { useCallback } from "react";

interface Item {
  id: string;
  name: string;
  children?: Item[];
}

type Props = {
  source: Item[];
};

export default function FCDemo(props: Props) {
  const loop = useCallback(
    (list: Item[]) => (
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
            {item.children && item.children.length ? loop(item.children) : null}
          </li>
        ))}
      </ul>
    ),
    []
  );

  return props.source ? loop(props.source) : null;
}
```

类组件

```tsx
import React, { Component } from "react";

interface Item {
  id: string;
  name: string;
  children?: Item[];
}

type Props = {
  source: Item[];
};

export default class ClassDemo extends Component<Props> {
  loop = (list: Item[]) => (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <div>{item.name}</div>
          {item.children && item.children.length
            ? this.loop(item.children)
            : null}
        </li>
      ))}
    </ul>
  );

  render() {
    const { source } = this.props;
    return source ? this.loop(source) : null;
  }
}
```
