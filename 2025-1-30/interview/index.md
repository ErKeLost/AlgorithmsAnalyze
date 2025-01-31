# 八股文

## 性能优化

### 图片懒加载原理

1. 监听滚动事件

```ts
<img src="placeholder.png" data-src="real.png" class="lazy-img" />;

function lazyLoad() {
  const lazyImgs = document.querySelectorAll(".lazy-img");
  lazyImgs.forEach((img) => {
    if (img.getBoundingClientRect().top < window.innerHeight) {
      img.src = img.dataset.src;
      img.classList.remove("lazy-img");
    }
  });
}
```

2. intersection Observer

```ts
// HTML
<img data-src="real-image.jpg" src="placeholder.jpg" class="lazy">

// JavaScript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // 当图片进入可视区域
        if (entry.isIntersecting) {
            const img = entry.target;
            // 替换src
            img.src = img.dataset.src;
            // 取消观察
            observer.unobserve(img);
        }
    });
});

// 观察所有懒加载图片
document.querySelectorAll('img.lazy').forEach(img => {
    observer.observe(img);
});
```

```ts
// 移除 lazy 类的主要目的是标记该图片已经完成加载
// 这样可以避免重复处理同一张图片

// 例如：
const img = document.querySelector("img");
if (img.classList.contains("lazy-img")) {
  // 说明图片还未加载
  loadImage(img);
} else {
  // 说明图片已经加载过了，不需要再处理
  return;
}
```
