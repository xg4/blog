---
title: NPM
date: 2019-04-02 20:18:04
tags: npm
---

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [Initial](#Initial)
- [Publish](#Publish)
- [Release](#Release)

## Initial

```bash
$ npm config set init.author.name xg4
$ npm config set init.author.email xingor4@gmail.com
$ npm config set init.license MIT
```

## Publish

- 登录 npm 账号

  ```bash
  $ npm login
  # or
  $ npm adduser
  ```

- 配置淘宝镜像之后，无法进行 publish

  ```bash
  $ npm config set registry https://registry.npmjs.org
  ```

- private package 需要进行 scope 的设置

  ```bash
  $ npm config set scope <your_scope>
  ```

  scope 的包就成了@scope/xxx

- 发布公有的 scope 包

  ```bash
  $ npm publish --access=public
  ```

- 撤销发布

  ```bash
  $ npm unpublish --force
  ```

## Release

> 使用 `npm version <newVersion>` 命令变更版本信息，自动 `git tag`

```bash
$ npm version <newVersion>
# ===
# bump package.json version
$ git commit -am "msg"
$ git tag "version"
```

```bash
npm version [<newVersion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]

major：主版本号

minor：次版本号

patch：补丁号

premajor：预备主版本

preminor

prepatch：预备次版本

prerelease：预发布版本
```

若需要指定 commit 的信息，可以使用 -m 命令

```bash
npm version patch -m "build: release v%s"  # %s 会自动替换成版本号

# (tag: v0.0.1) build: release v0.0.1
```

**需要注意的是，使用 `npm version <newVersion>` 命令，需要当前工作区为 clean 状态，否则会执行失败**
