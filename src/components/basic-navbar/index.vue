import { type } from 'os';
<!--
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-07 21:15:17
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-07 21:43:45
 * @FilePath: \oms-platform-app\src\components\basic-navbar\index.vue
 * @Description:
-->
<template>
  <view class="basic-nav-bar-class basic-nav-bar" :style="[navBarStyle]">
    <view class="basic-nav-bar__bar" :class="[barClass]" :style="[barStyle]">
      <view v-if="isBack">
        <view v-if="customBack">
          <view
            :style="{
              width: customBackStyleInfo.width + 'px',
              height: customBackStyleInfo.height + 'px',
              marginLeft: customBackStyleInfo.left + 'px'
            }"
          >
            <slot name="back"></slot>
          </view>
        </view>
        <view v-else class="basic-nav-bar__bar__action" @tap="handlerBack">
          <text class="basic-nav-bar__bar__action--nav-back" :class="[`tn-icon-${backIcon}`]"></text>
          <text v-if="backTitle" class="basic-nav-bar__bar__action--nav-back-text">{{ backTitle }}</text>
        </view>
      </view>
      <view class="basic-nav-bar__bar__content" :style="[contentStyle]">
        <slot></slot>
      </view>
      <view>
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  // 层级
  zIndex: {
    type: number;
    default: 0;
  };
  // 导航栏的高度
  height: {
    type: number;
    default: 0;
  };
  // 高度单位
  unit: {
    type: string;
    default: 'px';
  };
  // 是否显示返回按钮
  isBack: {
    type: boolean;
    default: true;
  };
  // 返回按钮的图标
  backIcon: {
    type: string;
    default: 'left';
  };
  // 返回按钮旁显示的文字
  backTitle: {
    type: string;
    default: '返回';
  };
  // 透明状态栏
  alpha: {
    type: boolean;
    default: false;
  };
  // 是否固定在顶部
  fixed: {
    type: boolean;
    default: true;
  };
  // 是否显示底部阴影
  bottomShadow: {
    type: boolean;
    default: true;
  };
  // 是否自定义返回按钮
  customBack: {
    type: boolean;
    default: false;
  };
  // 返回前回调
  beforeBack: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    type: Function;
    default: null;
  };
}>();
</script>

<style lang="scss" scoped>
.basic-nav-bar {
  display: block;
  position: relative;

  &__bar {
    display: flex;
    position: relative;
    align-items: center;
    min-height: 100rpx;
    justify-content: space-between;
    min-height: 0px;
    /* #ifdef MP-WEIXIN */
    padding-right: 220rpx;
    /* #endif */
    /* #ifdef MP-ALIPAY */
    padding-right: 150rpx;
    /* #endif */
    box-shadow: 0rpx 0rpx 0rpx;
    z-index: 9999;

    &--fixed {
      position: fixed;
      width: 100%;
      top: 0;
    }

    &--alpha {
      background: transparent !important;
      box-shadow: none !important;
    }

    &--bottom-shadow {
      box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.05);
    }

    &__action {
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: center;
      max-width: 100%;

      &--nav-back {
        /* position: absolute; */
        /* top: 50%; */
        /* left: 20rpx; */
        /* margin-top: -15rpx; */
        // width: 25rpx;
        // height: 25rpx;
        margin-left: 20rpx;
        font-size: 38rpx;
        line-height: 100%;
        // border-width: 0 0 4rpx 4rpx;
        // border-color: #000000;
        // border-style: solid;
        // transform: matrix(0.5, 0.5, -0.5, 0.5, 0, 0);
      }

      &--nav-back-text {
        margin-left: 10rpx;
      }
    }

    &__content {
      position: absolute;
      text-align: center;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      font-size: 32rpx;
      cursor: none;
      // pointer-events: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
