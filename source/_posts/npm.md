---
title: npm
date: 2019-04-02 20:18:04
tags:
---

## Initial

```bash
$ npm config set init.author.name xg4
$ npm config set init.author.email xingor4@gmail.com
$ npm config set init.license MIT
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

prepatch：预备次版本

prerelease：预发布版本
```

若需要指定 commit 的信息，可以使用 -m 命令

```bash
npm version patch -m "build: release v%s"  # %s 会自动替换成版本号

# (tag: v0.0.1) build: release v0.0.1
```

**需要注意的是，使用 `npm version <newVersion>` 命令，需要当前工作区为 clean 状态，否则会执行失败**
