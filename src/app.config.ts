/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-02 18:40:29
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-06 08:06:47
 * @FilePath: \oms-platform-app\src\app.config.ts
 * @Description:
 */
export default defineAppConfig({
  pages: ['pages/index/index'],
  window: {
    backgroundColor: '#fff',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '偶查查',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  subPackages: [
    {
      root: 'modules',
      pages: ['user/index']
    }
  ]
});
