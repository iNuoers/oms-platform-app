/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-24 20:42:37
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-26 21:35:27
 * @FilePath: \oms-platform-app\src\utils\compareVersion.ts
 * @Description:
 */
/**
 * 版本号比较
 * @param {string} v1 版本号1，形如"2.2.3"
 * @param {string} v2 版本号2
 * @return {number} 比较结果，[-1 小于 | 0 等于 | 1 大于]
 */
export default function compareVersion(v1: any, v2: any) {
  const seq1 =
    (v1 &&
      // eslint-disable-next-line func-names
      v1.split('.').map(function (subVersion: any) {
        // eslint-disable-next-line radix
        return parseInt(subVersion);
      })) ||
    [];
  const seq2 =
    (v2 &&
      // eslint-disable-next-line func-names
      v2.split('.').map(function (subVersion: any) {
        // eslint-disable-next-line radix
        return parseInt(subVersion);
      })) ||
    [];

  const len1 = seq1.length;
  const len2 = seq2.length;
  const commonLen = Math.min(len1, len2);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < commonLen; ++i) {
    if (seq1[i] !== seq2[i]) {
      return seq1[i] < seq2[i] ? -1 : 1;
    }
  }
  // eslint-disable-next-line no-nested-ternary
  return len1 === len2 ? 0 : len1 < len2 ? -1 : 1;
}
