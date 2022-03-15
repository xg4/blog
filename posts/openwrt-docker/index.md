---
title: 在 Docker 中使用 openwrt
date: '2021-04-08T14:10:00.000Z'
description: 在 Docker 中方便快捷的启动或销毁 openwrt，并通过旁路由的方式使家中设备快捷连入互联网
---

> 在 Docker 中使用 openwrt 作为旁路由方便快捷，使家中电脑、手机、平板等设备无需其他软件，快捷的连入互联网

### 开启网卡混杂模式

```sh
# enp4s0 换成你的网卡名，通过 ifconfig 查看
sudo ip link set enp4s0 promisc on
```

### 创建 docker 的虚拟网络

```sh
# ifconfig 查看你的网卡 IP 地址、网段等信息
docker network create -d macvlan --subnet=192.168.0.0/24 --gateway=192.168.0.1 -o parent=enp4s0 macnet

# 查看 macnet 是否建立成功
docker network ls
```

### 开启 openwrt 镜像

```sh
docker run -d \
  --name openwrt \
  --network macnet \
  --privileged \
  --restart always \
  sulinggg/openwrt:x86_64 /sbin/init
```

### 修改容器内的网络设置

```sh
docker exec -it openwrt bash

vim /etc/config/network
```

```sh
config interface 'lan'
      option type 'bridge'
      option ifname 'enp4s0'
      option proto 'static'
      option ipaddr '192.168.0.100'
      option netmask '255.255.255.0'
      option ip6assign '60'
      option gateway '192.168.0.1'
      option broadcast '192.168.0.255'
      option dns '192.168.0.1'
```

### 重启网络

```sh
/etc/init.d/network restart
```

### 重置 root 密码，openwrt 的控制面板登录密码

```sh
# 默认为 password
passwd root
```

### 控制面板

浏览器输入 `http://192.168.123.100` 进入控制面板

用户名：`root`

密码：`password`（默认）

### 关闭 DHCP 服务

在 `网络 - 接口 - Lan - 修改` 界面中关闭 openwrt DHCP 服务，勾选下方的 `忽略此接口（不在此接口提供 DHCP 服务）`，并 `保存&应用`

### 主路由 DHCP 设置

1. 将主路由的默认网关设置为 `192.168.0.100`（openwrt IP 地址） DHCP 服务自动连接到 openwrt 旁路由

2. 通过 DHCP 接入网络的设备（未手动设置过网络）就会自动连接上 openwrt 旁路由

3. 或者手动将设备的网关地址改为 `192.168.0.100`

### 问题

1.  无法上网，找到 `网络 - 接口 - Lan` 页面中的 `物理设置` 取消勾选下方的 `桥接接口` ，已关闭桥接模式，并 `保存&应用`。

2.  `PassWall` 等 xx 软件输入节点之后网络连接问题，找到 `网络 - 防火墙 - 自定义规则` 页面中，注释掉下面两行

    ```sh
    #iptables -t nat -A PREROUTING -p udp --dport 53 -j REDIRECT --to-ports 53
    #iptables -t nat -A PREROUTING -p tcp --dport 53 -j REDIRECT --to-ports 53
    ```
