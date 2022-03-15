---
title: Git 与墙
date: '2018-10-05T05:42:11.000Z'
description: git clone, 14.00 KiB/s, 慢慢慢
---

> git clone 一直停留在 10KiB/s-20KiB/s 之间，焦急等待不知道如何是好？

Git 支持两种网络传输协议，即 HTTP 和 SSH 协议，通过 HTTP 方式时，是直接支持设置代理。

### HTTP 代理

> 需要开启本地代理软件

```sh
# socks5协议，1080端口修改成自己的本地代理端口
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080

# http协议，1081端口修改成自己的本地代理端口
git config --global http.proxy http://127.0.0.1:1081
git config --global https.proxy https://127.0.0.1:1081

# reset 代理设置
git config --global --unset http.proxy
git config --global --unset https.proxy

# 也可以直接通过 config 文件进行设置/取消
vim ~/.gitconfig
```

### SSH 代理

> 需要开启本地代理软件

- 找到 SSH 配置文件

- Linux: `~/.ssh/config`

- Windows: `C:\Users\你的用户名\.ssh\config`

- 如果不存在自行创建

```sh
Host github.com
    User git
    # SSH 默认端口 22， HTTPS 默认端口 443
    # Port 22
    # 主机地址，域名或 IP
    # Hostname %h
    # SSH 私钥
    # IdentityFile ~\.ssh\id_rsa
    # 设置代理, 127.0.0.1:1080 换成你自己代理软件监听的本地地址
    # HTTPS 使用 -H，SOCKS 使用 -S
    ProxyCommand connect -S 127.0.0.1:1080 %h %p
```

[`connect`](https://github.com/gotoh/ssh-connect) 是一个让 SSH 支持 SOCKS/HTTPS 代理的工具，windows/macOS/linux 都可以下载

```sh
# Ubuntu
apt install connect-proxy
# Mac
brew install connect
```

### 国内镜像

> 无需开启本地代理软件，适用于 Public Repositories

`https://github.com.cnpmjs.org/{github 对应的地址}` 通过镜像下载之后，如需进行 `push` 操作，手动添加 `github remote` 进行提交

```sh
git clone https://github.com.cnpmjs.org/xg4/blog

# 如需 push 操作
# HTTP remote
git remote add github https://github.com/xg4/blog
# 或者 SSH remote
# git remote add github git@github.com:xg4/blog.git

git push github main
```

### 修改 hosts

> 无需其他额外操作

`git clone` 特别慢是因为 `github.global.ssl.fastly.net` 域名被限制，因此找到这两个域名所对应的最快 IP 地址

```sh
151.101.72.249 github.http://global.ssl.fastly.net
192.30.253.112 github.com
```
