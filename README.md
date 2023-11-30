# json-renderer

We've taken the iGuide dataset landing page and configured it so that it renders a single dataset.

Dataset rendered is [public/dataset.js](public/dataset.js). Note that this is a `.js` file. This file should export a default JS object named `dataset`.

To create the static bundle of files:
```
nvm use 14
npm install
npm run build
```
This will build everything into `dist/`. You can throw the contents of `dist/` into a bucket and if the bucket is made public, opening the `index.html` file should render the dataset in the browser (note this depends a bit on the bucket provider and base urls).

Alternatively, you can use the file protocol locally: just open `dist/index.html` in your browser.

The `dataset.js` file is NOT included in the [vue cli bundling](https://cli.vuejs.org/guide/html-and-static-assets.html#the-public-folder) intentionally, so that after building, one can modify the `dist/dataset.js` file and any edits will be rendered by the static bundle without rebuilding.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
