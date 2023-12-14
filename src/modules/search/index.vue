<!--
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-10 11:21:42
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-14 19:59:57
 * @FilePath: \oms-platform-app\src\modules\search\index.vue
 * @Description: 文本查询页面
-->
<template>
  <basic-layout>
    <custom-navbar v-if="!isH5" />
    <main class="search-page bg-white min-h-[100vh]">
      <div class="w-full h-auto m-0 pb-0">
        <div class="flex flex-col h-auto min-h-[calc(100vh-50px)]">
          <!-- 条件筛选 -->
          <div class="relative flex-center px-4 py-2">
            <div class="pt-[10px] pb-[5px] w-full">
              <div class="nav-box flex flex-row justify-between items-center p-[4px] rounded bg-[#f4f5f8]">
                <div
                  v-for="(item, index) in filterData"
                  :key="index"
                  class="flex-center flex-1"
                  @click="onFilterEvent(item)"
                >
                  <div
                    class="flex items-center flex-col w-full"
                    :class="{ 'bg-white rounded shadow-light-500': currentFilter === item }"
                  >
                    <div class="relative flex-center rounded-[30px] h-[30px] w-[85px]">
                      <span class="text-sm pr-[5px]">
                        <span>{{ item }}</span>
                      </span>
                      <span v-if="index > 0" class="text-20px i-iconamoon:arrow-down-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <nut-popup
              v-model:visible="filterPopupVisible"
              position="bottom"
              closeable
              round
              :style="{ height: '40%' }"
            >
              <div class="flex items-center bg-[#f7f8fa]">
                <div class="flex-center flex-1 p-4 text-[#111] font-medium">{{ currentFilter }}</div>
              </div>
              <div class="filter-popup-box pt-2.5 h-[calc(100%-56px)]">
                <nut-grid :gutter="10">
                  <nut-grid-item text="全部应用" class="active"></nut-grid-item>
                  <nut-grid-item text="全部应用"></nut-grid-item>
                  <nut-grid-item text="全部应用"></nut-grid-item>
                  <nut-grid-item text="全部应用"></nut-grid-item>
                  <nut-grid-item text="全部应用"></nut-grid-item>
                  <nut-grid-item text="全部应用"></nut-grid-item>
                  <nut-grid-item text="全部应用"></nut-grid-item>
                  <nut-grid-item text="全部应用"></nut-grid-item>
                </nut-grid>
              </div>
            </nut-popup>
          </div>
          <div>
            <!-- 文本输入 -->
            <div v-show="!isFocus" class="input-box px-4">
              <nut-textarea
                v-model="content"
                class="min-h-[204px]"
                placeholder="请输入要查询的文字"
                @click="switchText()"
              />
            </div>
            <div v-show="isFocus" class="focus-input relative h-full px-4 pb-0">
              <nut-textarea
                ref="textAreaRef"
                v-model="content"
                autofocus
                class="min-h-[204px] max-h-[666px]"
                placeholder="请输入要查询的文字"
                @input="calcTextareaHeight"
              />
              <div class="text-area-line mt-3 w-full h-[2px] bg-[#4e5969] rounded-[50%]"></div>
            </div>
          </div>
          <div class="flex-1"></div>
          <!-- footer -->
          <div></div>
        </div>
      </div>
    </main>
  </basic-layout>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
const content = ref<string>('');

const isH5 = process.env.TARO_ENV === 'h5';

const currentFilter = ref<string>('词库选择');
const filterPopupVisible = ref<boolean>(false);
const filterData = ref<string[]>(['词库选择', '选择行业', '选择等级']);

const isFocus = ref<boolean>(false);
const textAreaRef = ref();
const textAreaHeight = ref<number>(36);

const onFilterEvent = (item: string) => {
  currentFilter.value = item;
  filterPopupVisible.value = true;
};

const calcTextareaHeight = () => {
  textAreaHeight.value += 30;
};

const switchText = () => {
  isFocus.value = !isFocus.value;
  if (isFocus.value) {
    setTimeout(() => {
      console.log(textAreaRef.value);
      nextTick(calcTextareaHeight);
    });
  }
};

watch(
  () => content.value,
  () => {
    nextTick(calcTextareaHeight);
  }
);
</script>

<style lang="scss">
.search-page {
  .input-box,
  .focus-input {
    .nut-textarea {
      padding: 0;
    }

    .nut-textarea__textarea {
      padding: 16px 12px 8px 16px;
      background: #f7f8fa;
      border-radius: 12px;
      font-size: 24px;
      font-weight: 500;
      line-height: 30px;
      font-family: inherit;
      color: rgb(29, 33, 41);
    }
  }

  .focus-input {
    .nut-textarea__textarea {
      border-radius: 0;
      padding: 0 36px 0 0;
      background: #fff;
    }
  }

  .filter-popup-box {
    .nut-grid-item__content {
      padding: 6px;
      background: #f7f8fa;
      border-radius: 4px;
      border: none;
    }

    .nut-grid-item__text {
      color: #303133;
      margin-top: 0;
    }

    .active {
      .nut-grid-item__content {
        background: #2259e5;
      }

      .nut-grid-item__text {
        color: #fff;
      }
    }
  }
}
</style>
