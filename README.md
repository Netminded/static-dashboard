# Static Dashboard App

This project uses Vue 3, Vite, Vue Router and Pinia for the local store, TypeScript and Firebase for authentication. 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```
Create a `.env` file in the root of the project directory. Add the following env variables with the values from the dashboard project Firebase config. These should be added as string values. 

```sh
VITE_FB_API_KEY=""
VITE_FB_AUTH_DOMAIN=""
VITE_FB_PROJECT_ID=""
VITE_FB_STORAGE_BUCKET=""
VITE_FB_MESSAGE_SENDER_ID=""
VITE_FB_APP_ID=""
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Check the Production Build Locally

```sh
npm run preview
```

### Build and Deploy
SSH should be configured on your GitHub account to deploy the dashboard to GitHub pages. The `dist` build directory will be deployed to the branch `gh-pages`. As SSH is used for deployment commits this can also be used for pushing commits to other branches too e.g `git push git@github.com:Netminded/static-dashboard.git main`. 

```sh
sh deploy.sh
```

or 

```sh
./deploy.sh
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
