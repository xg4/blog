# git

> [廖雪峰 git 教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

## other

- [github emoji](./emoji.md)

- [commit message](./msg.md)

## context

- [local config](#local-config)

- [init](#init)

- [status](#status)

- [reset HEAD](#reset)

- [checkout file](#checkout)

- [remove](#remove)

- [branch](#branch)

- [stash(bug branch)](#stash)

- [github](#github)

- [remote repo](#remote-repo)

- [clone](#clone)

- [tag](#tag)

- [ignore](#ignore)

- [alias](#alias)

## local config

```bash
$ git config --global user.name "xg4"
$ git config --global user.email xingor4@gmail.com
```

## init

1. `$ git init` : 初始化 git 仓库

2. `$ git add <filename>` : 添加文件到暂存区  
   `$ git add .` : . 表示整个目录

3. `$ git commit -m "commit msg"` : 提交文件到仓库

## status

- `$ git status` : 查看工作区的状态。

- `$ git diff` : 查看修改内容。差异比较

## reset

- `$ git log` : 显示从最近到最远的提交日志。

  - **英文状态下按 Q，退出 log**

- `$ git log --pretty=oneline`：显示简要版的提交日志。

- `$ git reset --hard HEAD^` : 返回上一个版本，`HEAD`表示当前版本，`HEAD^^`表示上上个版本,也可以用类似于`HEAD~3`来表示要回退到哪一个版本。

- `$ git reset --hard 3628164` : 后面的数字是版本号，此方法可以随意跳转。

- `$ git push -f`：强制推送到远程分支

  - 注意：本地分支回滚后，版本将落后远程分支，必须使用强制推送覆盖远程分支，否则无法推送到远程分支

- `$ git reflog`：记录所有的操作,可以通过此查询版本号。

## checkout

- **场景 1：** 当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`$ git checkout -- file`。

- **场景 2：** 当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`$ git reset HEAD file`，就回到了场景 1，第二步按场景 1 操作。

- **场景 3：** 已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

> `$ git checkout` 其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

## remove

- 删除文件的两种方法：

  - 直接从本地删除

  - 使用 `$ rm test.txt`

- 删除之后会出现两种情况：

  - 从版本库恢复：`$ git checkout -- test.txt`

  - 从版本库也删除：`$ git rm test.txt` 然后 `$ git commit`

## branch

- 查看分支：`$ git branch`

- 创建分支：`$ git branch <name>`

- 切换分支：`$ git checkout <name>`

- 创建+切换分支：`$ git checkout -b <name>`相当于以下两步:

  - `$ git branch dev`

  - `$ git checkout dev`

- 合并某分支到当前分支：`$ git merge <name>`

- 删除分支：`$ git branch -d <name>`

- 当在两个分支上对同一个文件进行修改时，如果合并这两个分支就会产生冲突，这时候需要手动修改。
  `$ git log --graph --pretty=oneline --abbrev-commit`
  用`$ git log --graph`命令可以看到分支合并图。

- 当要删除一个没被合并的分支时，系统会提醒，如果要删除需要强制删除，需要执行命令： `$ git branch -D <name>`

## stash

- `$ git stash` 功能：可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作。

- 然后从 master 上面创建新的分支，修复 bug 合并

- `$ git stash list` :用于查看被储藏起来的那部分项目。

- 恢复被储藏项目的两种方法：

  - 用 `$ git stash apply` 恢复，但是恢复后，stash 内容并不删除，你需要用 `$ git stash drop` 来删除。

  - 用 `$ git stash pop` ，恢复的同时把 stash 内容也删了。

- 你可以多次 stash，恢复的时候，先用`git stash list`查看，然后恢复指定的 stash，用命令：`$ git stash apply stash@{0}`

## github

```bash
$ ssh-keygen -t rsa -C "xingor4@gmail.com"
```

- 用户主目录下找到.ssh 目录，id_rsa 和 id_rsa.pub 两个文件。

- id_rsa 是私钥，不能泄露出去，id_rsa.pub 是公钥，可以放心地告诉任何人。

- GitHub “Add SSH Key” 粘贴 id_rsa.pub 文件的内容。

> **检验是否连接上 GitHub `$ ssh git@github.com`**

## remote repo

- 添加远程库

  1. 关联远程库，使用命令`$ git remote add origin git@server-name:path/repo-name.git`。

  2. 关联后，使用命令`$ git push -u origin master`第一次推送 master 分支的所有内容。(第一次要用-u,以后不需要)

  3. 此后，每次本地提交后，只要有必要，就可以使用命令`$ git push origin master`推送最新修改。

- 查看远程库信息，使用 `$ git remote -v`；

- 在本地创建和远程分支对应的分支，使用 `git checkout -b branch-name origin/branch-name` ，本地和远程分支的名称最好一致；

1. 从本地推送分支，使用 `$ git push origin branch-name`，如果推送失败，先用 `$ git pull` 试图合并；

2. 如果合并有冲突，则解决冲突，并在本地提交；

3. 没有冲突或者解决掉冲突后，再用 `git push origin branch-name` 推送就能成功！

**如果`git pull`提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令 `git branch --set-upstream branch-name origin/branch-name` 。**

## clone

- 克隆一个远程库：`$ git clone git@github.com:servername/gitskills.git`

  - GitHub 给出的地址不止一个，Git 支持多种协议，默认的 git://使用 ssh，但也可以使用 https 等其他协议。

  - 使用 https 除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放 http 端口的公司内部就无法使用 ssh 协议而只能用 https。

## tag

> Git 的标签就像是版本库的快照，实质上它就是指向某个 commit 的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。  
> 作用在于将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。

- `$ git tag <name>`：创建一个新标签。

  - 命令`$ git tag <name>`用于新建一个标签，默认为 HEAD，也可以指定一个 commit id；

- `$ git tag`：查看所有标签

- 标签不是按时间顺序列出，而是按字母排序的。可以用 `$ git show <tagname>` 查看标签信息

- 还可以创建带有说明的标签，用 `-a` 指定标签名， `-m` 指定说明文字：

  - `$ git tag -a <tagname> -m "blablabla..."`可以指定标签信息；

- 还可以通过 `-s` 用私钥签名一个标签

  - `$ git tag -s <tagname> -m "blablabla..."`可以用 PGP 签名标签；

- 命令`$ git push origin <tagname>`可以推送一个本地标签

- 命令`$ git push origin --tags`可以推送全部未推送过的本地标签；

- 命令`$ git tag -d <tagname>`可以删除一个本地标签；

- 命令`$ git push origin :refs/tags/<tagname>`可以删除一个远程标签。

## ignore

- 有些时候，你想添加一个文件到 Git，但发现添加不了，原因是这个文件被.gitignore 忽略了：

- 如果你确实想添加该文件，可以用`-f`强制添加到 Git：

`$ git add -f <name>`

- 或者你发现，可能是.gitignore 写得有问题，需要找出来到底哪个规则写错了，可以用`$ git check-ignore`命令检查：

```bash
$ git check-ignore -v App.class
.gitignore:3:*.class    App.class
```

## alias

```bash
$ git config --global alias.st status
$ git config --global alias.ck checkout
$ git config --global alias.cm commit
$ git config --global alias.br branch
```

- 配置一个`$ git last`，让其显示最后一次提交信息：

```bash
$ git config --global alias.last 'log -1'
```
