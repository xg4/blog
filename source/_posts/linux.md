---
title: Linux
date: 2019-04-20 22:52:27
tags: linux
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [ssh-copy-id](#ssh-copy-id)
- [scp](#scp)

## ssh-copy-id

> 将本机主机的公钥复制到远程主机的 `authorized_keys` 文件上，`ssh-copy-id` 命令也会给远程主机的用户主目录（home）和 `~/.ssh` 和 `~/.ssh/authorized_keys` 设置合适的权限

- 语法

  ```bash
  $ ssh-copy-id [-i [identity_file]] [user@]machine
  ```

- 参数

  - `-i` : 指定公钥文件

- example

  ```bash
  $ ssh-copy-id user@server
  $ ssh-copy-id -i ~/.ssh/id_rsa.pub user@server
  ```

## scp

- 语法

  ```bash
  scp [-1246BCpqrv] [-c cipher] [-F ssh_config] [-i identity_file]
  [-l limit] [-o ssh_option] [-P port] [-S program]
  [[user@]host1:]file1 [...] [[user@]host2:]file2
  ```

- 简易写法

  ```bash
  $ scp [可选参数] file_source file_target
  ```

- 参数：

  - `-1` : 强制 scp 命令使用协议 ssh1

  - `-2` : 强制 scp 命令使用协议 ssh2

  - `-4` : 强制 scp 命令只使用 IPv4 寻址

  - `-6` : 强制 scp 命令只使用 IPv6 寻址

  - `-B` : 使用批处理模式（传输过程中不询问传输口令或短语）

  - `-C` : 允许压缩。（将-C 标志传递给 ssh，从而打开压缩功能）

  - `-p` : 保留原文件的修改时间，访问时间和访问权限

  - `-q` : 不显示传输进度条

  - `-r` : 递归复制整个目录

  - `-v` : 详细方式显示输出。scp 和 ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题

  - `-c` cipher : 以 cipher 将数据传输进行加密，这个选项将直接传递给 ssh

  - `-F` ssh_config : 指定一个替代的 ssh 配置文件，此参数直接传递给 ssh

  - `-i` identity_file : 从指定文件中读取传输时使用的密钥文件，此参数直接传递给 ssh

  - `-l` limit : 限定用户所能使用的带宽，以 Kbit/s 为单位

  - `-o` ssh_option : 如果习惯于使用 ssh_config(5)中的参数传递方式

  - `-P` port : 注意是大写的 P, port 是指定数据传输用到的端口号

  - `-S` program : 指定加密传输时所使用的程序。此程序必须能够理解 ssh(1)的选项

- example

  ```bash
  $ scp local_file remote_username@remote_ip:remote_folder
  # or
  $ scp local_file remote_username@remote_ip:remote_file
  # or
  $ scp local_file remote_ip:remote_folder
  # or
  $ scp local_file remote_ip:remote_file
  ```
