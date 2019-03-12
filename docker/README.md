# Docker

> [Docker 入门教程-阮一峰](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)

## Base

1. check docker

   ```bash
     $ docker version
     # or
     $ docker info
   ```

2. sudo

   ```bash
   $ sudo usermod -aG docker $USER
   ```

3. start

   ```bash
   # service 命令的用法
   $ sudo service docker start

   # systemctl 命令的用法
   $ sudo systemctl start docker
   ```

## Image

1. bash

> 由于 Docker 官方提供的 image 文件，都放在 library 组里面，所以它是默认组，可以省略。`library/hello-world` 官方 `image` 仓库，可以省略 `library`

```bash
# 列出本机的所有 image 文件。
$ docker image ls

# 删除 image 文件
$ docker image rm [imageName]

# 拉取 远程 image 文件
$ docker image pull [imageName]
```

2. build

   - 通过 Dockerfile, `docker image build` 创建 image 文件

     ```bash
     $ docker image build -t [name] .
     # or
     $ docker image build -t [name]:[tag] .
     ```

     `-t` 指定 image 文件的名字，冒号之后指定标签，默认为 latest。最后的点表示 Dockerfile 文件所在的路径，当前路径就是一个点。

## Container

1.  bash

    ```bash
    # 列出本机正在运行的容器
    $ docker container ls

    # 列出本机所有容器，包括终止运行的容器
    $ docker container ls --all
    ```

2.  run

    > docker container run 命令是新建容器，每运行一次，就会新建一个容器。同样的命令运行两次，就会生成两个一模一样的容器文件。如果希望重复使用容器，就要使用 docker container start 命令，它用来启动已经生成、已经停止运行的容器文件。

    ```bash
    $ docker container start [containerID]
    ```

    ```bash
    # 从 image 文件，生成一个正在运行的容器实例。
    # 自动抓取 image 文件，docker image pull 可省略
    $ docker container run [imageName]
    # example
    $ docker container run -it ubuntu bash
    ```

    ```bash
    $ docker container run -p 8000:3000 -it [imageName] /bin/bash
    # 或者
    $ docker container run -p 8000:3000 -it [imageName]:0.0.1 /bin/bash
    ```

    - `-p` 参数：容器的 3000 端口映射到本机的 8000 端口。

    - `-it` 参数：容器的 Shell 映射到当前的 Shell，然后你在本机窗口输入的命令，就会传入容器。

    - `[imageName]:0.0.1`：image 文件的名字（如果有标签，还需要提供标签，默认是 latest 标签）。

    - `/bin/bash`:容器启动以后，内部第一个执行的命令。这里是启动 Bash，保证用户可以使用 Shell。

    - `--rm`:在容器终止运行后自动删除容器文件。

3.  kill 终止容器

    ```bash
    # 终止运行的容器文件，依然会占据硬盘空间
    $ docker container kill [containID]
    ```

    ```bash
    $ bash container stop [containerID]
    ```

    `kill` 会立即结束，`stop` 进行收尾清理工作,再结束

4.  remove 删除容器

    ```bash
    $ docker container rm [containerID]
    ```

5.  logs

    > `docker container logs` 命令用来查看 docker 容器的输出，即容器里面 Shell 的标准输出。如果 docker run 命令运行容器的时候，没有使用-it 参数，就要用这个命令查看输出。

    ```bash
    $ docker container logs [containerID]
    ```

6.  exec

    > `docker container exec` 命令用于进入一个正在运行的 docker 容器。如果 docker run 命令运行容器的时候，没有使用-it 参数，就要用这个命令进入容器。一旦进入了容器，就可以在容器的 Shell 执行命令了。

    ```bash
    $ docker container exec -it [containerID] /bin/bash
    ```

7.  cp

    > `docker container cp` 命令用于从正在运行的 Docker 容器里面，将文件拷贝到本机。下面是拷贝到当前目录的写法。

    ```bash
    $ docker container cp [containID]:[/path/to/file] .
    ```

## Dockerfile

### `Dockerfile`

- ```docker
  FROM node:8.4：该 image 文件继承官方的 node image，冒号表示标签，这里标签是8.4，即8.4版本的 node。

  COPY . /app：将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录。

  WORKDIR /app：指定接下来的工作路径为/app。

  RUN npm install：在/app目录下，运行npm install命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。

  EXPOSE 3000：将容器 3000 端口暴露出来， 允许外部连接这个端口。

  CMD node index.js
  ```

- CMD RUN

  - CMD 表示容器启动后自动执行 `node index.js`

  - RUN 命令在 image 文件的构建阶段执行，执行结果都会打包进入 image 文件；CMD 命令则是在容器启动后执行。

  - 一个 Dockerfile 可以包含多个 RUN 命令，但是只能有一个 CMD 命令

  - **注意**,指定了 CMD 命令以后，docker container run 命令就不能附加命令了（比如前面的/bin/bash），否则它会覆盖 CMD 命令。

### `.dockerignore`

    不打包进入 image 文件

    ```
    .git
    node_modules
    npm-debug.log
    ```

## Push

- 容器运行成功后，就确认了 image 文件的有效性。

- ```bash
  $ docker login
  ```

- 为本地的 image 标注用户名和版本。

  ```bash
  $ docker image tag [imageName] [username]/[repository]:[tag]
  # example
  $ docker image tag koa-demos:0.0.1 ruanyf/koa-demos:0.0.1
  # 也可以不标注用户名，重新构建一下 image 文件
  $ docker image build -t [username]/[repository]:[tag] .
  ```

- 发布

  ```bash
  $ docker image push [username]/[repository]:[tag]
  ```
