This is a [Next.js](https://nextjs.org) and [Electron Forge](https://www.electronforge.io/) project that can run web and desktop applications at the same time, or be packaged and released separately.

Support separate upgrade to the latest version.

## Getting Started

First, run the development server:

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
