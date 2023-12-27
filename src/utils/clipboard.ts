/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-23 14:48:41
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-23 20:23:32
 * @FilePath: \oms-platform-app\src\utils\clipboard.ts
 * @Description: https://github.com/yz1311/taro-utils/blob/main/lib/utils/clipboard.ts
 */
import Taro from '@tarojs/taro';

const Clipboard = {
  /**
   *
   * @returns
   */
  getString: () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<string>(async (resolve, reject) => {
      try {
        const response = await Taro.getClipboardData();
        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  },

  /**
   *
   * @param content
   * @returns
   */
  setString: (content: string) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve, reject) => {
      try {
        await Taro.setClipboardData({
          data: content
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
};

export default Clipboard;
