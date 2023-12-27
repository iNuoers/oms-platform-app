/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-24 08:20:42
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-24 08:37:52
 * @FilePath: \oms-platform-app\src\utils\is.ts
 * @Description:
 */
/**
 * 判断是否为手机号
 * @param mobile 手机号
 * @returns 是否为手机号
 */
export function isMobile(mobile: string) {
  const regExp = /^1(?:3[0-9]|4[5-9]|5[0-9]|6[12456]|7[0-8]|8[0-9]|9[0-9])[0-9]{8}$/;
  if (!regExp.test(mobile)) {
    return false;
  }
  return true;
}

/**
 * 判断字符串是否为空
 * @param str 字符串
 * @returns 是否为空
 */
export function isEmpty(str: string | null | undefined) {
  if (str === null || str === undefined || str === '') {
    return true;
  }
  return false;
}
/**
 * 判断是否为固定电话号码
 * @param tel 固定电话号码
 * @returns 是否为固定电话号码
 */
export function isTel(tel: string) {
  const regExp = /^0[1-9][0-9]{1,2}-[2-8][0-9]{6,7}$/;
  if (!regExp.test(tel)) {
    return false;
  }
  return true;
}

/**
 * 判断是否为中文姓名
 * @param name 中文姓名
 * @returns 是否为中文姓名
 */
export function isChineseName(name: string) {
  const reg = /^(?:[\u4e00-\u9fa5·]{2,16})$/;
  if (!reg.test(name)) {
    return false;
  }
  return true;
}

/**
 * 判断数组是否不为空
 * @param arr 数组
 * @returns 数组是否不为空
 */
export const isNotEmpty = (arr: any) => Array.isArray(arr) && arr.length > 0;

/**
 * 判断图片后缀是否存在
 * @param ext 图片后缀
 * @returns 是否存在
 */
export function isExistImg(ext: string) {
  return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'svg'].indexOf(ext?.toLowerCase() ?? '') !== -1;
}
