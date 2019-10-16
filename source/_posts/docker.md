---
title: Docker
date: 2019-03-12 10:55:27
tags:
  - docker
  - devops
---

> [Docker 入门教程 - 阮一峰](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)

- [install](#install)
  - [ubuntu](#ubuntu)
  - [更新/卸载](#%e6%9b%b4%e6%96%b0%e5%8d%b8%e8%bd%bd)
  - [添加到用户组（可选项）](#%e6%b7%bb%e5%8a%a0%e5%88%b0%e7%94%a8%e6%88%b7%e7%bb%84%e5%8f%af%e9%80%89%e9%a1%b9)
  - [仓库镜像地址](#%e4%bb%93%e5%ba%93%e9%95%9c%e5%83%8f%e5%9c%b0%e5%9d%80)
  - [docker-compose](#docker-compose)
- [login / logout](#login--logout)
- [image](#image)
  - [images](#images)
  - [pull](#pull)
  - [search](#search)
  - [build](#build)
  - [rmi](#rmi)
  - [tag](#tag)
  - [push](#push)
  - [save](#save)
  - [load](#load)
  - [import](#import)
  - [history](#history)
- [container](#container)
  - [ps](#ps)
  - [run/create](#runcreate)
  - [start/stop/restart](#startstoprestart)
  - [kill](#kill)
  - [rm](#rm)
  - [exec](#exec)
  - [pause/unpause](#pauseunpause)
  - [logs](#logs)
  - [inspect](#inspect)
  - [port](#port)
  - [export](#export)
  - [cp](#cp)
  - [commit](#commit)
  - [diff](#diff)

## install

### ubuntu

```bash
# 更新包
$ sudo apt update

# 安装https支持包
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common

# 添加Docker官方GPG key
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 添加stable版的repository
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# 更新apt
$ sudo apt update

# 安装最新的Docker CE
$ sudo apt install docker-ce

$ sudo systemctl status docker
```

### 更新/卸载

```bash
# 跟新
$ sudo apt upgrade

# 卸载Docker
$ sudo apt-get purge docker-ce
# 删除images、containers和volumes
$ sudo rm -rf /var/lib/docker
```

### 添加到用户组（可选项）

```bash
sudo groupadd docker
sudo usermod -aG docker $USER

sudo service docker restart
```

### 仓库镜像地址

```bash
--registry-mirror=https://jxus37ad.mirror.aliyuncs.com

sudo systemctl daemon-reload
sudo systemctl restart docker
```

### docker-compose

```bash
# download
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# permissions
sudo chmod +x /usr/local/bin/docker-compose

# check
docker-compose --version
```

## login / logout

> 登录/登出一个 Docker 镜像仓库，如果为指定镜像仓库地址，默认为官方仓库 Docker Hub

```bash
$ docker login [OPTIONS] [SERVER]

$ docker logout [OPTIONS] [SERVER]
```

- OPTIONS :

  - `-u` : 登录的用户名

  - `-p` : 登录的密码

- example

  ```bash
  $ docker login -u xg4 -p xg4

  $ docker logout
  ```

## image

> Docker 官方提供的 `image` 文件，都在 `library` 组里，所以是默认组，可以省略。`library/hello-world` 为官方 `image` 仓库，可以省略 `library`

### images

> 查看本地镜像

```bash
$ docker images [OPTIONS] [REPOSITORY[:TAG]]
# or
$ docker image ls
```

- OPTIONS :

  - `-a` : 列出本地所有的镜像（含中间映像层，默认情况下，过滤掉中间映像层）

  - `--digests` : 显示镜像的摘要信息

  - `-f` : 显示满足条件的镜像

  - `--format` : 指定返回值的模板文件

  - `--no-trunc` : 显示完整的镜像信息

  - `-q` : 只显示镜像 ID

- example

  ```bash
  $ docker images

  $ docker images ubuntu
  ```

### pull

> 从镜像仓库中拉取或者更新指定镜像

```bash
$ docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

- OPTIONS :

  - `-a` : 拉取所有 tagged 镜像

  - `--disable-content-trust` : 忽略镜像的校验,默认开启

- example

  ```bash
  # 下载最新镜像
  $ docker pull ubuntu

  # 下载 repository 为 ubuntu 的所有镜像
  $ docker pull -a ubuntu
  ```

### search

> Docker Hub 中查找镜像

```bash
$ docker search [OPTIONS] imageName
```

- OPTIONS :

  - `--automated` : 只列出 automated build 类型的镜像

  - `--no-trunc` : 显示完整的镜像描述

  - `-s` : 列出收藏数不小于指定值的镜像

- 显示的信息 :

  - NAME : 镜像仓库源的名称

  - DESCRIPTION : 镜像的描述

  - OFFICIAL : 是否 docker 官方发布

### build

> 使用 Dockerfile 创建镜像

```bash
$ docker build [OPTIONS] PATH | URL | -
```

- OPTIONS :

  - `--build-arg=[]` : 设置镜像创建时的变量

  - `--cpu-shares` : 设置 cpu 使用权重

  - `--cpu-period` : 限制 CPU CFS 周期

  - `--cpu-quota` : 限制 CPU CFS 配额

  - `--cpuset-cpus` : 指定使用的 CPU id

  - `--cpuset-mems` : 指定使用的内存 id

  - `--disable-content-trust` : 忽略校验，默认开启

  - `-f` : 指定要使用的 Dockerfile 路径

  - `--force-rm` : 设置镜像过程中删除中间容器

  - `--isolation` : 使用容器隔离技术

  - `--label=[]` : 设置镜像使用的元数据

  - `-m` : 设置内存最大值

  - `--memory-swap` : 设置 Swap 的最大值为内存+swap，"-1"表示不限 swap

  - `--no-cache` : 创建镜像的过程不使用缓存

  - `--pull` : 尝试去更新镜像的新版本

  - `--quiet, -q` : 安静模式，成功后只输出镜像 ID

  - `--rm` : 设置镜像成功后删除中间容器

  - `--shm-size` : 设置/dev/shm 的大小，默认值是 64M

  - `--ulimit` : Ulimit 配置

  - `--tag, -t` : 指定要创建镜像的名字及标签，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个标签，标签默认为 `latest`

  - `--network` : 默认 default。在构建期间设置 RUN 指令的网络模式

- example

  ```bash
  $ docker build -t <name> .
  # or 指定 image tag
  $ docker build -t <name>:<tag> .
  ```

  - `.` : `Dockerfile` 文件所在的路径，可以指定 `Dockerfile` 的绝对路径

### rmi

> 删除本地一个或多个镜像

```bash
$ docker rmi [OPTIONS] IMAGE [IMAGE...]
# or
$ docker image rm [OPTIONS] IMAGE [IMAGE...]

# 删除本地所有镜像
$ docker rmi $(docker images -q)
```

- OPTIONS :

  - `-f` : 强制删除

  - `--no-prune` : 不移除该镜像的过程镜像，默认移除

- example

  ```bash
  $ docker rmi -f ubuntu
  ```

### tag

> 标记本地镜像，将其归入某一仓库

```bash
$ docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]
```

- example

  ```bash
  $ docker tag ubuntu:12.0 xg4/ubuntu:v2
  ```

### push

> 将本地的镜像上传到镜像仓库，要先登录到镜像仓库

```bash
$ docker push [OPTIONS] [USERNAME/]NAME[:TAG]
```

- OPTIONS :

  - `--disable-content-trust` : 忽略镜像的校验，默认开启

- example

  ```bash
  $ docker push xg4/ubuntu:v2
  ```

### save

> 将指定镜像保存成 tar 归档文件

```bash
$ docker save [OPTIONS] IMAGE [IMAGE...]
```

- OPTIONS :

  - `-o` : 输出到的文件

- example

  ```bash
  $ docker save -o my_ubuntu_v2.tar xg4/ubuntu:v2
  ```

### load

> 导入使用 docker save 命令导出的镜像

```bash
$ docker load [OPTIONS]
```

- OPTIONS :

  - `-i` : 指定导出的文件

  - `-q` : 精简输出信息

- example

  ```bash
  # 导入镜像
  $ docker load -i ubuntu.tar
  $ docker load < ubuntu.tar
  ```

### import

> 从归档文件 ( docker save ) 中创建镜像

```bash
$ docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
```

- OPTIONS :

  - `-c` : 应用 docker 指令创建镜像

  - `-m` : 提交时的说明文字

- example

  ```bash
  $ docker import my_ubuntu_v3.tar xg4/ubuntu:v4

  $ docker images xg4/ubuntu:v4
  ```

### history

> 查看指定镜像的创建历史

```bash
$ docker history [OPTIONS] IMAGE
```

- OPTIONS :

  - `-H` : 以可读的格式打印镜像大小和日期，默认为 true

  - `--no-trunc` : 显示完整的提交记录

  - `-q` : 仅列出提交记录 ID

- example

  ```bash
  $ docker history xg4/ubuntu:v3
  ```

## container

### ps

> 列出容器

```bash
$ docker ps [OPTIONS]
# or
$ docker container ls
```

- OPTIONS :

  - `-a` : 显示所有的容器，包括未运行的

  - `-f` : 根据条件过滤显示的内容

  - `--format` : 指定返回值的模板文件

  - `-l` : 显示最近创建的容器

  - `-n` : 列出最近创建的 n 个容器

  - `--no-trunc` : 不截断输出

  - `-q` : 静默模式，只显示容器编号

  - `-s` : 显示总的文件大小

- example

  ```bash
  # 查看正在运行的容器
  $ docker container ls
  # or
  $ docker ps

  # 查看全部
  $ docker container ls -a
  # or
  $ docker ps -a
  ```

### run/create

> [docker run - docs](https://docs.docker.com/engine/reference/commandline/run/)  
> run: 创建一个新的容器并运行一个命令。本地不存在镜像时，会先从远程仓库拉取，完成之后启动  
> create: 创建一个新的容器但不启动它，用法同 `docker run`

```bash
$ docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

- OPTIONS :

  - `-a stdin` : 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项

  - `-d` : 后台运行容器，并返回容器 ID

  - `-i` : 以交互模式运行容器，通常与 -t 同时使用

  - `-p` : 端口映射，格式为：**主机(宿主)端口:容器端口**

  - `-t` : 为容器重新分配一个伪输入终端，通常与 -i 同时使用

  - `--name="nginx-lb"` : 为容器指定一个名称

  - `--dns 8.8.8.8` : 指定容器使用的 DNS 服务器，默认和宿主一致

  - `--dns-search example.com` : 指定容器 DNS 搜索域名，默认和宿主一致

  - `-h "mars"` : 指定容器的 hostname

  - `-e username="ritchie"` : 设置环境变量

  - `--env-file=[]` : 从指定文件读入环境变量

  - `--cpuset="0-2" or --cpuset="0,1,2"` : 绑定容器到指定 CPU 运行

  - `-m` : 设置容器使用内存最大值

  - `--net="bridge"` : 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型

  - `--link=[]` : 添加链接到另一个容器

  - `--expose=[]` : 开放一个端口或一组端口

  - `--rm` : 退出时自动删除容器

  - `--volume , -v` : 卷映射，格式为：**主机(宿主)卷:容器卷**

- example

  ```bash
  # 使用镜像 ubuntu:latest，不指定 image:tag 时，默认为 latest
  $ docker run ubuntu

  # 后台模式启动一个容器，并将容器命名为 myUbuntu
  $ docker run --name myUbuntu -d ubuntu:latest

  # 以交互模式启动一个容器,在容器内执行/bin/bash命令，容器的 Shell 映射到当前的 Shell
  $ docker run -it ubuntu /bin/bash

  # 容器的 3000 端口映射到本机的 8000 端口
  $ docker run -p 8000:3000 ubuntu

  # 绑定容器的 8080 端口，并将其映射到本地主机 127.0.0.1 的 80 端口上
  $ docker run -p 127.0.0.1:80:8080/tcp ubuntu bash

  # 主机的目录 /data 映射到容器的 /data
  $ docker run -v /data:/data ubuntu
  ```

### start/stop/restart

> start: 启动一个或多个已经被停止的容器  
> stop: 停止一个运行中的容器  
> restart: 重启容器

```bash
$ docker start [OPTIONS] CONTAINER [CONTAINER...]

$ docker stop [OPTIONS] CONTAINER [CONTAINER...]

# 停止全部容器
$ docker stop $(docker ps -aq)

$ docker restart [OPTIONS] CONTAINER [CONTAINER...]
```

- example

  ```bash
  # 启动已被停止的容器
  $ docker start a2erd232d

  # 停止运行中的容器 myUbuntu
  $ docker stop myUbuntu

  # 重启容器
  $ docker restart a2erd232d
  ```

### kill

> 杀掉一个运行中的容器。依然会占据硬盘空间

```bash
$ docker kill [OPTIONS] CONTAINER [CONTAINER...]

# 杀掉全部容器
$ docker kill $(docker ps -aq)
```

- OPTIONS :

  - `-s` : 向容器发送一个信号

- example

  ```bash
  $ docker kill -s KILL_YOU myUbuntu
  ```

**`kill` 会立即结束，`stop` 进行收尾清理工作，再结束**

### rm

> 删除一个或多少容器

```bash
$ docker rm [OPTIONS] CONTAINER [CONTAINER...]

# 删除全部容器
$ docker rm $(docker ps -aq)
```

- OPTIONS :

  - `-f` : 通过 SIGKILL 信号强制删除一个运行中的容器

  - `-l` : 移除容器间的网络连接，而非容器本身

  - `-v` : -v 删除与容器关联的卷

- example

  ```bash
  # 强制删除容器db01、db02
  $ docker rm -f db01 db02

  # 移除容器nginx01对容器db01的连接，连接名db
  $ docker rm -l db

  # 删除容器nginx01,并删除容器挂载的数据卷
  $ docker rm -v nginx01
  ```

### exec

> 在运行的容器中执行命令

```bash
$ docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

- OPTIONS :

  - `-d` : 分离模式: 在后台运行

  - `-i` : 即使没有附加也保持 STDIN 打开

  - `-t` : 分配一个伪终端

- example

  ```bash
  # 在容器 9df70f 中以交互模式执行容器内 /root/shell.sh 脚本
  $ docker exec -it 9df70f /bin/sh /root/shell.sh

  # 在容器 myUbuntu 中开启一个交互模式的终端
  $ docker exec -it myUbuntu /bin/bash
  ```

### pause/unpause

> pause : 暂停容器中所有的进程  
> unpause : 恢复容器中所有的进程

```bash
$ docker pause [OPTIONS] CONTAINER [CONTAINER...]
$ docker unpause [OPTIONS] CONTAINER [CONTAINER...]
```

- example

  ```bash
  # 暂停数据库容器 db01 提供服务
  $ docker pause db01

  # 恢复数据库容器 db01 提供服务
  $ docker unpause db01
  ```

### logs

> 获取容器的日志

```bash
$ docker logs [OPTIONS] CONTAINER
```

- OPTIONS :

  - `-f` : 跟踪日志输出

  - `--since` : 显示某个开始时间的所有日志

  - `-t` : 显示时间戳

  - `--tail` : 仅列出最新 N 条容器日志

- example

  ```bash
  # 跟踪查看容器 myUbuntu 的日志输出
  $ docker logs -f myUbuntu

  # 查看容器 myUbuntu 从2019年4月1日后的最新10条日志
  $ docker logs --since="2019-04-01" --tail=10 myUbuntu
  ```

### inspect

> 获取容器/镜像的元数据

```bash
$ docker inspect [OPTIONS] NAME|ID [NAME|ID...]
```

- OPTIONS :

  - `-f` : 指定返回值的模板文件

  - `-s` : 显示总的文件大小

  - `--type` : 为指定类型返回 JSON

- example

  ```bash
  # 获取镜像 ubuntu:latest 的元信息
  $ docker inspect ubuntu:latest
  [
    {
        "Id": "sha256:ae9a045f866bbc2553087f6e42bfc16074a74f"
  ...

  # 获取正在运行的容器 myUbuntu 的 IP
  $ docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' myUbuntu
  172.17.0.3
  ```

### port

> 列出指定的容器的端口映射，或者查找将 PRIVATE_PORT NAT 到面向公众的端口

```bash
$ docker port [OPTIONS] CONTAINER [PRIVATE_PORT[/PROTO]]
```

- example

  ```bash
  $ docker port myUbuntu
  3000/tcp -> 0.0.0.0:3000
  ```

### export

> 将文件系统作为一个 tar 归档文件导出到 STDOUT

```bash
$ docker export [OPTIONS] CONTAINER
```

- OPTIONS :

  - `-o` : 将输入内容写到文件

- example

  ```bash
  # 将 id 为 66bbc25530 的容器按日期保存为 tar 文件
  $ docker export -o logs-`date +%Y%m%d`.tar 66bbc25530
  $ ls logs-`date +%Y%m%d`.tar
  logs-20190411.tar
  ```

### cp

> 用于容器与主机之间的数据拷贝

```bash
$ docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-

$ docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH
```

- OPTIONS :

  - `-L` : 保持源目标中的链接

- example

  ```bash
  # 将主机 ~/Desktop/data 目录拷贝到容器 2ae6iu3w 的 /data 目录下
  $ docker cp ~/Desktop/data 2ae6iu3w:/data/

  # 将主机 ~/Desktop/data 目录拷贝到容器 2ae6iu3w 中，目录重命名为 data
  $ docker cp ~/Desktop/data 2ae6iu3w:/data

  # 将容器 2ae6iu3w 的 /data 目录拷贝到主机的当前目录中
  $ docker cp  96f7f14e99ab:/data .
  ```

### commit

> 从容器创建一个新的镜像

```bash
$ docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```

- OPTIONS :

  - `-a` : 提交的镜像作者

  - `-c` : 使用 Dockerfile 指令来创建镜像

  - `-m` : 提交时的说明文字

  - `-p` : 在 commit 时，将容器暂停

- example

  ```bash
  $ docker run -it ubuntu /bin/bash
  # in container
  $ root@e18edb10161:/# apt update
  $ root@e18edb10161:/# exit

  # 将容器 e18edb10161 保存为新的镜像，添加提交人信息和说明信息，指定目标镜像的名字和版本号为 ubuntu:v2
  $ docker commit -m='update' -a='xg4' e18edb10161 ubuntu:v2
  $ sha256:70bf1840fd7c0d2d8ef0a42a817eb29f854c1af8f7c59fc03ac7bdee9545aff8
  ```

### diff

> 检查容器里文件结构的更改

```bash
$ docker diff [OPTIONS] CONTAINER
```

- example

  ```bash
  $ docker diff myUbuntu
  A /logs
  A /xg4
  A /var/www/index.html
  C /tmp
  ```
