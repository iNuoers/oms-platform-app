/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-23 14:30:13
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-23 14:30:27
 * @FilePath: \oms-platform-app\src\utils\platform.ts
 * @Description:
 */
import Taro from '@tarojs/taro';

const Platform = {
  OS: (() => {
    const systemInfo = Taro.getSystemInfoSync();
    // 虽然说网上说的是模拟器获取的system是devtools,但是实际测试 iOS 10.0.1
    // h5端返回的system为null
    const system = systemInfo.system?.toLowerCase();
    if (system?.indexOf('ios') >= 0) {
      return 'ios';
    } else if (system?.indexOf('android') >= 0) {
      return 'android';
    } else if (system?.indexOf('devtools') >= 0 || process.env.TARO_ENV === 'h5') {
      return 'web';
    }
    return system;
  })(),

  /**
   * 操作系统版本号
   * 注意:RN中获取的是一个数字，ios获取的类似"10.3"
   */
  Version: (() => {
    // iOS 10.0.1
    return Taro.getSystemInfoSync().version?.split(' ')[1]?.trim();
  })()
};

export default Platform;
