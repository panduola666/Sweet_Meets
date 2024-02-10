# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## [六角學院] 2023 Vue3 直播班 - 相遇甜點(SweetMeets) 

安裝:
```bash
npm install
```

## 啟動
Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production
Build the application for production:
```bash
npm run build
```

Locally preview production build:
```bash
# npm
npm run preview 
```

## 掉坑紀錄
### Cannot read properties of null (reading 'insertBefore')
解決: 因為 v-for 的東西是計算屬性, 他在一開始的時候會是 null, 這樣就導致了後面渲染失敗引發的問題

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
