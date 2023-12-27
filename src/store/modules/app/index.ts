/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-02 18:40:29
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-23 21:16:13
 * @FilePath: \oms-platform-app\src\store\modules\app\index.ts
 * @Description: https://github.com/strugglinglee/taro-cloud-music/blob/main/src/stores/system.ts
 */
import { defineStore } from 'pinia';
import { useRoutePath } from '@/composables';
import type { Options } from '@/interface';

interface AppState {
  /** 用户信息 */
  activeTab: string;
  options: Options;
  appInfo: Taro.getSystemInfo.Result;
}

export const useAppStore = defineStore('app-store', {
  state: (): AppState => ({
    activeTab: useRoutePath(),
    options: {} as Options,
    appInfo: {} as Taro.getSystemInfo.Result
  }),
  getters: {
    /** 是否登录 */
    getActiveTab: state => state.activeTab
  },
  actions: {
    /**
     * app初始化
     * @param options 选项内容
     */
    appInit(options: Options) {
      console.log('appInit', options);
      this.options = options;
    },

    /**
     *
     * @param info
     */
    setAppInfo(info: Taro.getSystemInfo.Result) {
      console.log('setAppInfo', info);
      this.appInfo = info;
    },

    /**
     * 设置tab
     * @param tab tab
     */
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },

    /** 重置app状态 */
    resetAuthStore() {
      this.$reset();
    }
  }
});
