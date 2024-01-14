/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-03 14:46:06
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2024-01-12 15:24:11
 * @FilePath: \oms-platform-app\src\utils\taro\index.ts
 * @Description: Taro工具类
 */
import Taro, { getCurrentPages, navigateTo, switchTab, redirectTo, reLaunch } from '@tarojs/taro';

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
 * @returns boolean
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
      updateManager.onUpdateReady(async () => {
        await Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: async r => {
            if (r.confirm) {
              updateManager.applyUpdate();
            } else if (r.cancel) {
              await Taro.exitMiniProgram();
            }
          }
        });
      });

      updateManager.onUpdateFailed(async () => {
        await Taro.showModal({
          title: '已经有新版本了哟~',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
        });
      });
    }
  });
}

/* 获取当前页url */
export const getCurrentPageUrl = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const url = currentPage.route ?? '';
  return url;
};

// 跳转至登录页
export const pageToLogin = () => {
  const path = getCurrentPageUrl();
  if (!path.includes('login')) {
    navigateTo({
      url: '/pages/login/index'
    });
  }
};

// 跳转到首页
export const pageToHome = () => {
  const path = getCurrentPageUrl();
  if (!path.includes('index')) {
    navigateTo({
      url: '/pages/index/index'
    });
  }
};

export const navigateBack = async (delta = 1) => {
  try {
    const success = await Taro.navigateBack({ delta });
    return Promise.resolve(success);
  } catch (error) {
    pageToHome();
    console.log(error);
    return Promise.reject(error);
  }
};

export const toUrl = (obj: any) => {
  const arr = [];
  if (obj && typeof obj === 'object') {
    for (const i in obj) {
      arr.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`);
    }
  }
  return arr.join('&');
};

/**
 * 跳转路由
 * @param {*} param0
 */
export const navigateToUrl = async ({ url, data }: any) => {
  const params = data ? `?${toUrl(data)}` : '';
  // TODO 补充路由封装参数
  try {
    const success = await navigateTo({
      url: url + params
    });
    return Promise.resolve(success);
  } catch (error) {
    console.log(error);
    pageToHome();
    return Promise.reject(error);
  }
};

export const switchTabUrl = async ({ url }: any) => {
  try {
    const success = await switchTab({
      url
    });
    return Promise.resolve(success);
  } catch (error) {
    console.log(error);
    pageToHome();
    return Promise.reject(error);
  }
};

export const redirectToUrl = async ({ url, data }: any) => {
  const params = data ? `?${toUrl(data)}` : '';
  try {
    const success = await redirectTo({
      url: url + params
    });
    return Promise.resolve(success);
  } catch (error) {
    console.log(error);
    pageToHome();
    return Promise.reject(error);
  }
};

export const reLaunchUrl = async ({ url, data }: any) => {
  const params = data ? `?${toUrl(data)}` : '';
  try {
    const success = await reLaunch({
      url: url + params
    });
    return Promise.resolve(success);
  } catch (error) {
    console.log(error);
    pageToHome();
    return Promise.reject(error);
  }
};

/**
 * toast 提示
 * @param {*} title
 */
export const showToast = (title: string, icon: any = 'none', mask = false) => {
  Taro.showToast({
    title,
    mask,
    icon,
    duration: 2000
  }).then(r => r);
};

/**
 * loading
 * @param {*} title
 * @param {*} mask
 */
export const showLoading = (title = '加载中...', mask = false) => {
  Taro.showLoading({
    title,
    mask
  }).then(r => r);
};

export const hideLoading = () => {
  Taro.hideLoading();
};

/**
 * 选择图片
 * @param {*} num
 * @param {*} length
 * @param {*} sizeType
 * @param {*} sourceType
 * @returns
 */
export const chooseImage = (
  num: any, // 最大选择数
  length = 0, // 已选数量
  sizeType: any = ['compressed'],
  sourceType: any = ['album', 'camera']
) => {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      count: num - length,
      sizeType,
      sourceType
    }).then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      }
    );
  });
};

/**
 * 选择视频
 * @param {*} sourceType
 * @param {*} maxDuration
 * @param {*} compressed
 * @returns
 */
export const chooseVideo = (sourceType: any = ['camera', 'album'], maxDuration = 60, compressed = true) => {
  return new Promise((resolve, reject) => {
    Taro.chooseVideo({
      sourceType,
      maxDuration,
      compressed,
      success: res => {
        if (res.duration > maxDuration) return showToast(`视频时长超过${maxDuration}s，请重新选择`);
        resolve(res);
      }
    });
  });
};

/**
 * 上传图片到服务器
 * @param {*} data
 * @param {*} type
 * @param {*} url
 * @param {*} fileType
 * @returns
 */
export const uploadFile = (data: any, type: any, url: any, fileType = 'IMG') => {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url,
      filePath: data,
      name: 'file',
      header: {},
      formData: {
        fileType,
        type
      },
      success: res => {
        if (res.statusCode !== 200) {
          showToast('文件上传失败');
          reject(res);
          return;
        }
        const jsonStr = JSON.parse(res.data);
        resolve(jsonStr);
      },
      fail: res => {
        reject(res);
      }
    });
  });
};

/**
 * 用户授权状态
 * @param {*} type
 * @returns
 */
export const getSetting = (type: any) => {
  return new Promise((resolve, reject) => {
    Taro.getSetting({
      success: res => {
        // @ts-ignore
        const recordAuth = res.authSetting[type];
        resolve(recordAuth);
      },
      fail() {
        showToast('error', '鉴权失败，请重试');
      }
    });
  });
};

/**
 * promise 模态框
 * @param {*} title
 * @param {*} content
 * @param {*} showCancel
 * @param {*} confirmText
 * @param {*} cancelText
 * @returns
 */
export const showModal = (
  content: any,
  title = '提示',
  showCancel = false,
  confirmText = '确定',
  cancelText = '取消'
) => {
  return new Promise((resolve, reject) => {
    Taro.showModal({
      title,
      content,
      showCancel,
      cancelText,
      confirmText,
      success: success => {
        resolve(success);
      },
      fail: error => {
        reject(error);
      }
    });
  });
};
