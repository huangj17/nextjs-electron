这是一个 [Next.js](https://nextjs.org) 和 [Electron Forge](https://www.electronforge.io/) 项目，可以同时运行 Web 和桌面应用程序，也可以分开单独打包发布。

支持 Next.js 和 Electron Forge 单独升级到最新版本。

## 入门

首先，运行开发服务器：

```bash
#install 安装依赖包
npm install

# or
yarn
```

```bash
# run nextjs
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

# run nextjs build
npm run build
# or
yarn build
```

```bash
# run electron
yarn start:e

# run electron package
yarn package

# run electron make
yarn make

# run nextjs build and electron package and electron make
yarn publish
```

使用浏览器打开 [http://localhost:3000](http://localhost:3000) 查看结果。

您可以通过修改 `app/page.tsx` 开始编辑页面。页面会在您编辑文件时自动更新。

该项目使用 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 自动优化和加载 [Geist](https://vercel.com/font)，这是 Vercel 的新字体系列。

## 了解更多

要了解有关 Next.js 的更多信息，请查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 功能和 API。
- [学习 Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程。

您可以查看 [Next.js GitHub 存储库](https://github.com/vercel/next.js) - 欢迎您的反馈和贡献！
