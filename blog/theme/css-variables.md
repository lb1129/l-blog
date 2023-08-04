# 使用 css variables 实现主题色运行时切换

实现任意颜色的主题色

[css variables 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

## 声明变量

全局

```css
:root {
  --primary-color: #1890ff;
}
```

## 使用变量

```css
h1 {
  color: var(--primary-color);
}
```

## 切换变量值

```js
document.documentElement.style.setProperty("--primary-color", "#52c41a");
```

## 兼容性

[https://caniuse.com/css-variables](https://caniuse.com/css-variables)
