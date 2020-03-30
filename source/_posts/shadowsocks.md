---
title: shadowsocks
date: 2020-03-30 19:24:50
tags:
---

## Ubuntu 18.04 Shadowsocks

## 安装 pip

`sudo apt install python3-pip`

## 安装 Shadowsocks

- `pip3 install https://github.com/shadowsocks/shadowsocks/archive/master.zip`

- 安装完后检查是否为 3.0.0 版本

  `ssserver --version`

  若显示 Shadowsocks 3.0.0 则进行下一步

## 配置 Shadowsocks

- 创建 shadowsocks.json

  `sudo vim /etc/shadowsocks.json`

- 编辑 shadowsocks.json

  ```json
  {
    "server": "0.0.0.0",
    "server_port": 8388,
    "local_address": "127.0.0.1",
    "local_port": 1080,
    "password": "password",
    "timeout": 300,
    "method": "aes-256-cfb",
    "fast_open": false,
    "workers": 1,
    "prefer_ipv6": false
  }
  ```

## 启动 Shadowsocks

`ssserver -c /etc/shadowsocks.json -d start`

## 开机自启

- 创建 shadowsocks.service 文件

  `vim /etc/systemd/system/shadowsocks.service`

- 复制粘贴一下内容，然后保存退出

  ```service
  [Unit]
  Description=Shadowsocks Server
  After=network.target

  [Service]
  ExecStart=/usr/local/bin/ssserver -c /etc/shadowsocks.json
  Restart=on-abort

  [Install]
  WantedBy=multi-user.target
  ```

- 运行 shadowsocks.service

  `systemctl start shadowsocks.service`

- 允许开机自动启动

  `systemctl enable shadowsocks.service`

- 查看运行状态

  `systemctl status shadowsocks.service`
