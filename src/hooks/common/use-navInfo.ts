/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-23 14:53:39
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-23 19:10:11
 * @FilePath: \oms-platform-app\src\hooks\common\use-navInfo.ts
 * @Description:
 */
import Taro from '@tarojs/taro';
import type { INavInfo } from '@/interface';

/**
 *
 * @returns
 */
export default function useNavInfo() {
  const { statusBarHeight, screenWidth, screenHeight, windowHeight, pixelRatio } = Taro.getSystemInfoSync();

  // 获取胶囊信息
  const { width, height, left, top, right } = Taro.getMenuButtonBoundingClientRect();
  // 计算标题栏高度
  const titleBarHeight = height + (top - statusBarHeight!) * 2;
  // 计算导航栏高度
  const appHeaderHeight = statusBarHeight! + titleBarHeight;
  // 边距，两边的
  const marginSides = screenWidth - right;
  // 标题宽度
  const titelBarWidth = screenWidth - width - marginSides * 3;
  // 去掉导航栏，屏幕剩余的高度
  const contentHeight = screenHeight - appHeaderHeight;

  const navInfo: INavInfo = {
    // 状态栏高度
    statusBarHeight,
    // 标题栏高度
    titleBarHeight,
    // 标题栏宽度
    titelBarWidth,
    // 整个导航栏高度
    appHeaderHeight,
    // 侧边距
    marginSides,
    // 胶囊宽度
    capsuleWidth: width,
    // 胶囊高度
    capsuleHeight: height,
    capsuleLeft: left,
    contentHeight,
    screenHeight,
    windowHeight,
    pixelRatio
  };

  return { navInfo };
}
