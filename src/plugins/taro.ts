import type { App } from 'vue';
import Taro, { getEnv, setGlobalDataPlugin } from '@tarojs/taro';
import { fetchDemo } from '@/service';

export function setupTaro(app: App) {
  app.use(setGlobalDataPlugin, {
    data: {
      // ***** 基础配置 *****
      // 数据接口请求地址
      request_url: 'https://api.oxx.cn/',

      // 静态资源地址（如系统根目录不在public目录下面请在静态地址后面加public目录）
      static_url: 'https://oms-1257622367.cos.ap-shanghai.myqcloud.com/app/',

      // 系统类型（默认default、如额外独立小程序、可与程序分身插件实现不同主体小程序及支付独立）
      system_type: 'default',

      // 基础信息
      application_title: '偶查查',
      application_describe: '企业级B2C开源电商系统！',

      // 默认logo、如 /static/images/common/logo.png
      application_logo: '',

      // 版本号
      version: 'v1.0',

      // ***** 公共配置 *****
      // 分享及转发使用页面设置的默认图片及系统默认图片（0 否, 1 是）
      is_share_use_image: 1,

      // 商品详情页底部导航是否开启购物车功能（0 否, 1 是）
      is_goods_bottom_opt_cart: 1,

      // 商品详情页底部导航存在指定返回参数[is_opt_back=1]展示返回按钮（0 否, 1 是）
      is_goods_bottom_opt_back: 1,

      // 用户中心菜单默认展示模式（0 九宫格, 1 列表）
      user_center_nav_show_model_type: 0,

      // 是否开启微信隐私弹窗授权提示、仅首页展示（0否, 1是）
      is_weixin_privacy_setting: 1,
      weixin_privacy_setting_timer: null,

      // ***** 数据缓存key *****
      // 场景值
      cache_scene_key: 'cache_scene_key',

      // uuid缓存key
      cache_user_uuid_key: 'cache_user_uuid_key',

      // 配置信息缓存key
      cache_config_info_key: 'cache_config_info_key',

      // 用户登录缓存key
      cache_user_login_key: 'cache_user_login_key',

      // 用户信息缓存key
      cache_user_info_key: 'cache_user_info_key',

      // 设备信息缓存key
      cache_system_info_key: 'cache_system_info_key',

      // 启动参数缓存key
      cache_launch_info_key: 'cache_launch_info_key',

      // 页面支付临时缓存key
      cache_page_pay_key: 'cache_page_pay_key',

      // 上一页地址缓存key
      cache_prev_page_key: 'cache_prev_page_key',

      // tab页面切换参数
      cache_page_tabbar_switch_params: 'cache_page_tabbar_switch_params_key',

      // 用户基础资料提示间隔key
      cache_user_base_personal_interval_time_key: 'cache_user_base_personal_interval_time_key',

      // 默认用户头像
      default_user_head_src: '/static/images/common/user.png',

      // 成功圆形提示图片
      default_round_success_icon: '/static/images/common/round-success-icon.png',

      // 错误圆形提示图片
      default_round_error_icon: '/static/images/common/round-error-icon.png'
    },

    // 初始化配置
    init_config(): any {
      Taro.setStorageSync(this.data.cache_config_info_key, null);
    },

    // 设置设备信息
    set_system_info() {
      const info = Taro.getSystemInfoSync();
      Taro.setStorageSync(this.data.cache_system_info_key, info);

      return info;
    },

    // 系统参数获取
    get_launch_cache_info(): any {
      return Taro.getStorageSync(this.data.cache_launch_info_key) || null;
    },

    // url参数转json对象
    url_params_to_json(url_params: string) {
      const json = new Object();
      if ((url_params || null) != null) {
        const arr = url_params.split('&');
        for (let i = 0; i < arr.length; i++) {
          const temp = arr[i].split('=');
          // @ts-ignore
          json[temp[0]] = temp[1];
        }
      }
      return json;
    },

    /**
     * 启动参数处理
     */
    launch_params_handle(options: any) {
      // 原有缓存
      const cache_params = this.get_launch_cache_info();
      // 当前参数、从query读取覆盖
      if ((options.query || null) != null) {
        options = options.query;
      }
      // query下scene参数解析处理
      if ((options.scene || null) != null) {
        options = this.url_params_to_json(decodeURIComponent(options.scene));
      }
      // 原始缓存是否存在邀请id、邀请使用最开始的用户id
      if ((options.referrer || null) == null && cache_params != null && (cache_params.referrer || null) != null) {
        options.referrer = cache_params.referrer;
      }
      return options;
    },

    /**
     * 系统参数设置
     */
    set_launch_cache_info(options: any) {
      options = this.launch_params_handle(options);
      Taro.setStorageSync(this.data.cache_launch_info_key, options);
      return options;
    },

    /**
     * 场景值设置
     */
    set_scene_data(options: any) {
      const scene = (options.scene || null) == null ? 0 : parseInt(options.scene);
      Taro.setStorageSync(this.data.cache_scene_key, scene);
      return scene;
    },

    // 获取当前页面地址
    // is_whole 完整地址（?后面的参数）
    get_page_url(is_whole = true) {
      const env = getEnv();
      let url = window.location.href;
      if (env === 'WEAPP') {
        const pages = Taro.getCurrentPages();
        url = pages[pages.length - 1].route ?? '';
      }
      console.log('get_page_url', env, url);
      if (is_whole == false) {
        const temp = url.split('?');
        url = temp[0];
      }
      return url;
    },

    // 微信隐私弹窗提示
    weixin_privacy_setting() {
      if (this.data.is_weixin_privacy_setting == 1) {
        const that = this;
        // @ts-ignore
        that.data.weixin_privacy_setting_timer = setInterval(function () {
          const page = that.get_page_url(false);
          Taro.getPrivacySetting({
            success: res => {
              console.log('weixin_privacy_setting', res);
              if (res.needAuthorization) {
                // 需要弹出隐私协议
                Taro.navigateTo({
                  url: '/pages/common/agreement/agreement'
                });
              }
            }
          });
          // 已执行隐私方法清除定时任务
          // @ts-ignore
          clearInterval(that.data.weixin_privacy_setting_timer);
        }, 100);
      }
    },

    /**
     * 获取用户信息,信息不存在则唤醒授权
     * object     回调操作对象
     * method     回调操作对象的函数
     * params     回调操请求参数
     * return     有用户数据直接返回, 则回调调用者
     */
    get_user_info(object: any, method: any, params: any) {
      const user = this.get_user_cache_info(null, null);
      console.log('[oxx] debugger get_user_info', user);
      if (user == null) {
        // 小程序唤醒用户授权
        if (getEnv() === 'WEAPP') {
          this.user_login(object, method, params);
        } else {
          // h5登录注册
          Taro.showModal({
            title: '温馨提示',
            content: '请先登录或注册',
            confirmText: '确认',
            cancelText: '暂不',
            success: result => {
              if (result.confirm) {
                Taro.navigateTo({
                  url: '/pages/login/login'
                });
              }
            }
          });
        }

        return false;
      }
      return user;
    },

    /**
     * 用户登录
     * object     回调操作对象
     * method     回调操作对象的函数
     * params     回调操请求参数
     */
    user_login(object: any, method: any, params: any) {
      const login_data = Taro.getStorageSync(this.data.cache_user_login_key) || null;

      console.log('[oxx] debugger user_login login_data', login_data);
      if (login_data == null) {
        this.user_login_handle(object, method, params, true);
      } else {
        this.login_to_auth();
      }
    },

    /**
     * 跳转到登录页面授权
     */
    login_to_auth() {
      Taro.showModal({
        title: '温馨提示',
        content: '授权用户信息',
        confirmText: '确认',
        cancelText: '暂不',
        success: result => {
          if (result.confirm) {
            Taro.navigateTo({
              url: '/pages/login/login'
            });
          }
        }
      });
    },

    /**
     * 用户登录处理
     * object     回调操作对象
     * method     回调操作对象的函数
     * params     回调操请求参数
     * is_to_auth 是否进入授权
     */
    user_login_handle(object: any, method: any, params: any, is_to_auth = true) {
      const self = this;

      console.log('[oxx] debugger user_login_handle', object, method, params, is_to_auth);
      Taro.showLoading({
        title: '授权中...'
      });
      Taro.login({
        success: async (res: any) => {
          console.log('[oxx] debugger user_login_handle Taro.login res', res);
          if (res.code) {
            const res = await fetchDemo({ phone: 1 });
            console.log('[oxx] debugger user_login_handle fetchDemo res', res);
          }
        },
        fail: (e: any) => {
          Taro.hideLoading();
          self.showToast('授权失败');
        }
      });
    },

    /**
     * 默认弱提示方法
     * msg    [string]  提示信息
     * status [string]  状态 默认error [正确success, 错误error]
     */
    showToast(msg: string, status: string = 'error') {
      if (status == 'success') {
        Taro.showToast({
          icon: 'success',
          title: msg,
          duration: 3000
        });
      } else {
        Taro.showToast({
          icon: 'none',
          title: msg,
          duration: 3000
        });
      }
    },

    /**
     * 从缓存获取用户信息、可指定key和默认值
     * key              数据key
     * default_value    默认值
     */
    get_user_cache_info(key: string | null, default_value: any | null) {
      const user = Taro.getStorageSync(this.data.cache_user_info_key) || null;
      if (user == null) {
        // 是否存在默认值
        return default_value == undefined ? null : default_value;
      }
      // 是否读取key
      if ((key || null) != null) {
      }
      return user;
    }
  });
}
