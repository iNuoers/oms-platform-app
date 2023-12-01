/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-11-30 21:31:24
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-01 19:47:38
 * @FilePath: \oms-platform-app\babel.config.js
 * @Description: babel-preset-taro 更多选项和默认值：https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
 */
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'vue3',
        ts: false,
      },
    ],
  ],
}
