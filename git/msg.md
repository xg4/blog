# git commit message

## 命令行

`$ cat <name>` : 查看某个文件内容

`$ mkdir <name>` : 创建一个空目录

`$ pwd` : 显示当前目录的路径

## Commit message

- `feat`：新功能（feature）

- `fix`：修补 bug

- `docs`：文档（documentation）

- `style`： 格式（不影响代码运行的变动），代码样式, 例如: 缺少分号等

- `refactor`：重构（即不是新增功能，也不是修改 bug 的代码变动）

- `test`：增加测试

- `chore`：构建过程或辅助工具的变动

## Referencing issues

被关闭的 bug 应该另起一行在底部单独列出, 并且使用 "Closes" 前缀, 例如

```bash
Closes #234

Closes #123, #245, #992
```
