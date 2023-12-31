/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-02 18:40:29
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-23 19:32:39
 * @FilePath: \oms-platform-app\src\app.config.ts
 * @Description:
 */
export default defineAppConfig({
  pages: ['modules/user/index', 'modules/vip/index', 'modules/search/index'],
  window: {
    backgroundColor: '#f8f8f8',
    backgroundColorBottom: '#f8f8f8',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '偶查查',
    navigationBarTextStyle: 'black'
  }
});
