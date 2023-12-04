/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-03 14:46:06
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-03 20:38:25
 * @FilePath: \oms-platform-app\src\utils\taro\index.ts
 * @Description: Taro工具类
 */
import Taro from '@tarojs/taro';

/**
 *
 * @param urls
 * @param current
 * @returns
 */
export async function viewImage(urls: string[], current?: string) {
  const res = await Taro.previewImage({
    urls,
    current
  });

  return res;
}

/**
 * 判断当前页面是否首页
 * @returns
 */
export function checkHomePage() {
  const currentPages = Taro.getCurrentPages();
  if (currentPages.length) {
    // 当前页是否为首页
    return currentPages[currentPages.length - 1].route === 'pages/index/index';
  }
  return false;
}

/**
 * 检查小程序是否有新版本
 */
export function checkMiniProgramUpdate() {
  // 检查版本更新
  console.log('版本更新：检查版本更新');

  if (!Taro.canIUse('getUpdateManager')) {
    Taro.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请更新到最新的微信后再重试。'
    });
    return;
  }
  const updateManager = Taro.getUpdateManager();

  updateManager.onCheckForUpdate(res => {
    if (res.hasUpdate) {
      // 存在版本更新
      console.log('版本更新：存在新版本');
      updateManager.onUpdateReady(async () => {
        console.log('版本更新：版本更新就绪');
        await Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: async r => {
            if (r.confirm) {
              console.log('版本更新：用户同意更新');
              updateManager.applyUpdate();
            } else if (r.cancel) {
              console.log('版本更新：用户拒绝更新');
              await Taro.exitMiniProgram();
            }
          }
        });
      });

      updateManager.onUpdateFailed(async () => {
        console.log('版本更新：版本更新失败');
        await Taro.showModal({
          title: '已经有新版本了哟~',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
        });
      });
    } else {
      console.log('版本更新：当前为最新版本小程序');
    }
  });
}

export function appLogin() {
  // 获取设备信息
  Taro.getSystemInfo().then(systemInfo => {
    console.log('登录成功', systemInfo);
  });

  Taro.login().then(ret => {
    console.log('登录成功', ret);
  });
}
