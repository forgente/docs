# Gitea Docusaurus ![badge](https://gitea.com/gitea/gitea-docusaurus/actions/workflows/build-and-publish.yaml/badge.svg)

## How to build

```shell
make clean
make prepare-docs
make build
```

## Development

```shell
make clean
make prepare-docs
make serve
```

## Test en version

```
npm run start
```

## Test zh-cn version

```
npm run start -- --locale zh-cn
```

## Translate presets for zh-cn version

```
npx docusaurus write-translations --locale zh-cn
```

## Test both zh-cn and en versions

```
npm run build
npm run serve
```

## Use CSR Api 

This is for development, api pages will be CSR so this saves building time

```
npm run start-CSRApi
npm run build-CSRApi
```
