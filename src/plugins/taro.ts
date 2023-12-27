import type { App } from 'vue';
import Taro, { setGlobalDataPlugin } from '@tarojs/taro';

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
      cache_user_info_key: 'cache_shop_user_info_key',

      // 设备信息缓存key
      cache_system_info_key: 'cache_shop_system_info_key',

      // 启动参数缓存key
      cache_launch_info_key: 'cache_shop_launch_info_key',

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
    }
  });

  console.log(app, 'app');
}
