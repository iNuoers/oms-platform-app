<!--
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-02 18:40:29
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-23 19:43:41
 * @FilePath: \oms-platform-app\src\pages\index\index.vue
 * @Description:
-->
<template>
  <basic-layout show-tab-bar>
    <custom-navbar title="首页" />
    <swiper
      class="box"
      :autoplay="true"
      :interval="interval"
      indicator-color="#999"
      @tap="handleTap"
      @animationfinish="handleAnimationFinish"
    >
      <swiper-item>
        <view class="text">1</view>
      </swiper-item>
      <swiper-item>
        <view class="text">2</view>
      </swiper-item>
      <swiper-item>
        <view class="text">3</view>
      </swiper-item>
    </swiper>
    <nut-cell title="基础弹框" @click="baseClick"></nut-cell>
    <nut-cell title="分包A" @click="handleToA"></nut-cell>
    <nut-cell title="分包B" @click="handleToB"></nut-cell>
    <nut-cell title="TSX写法" @click="handleToC"></nut-cell>
    <nut-cell title="Icon" @click="handleToIcon"></nut-cell>
    <nut-dialog v-model:visible="visible1" title="基础弹框" content="这是基础弹框。" />
    <nut-cell>
      <nut-button type="primary" size="mini" class="!mr-20px" @click="handleTheme">切换主题模式</nut-button>
      <nut-button type="primary" size="mini" @click="handleThemeColor">切换主题色</nut-button>
    </nut-cell>
  </basic-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { navigateTo } from '@tarojs/taro';
import { useThemeStore } from '@/store';

const interval = 1000;
const visible1 = ref<boolean>(false);

// eslint-disable-next-line no-empty-function
function handleTap() {}

// eslint-disable-next-line no-empty-function
function handleAnimationFinish() {}

function baseClick() {
  visible1.value = true;
}

function handleToA() {
  navigateTo({
    url: '/modules/user/index'
  });
}

function handleToB() {
  navigateTo({
    url: '/package/package-b/index'
  });
}

function handleToC() {
  navigateTo({
    url: '/package/package-c/index'
  });
}

function handleToIcon() {
  navigateTo({
    url: '/package/icon/index'
  });
}

const themeStore = useThemeStore();
function handleTheme() {
  const mode = themeStore.getTheme === 'light' ? 'dark' : 'light';
  themeStore.setTheme(mode);
}
function handleThemeColor() {
  const color = `#${Math.random().toString(16).substr(2, 6)}`;
  themeStore.setThemeVars({ primaryColor: color, primaryColorEnd: color });
}

/** 设置页面属性 */
definePageConfig({
  navigationBarTitleText: '首页'
});
</script>
