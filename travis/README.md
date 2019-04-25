# travis ci

> [travis demo](https://github.com/xg4/DevOps-demos)

## deploy

- 安装 travis

  ```bash
  $ apt-get install ruby
  $ apt-get install ruby-dev
  $ apt-get install build-essential
  # gem update --system
  # 下载很慢的话，切换镜像源
  # gem sources --add https://gems.ruby-china.com/
  $ gem install travis
  ```

- 登录

  ```bash
  $ travis login

  We need your GitHub login to identify you.
  This information will not be sent to Travis CI, only to api.github.com.
  The password will not be displayed.

  Try running with --github-token or --auto if you don't want to enter your password anyway.

  Username: xxx@xxx.xxx
  Password for xxx@xxx.xxx: ***
  Successfully logged in as xg4!
  ```

- SSH 私钥进行加密处理

  切换到 `.travis.yml`

  ```bash
  # 生成密钥,如果已存在无需生成
  ssh-keygen -t rsa -C "xingor4@gmail.com"

  # 使用Travis加密 --add 会自动将信息生成到 .travis.yml
  $ travis encrypt-file ~/.ssh/id_rsa --add

  Detected repository as xxx/xxx, is this correct? |yes| yes
  encrypting ~/.ssh/id_rsa for xxx/xxx
  storing result as id_rsa.enc
  storing secure env variables for decryption

  Make sure to add id_rsa.enc to the git repository.
  Make sure not to add ~/.ssh/id_rsa to the git repository.
  Commit all changes to your .travis.yml.

  # 添加信任关系
  ssh-copy-id -i deploy_rsa.pub <ssh-user>@<deploy-host>

  # 将修改添加到git中
  git add id_rsa.enc .travis.yml
  ```

- 设置权限

  ```bash
  # .travis.yml
  before_install:
    # 自动生成
    - openssl aes-256-cbc -K $encrypted_d89376f3278d_key -iv $encrypted_d89376f3278d_iv
      -in id_rsa.enc -out ~/.ssh/id_rsa -d
    # 设置权限
    - chmod 600 ~/.ssh/id_rsa
  ```

- 主机验证

  ```bash
  # .travis.yml
  addons:
    ssh_known_hosts: your-ip
  ```
