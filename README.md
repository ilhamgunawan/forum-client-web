# Table of contents
- [Up And Running](#Up-And-Running)
    * [Project Setup](##Project-Setup)
    * [Using Docker](##Using-Docker)
- Pages
    * [Auth - Sign In](##Auth%20-%20Sign%20In)
    * [Forum Index](##Forum-Index)
    * [Forum Detail](##Forum-Detail)
    * [User Profile](##User-Profile)

# Up And Running

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

## Using Docker

Build docker image:
```sh
npm run docker:build:local
```

Run container:
```sh
npm run docker:serve
```

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

## Forum Index

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
