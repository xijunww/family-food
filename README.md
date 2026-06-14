<!--
╔══════════════════════════════════════════════════════════════════════╗
║  DreamSeed 种梦计划 — AI创造者大赛  官方 README 模板                ║
║                                                                      ║
║  使用说明：                                                          ║
║  1. 将本模板放在参赛仓库根目录 README.md 的顶部                       ║
║  2. 头图使用 DreamField 官方公开活动图片地址                         ║
║  3. 请保留 DREAMFIELD_README_HEADER_START / END 标识                 ║
║  4. 分割线以下供创作者自由编写项目内容                               ║
╚══════════════════════════════════════════════════════════════════════╝
-->

<!-- DREAMFIELD_README_HEADER_START -->

<p align="center">
  <a href="https://www.dreamfield.top">
    <img src="https://www.dreamfield.top/dream-field/contest-readme/assets/dreamseed-readme-banner.png" alt="DreamSeed 种梦计划参赛作品" width="100%" />
  </a>
</p>

<!-- DREAMFIELD_README_HEADER_END -->

# 萌萌家厨 · 家庭点菜小程序

家人们一起点菜的小工具：注册账号、加菜进购物车、提交订单，厨房端（家长）一目了然今天要做几道菜。

## 在线访问

部署在 GitHub Pages（国内访问无需梯子）：

**https://xijunww.github.io/family-food/**

> 首次访问可能需要清浏览器缓存（特别是之前访问过 dev 版本的），
> 然后按提示注册一个账号就能用了。

## 本地开发

```bash
cd family-food-web
npm install
npm run dev          # http://localhost:5173
```

手机/平板通过局域网访问：`npm run dev` 启动后，用 `http://本机IP:5173` 打开（vite.config.js 已开启 HMR/allowedHosts）。

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建 `family-food-web/dist/` 并发布到 Pages。

首次需要手动开启一次：

1. 仓库 **Settings → Pages**
2. **Source** 选 **GitHub Actions**
3. 等第一次 workflow 跑完就能访问了

## 技术栈

- React 19 + Vite 8
- Tailwind CSS 3
- React Router 7（HashRouter 模式，兼容 Pages 子路径）
- Zustand 5（全局状态）
- localStorage 模拟后端（玩具级，多人各自独立）

## 数据说明

数据全部存在浏览器 localStorage，每个设备/浏览器独立。
要"家人们一起用"，就在同一个浏览器登录不同账号切换；或者各自点自己的菜，最后汇总到一处。
