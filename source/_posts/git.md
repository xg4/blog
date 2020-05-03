---
title: Git
date: 2018-08-13 22:42:20
tags: git
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [ssh](#ssh)
- [config](#config)
  - [alias](#alias)
  - [log](#log)
- [initial](#initial)
- [diff](#diff)
- [branch](#branch)
- [tag](#tag)
- [reset](#reset)
  - [checkout](#checkout)
- [stash](#stash)
- [clone](#clone)
- [push](#push)
- [remote](#remote)
- [ignore](#ignore)
- [remove](#remove)
- [submodule](#submodule)
  - [添加子模块](#%e6%b7%bb%e5%8a%a0%e5%ad%90%e6%a8%a1%e5%9d%97)
  - [查看子模块](#%e6%9f%a5%e7%9c%8b%e5%ad%90%e6%a8%a1%e5%9d%97)
  - [更新子模块](#%e6%9b%b4%e6%96%b0%e5%ad%90%e6%a8%a1%e5%9d%97)
  - [克隆项目及子模块](#%e5%85%8b%e9%9a%86%e9%a1%b9%e7%9b%ae%e5%8f%8a%e5%ad%90%e6%a8%a1%e5%9d%97)
  - [修改子模块](#%e4%bf%ae%e6%94%b9%e5%ad%90%e6%a8%a1%e5%9d%97)
  - [删除子模块](#%e5%88%a0%e9%99%a4%e5%ad%90%e6%a8%a1%e5%9d%97)

## ssh

```bash
ssh-keygen -t rsa -C "xingor4@gmail.com"
```

- 用户主目录下找到 `.ssh` 目录 (`~/.ssh`)，id_rsa 和 id_rsa.pub 两个文件

- id_rsa 是私钥，不能泄露出去，id_rsa.pub 是公钥，可以放心地告诉任何人

- GitHub “Add SSH Key” 粘贴 id_rsa.pub 文件的内容

- **检验是否连接上 GitHub `$ ssh git@github.com`**

## config

```bash
# 查看配置列表

git config -l

git config --global user.name "xg4"
git config --global user.email "xingor4@gmail.com"
```

### alias

```bash
git config --global alias.st status

git config --global alias.ck checkout

git config --global alias.cm commit

git config --global alias.br branch
```

### log

```bash
# 查看完整历史提交记录
git log

# 显示最后一次提交信息
git config --global alias.last 'log -1'

# format log
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# 列出提交者贡献数量
git shortlog -sn

# 查看分支合并图
git log --graph
```

## initial

- `git init` : 初始化 git 仓库

- `git add <filename>` : 添加文件到暂存区

- `git add .` : 递归添加整个目录到暂存区

- `git commit -m 'msg'` : 提交暂存区内容到仓库

- `git commit -v` : 提交显示 diff 变化

- `git status` : 查看工作区的状态

- `git diff` : 查看修改内容，比较差异

## diff

```bash
# 查看所有文件改动
git diff

# 查看具体文件的改动
git diff ./filename

# 查看某个版本的改动
git diff d68a1ef2

# 查看某个文件的历史修改记录
git log ./filename
git show d68a1ef2 ./filename
```

## branch

- `git branch -a` : 查看所有分支

- `git branch` : 查看本地分支

- `git branch -r` : 查看远程分支

- `git branch <name>` : 创建分支

- `git branch --orphan` : 创建空分支

- `git checkout <name>` : 切换分支

- `git checkout -` : 切换到上一分支

- `git branch -m <name>` : 重命名当前分支

- 创建并切换分支

  ```bash
  git checkout -b <name>
  # ===
  git branch <name>
  git checkout <name>
  ```

- `git merge <name>` : 合并 <name> 分支到当前分支

- `git merge <name> <target>` : 合并 <name> 分支到 <target> 分支

- 删除分支：

  `$ git branch -d <name>` : 被删除的分支没有合并时，需强制删除

  `$ git branch -D <name>` : 强制删除

  ```bash
  # 删除远程分支
  git branch -d -r origin/<name>
  git push origin :<name>
  ```

## tag

> Git 的标签就像是版本库的快照，实质上它就是指向某个 commit 的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。
> 作用在于将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。

- `$ git tag <tag_name>` : 创建一个新标签

  - 标签默认为 HEAD，也可以指定一个 commit id

- `$ git tag` : 查看本地所有标签

- `$ git ls-remote --tags origin` : 查看远程所有标签

- `$ git show <tag_name>` 查看标签详细信息

- `$ git tag -a <tag_name> <commit_id>` : 新增 tag 对应某个 commit

- `$ git tag -a <tag_name> -m 'msg'` : 指定标签信息，`-a` 指定标签名， `-m` 指定说明文字

- `$ git tag -s <tag_name> -m 'msg'` : 用 PGP 签名标签，`-s` 用私钥签名一个标签

- `$ git push origin <tag_name>` : 推送一个本地标签

- `$ git push origin --tags` : 推送全部未推送过的本地标签

- `$ git tag -d <tag_name>` : 删除一个本地标签

- `$ git push origin --delete <tag_name>` : 删除远程标签

- 推送分支和标签

  ```bash
  $ git push && git push --tags
  # ===
  $ git push --follow-tags
  ```

## reset

- `$ git log` : 显示从最近到最远的提交日志

  - **按 Q, 退出 log**

- `$ git log --pretty=oneline` : 显示简要版的提交日志

- `$ git reset --hard HEAD^` : 回滚上一个版本，`HEAD`表示当前版本，`HEAD^^` 表示上上个版本，也可以用类似于 `HEAD~3` 来表示要回退到哪一个版本，`--hard` 撤销 commit，并且把修改同时撤销

- `$ git reset --hard e6d8ce4` : 后面的数字是`commit id`，此方法可以随意跳转

- `$ git push -f` : 强制推送到远程分支

  - 注意：本地分支回滚后，版本将落后远程分支，必须使用强制推送覆盖远程分支，否则无法推送到远程分支

- `$ git reflog` : 记录所有操作，可以通过此查询版本号

### checkout

> `$ git checkout -- .` : 将当前版本库中的内容替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”

- `$ git checkout -- ./filename` : 丢弃工作区中的修改，恢复某个文件到当前版本库中的状态

- `$ git reset HEAD ./filename` : 将已经添加到暂存区的文件撤销

## stash

- `$ git stash` : 将当前工作区修改文件“储藏”起来，然后创建新的分支，修复 bug 合并，等 BUG 修复之后恢复现场继续工作

- `$ git stash list` : 查看被储藏起来的项目

- 恢复被储藏项目的两种方法：

  - `$ git stash apply` : 恢复后，stash 内容并不删除，需要用 `$ git stash drop` 来删除

  - `$ git stash pop` : 恢复的同时把 stash 内容也删除

- 可以多次 stash，恢复的时候，先用 `git stash list` 查看，然后恢复指定的 stash，用命令：`$ git stash apply stash@{0}`

## clone

- `git clone <url>` : 拉取远程仓库

  - 支持 git:// (ssh), <https://> 等协议

- `git clone <url> --depth=1` : 仓库太大，拉取最近的一个 revision
  - `git clone -b dev <url>` : 克隆某个分支
  - `git clone --recursive <url>` : 递归克隆，如果有 `submodule` 一并克隆
  - `git fetch --unshallow` : 继续拉取历史版本

## push

- `git push` : 远程已有 remote_branch 分支，并且已经关联本地分支 local_branch

- `git push -u origin/remote_branch` : 远程已有 remote_branch 分支但未关联本地分支 local_branch

- `git push origin local_branch:remote_branch` : 远程没有 remote_branch 分支，并且没有关联本地分支 local_branch

- `git push --follow-tags` : 和 `tag` 一起提交

## remote

- `$ git remote add origin <url>` : 关联远程仓库（第一次推送 加参数 `-u`）

- `$ git remote -v` : 查看远程库信息

- `git checkout -b branch-name origin/branch-name` : 拉取远程仓库分支

  ```bash
  # 拉取，不进行合并
  git fetch origin master

  git pull
  # ===
  git fetch && git merge

  git pull origin remove_branch:local_branch
  ```

- 推送到远程分支

  1. `$ git push origin branch-name`，如果推送失败，先用 `$ git pull` 拉取并合并

  2. 如果合并有冲突，则解决冲突，并在本地提交

  3. 没有冲突或者解决掉冲突后，再用 `git push origin branch-name` 推送就能成功！

**如果 `git pull` 提示 "no tracking information" , 则说明本地分支和远程分支的链接关系没有创建，用命令 `git branch --set-upstream branch-name origin/branch-name`**

## ignore

- `$ git add -f <name>` : `-f` 将 `.gitignore` 文件强制添加到仓库

- `$ git check-ignore` : 检查文件是否符合 `.gitignore` 规则

  ```bash
  $ git check-ignore -v node_modules
  .gitignore:40:node_modules/     node_modules
  ```

## remove

- `$ rm file` : 删除文件

- `$ git add file` : 将删除文件添加到暂存区

- `$ git rm file` : 删除文件，并添加到暂存区

```bash
$ rm file
$ git add file
# ===
$ git rm file
```

## submodule

**子模块的操作默认都是 master 分支**

- 更换子模块分支

```bash
git config -f .gitmodules submodule.<submodule name>.branch dev
git submodule update --remote
```

`.gitmodules` 加了 `-f` 参数，修改提交后对所有用户有效

### 添加子模块

```bash
git submodule add <git repo> themes/next
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
  git submodule update
  ```

- 更新子模块为远程仓库的最新版本

  ```bash
  git submodule update --remote
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
   git clone https://github.com/xg4/blog --recursive
   ```

### 修改子模块

在子模块中修改文件后，直接提交到远程仓库

```bash
git add .
git commit -m 'update'
git push origin HEAD:master
```

### 删除子模块

1. 删除子模块文件夹

   ```bash
   $ git rm --cached theme/next
   # 不带 --cached 参数直接删除文件
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
   rm -rf .git/modules/theme/next
   ```
