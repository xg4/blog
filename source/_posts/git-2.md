---
title: Git 2
date: 2019-04-20 09:54:09
tags: git
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [submodule](#submodule)
  - [添加子模块](#%E6%B7%BB%E5%8A%A0%E5%AD%90%E6%A8%A1%E5%9D%97)
  - [查看子模块](#%E6%9F%A5%E7%9C%8B%E5%AD%90%E6%A8%A1%E5%9D%97)
  - [更新子模块](#%E6%9B%B4%E6%96%B0%E5%AD%90%E6%A8%A1%E5%9D%97)
  - [克隆项目及子模块](#%E5%85%8B%E9%9A%86%E9%A1%B9%E7%9B%AE%E5%8F%8A%E5%AD%90%E6%A8%A1%E5%9D%97)
  - [修改子模块](#%E4%BF%AE%E6%94%B9%E5%AD%90%E6%A8%A1%E5%9D%97)
  - [删除子模块](#%E5%88%A0%E9%99%A4%E5%AD%90%E6%A8%A1%E5%9D%97)
- [server](#server)
- [hooks](#hooks)

## submodule

### 添加子模块

```bash
$ git submodule add <git repo> themes/next
```

添加子模块之后运行 `git status`， 可以看到目录有增加一个文件 `.gitmodules`，用来保存子模块的信息

```bash
$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

    new file:   .gitmodules
    new file:   theme/next
```

### 查看子模块

```bash
$ git submodule
c2f33fc76b500770e266c1c16f028807967cd121 themes/next (v7.1.1-4-gc2f33fc)
```

### 更新子模块

- 更新子模块到最新版本

  ```bash
  $ git submodule update
  ```

- 更新子模块为远程仓库的最新版本

  ```bash
  $ git submodule update --remote
  ```

### 克隆项目及子模块

1. 先克隆仓库，再更新子模块

   ```bash
   # 克隆项目
   $ git clone https://github.com/xg4/blog
   # 查看子模块
   $ git submodule
   # 子模块前面 - ，说明子模块还未捡入
   -c2f33fc76b500770e266c1c16f028807967cd121
   # 初始化子模块，初始化模块只需在克隆父项目后运行一次
   $ git submodule init
   # 更新子模块
   $ git submodule update
   ```

2. 递归克隆整个项目

   ```bash
   $ git clone https://github.com/xg4/blog --recursive
   ```

### 修改子模块

在子模块中修改文件后，直接提交到远程仓库

```bash
$ git add .
$ git commit -m 'update'
$ git push origin HEAD:master
```

### 删除子模块

1. 删除子模块文件夹

   ```bash
   $ git rm --cached theme/next
   $ rm -rf theme/next
   ```

2. 删除 `.gitmodules` 文件中相关子模块信息

   ```bash
   [submodule "themes/next"]
   path = themes/next
   url = https://github.com/theme-next/hexo-theme-next
   ```

3. 删除 `.git/config` 中的相关子模块信息

   ```bash
   [submodule "themes/next"]
    active = true
    url = https://github.com/theme-next/hexo-theme-next
   ```

4. 删除 `.git` 文件夹中的相关子模块文件

   ```bash
   $ rm -rf .git/modules/theme/next
   ```

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
