---
date: "2021-07-20T00:00:00+00:00"
slug: "maven"
sidebar_position: 60
---

# Maven 軟體包註冊表

為您的使用者或組織發佈 [Maven](https://maven.apache.org) 軟體包。

## 要求

要使用 Maven 軟體包註冊表，您可以使用 [Maven](https://maven.apache.org/install.html) 或 [Gradle](https://gradle.org/install/)。
以下示例使用 `Maven` 和 `Gradle Groovy`。

## 配置軟體包註冊表

要注册軟體包註冊表，首先需要将访问令牌添加到 [`settings.xml`](https://maven.apache.org/settings.html) 文件中：

```xml
<settings>
  <servers>
    <server>
      <id>gitea</id>
      <configuration>
        <httpHeaders>
          <property>
            <name>Authorization</name>
            <value>token {access_token}</value>
          </property>
        </httpHeaders>
      </configuration>
    </server>
  </servers>
</settings>
```

然后在项目的 `pom.xml` 文件中添加以下部分：

```xml
<repositories>
  <repository>
    <id>gitea</id>
    <url>https://gitea.example.com/api/packages/{owner}/maven</url>
  </repository>
</repositories>
<distributionManagement>
  <repository>
    <id>gitea</id>
    <url>https://gitea.example.com/api/packages/{owner}/maven</url>
  </repository>
  <snapshotRepository>
    <id>gitea</id>
    <url>https://gitea.example.com/api/packages/{owner}/maven</url>
  </snapshotRepository>
</distributionManagement>
```

| 參數           | 描述                                                                                  |
| -------------- | ------------------------------------------------------------------------------------- |
| `access_token` | 您的[个人访问令牌](development/api-usage.md#通過-api-認證) |
| `owner`        | 軟體包的所有者                                                                        |

### Gradle variant

如果您计划在项目中添加来自 Gitea 实例的一些軟體包，請将其添加到 repositories 部分中：

```groovy
repositories {
    // other repositories
    maven { url "https://gitea.example.com/api/packages/{owner}/maven" }
}
```

在 Groovy gradle 中，您可以在發佈部分中包含以下脚本：

```groovy
publishing {
    // 其他發佈设置
    repositories {
        maven {
            name = "Gitea"
            url = uri("https://gitea.example.com/api/packages/{owner}/maven")

            credentials(HttpHeaderCredentials) {
                name = "Authorization"
                value = "token {access_token}"
            }

            authentication {
                header(HttpHeaderAuthentication)
            }
        }
    }
}
```

## 發佈軟體包

要發佈軟體包，只需运行以下命令：

```shell
mvn deploy
```

或者，如果您使用的是 Gradle，請使用 `gradle` 命令和 `publishAllPublicationsToGiteaRepository` 任务：

```groovy
./gradlew publishAllPublicationsToGiteaRepository
```

如果您想要将预构建的軟體包發佈到註冊表中，可以使用 [`mvn deploy:deploy-file`](https://maven.apache.org/plugins/maven-deploy-plugin/deploy-file-mojo.html) 命令：

```shell
mvn deploy:deploy-file -Durl=https://gitea.example.com/api/packages/{owner}/maven -DrepositoryId=gitea -Dfile=/path/to/package.jar
```

| 參數    | 描述           |
| ------- | -------------- |
| `owner` | 軟體包的所有者 |

如果存在相同名稱和版本的軟體包，您無法發佈該軟體包。您必須先删除現有的軟體包。

## 安裝軟體包

要从軟體包註冊表中安裝 Maven 軟體包，請在项目的 `pom.xml` 文件中添加新的依赖项：

```xml
<dependency>
  <groupId>com.test.package</groupId>
  <artifactId>test_project</artifactId>
  <version>1.0.0</version>
</dependency>
```

在 `Gradle Groovy` 中类似的操作如下：

```groovy
implementation "com.test.package:test_project:1.0.0"
```

然后运行：

```shell
mvn install
```

## 支持的命令

```
mvn install
mvn deploy
mvn dependency:get:
```
