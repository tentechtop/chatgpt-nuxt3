# Nuxt3-Template-Project
基于Nuxt3的模板项目


## 环境
```
node版本 20.11.0
npm版本  10.2.4

github token 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
```


```bash
npm install 

打包环境
npm install cross-env --save-dev
npm run build:en
npm run build:zh

  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "build:en": "cross-env LANG_ENV=en nuxt build",
    "build:cn": "cross-env LANG_ENV=cn nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
```


## Development Server

Start the development server on `http://localhost:3000`

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
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

