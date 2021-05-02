---
title: 设置 Ubuntu 20.04 静态 IP 地址
date: '2020-10-20T14:14:00.000Z'
description: 设置 Ubuntu 20.04 静态 IP 地址，网关，DNS 服务器
---

### 配置文件

```bash
# /etc/netplan/* 目录下的 yaml 文件，可能并不是这个文件名
$ sudo vim /etc/netplan/00-installer-config.yaml
```

```yaml
# This is the network config written by 'subiquity'
network:
  ethernets:
    enp4s0:
      dhcp4: no
      # IP 地址
      addresses:
        - 192.168.0.2/24
      # 网关
      gateway4: 192.168.0.1
      # DNS 服务器
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
  version: 2
```

### 应用配置

```bash
$ sudo netplan apply

# 如果遇到问题，打印错误信息
$ sudo netplan --debug apply
```

### 确认配置

```bash
$ ip a
# 确认已经修改成功
2: enp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 74:d0:2b:e7:03:2c brd ff:ff:ff:ff:ff:ff
    inet 192.168.0.2/24 brd 192.168.0.255 scope global enp4s0
      valid_lft forever preferred_lft forever
    inet6 fe80::76d0:2bff:fee7:32c/64 scope link
      valid_lft forever preferred_lft forever
```
