# Thangka Shop - 唐卡艺术电商网站

基于 Next.js 14 + Tailwind CSS 构建，模仿 thethangka.com 风格

## 项目结构

```
thangka-shop/
├── src/
│   ├── app/
│   │   ├── globals.css      # 全局样式
│   │   ├── layout.tsx       # 根布局
│   │   └── page.tsx         # 首页
│   └── components/
│       ├── Header.tsx       # 导航头部
│       ├── Hero.tsx         # 首屏横幅
│       ├── FeaturedProducts.tsx  # 精选产品
│       ├── Collections.tsx   # 系列分类
│       └── Footer.tsx       # 页脚
├── public/
│   └── images/              # 产品图片
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 本地开发

```bash
npm install
npm run dev -- -p 54352
```

访问 `http://localhost:54352/`

## 开发/发布双配置说明

- 开发环境（`next dev`）使用默认 `.next`，避免 `dist/server/middleware-manifest.json` 缺失问题。
- 发布环境（`next build`）输出到 `dist`，并启用静态导出（`output: 'export'`）。
- `next.config.js` 已按 phase 自动切换，无需手动改配置。

## 稳定性防护（Dev Watchdog）

- `npm run dev -- -p 54352` 会启动 `scripts/dev-watchdog.js`
- watchdog 会做健康检查，dev 进程异常退出或连续健康检查失败会自动重启
- `dev:raw` 保留原始开发命令（仅在需要排查时手动使用）
- 快速自检：`npm run doctor:dev -- -p 54352`（检查端口服务是否可访问）

## 部署到 Vercel

```bash
npm run build:vercel
```

- 项目已提供 `vercel.json`（含 `buildCommand`、`trailingSlash`、`cleanUrls`）。
- 构建后静态资源位于 `dist/`，可直接用于部署。

## 特点

- 深色禅意风格设计
- 响应式布局
- 购物车功能
- 产品分类展示
- 模仿 thethangka.com 布局

## 自定义

编辑 `src/components/` 中的组件文件即可自定义内容和样式。
