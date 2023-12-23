/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-02 18:40:29
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-23 14:26:54
 * @FilePath: \oms-platform-app\src\utils\storage\local.ts
 * @Description:
 */
import { setStorageSync, getStorageSync, removeStorageSync, clearStorage } from '@tarojs/taro';

interface StorageData<T> {
  value: T;
  expire: number | null;
}

/**
 * 本地缓存接口
 * @returns 一个本地缓存对象，可以设置缓存值和缓存时间
 */
function createLocalStorage<T extends StorageInterface.Local = StorageInterface.Local>() {
  /** 默认缓存期限为7天 */
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

  function set<K extends keyof T>(key: K, value: T[K], expire: number | null = DEFAULT_CACHE_TIME) {
    const storageData: StorageData<T[K]> = {
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null
    };
    const json = JSON.stringify(storageData);
    setStorageSync(key as string, json);
  }

  function get<K extends keyof T>(key: K) {
    const json = getStorageSync(key as string);
    if (json) {
      const storageData: StorageData<T[K]> | null = JSON.parse(json);
      if (storageData) {
        const { value, expire } = storageData;
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
          return value as T[K];
        }
      }
      remove(key);
      return null;
    }
    return null;
  }

  function remove(key: keyof T) {
    removeStorageSync(key as string);
  }
  function clear() {
    clearStorage();
  }

  return {
    set,
    get,
    remove,
    clear
  };
}

export const localStg = createLocalStorage();
