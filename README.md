## 简介

taro-vue3-pinia 是一个使用 Taro3 + Vue3 + TypeScript + NutUi + pinia + unocss + pnpm 跨端模板，它使用了最新的前端技术栈，内置丰富的插件，有着极高的代码规范，开箱即用的跨端前端解决方案，也可用于学习参考。

## 特性

-   **最新技术栈**：使用 Taro3 + Vue3 + TypeScript + NutUi + pinia + unocss + pnpm 等前端前沿技术开发
-   **TypeScript**: 应用程序级 JavaScript 的语言
-   **代码规范**：丰富的规范插件及极高的代码规范

## 代码仓库

-   [github](https://github.com/yanbowe/taro-vue3-pinia)
-   [gitee](https://gitee.com/zhongjiancrm/taro-vue3-pinia)

## Vscode 插件安装

-   根据项目.vscode 提示安装所需插件
-   建议开启 Volar [Takeover](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode) 模式
-   请使用 pnpm commit 代替 git commit

## 当前实现了的功能

-   Taro3 Vue3 Ts pinia
-   unocss [集成](https://github.com/MellowCo/unocss-preset-weapp)
-   组件库 NutUI
-   小程序分包配置
-   Taro3 配合 Vue DevTools 调试
-   样式封装 1px 问题 底部安全区域适配
-   暗黑模式 & 主题定制

## 小程序分包配置

> 随着业务代码和组件的引入越来越多，主包的大小一定会越来越大，超过 2m 的主包以后微信开发工具就无法使用预览的功能，为了提前做好准备在一开始就进行分包处理，主包只包含组件和公共代码，分包里放入业务代码

```js
// app.config.ts
export default {
	pages: ["pages/index/index"],
	window: {
		backgroundColor: "#fff",
		backgroundTextStyle: "light",
		navigationBarBackgroundColor: "#fff",
		navigationBarTitleText: "Taro3",
		navigationBarTextStyle: "black",
	},
	subpackages: [
		{
			root: "pages/packageA",
			pages: ["index/index"],
		},
	],
};
```

## 主题定制

-   使用 unocss 完善主题定制，需在每个页面引入<basic-layout></basic-layout>作为根组件， 实现方案[ConfigProvider](https://nutui.jd.com/taro/vue/4x/#/zh-CN/component/configprovider)

### 小程序配置细节

需要注意开发者工具的项目设置：

-   需要设置关闭 ES6 转 ES5 功能，开启可能报错
-   需要设置关闭上传代码时样式自动补全，开启可能报错
-   需要设置关闭代码压缩上传，开启可能报错

### 其他限制

-   小程序中不支持 `<style scoped>`，建议使用 cssModules 代替。
-   自定义 navbar 在模拟器上 safe-area-inset-top 失效，真机可以[微信社区](https://developers.weixin.qq.com/community/develop/doc/0000c21ff082c8cefc9a5986b51800?highLine=safe-area-inset-top%25E5%25A4%25B1%25E6%2595%2588)
-   自定义 tabbar 使用 svg 或者 icon，图片会出现抖动问题[微信社区](https://developers.weixin.qq.com/community/develop/doc/000c84de0cc590bbe54b97edf5e414?highline=tabbar)

### 项目目录结构

├── dist 编译结果目录
|
├── config 项目编译配置目录
| ├── index.js 默认配置
| ├── dev.js 开发环境配置
| └── prod.js 生产环境配置
|
├── src 源码目录
| ├── pages 页面文件目录
| | └── index index 页面目录
| | ├── index.js index 页面逻辑
| | ├── index.css index 页面样式
| | └── index.config.js index 页面配置
| |
| ├── app.js 项目入口文件
| ├── app.css 项目总通用样式
| └── app.config.js 项目入口配置
|
├── project.config.json 微信小程序项目配置 project.config.json
├── project.tt.json 字节跳动小程序项目配置 project.config.json
├── project.swan.json 百度小程序项目配置 project.swan.json
├── project.qq.json QQ 小程序项目配置 project.config.json
|
├── babel.config.js Babel 配置
├── tsconfig.json TypeScript 配置
├── .eslintrc ESLint 配置
|
└── package.json
