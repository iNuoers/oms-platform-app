# 使用vue3-oop开发小程序

- vue3
- tsx + vue3-oop
- 依赖注入
  
## 准备工作：Vscode 插件安装

- Eslint
- Prettier
- Volar

## 开发

```shell
pnpm i
pnpm run dev:weapp
```

然后打开微信开发工具 项目目录指向 dist 目录 填写自己的 AppId 或者使用测试 AppId

### 开发h5

```shell
pnpm run dev:h5
```

## 打包

类似vue-cli一样根据mode来加载环境变量

```shell
pnpm run dev --mode master
```

会加载 `.env.master` 环境变量


