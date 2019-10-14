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

```bash
sudo systemctl status nginx
sudo systemctl stop nginx
sudo systemctl start nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl disable nginx
sudo systemctl enable nginx
```

## 配置 Nginx

最新版本 nginx 配置是由 4 个文件构成：

- conf.d：用户自己定义的 conf 配置文件

- sites-available：系统默认设置的配置文件

- sites-enabled：由 sites-available 中的配置文件转换生成

- nginx.conf：汇总以上三个配置文件的内容，同时配置我们所需要的参数

在部署需要的 web 服务时，我们可以拷贝 sites-enabled 中的 default 文件到 conf.d 并且修改名字为\*\*.conf,然后进行配置

```conf
server {
    # 服务启动时监听的端口
    listen 80 default_server;
    listen [::]:80 default_server;
    # 服务启动时文件加载的路径
    root /var/www/html/wordpress;
    # 默认加载的第一个文件
    index index.php index.html index.htm index.nginx-debian.html;
    # 页面访问域名，如果没有域名也可以填写_
    server_name www.123.com;

    location / {
        #页面加载失败后所跳转的页面
        try_files $uri $uri/ =404;
    }


    # 以下配置只服务于php
    # 将PHP脚本传递给在127.0.0.1:9000上监听的FastCGI服务器
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        # With php7.0-cgi alone:
        #fastcgi_pass 127.0.0.1:9000;
        # With php7.0-fpm:
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
    }

    # 如果Apache的文档为root，则拒绝访问.htaccess文件
    location ~ /\.ht {
        deny all;
    }
}
```

注意事项：

- apache 的端口也是 80，所以我们可以选择关闭 apache 或者，在这里更换端口，例如 81，82 等，但是我们需要吧这个端口开放出来

- React、Vue 等由于是单页面应用，所以我们在刷新的会遇到资源加载不到的错误，这时我们需要把页面重定向到 index.html `try_files \$uri /index.html;`

- 每次配置完成后，都需要重启 nginx
