---
title: HTTP
date: '2018-09-10T06:36:06.000Z'
description: http
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Methods](#methods)
- [Status Codes](#status-codes)
- [Headers](#headers)

## Methods

- GET (SELECT) : 读取

- POST (CREATE) : 新建

- PUT (UPDATE) : 更新

- PATCH (UPDATE) : 部分更新

- DELETE (DELETE) : 删除

不常用的 http methods

- HEAD : 获取资源的元数据

- OPTIONS : 询问请求 URI 资源支持的方法

## Status Codes

> [HTTP Status Codes - wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

- 1xx : 相关信息

- 2xx : 成功

- 3xx : 重定向

- 4xx : 客户端错误

- 5xx : 服务器错误

| `2xx`            | 操作成功                                                         |
| ---------------- | ---------------------------------------------------------------- |
| `200 OK`         | 客户端发来的请求在服务器端被正确处理                             |
| `201 Created`    | 新建资源成功                                                     |
| `202 Accepted`   | 表示服务器已经收到请求，但是还未处理，未来再进行处理（异步操作） |
| `204 No Content` | 删除资源成功 -- 表示请求成功，但响应报文不含实体的主体部分       |

| `3xx`                    | 重定向（表明浏览器要执行特殊处理）                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `301 Moved Permanently`  | 永久性重定向，表示资源已被分配了新的 URL                                                                                        |
| `302 Found`              | 临时性重定向，表示资源临时被分配了新的 URL                                                                                      |
| `303 See Other`          | 表示资源存在着另一个 URL，应使用 GET 方法获取资源（对于 301/302/303 响应，几乎所有浏览器都会删除报文主体并自动用 GET 重新请求） |
| `304 Not Modified`       | 表示服务器允许访问资源，但请求未满足条件的情况（与重定向无关）                                                                  |
| `307 Temporary Redirect` | 临时重定向，和 302 含义类似，但是期望客户端保持请求方法不变向新的地址发出请求                                                   |

| `4xx`                        | 客户端错误                                                     |
| ---------------------------- | -------------------------------------------------------------- |
| `400 Bad Request`            | 服务器不理解客户端的请求，未做任何处理 -- 请求报文存在语法错误 |
| `401 Unauthorized`           | 表示发送的请求需要有通过 HTTP 认证的认证信息                   |
| `403 Forbidden`              | 用户通过了身份验证，但是不具有访问资源所需的权限（权限不足）   |
| `404 Not Found`              | 请求资源不存在，或不可用                                       |
| `405 Method Not Allowed`     | 用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内     |
| `406 Not Acceptable`         | 服务器没有请求头（Accept headers）中指定的资源格式             |
| `410 Gone`                   | 所请求的资源已从这个地址转移，不再可用                         |
| `415 Unsupported Media Type` | 客户端发送的资源，不是服务器指定的资源格式（与 406 相反）      |
| `422 Unprocessable Entity`   | 请求格式正确，但由于语义错误而无法遵循                         |

| `5xx`                       | 服务器错误                               |
| --------------------------- | ---------------------------------------- |
| `500 Internal Server Error` | 服务器错误                               |
| `501 Not Implemented`       | 表示服务器不支持当前请求所需要的某个功能 |
| `503 Service Unavailable`   | 服务器无法处理请求，一般用于网站维护状态 |

## Headers

| request headers   |                                                              |
| ----------------- | ------------------------------------------------------------ |
| `Accept`          | 客户端能正确接收的媒体类型：`application/json` `text/plain`  |
| `Accept-Encoding` | 能正确接收的编码格式列表：`gzip` `deflate`                   |
| `Authorization`   | 客户端认证信息：`Bearer dSdSdFFlsfdjasd123`，一般存 token 用 |

| response headers |                                            |
| ---------------- | ------------------------------------------ |
| `ETag`           | 资源标识，资源发生变化时标识也会发生改变   |
| `Location`       | 客户端重定向到某个 URL                     |
| `Server`         | 服务器名字：`Apache` `Nginx`               |
| `Set-Cookie`     | 需要存在客户端的信息，一般用于识别用户身份 |
