<!--
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-26 21:14:37
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2024-01-12 15:22:29
 * @FilePath: \oms-platform-app\src\App.vue
 * @Description:
-->
<script lang="ts">
import { defineComponent } from 'vue';
import Taro, { Current, getEnv } from '@tarojs/taro';
import type { Options } from '@/interface';
export default defineComponent({
  // 初始化完成时触发（全局只触发一次）
  onLaunch() {
    console.log('onLaunch', Current.app, Taro);
  },

  // 启动，或从后台进入前台显示
  onShow(options: Options) {
    const env = getEnv();
    let app = Taro.getApp();

    const sleep = (time: any) =>
      new Promise(resolve => {
        setTimeout(resolve, time);
      });

    sleep(0).then(() => {
      app = Taro.getApp();

      if (app) {
        // 初始化配置
        app.init_config();

        // 设置设备信息
        app.set_system_info();

        // 参数处理+缓存
        app.set_launch_cache_info(options);

        // 场景值
        app.set_scene_data(options);

        // 协议验证处理
        if (env === 'WEAPP') {
          app.weixin_privacy_setting();
        }
      }
    });
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
</script>
