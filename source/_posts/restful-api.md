---
title: RESTful API
date: 2018-09-18 14:36:06
tags:
  - RESTful API
  - HTTP
---

> [理解 RESTful 架构 - 阮一峰](http://www.ruanyifeng.com/blog/2011/09/restful.html)  
> [RESTful API 设计指南 - 阮一峰](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)  
> [RESTful API 最佳实践 - 阮一峰](http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [HTTP Methods](#http-methods)
- [HTTP Status Codes](#http-status-codes)
  - [example](#example)

## HTTP Methods

- GET (SELECT) : 读取

- POST (CREATE) : 新建

- PUT (UPDATE) : 更新

- PATCH (UPDATE) : 部分更新

- DELETE (DELETE) : 删除

不常用的 http methods

- HEAD : 获取资源的元数据

- OPTIONS : 获取信息，关于资源的哪些属性是客户端可以改变

## HTTP Status Codes

> [HTTP Status Codes - wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

- 1xx : 相关信息

- 2xx : 操作成功

- 3xx : 重定向

- 4xx : 客户端错误

- 5xx : 服务器错误

### example

- `200 OK` - [GET/PUT/PATCH] : 获取或更新数据成功

- `201 Created` - [POST] : 新建数据成功

- `202 Accepted` - [*] : 表示服务器已经收到请求，但是还未处理，未来再进行处理（异步操作）

- `204 No Content` - [DELETE] : 删除数据成功

- `400 Bad Request` - [POST/PUT/PATCH] : 服务器不理解客户端的请求，未做任何处理

- `401 Unauthorized` : 用户未提供身份验证凭据，或者没有通过身份验证（没有权限）

- `403 Forbidden` : 用户通过了身份验证，但是不具有访问资源所需的权限（权限不足）

- `404 Not Found` : 所请求的资源不存在，或不可用

- `405 Method Not Allowed` : 用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内

- `406 Not Acceptable` - [GET] : 服务器没有请求头（Accept headers）中指定的资源格式

- `410 Gone` - [GET] : 所请求的资源已从这个地址转移，不再可用

- `415 Unsupported Media Type` : 客户端发送的资源，不是服务器指定的资源格式（与 406 相反）

- `422 Unprocessable Entity` - [POST/PUT/PATCH] : 请求格式正确，但由于语义错误而无法遵循

- `500 Internal Server Error` : 服务器错误

- `503 Service Unavailable` : 服务器无法处理请求，一般用于网站维护状态
