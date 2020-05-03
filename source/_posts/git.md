---
title: Git
date: 2018-08-13 22:42:20
tags: git
---

## ssh-keygen

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 默认目录 公钥
cat ~/.ssh/id_rsa.pub
```

- [GitHub](https://github.com) `Add SSH Key` 粘贴 `id_rsa.pub` 文件的内容

- **检验是否连接上 GitHub `ssh git@github.com`**

## 配置 - config

```bash
# 查看配置列表
git config -l

git config --global user.name "your_name"
git config --global user.email "your_email@example.com"
```

## 别名 - alias

```bash
git config --global alias.st status

git config --global alias.ck checkout

git config --global alias.cm commit

git config --global alias.br branch
```

## 克隆 - clone

```bash
# 拉取远程仓库，支持 git:// (ssh), <https://> 等协议
git clone <url>

# 仓库太大，拉取最近的一个 revision
git clone <url> --depth=1

# 克隆某个分支
git clone -b dev <url>

# 递归克隆，如果有 `submodule` 一并克隆
git clone --recursive <url>

# 继续拉取历史版本
git fetch --unshallow
```

## 初始化 - initial

```bash
# 初始化 git 仓库
git init

# 添加文件到暂存区
git add <filename>

# 递归添加整个目录到暂存区
git add .

# 提交暂存区内容到仓库
git commit -m 'commit msg'

# 提交显示 diff 变化
git commit -v

# 查看工作区的状态
git status
```

## 远程 - remote

```bash
# 关联远程仓库
git remote add origin <url>

# 查看远程库信息
git remote -v

# 拉取远程仓库分支
git checkout -b branch-name origin/branch-name

# 拉取，不进行合并
git fetch origin master

# 等效于 git fetch && git merge
git pull
git pull origin remove_branch:local_branch
```

## 推送 - push

```bash
# 远程已有 remote_branch 分支，并且已经关联本地分支 local_branch
git push

# 强制推送到远程分支
git push -f

# 远程已有 remote_branch 分支但未关联本地分支 local_branch， -u 首次推送
git push -u origin/remote_branch

# 远程没有 remote_branch 分支，并且没有关联本地分支 local_branch
git push origin local_branch:remote_branch
```

### 推送到远程分支

1. `git push origin branch-name`，如果推送失败，先用 `git pull` 拉取并合并

2. 如果合并有冲突，则解决冲突，并在本地提交

3. 没有冲突或者解决掉冲突后，再用 `git push origin branch-name` 推送就能成功！

**如果 `git pull` 提示 "no tracking information" , 则说明本地分支和远程分支的链接关系没有创建，用命令 `git branch --set-upstream branch-name origin/branch-name`**

## 日志 - log

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

# 显示简要版的提交日志
git log --pretty=oneline
```

## 比较 - diff

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

## 分支 - branch

```bash
# 查看所有分支
git branch -a

# 查看本地分支
git branch

# 查看远程分支
git branch -r

# 创建分支
git branch <name>

# 创建空分支
git branch --orphan

# 切换分支
git checkout <name>

# 切换到上一分支
git checkout -

# 重命名当前分支
git branch -m <name>

# 创建并切换分支
git checkout -b <name>

# 合并 <name> 分支到当前分支
git merge <name>

# 合并 <name> 分支到 <target> 分支
git merge <name> <target>

# 删除分支
git branch -d <name>

# 强制删除
git branch -D <name>


# 删除远程分支
git branch -d -r origin/<name>
git push origin :<name>
```

## 标签 - tag

> 标签就像是版本库的快照，实质上它就是指向某个 commit 的指针

```bash
# 创建一个新标签，标签默认为 HEAD，也可以指定一个 commit id
git tag <tag_name>
git tag <tag_name> <commit_id>

# 查看本地所有标签
git tag

# 查看远程所有标签
git ls-remote --tags origin

# 查看标签详细信息
git show <tag_name>

# 指定标签信息，`-a` 指定标签名， `-m` 指定说明文字
git tag -a <tag_name> -m 'msg'

# 用 PGP 签名标签，`-s` 用私钥签名一个标签
git tag -s <tag_name> -m 'msg'

# 推送一个本地标签
git push origin <tag_name>

# 推送全部未推送过的本地标签
git push origin --tags

# 删除一个本地标签
git tag -d <tag_name>

# 删除远程标签
git push origin --delete <tag_name>

# 推送分支和标签，等效于 git push && git push --tags
git push --follow-tags
```

## 回滚 - reset

```bash
# 回滚上一个版本，`HEAD`表示当前版本，`HEAD^^` 表示上上个版本，也可以用类似于 `HEAD~3` 来表示要回退到哪一个版本，`--hard` 撤销 commit，并且把修改同时撤销
git reset --hard HEAD^


# 回滚到指定 commit
git reset --hard e6d8ce4

# 回滚之后不会显示在 log，可以通过此查询回滚的版本号，（记录所有操作）
git reflog
```

## 恢复 - checkout

```bash
# 将当前版本库中的内容替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”
git checkout -- .

# 将已经添加到暂存区的文件撤销
git reset HEAD ./filename

# 丢弃工作区中的修改，恢复某个文件到当前版本库中的状态
git checkout -- ./filename
```

## 暂存 - stash

```bash
# 将当前工作区修改文件“储藏”起来
git stash

# 查看被储藏起来的项目
git stash list

# 恢复被储藏项目
git stash apply
# 删除 stash 内容
git stash drop

# 恢复的同时把 stash 内容也删除
git stash pop

# 恢复指定的 stash
git stash apply stash@{0}
```

## 忽略 - ignore

```bash
# -f 将 .gitignore 文件强制添加到仓库
git add -f <name>

# 检查文件是否符合 `.gitignore` 规则
git check-ignore

git check-ignore -v node_modules
.gitignore:40:node_modules/     node_modules
```

## 删除 - remove

```bash
# 删除文件，并添加到暂存区，等效于 rm file && git add file
git rm file
```

## 子模块 - submodule

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
