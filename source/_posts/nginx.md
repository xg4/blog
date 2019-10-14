---
title: Nginx
date: 2019-10-14 10:09:17
tags:
  - nginx
  - devops
---

## Install

```bash
# 更新包
sudo apt-get update
# 下载安装nginx
sudo apt-get install nginx

# test
sudo nginx -t

nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

# 重启
sudo service nginx restart


# 删除nginx，-purge包括配置文件
sudo apt-get --purge remove nginx

# 移除全部不使用的软件包
sudo apt-get autoremove

# 罗列出与nginx相关的软件并删除
dpkg --get-selections|grep nginx
sudo apt-get --purge remove nginx
sudo apt-get --purge remove nginx-common
sudo apt-get --purge remove nginx-core

# 查看nginx正在运行的进程，如果有就kill掉
ps -ef |grep nginx
sudo kill -9 XXX
```
