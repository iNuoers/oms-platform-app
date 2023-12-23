import Taro from '@tarojs/taro';

/**
 * 生成参数
 * @param params 参数对象
 * @returns string
 */
const generateParams = (params: any) => {
  const paramArray: string[] = [];
  if (typeof params === 'object') {
    for (const key in params) {
      // 对象且不为null
      if (typeof params[key] === 'object' && params[key]) {
        // Map对象需要特殊处理
        if (params[key] instanceof Map) {
          paramArray.push(`${key}=${JSON.stringify(Object.fromEntries(params[key]))}`);
        } else {
          paramArray.push(`${key}=${JSON.stringify(params[key])}`);
        }
      } else {
        // 针对于null、undefined,直接传递空的就行,否则会被转换成null、undefined字符串
        paramArray.push(`${key}=${params[key]}`);
      }
    }
  }
  let ext = '';
  if (paramArray.length > 0) {
    ext = `?${paramArray.join('&')}`;
  }
  return ext;
};

/**
 *
 */
export default class NavigationHelper {
  static navigation: any;

  static navRouters: Array<Taro.Page>;

  static CANTOUCH = true;

  // 延迟的时间
  static delay = 0.8;

  static canTouch() {
    if (this.CANTOUCH) {
      this.CANTOUCH = false;
      setTimeout(() => {
        this.CANTOUCH = true;
      }, this.delay * 1000);
      return true;
    }
    return false;
  }

  /**
   * 当前是不是最顶层的页面
   * @param routePath  路径
   * @returns {boolean}
   */
  static isTopScreen(routePath: any) {
    const pages = Taro.getCurrentPages();
    // 处理下routePath,如果是/开头的,则去掉
    if (routePath && routePath[0] === '/') {
      routePath = routePath.substr(1);
    }
    return pages[pages.length - 1].route === routePath;
  }

  /**
   *
   * @param routeName
   * @returns
   */
  static isTopScreenByName(routeName: string) {
    const pages = Taro.getCurrentPages();
    // 处理下routePath，如果是/开头的，则去掉
    if (routeName && routeName[0] === '/') {
      routeName = routeName.substr(1);
    }
    return pages[pages.length - 1].route === routeName;
  }

  /**
   *
   */
  static goBack() {
    Taro.navigateBack({
      delta: 1
    });
  }

  /**
   *
   * @param routeName
   * @param params
   * @returns
   */
  static navigate(routeName: string, params?: any) {
    if (!this.canTouch()) {
      return;
    }
    const ext = generateParams(params);
    console.log(routeName + ext);
    Taro.navigateTo({
      url: routeName + ext
    });
  }

  /**
   *
   * @param routeName
   * @param params
   */
  static push(routeName: any, params?: any) {
    NavigationHelper.navigate(routeName, params);
  }

  /**
   * 重置到某个页面，但是不支持tab
   * @param routeName
   * @param params
   */
  static resetTo(routeName: string, params?: any) {
    if (!this.canTouch()) {
      return;
    }
    const ext = generateParams(params);
    Taro.redirectTo({
      url: routeName + ext
    });
  }

  /**
   * 只支持tab页面
   * @param routeName
   * @param params
   */
  static switchTab(routeName: string, params?: any) {
    if (!this.canTouch()) {
      return;
    }
    const ext = generateParams(params);
    Taro.switchTab({
      url: routeName + ext
    });
  }

  static popN(num: number) {
    if (!this.canTouch()) {
      return;
    }
    Taro.navigateBack({
      delta: num
    });
  }

  /**
   * 用新的页面替换当前页面
   * @param routeName
   * @param params
   */
  static replace(routeName: string, params?: any) {
    const ext = generateParams(params);
    Taro.redirectTo({
      url: routeName + ext
    });
  }

  /**
   *
   * @returns
   */
  static popToTop() {
    if (!this.canTouch()) {
      return;
    }
    const numToPop = this.navRouters.length - 1;
    this.popN(numToPop);
  }

  /**
   *
   * @param indexOfRoute
   * @returns
   */
  static popToIndex(indexOfRoute: number) {
    if (!this.canTouch()) {
      return;
    }
    const numToPop = this.navRouters.length - 1 - indexOfRoute;
    this.popN(numToPop);
  }

  /**
   *
   * @param routeName
   * @returns
   */
  static popToRoute(routeName: string) {
    if (!this.canTouch()) {
      return;
    }
    const index = this.navRouters.map(x => x.name).indexOf(routeName);
    if (index >= 0) {
      const length = this.navRouters.length - index + 1;
      this.popN(length);
    } else {
      console.info('找不到路由');
    }
  }

  /**
   * 刷新路由栈中的某一页面的某个方法
   * ps：只支持小程序
   */
  static reloadPage(routeName: any, params?: any, methodName = 'reloadData', reloadAll = false) {
    if (process.env.TARO_ENV === 'weapp') {
      if (routeName.indexOf('/') === 0) {
        routeName = routeName.substr(1);
      }
      const pages = Taro.getCurrentPages();
      if (reloadAll) {
        pages.forEach((x, index) => {
          // eslint-disable-next-line no-console
          console.log(x);
          if (pages[index].data[methodName]) {
            pages[index].data[methodName](params);
          }
        });
      } else {
        let targetPageIndex = -1;
        pages.forEach((x, index) => {
          // 实际获取的route不是/开头
          if (x.route === routeName) {
            targetPageIndex = index;
          }
        });
        if (targetPageIndex >= 0 && pages[targetPageIndex].data[methodName]) {
          pages[targetPageIndex].data[methodName](params);
        }
      }
    }
  }
}
