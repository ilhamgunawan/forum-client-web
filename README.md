# Pages

This is the list of endpoints, queries, and parameters that are used on each page.

## Auth - Sign In

- Route: `/auth/signin?redirect=`
- Queries
    - redirect (optional)
- Endpoints
    - POST `https://dummyjson.com/auth/login`
        - Body (JSON)
            - username (string, required)
            - password (string, required)

## Forum List

- Route: `/forums?page=&search=`
- Queries
    - page (optional, default = 1)
    - search (optional)
- Endpoints
    - GET `https://dummyjson.com/auth/posts?limit=&skip=`
    - GET `https://dummyjson.com/auth/posts/search?q=love?limit=&skip=`

## Forum Detail

- Route: `/forums/:id`
- Params
    - id (required)
- Endpoints
    - GET `https://dummyjson.com/auth/posts/:id`
    - GET `https://dummyjson.com/auth/posts/:id/comments`

## User Profile

- Route: `/users/:id`
- Params
    - id (required)
- Endpoints
    - GET `https://dummyjson.com/auth/users/:id`
    - GET `https://dummyjson.com/auth/users/:id/posts`

# vue-forum

This template should help get you started developing with Vue 3 in Vite.

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

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
