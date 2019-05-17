---
title: HTML - head
date: 2018-12-11 18:24:24
tags: html
---

## Meta

```html
<meta charset="utf-8" />

<!-- SEO -->
<title>document</title>
<meta name="keywords" content="keywords" />
<meta name="description" content="description" />

<meta name="author" content="xg4, xingor4@gmail.com" />

<!-- mobile -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no"
/>

<meta name="theme-color" content="#000000" />

<!-- chromium -->
<meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1" />
<meta name="renderer" content="webkit|ie-comp|ie-stand" />
<meta name="force-rendering" content="webkit|ie-comp|ie-stand" />

<!-- full screen -->
<meta name="full-screen" content="yes" />
<meta name="x5-fullscreen" content="true" />

<!-- robots -->
<meta name="robots" content="index, about" />

<!-- orientation -->
<meta name="screen-orientation" content="portrait" />
<meta name="x5-orientation" content="portrait" />

<!-- 禁止识别电话号码和邮箱 -->
<meta name="format-detection" content="telephone=no, email=no" />

<!-- web app -->
<meta name="browsermode" content="application" />
<meta name="x5-page-mode" content="app" />
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- status bar style -->
<meta name="apple-mobile-web-app-status-bar-style" content="default" />

<!-- add to home screen of title -->
<meta name="apple-mobile-web-app-title" content="title" />

<!-- windows phone tap highlight -->
<meta name="msapplication-tap-highlight" content="no" />

<!-- old device -->
<meta name="MobileOptimized" content="320" />
<meta name="HandheldFriendly" content="true" />
```

## Link

```html
<!-- icon -->
<link
  rel="apple-touch-icon-precomposed"
  sizes="57x57"
  href="/icons/apple-touch-icon.png"
/>
<link
  rel="apple-touch-icon-precomposed"
  sizes="72x72"
  href="/icons/apple-touch-icon.png"
/>
<link
  rel="apple-touch-icon-precomposed"
  sizes="114x114"
  href="/icons/apple-touch-icon.png"
/>
<link
  rel="apple-touch-icon-precomposed"
  sizes="144x144"
  href="/icons/apple-touch-icon.png"
/>

<!-- PWA -->
<link rel="manifest" href="/manifest.json" />

<!-- favicon -->
<link rel="shortcut icon" href="/favicon.ico" />
```
