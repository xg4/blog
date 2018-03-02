# git

> [廖雪峰git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

- <a href="#local">本地设置</a>

- <a href="#ssh">连接GitHub</a>

- <a href="#addRemote">添加远程库</a>

- <a href="#clone">从远程库中克隆</a>

- <a href="#init">初始化</a>

- <a href="#modify">修改内容</a>

- <a href="#reset">版本回退</a>

- <a href="#back">撤销修改</a>

- <a href="#delete">删除文件</a>

- <a href="#branch">分支管理</a>

- <a href="#stash">BUG分支</a>

- <a href="#remote">远程仓库</a>

- <a href="#tag">tag</a>

- <a href="#command">命令行</a>

- <a href="#ignore">忽略特殊文件</a>

- <a href="#alias">配置别名</a>

<p id="local"></p>

## # 本地配置

```git
$ git config --global user.name "xg4"
$ git config --global user.email xingor4@gmail.com
```

<p id="ssh"></p>

## # 连接GitHub

```git
$ ssh-keygen -t rsa -C "xingor4@gmail.com"
```

- 用户主目录下找到.ssh目录，id_rsa和id_rsa.pub两个文件。

- id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

- GitHub “Add SSH Key” 粘贴id_rsa.pub文件的内容。

> **检验是否连接上GitHub `$ ssh git@github.com`**

<p id="addRemote"></p>

## # 添加远程库

1. 关联远程库，使用命令`$ git remote add origin git@server-name:path/repo-name.git`。
2. 关联后，使用命令`$ git push -u origin master`第一次推送master分支的所有内容。(第一次要用-u,以后不需要)
3. 此后，每次本地提交后，只要有必要，就可以使用命令`$ git push origin master`推送最新修改。


<p id="clone"></p>

## # 从远程库中克隆

- 克隆一个远程库：`$ git clone git@github.com:servername/gitskills.git`

    - GitHub给出的地址不止一个，Git支持多种协议，默认的git://使用ssh，但也可以使用https等其他协议。

    - 使用https除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用ssh协议而只能用https。


<p id="init"></p>

## # 初始化

`$ git init` : 初始化git仓库

`$ git add <filename>` : 添加文件到暂存区
或 `$ git add .` ：. 表示整个目录

`$ git commit -m "commit msg"` : 提交文件到仓库

<p id="modify"></p>

## # 修改内容
- `$ git status`：查看工作区的状态。

- `$ git diff`：查看修改内容。差异比较

<p id="reset"></p>

## # 版本回退

- `$ git log`：显示从最近到最远的提交日志。

**英文状态下按Q,退出log**

- `$ git log --pretty=oneline`：显示简要版的提交日志。

- `$ git reset --hard HEAD^` : 返回上一个版本，`HEAD`表示当前版本，`HEAD^^`表示上上个版本,也可以用类似于`HEAD~3`来表示要回退到哪一个版本。

- `$ git reset --hard 3628164` : 后面的数字是版本号，此方法可以随意跳转。

- `$ git reflog`：记录所有的操作,可以通过此查询版本号。

<p id="back"></p>

## # 撤销修改

- **场景1：** 当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`$ git checkout -- file`。

- **场景2：** 当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`$ git reset HEAD file`，就回到了场景1，第二步按场景1操作。

- **场景3：** 已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

> `$ git checkout` 其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

<p id="delete"></p>

## # 删除文件

- 删除文件的两种方法：
    - 直接从本地删除
    - 使用 `$ rm test.txt`

- 删除之后会出现两种情况：
    - 从版本库恢复：`$ git checkout -- test.txt`
    - 从版本库也删除：`$ git rm test.txt` 然后 `$ git commit`

<p id="branch"></p>

## # 分支管理

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

<p id="stash"></p>

## # stash(BUG分支)

- `$ git stash` 功能：可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作。

- 然后从master上面创建新的分支，修复bug合并

- `$ git stash list` :用于查看被储藏起来的那部分项目。

- 恢复被储藏项目的两种方法：

    - 用 `$ git stash apply` 恢复，但是恢复后，stash内容并不删除，你需要用 `$ git stash drop` 来删除。

    - 用 `$ git stash pop` ，恢复的同时把stash内容也删了。

- 你可以多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash，用命令：`$ git stash apply stash@{0}`

<p id="remote"></p>

## # remote

- 查看远程库信息，使用 `$ git remote -v`；

- 在本地创建和远程分支对应的分支，使用 `git checkout -b branch-name origin/branch-name` ，本地和远程分支的名称最好一致；

1. 从本地推送分支，使用 `$ git push origin branch-name`，如果推送失败，先用 `$ git pull` 试图合并；

2. 如果合并有冲突，则解决冲突，并在本地提交；

3. 没有冲突或者解决掉冲突后，再用 `git push origin branch-name` 推送就能成功！

**如果`git pull`提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令 `git branch --set-upstream branch-name origin/branch-name` 。**

<p id="tag"></p>

## # tag

> Git的标签就像是版本库的快照，实质上它就是指向某个commit的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。  
作用在于将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。

- `$ git tag <name>`：创建一个新标签。
    - 命令`$ git tag <name>`用于新建一个标签，默认为HEAD，也可以指定一个commit id；

- `$ git tag`：查看所有标签

- 标签不是按时间顺序列出，而是按字母排序的。可以用 `$ git show <tagname>` 查看标签信息

- 还可以创建带有说明的标签，用 `-a` 指定标签名， `-m` 指定说明文字：

    - `$ git tag -a <tagname> -m "blablabla..."`可以指定标签信息；

- 还可以通过 `-s` 用私钥签名一个标签

    - `$ git tag -s <tagname> -m "blablabla..."`可以用PGP签名标签；

- 命令`$ git push origin <tagname>`可以推送一个本地标签

- 命令`$ git push origin --tags`可以推送全部未推送过的本地标签；

- 命令`$ git tag -d <tagname>`可以删除一个本地标签；

- 命令`$ git push origin :refs/tags/<tagname>`可以删除一个远程标签。

<p id="ignore"></p>

## # ignore

- 有些时候，你想添加一个文件到Git，但发现添加不了，原因是这个文件被.gitignore忽略了：

- 如果你确实想添加该文件，可以用`-f`强制添加到Git：

`$ git add -f <name>`

- 或者你发现，可能是.gitignore写得有问题，需要找出来到底哪个规则写错了，可以用`$ git check-ignore`命令检查：

```
$ git check-ignore -v App.class
.gitignore:3:*.class    App.class
```

<p id="alias"></p>

## # 配置别名

```
$ git config --global alias.st status
$ git config --global alias.ck checkout
$ git config --global alias.cm commit
$ git config --global alias.br branch
```

- 配置一个`$ git last`，让其显示最后一次提交信息：

```
$ git config --global alias.last 'log -1'
```

<p id="command"></p>

## # 命令行

`$ cat <name>`：查看某个文件内容

`$ mkdir <name>` : 创建一个空目录

`$ pwd` : 显示当前目录的路径