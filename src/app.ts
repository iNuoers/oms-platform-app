/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-02 18:40:29
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-09 10:07:13
 * @FilePath: \oms-platform-app\src\app.ts
 * @Description:
 */
import { createApp } from 'vue';
import { getEnv } from '@tarojs/taro';
import { checkMiniProgramUpdate, appLogin } from '@/utils/taro';
import { setupStore } from './store';
import { setupAssets } from './plugins';

const env = getEnv();
const App = createApp({
  mounted() {
    if (env !== 'WEB') {
      appLogin();
    }
  },
  onShow() {
    console.log('app show', env);
    if (env !== 'WEB') {
      checkMiniProgramUpdate();
    }
  }
  /** 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖 */
});

function setupApp() {
  /** 引入静态资源 */
  setupAssets();

  /** 挂载store */
  setupStore(App);
}

setupApp();

export default App;
