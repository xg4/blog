---
title: Git 2
date: 2019-04-20 09:54:09
tags: git
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [commit message](#commit-message)
- [server](#server)
- [hooks](#hooks)

## commit message

```bash
type(scope?): subject  #scope is optional
```

- feat: 新功能

- fix: bug 修复

- docs: 文档修改

- style: 不影响代码的更改（如空格，格式，缺少分号等）

- refactor: 代码重构，既不修复错误也不添加功能

- perf: 代码更改可以提高性能

- test: 添加缺失或更正现有测试

- build: build 相关，npm scripts

- ci: CI 相关

- chore: 对构建过程或辅助工具和库（如文档生成）的更改

- revert: 版本回退

## server

1. 创建 git 用户，运行 git 服务

   ```bash
   # 添加git账户
   $ adduser git

   # 修改git的密码
   $ passwd git
   ```

2. 禁止 git 用户的 shell 登录

   > 出于安全考虑，创建的 git 用户不允许登录 shell，找到 `/etc/passwd`

   ```bash
   $ git:x:1000:1000::/home/git:/bin/bash
   # 改为
   $ git:x:1000:1000::/home/git:/usr/bin/git-shell
   ```

3. 免密登录

   ```bash
   $ mkdir /home/git/.ssh
   $ chmod 700 /home/git/.ssh
   $ touch /home/git/.ssh/authorized_keys
   $ chmod 600 /home/git/.ssh/authorized_keys

   # 如果使用 sudo 创建，需要将 owner 改为 git
   $ chown -R git:git /home/git/
   ```

   编辑 `/home/git/.ssh/authorized_keys` 将客户端公钥放入

4. 初始化 git 仓库

   ```bash
   $ mkdir /xg4
   $ chown git:git /xg4/
   $ cd /xg4

   # 创建空的git仓库
   $ git init --bare test.git
   Initialized empty Git repository in /xg4/test.git/

   # 将仓库所属用户改为git
   $ chown -R git:git test.git
   ```

## hooks

- client hooks: (commit hooks, email hooks, other hooks)

  - commit hooks

    - pre-commit

    - prepare-commit-msg

    - commit-msg

    - post-commit

  - email hooks

    - applypatch-msg

    - pre-applypatch

    - post-applypaych

  - other hooks:

    - pre-rebase

    - post-checkout

    - post-merge

- server hooks:

  - pre-receive

  - post-receive

  - update

1. 创建 git server 仓库

   ```bash
   $ cd /xg4
   $ git init --bare test.git
   ```

2. 创建工作目录 git 仓库

   ```bash
   $ cd /var/www
   $ git clone /xg4/test.git
   # or
   $ git init
   $ git remote add origin /xg4/test.git
   ```

3. 改变所属用户和用户组，获得权限

   ```bash
   $ chown -R git:git /xg4/test.git
   $ chown -R git:git /var/www/test
   ```

4. 设置 git hooks

   ```bash
   cd /xg4/test.git/hooks/
   vim post-receive
   ```

   post-receive 文件内容

   ```bash
   #!/bin/sh
   unset GIT_DIR
   cd /var/www/test
   git pull origin master
   ```

   ```bash
   # 赋予 post-receive 文件可执行权限
   $ chmod +x .git/hooks/post-receive
   ```
