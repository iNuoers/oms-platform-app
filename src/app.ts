/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-02 18:40:29
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-27 08:02:05
 * @FilePath: \oms-platform-app\src\app.ts
 * @Description:
 */
import { createApp } from 'vue';
import { getEnv } from '@tarojs/taro';
import type { Options } from '@/interface';
import { checkMiniProgramUpdate } from '@/utils/taro';
import { setupStore, useAppStore } from './store';
import { setupAssets, setupTaro } from './plugins';

const env = getEnv();

const App = createApp({
  // 启动，或从后台进入前台显示
  onShow() {
    if (env !== 'WEB') {
      checkMiniProgramUpdate();
    }
  },
  // 初始化完成时触发（全局只触发一次）
  onLaunch(options: Options) {
    // 将启动参数放进到全局去
    const system = useAppStore();
    system.appInit(options);
    // system.setAppInfo(Taro.getSystemInfoSync());
  },
  // 从前台进入后台
  onHide() {
    console.log('onHide');
  },
  // 监听应用退出
  onExit() {
    console.log('onExit');
  }
});

function setupApp() {
  /** 引入静态资源 */
  setupAssets();

  setupTaro(App);

  /** 挂载store */
  setupStore(App);
}

setupApp();

export default App;
