<!--
 * @Author: Ben 550461173@qq.com
 * @Date: 2024-01-12 15:26:43
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2024-01-13 11:36:11
 * @FilePath: \oms-platform-app\src\components\basic-tabbar\index.vue
 * @Description:
-->
<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <nut-tabbar :model-value="activeTab" bottom placeholder safe-area-inset-bottom @tab-switch="tabSwitch">
      <nut-tabbar-item v-for="item in tabBar.list" :key="item.pagePath" :name="item.pagePath" :tab-title="item.text">
        <template #icon>
          <div class="text-25px" :class="item.icon" />
        </template>
      </nut-tabbar-item>
    </nut-tabbar>
  </nut-config-provider>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { navigateTo } from '@tarojs/taro';
import { useAppStore, useThemeStore } from '@/store';

const tabBar = {
  custom: true,
  color: '#000000',
  selectedColor: '#FF0000',
  list: [
    {
      pagePath: '/modules/search/index',
      text: '首页',
      icon: 'i-local-wind'
    },
    {
      pagePath: '/modules/user/index',
      text: '个人中心',
      icon: 'i-local-custom-icon'
    }
  ]
};

const themeStore = useThemeStore();
const theme = computed(() => themeStore.theme);
const themeVars = computed(() => themeStore.themeVars);

const appStore = useAppStore();
const activeTab = computed(() => appStore.getActiveTab);

/**
 * 切换tab
 * @param item
 * @param url
 */
const tabSwitch = (item: any, url: string) => {
  appStore.setActiveTab(url);
  navigateTo({ url });
};
</script>
<script lang="ts">
export default {
  options: {
    addGlobalClass: true
  }
};
</script>

<style lang="scss"></style>
