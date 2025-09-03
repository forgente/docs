---
date: "2023-05-24T15:00:00+08:00"
slug: "act-runner"
sidebar_position: 20
---

# Act Runner

本页面将详细介绍[Act Runner](https://gitea.com/gitea/act_runner)，这是Gitea Actions的Runner。

## 要求

建议在Docker容器中运行Job，因此您需要首先安裝Docker。
並确保Docker守护進程正在运行。

其他与Docker API兼容的OCI容器引擎也應該可以正常工作，但尚未经過测试。

但是，如果您确定要直接在主机上运行Job，则不需要Docker。

## 安裝

有多种安裝Act Runner的方法。

### 下载二進制文件

您可以从[發佈页面](https://gitea.com/gitea/act_runner/releases)下载二進制文件。
然而，如果您想使用最新的夜间构建版本，可以从[下载页面](https://dl.gitea.com/act_runner/)下载。

下载二進制文件时，請确保您已经下载了适用于您的平台的正确版本。
您可以通過运行以下命令進行检查：

```bash
chmod +x act_runner
./act_runner --version
```

如果看到版本信息，则表示您已经下载了正确的二進制文件。

### 使用 Docker 镜像

您可以使用[docker hub](https://hub.docker.com/r/gitea/act_runner/tags)上的Docker镜像。
与二進制文件类似，您可以使用`nightly`標籤使用最新的夜间构建版本，而`latest`標籤是最新的稳定版本。

```bash
docker pull docker.io/gitea/act_runner:latest # for the latest stable release
docker pull docker.io/gitea/act_runner:nightly # for the latest nightly build
```

## 配置

配置通過配置文件進行。它是可選的，当没有指定配置文件时，将使用默认配置。

您可以通過运行以下命令生成配置文件：

```bash
./act_runner generate-config
```

默认配置是安全的，可以直接使用。

```bash
./act_runner generate-config > config.yaml
./act_runner --config config.yaml [command]
```

您亦可以如下使用 docker 建立配置文件：

```bash
docker run --entrypoint="" --rm -it docker.io/gitea/act_runner:latest act_runner generate-config > config.yaml
```

当使用Docker镜像时，可以使用`CONFIG_FILE`环境变量指定配置文件。确保将文件作為卷挂载到容器中：

```bash
docker run -v $(pwd)/config.yaml:/config.yaml -e CONFIG_FILE=/config.yaml ...
```

您可能注意到上面的命令都是不完整的，因為現在還不是运行Act Runner的时候。
在运行Act Runner之前，我们需要首先将其注册到您的Gitea实例中。

## 注册

在运行Act Runner之前，需要進行注册，因為Runner需要知道从哪里获取Job，並且對於Gitea实例来说，识别Runner也很重要。

### Runner级别

您可以在不同级别上注册Runner，它可以是：

- 实例级别：Runner将為实例中的所有存儲库运行Job。
- 組織级别：Runner将為組織中的所有存儲库运行Job。
- 存儲库级别：Runner将為其所属的存儲库运行Job。

請注意，即使存儲库具有自己的存儲库级别Runner，它仍然可以使用实例级别或組織级别Runner。未来的版本可能提供更多对此進行更好控制的選项。

### 获取注册令牌

Runner级别决定了从哪里获取注册令牌。

- 实例级别：管理员设置页面，例如 `<your_gitea.com>/admin/actions/runners`。
- 組織级别：組織设置页面，例如 `<your_gitea.com>/<org>/settings/actions/runners`。
- 存儲库级别：存儲库设置页面，例如 `<your_gitea.com>/<owner>/<repo>/settings/actions/runners`。

如果您無法看到设置页面，請确保您具有正确的权限並且已启用 Actions。

注册令牌的格式是一个随机字符串 `D0gvfu2iHfUjNqCYVljVyRV14fISpJxxxxxxxxxx`。

注册令牌也可以通過 Gitea 的 [命令行](../../administration/command-line.md#actions-generate-runner-token) 获得:

```
gitea --config /etc/gitea/app.ini actions generate-runner-token
```

使用者也可以使用 `GITEA_RUNNER_REGISTRATION_TOKEN` 或 `GITEA_RUNNER_REGISTRATION_TOKEN_FILE` 环境变量以在 Gitea 启动时设置全局的注册令牌，例如：

```
openssl rand -hex 24 > /some-dir/runner-token
export GITEA_RUNNER_REGISTRATION_TOKEN_FILE=/some-dir/runner-token
./gitea --config ...
```

来自环境变量的令牌在通過 Web 界面或 API 重置(重新建立新令牌)前将一直有效。

令牌可用于注册多个 Runner，直到使用 Web 界面中的令牌重置链接将其撤销並替换為新令牌。

### 注册Runner

可以通過运行以下命令来注册Act Runner：

```bash
./act_runner register
```

或者，您可以使用 `--config` 選项来指定前面部分提到的配置文件。

```bash
./act_runner --config config.yaml register
```

您将逐步输入注册信息，包括：

- Gitea 实例的 URL，例如 `https://gitea.com/` 或 `http://192.168.8.8:3000/`。
- 注册令牌。
- Runner名稱（可選）。如果留空，将使用主机名。
- Runner標籤（可選）。如果留空，将使用默认標籤。

您可能对Runner標籤感到困惑，稍后将对其進行解释。

如果您想以非交互方式注册Runner，可以使用參數執行以下操作。

```bash
./act_runner register --no-interactive --instance <instance_url> --token <registration_token> --name <runner_name> --labels <runner_labels>
```

注册Runner后，您可以在当前目錄中找到一个名為 `.runner` 的新文件。該文件存儲注册信息。
請不要手动编辑該文件。
如果此文件丢失或损坏，可以直接删除它並重新注册。

如果您想将注册信息存儲在其他位置，請在配置文件中指定，並不要忘记指定 `--config` 選项。

### 使用Docker注册Runner

如果您使用的是Docker镜像，注册行為会略有不同。在这种情况下，注册和运行合並為一步，因此您需要在运行Act Runner时指定注册信息。

```bash
docker run \
    -v $(pwd)/config.yaml:/config.yaml \
    -v $(pwd)/data:/data \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -e CONFIG_FILE=/config.yaml \
    -e GITEA_INSTANCE_URL=<instance_url> \
    -e GITEA_RUNNER_REGISTRATION_TOKEN=<registration_token> \
    -e GITEA_RUNNER_NAME=<runner_name> \
    -e GITEA_RUNNER_LABELS=<runner_labels> \
    --name my_runner \
    -d gitea/act_runner:nightly
```

您可能注意到我们已将`/var/run/docker.sock`挂载到容器中。
这是因為Act Runner将在Docker容器中运行Job，因此它需要与Docker守护進程進行通信。
如前所述，如果要在主机上直接运行Job，可以将其移除。
需要明确的是，这里的 "主机" 实际上指的是当前运行 Act Runner的容器，而不是主机机器本身。

### 使用 Docker compose 运行 Runner

您亦可使用如下的 `docker-compose.yml`:

```yml
version: "3.8"
services:
  runner:
    image: gitea/act_runner:nightly
    environment:
      CONFIG_FILE: /config.yaml
      GITEA_INSTANCE_URL: "${INSTANCE_URL}"
      GITEA_RUNNER_REGISTRATION_TOKEN: "${REGISTRATION_TOKEN}"
      GITEA_RUNNER_NAME: "${RUNNER_NAME}"
      GITEA_RUNNER_LABELS: "${RUNNER_LABELS}"
    volumes:
      - ./config.yaml:/config.yaml
      - ./data:/data
      - /var/run/docker.sock:/var/run/docker.sock
```

### 当您使用 Docker 镜像启动 Runner，如何配置 Cache

如果你不打算在工作流中使用 `actions/cache`，你可以忽略本段。

如果您在使用 `actions/cache` 时没有進行额外的配置，将会返回以下错误信息：
> Failed to restore: getCacheEntry failed: connect ETIMEDOUT IP:PORT

这个错误的原因是 runner 容器和作业容器位于不同的网络中，因此作业容器無法访问 runner 容器。
因此，配置 cache 动作以确保其正常运行是非常重要的。請按照以下步骤操作：

- 1.获取 Runner 容器所在主机的 LAN（本地局域网） IP 地址。
- 2.获取一个 Runner 容器所在主机的空闲端口号。
- 3.在配置文件中如下配置：

```yaml
cache:
  enabled: true
  dir: ""
  # 使用步骤 1. 获取的 LAN IP
  host: "192.168.8.17"
  # 使用步骤 2. 获取的端口号
  port: 8088
```

- 4.启动容器时, 将 Cache 端口映射至主机。

```bash
docker run \
  --name gitea-docker-runner \
  -p 8088:8088 \
  -d gitea/act_runner:nightly
```

### 標籤

Runner的標籤用于确定Runner可以运行哪些Job以及如何运行它们。

默认標籤為`ubuntu-latest:docker://node:16-bullseye,ubuntu-22.04:docker://node:16-bullseye,ubuntu-20.04:docker://node:16-bullseye,ubuntu-18.04:docker://node:16-buster`。
它们是逗号分隔的列表，每个项目都是一个標籤。

让我们以 `ubuntu-22.04:docker://node:16-bullseye` 為例。
它意味着Runner可以运行带有`runs-on: ubuntu-22.04`的Job，並且該Job将在使用`node:16-bullseye`镜像的Docker容器中运行。

如果默认镜像無法满足您的需求，並且您有足够的硬碟空间可以使用更好、更大的镜像，您可以将其更改為`ubuntu-22.04:docker://<您喜欢的镜像>`。
您可以在[act 镜像](https://github.com/nektos/act/blob/master/IMAGES.md)上找到更多有用的镜像。

如果您想直接在主机上运行Job，您可以将其更改為`ubuntu-22.04:host`或僅`ubuntu-22.04`，`:host`是可選的。
然而，我们建议您使用类似`linux_amd64:host`或`windows:host`的特殊名稱，以避免误用。

从 Gitea 1.21 开始，您可以通過修改 runner 的配置文件中的 `container.labels` 来更改標籤（如果没有配置文件，請参考 [配置教程](#配置)），通過執行 `./act_runner daemon --config config.yaml` 命令重启 runner 之后，这些新定义的標籤就会生效。

## 运行

注册完Runner后，您可以通過运行以下命令来运行它：

```bash
./act_runner daemon
# or
./act_runner daemon --config config.yaml
```

Runner将从Gitea实例获取Job並自动运行它们。

由于Act Runner仍处于开发中，建议定期检查最新版本並進行升级。
