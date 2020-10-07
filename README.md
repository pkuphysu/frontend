# pkuphy-frontend

```bash
# Project setup
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

# Lints and fixes files
npm run lint

# Release new version
npm version v1.0.0
```

## 开发注意

### 设置连接的后端

以 `.env` 为例，空就是默认的非常愚蠢的虚假的后端，用 express 编写，用于调 UI

可以新建 `.env.local`，这个文件会被 git 忽略。`VUE_APP_API_ROOT=http://localhost:<port>` 就可以对接的本地开发服务器，也可填入其他 URL

### Auto Import

本项目配置了类 Vuetify 的自动 import, 可以做到 tree-shaking. 但是只能自动 import component，如需使用 directive 仍需手动导入。

## 注意事项

### 以 ESLint 为准！

不使用 VSCode 的 Vetur，也不以 Prettier 为标准！使用其他格式化工具务必再 ESLint 纠正新引入的错误！

### 一些 Warning

是无法避免的\~

比如说缺少`jQuery`，是因为这里只使用了`Bootstrap`的 CSS
