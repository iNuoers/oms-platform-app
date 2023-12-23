<!--
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-06 08:03:33
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-23 19:17:05
 * @FilePath: \oms-platform-app\src\modules\user\index.vue
 * @Description:
-->
<template>
  <basic-layout show-tab-bar>
    <div class="user-page bg-[#f8f8f8] min-h-[100vh] pb-[60px]" :style="{ paddingTop: pxTransform(statusBarHeight) }">
      <!-- 用户信息 -->
      <div class="user-info pt-[7px] px-[15px] pb-[12px] flex flex-nowrap items-center">
        <nut-avatar shape="round">
          <img :src="defaultHeadImg" alt="Head Image" class="rounded-full" />
        </nut-avatar>
        <div class="flex-1 ml-[15px]">
          <div class="text-[18px] font-bold">登录 / 注册</div>
          <div class="text-[12px] mt-[5px]">欢迎来到 - 偶查查</div>
        </div>
        <span class="text-30px i-iconamoon:arrow-right-2" />
      </div>

      <!-- 金刚区域 -->
      <div
        class="flex-y-center flex-nowrap justify-between text-center rounded-lg text-[#666] bg-[hsla(0,0%,100%,.7)] px-0 py-[15px] info-num m-[15px]"
      >
        <div class="w-[25%] text-[18px] font-bold text-[#1a1a1a]">
          <a href="/user/book" class="">
            -
            <p class="mt-[5px] text-[12px] font-normal">查询记录</p>
          </a>
        </div>
        <div class="w-[25%] text-[18px] font-bold text-[#1a1a1a]">
          <a href="/user/book" class="">
            -
            <p class="mt-[5px] text-[12px] font-normal">会员权益</p>
          </a>
        </div>
        <div class="w-[25%] text-[18px] font-bold text-[#1a1a1a]">
          <a href="/user/resource" class="">
            -
            <p class="mt-[5px] text-[12px] font-normal">我的积分</p>
          </a>
        </div>
      </div>

      <!-- 快捷菜单 -->
      <div class="rounded-lg bg-[hsla(0,0%,100%,.7)] m-4 mt-0 pt-2.5">
        <a href="/service/feedback/recode" class="flex flex-nowrap items-center justify-between px-4 py-0 h-[54px]">
          <img
            :class="{ 'w-[24px] h-[24px]': isH5 }"
            :style="{ width: isH5 ? '' : '24px', height: isH5 ? '' : '24px' }"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAACQVJREFUaEPtWXuMVGcV/53vzsw+eSlkdmaZBgsuJpgas4ZGY+q2UREsYIsBGlYqIjS2jTFCoRUWZgnowhZEW4lS7RaWV0XQWMBUJa79Tw1aH5QCGyW7O3PvlqiRfc7jfsecy710dtmduTM8EhNvMtm5e797vvP7nfc3hP/xi0rVn5mdd4mIS5VxO97zDYCZlegLQI9W2gUjz5mI9O1QzK8MXwCY2SAi2xMq9z09CMn99OlIj3qmCoDI3fOWrZcXgMesKHi++z/vCRmhBWxjAYjrAHrfdUD8DzBdIgNn0nb6zJzYpH8JwDEs5e3lKS33jkX9sj3WunEB5Pr4xZ6hxwloAjBTNHY3zpXn/a8TxFvqaiuPjhEj4mJ62rRpNcFgcFIkEvn7uXPnMq6ski2RD4DjCm93D7cq4vWutp4beew5JnA/8l2Yh2Z6/gOx8mckbpqbmxGPx4VlFYlENhBRs7vubwBWJZPJP7n3N1y0GIuMCUA2FuUvdQ+2gGgjAE+4o2Ce6911zDvrYpXPNjTEAx0d8Ww0Gm0FIETkulBCa/2oZVm/LxXETQA85S/2DK0k4ICrvJeB/JAjCmpmbYD1Y7PvmXAsFos9b9v2OgBZV1HZV74HAJgAPluqJUYAEL+VFGlZXHUtM/QmiGa5QSYAfF+sNZMyqKy87O2H7n//rwcG+p9WSnkKvwzgZ8zcTkQT3RjoBvC5ZDL5x2ItMRqAky4vJYZWgSEbjRWweYForREIBBAMGtjT0oyj7T9AMBjMMHOQmQ+ZpvlFsWo4HP6kUuonHghm7mbmz1iW9VYxIEYA+A1z4EGi7KWe4RMAP5pjZl/sa82O4rZto3XHJpw41qbLKyqFBIOZD5qmuQZAes6cOaHz58+nI5HIPAAniKhc1mitOwEsLgbEDQCe+1y+zGVcMfwGgLmu/xcKXAecx7zWaax7ejU6zp7GxIlTtG1nlVLqQDKZFOadau1+RK4tIIjoOIBqcSdmvpLNZj999erVy34skQvAyTydicGYZuoAcK9f/2dmGIaCYQTx9ScbcfZXr2Hy5Pfq4eFBdf9HG6y9L7Y/MDNWfjkejwfi8bjEgncFAWRqamoWiDsBTnUXYBcAPJJMJi8WqhO3DECYV4ZCKBTE3p1xtL30XUycNBnatjmbzdI9M+4d/tjH5837zu74Gw0NDYGOjo5cAF7tsKPR6EIARwFUukr/NRAIfKKrq+vfruXGrNi35ELCvFKifBn27tqKAz96AZWVVUinUlCGEMkaDMXQFwwj6DHquE5uUNXX1welKkcikUeI6KTEiViDiJYlEokfu+l2NHBHRMlB7DCvFMrKgvj2rm04+MMXUFVVhb7+Pqz80lO478NzsWXjk6xt2zaCwQBrfVkptaCnp0cCdQQID4BrhZ97AAAsTyaTr/oG4HWdhdJoLvN7WjajvW0fKquqMdB3Dcsa12BD0w6Ul4fw2k9P8rZNX7VlvatErm97IJy/4XB4sWEYRwBUuMRetG37gd7e3nd8uZDT1IwoZMN/BjnNm9PHeCYX5iVgg8EAdrfEcfjl76GqegIGBvuxbMVqbGjaiUwmw3Y2S5MnV701/8G5rVai60UjEKhwZ4pOpdR8scSsWbPKOjs7U+FweKFS6jgRSWUWQN1a6yWWZf0hn/I3uZALwslGY7USuczv/tYmHGrb5yjf39+Hx77wBDZs3o5MxmbbtrVSyhge7F9xX920IzNmzFiWSqUOETkeK0peYOYlpmleyGFeaoEQZTHzw6ZpnisqjeYG1bvN3HALiJ1mTmtNhqHUDebbrjM/2N+P5SufwPpNO5DNZGSdjJnC4o666RWb165dG9y/f7+kyqVKqVcAlLmK/kVr/RIRfZOInBowivmbgn2salqwnb7UPdzK0OslYAPBIPa0NOFw2z5UVFXzYH8fGlc9xeuea+ZMJgvb1oZSSjNj1+xYxXOuy0iDJcpka2pqPk9ER917x2Xl/67rFMW8B8bXQNNppZYHDDzbun3Lh44c+D5XVldzOpVSKx7/Cr62sRmZdJrFQkTUycRNs2srj+Uo77XPDqPRaHQxgMMAqgCkmLmMmZPSzLk+74v5ggC8oD5+/LhaunSpPXPmzP0D/QNrjIBhp9Nptaxx9cAz39ieTqWyV+xs9mIgZBQaKR3Fampq5rutQ5XEBDP3MfMiy7Kk+kt8jJnvx2vGCg31zhgYi8W2ZbPZpuvu4ZxO7EwkEk2nTp0KDg0NpQSgt4EXP6M2dBSLRqOLmNnJNq6cfmZealnWL/wEbFEx4KWv2traOmb+LRHVSBaSoEskEptcYUIAFzhWGZ3nvWyT1FqvcJkvym1ygeSzgCO0trb2IWY+67rUm6ZpfkSsEo/HaevWrRKg4w7kORV2EQCvJRC5PW6el1GyaLfxC8Az+6cA/NIF8LppmvNz5tp8c4LH/CLDMKRJKynPFxpE8lnAASBBp5Q64wo6nUwmHy4kFIDTJheosCW7TbEWkDZXGixx9pOmaS4pAOCuMO8njToWyGlxZep61bKs5XkAOO/cDeZ9A3BbAGlp5XJGQzc4RwRvfX095fT0Uqi8lsFk5oV+exsf7jliScEYiEQijUTU7r71SjKZXDXGmOfUC9daAlbuZZDvJqLFpZ75+AFTEEA0GhWFvSOWd5hZvkvh8t6VFkKq5zQAKwBMcJ+V1Nv4UbqoIHYH7tOjTtXG28c5vGLmLiKSg6pbOvf0AyafBZwqKykxEokcIyI5Jxox3IzawHtW8imbH4VHrynUCznro9FoJTM3ApiRp4jJmc4/pVEzTbPL7W1KPfv3fdzuB4A3ThajjGe9UkiVd3zv6QeAo4TMr3LOU0ijK1euCFDfDI4jT5KEL8LyKeSkxqlTp0ZCodBuIprFzN4vKoVwlPrcOUcFcM227abe3t7fFT3U5+zsVeIlRCTHfqK89Dh3+vIyWbtpmiu9vmq8TQu20+Fw+IOGYbwOIOym0oJudBsQktb6y5ZlHSw06PhSZsqUKZPKy8vlx447eslsobUOEJHlZrKC+/kCUFDKnVngK5P5BSDr/K69HXByf/nMK+9uKnU7gN0k4/8A7gitRQj9L2Gfsm3R0IBnAAAAAElFTkSuQmCC"
            alt=""
          />
          <div class="flex-1 ml-2.5">我的反馈</div>
          <div class="arrow">
            <img
              :class="{ 'w-[12px] h-[12px]': isH5 }"
              :style="{ width: isH5 ? '' : '12px', height: isH5 ? '' : '12px' }"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAa1JREFUSEvNls1Kw0AQx2c29ePopQgi9UWkV6FFqIfmbhUT0n2FahTfwNhsC4Ln9NCD2gcQfBArlEpQPFuzI2m7RaH5KI1grjuZX3b+M/8JQsxDRNjpdFgYUq1WJSJSXPy8M1z0hUXjEwGO266hhHXfHwjbtmUmAM/zNF3XA8d1awzYzTgpUcOyzEt1lhY09wYqieu2awQUAr5CBEOqmKbZWwQSWyLbtll+c+sOgUrTL37RGOwahtEPGyCN6JGAMHlYc8dxdpi28ggAhXGlgHo5hhXDMEZpILE3mGnhiBLT8GFaqhwQXViWeaY+Ik6PxC5SSZpNcQ6IpwrCkMpp9EgEqDLYnrea9z+6yGZ69GWgFTk/fo67SSJg0qETQVutVkFKeCKA7Yke2PNfB/tx85EKECZTely57p4G7B4ANABAknhYr5/cRrXu/wD8aYl+ifz23kVANXR9GYyKnPPlRI5qUxlQmfNk20g1aEKIkqSMBy3SKiT2/PzGga3rn0tbxZ+ZXZRdS6QKz8Ku5y0cSdTgWS2cn+54LcQRAKz5w2F2KzPtOkwTF9umWfy2fANH3UQocopNtwAAAABJRU5ErkJggg=="
              alt=""
            />
          </div>
        </a>
        <a href="/user/order" class="flex flex-nowrap items-center justify-between px-4 py-0 h-[54px]">
          <img
            :class="{ 'w-[24px] h-[24px]': isH5 }"
            :style="{ width: isH5 ? '' : '24px', height: isH5 ? '' : '24px' }"
            src="data:image/png;base64,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"
            alt=""
          />
          <div class="flex-1 ml-2.5">我的订单</div>
          <div class="arrow">
            <img
              :class="{ 'w-[12px] h-[12px]': isH5 }"
              :style="{ width: isH5 ? '' : '12px', height: isH5 ? '' : '12px' }"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAa1JREFUSEvNls1Kw0AQx2c29ePopQgi9UWkV6FFqIfmbhUT0n2FahTfwNhsC4Ln9NCD2gcQfBArlEpQPFuzI2m7RaH5KI1grjuZX3b+M/8JQsxDRNjpdFgYUq1WJSJSXPy8M1z0hUXjEwGO266hhHXfHwjbtmUmAM/zNF3XA8d1awzYzTgpUcOyzEt1lhY09wYqieu2awQUAr5CBEOqmKbZWwQSWyLbtll+c+sOgUrTL37RGOwahtEPGyCN6JGAMHlYc8dxdpi28ggAhXGlgHo5hhXDMEZpILE3mGnhiBLT8GFaqhwQXViWeaY+Ik6PxC5SSZpNcQ6IpwrCkMpp9EgEqDLYnrea9z+6yGZ69GWgFTk/fo67SSJg0qETQVutVkFKeCKA7Yke2PNfB/tx85EKECZTely57p4G7B4ANABAknhYr5/cRrXu/wD8aYl+ifz23kVANXR9GYyKnPPlRI5qUxlQmfNk20g1aEKIkqSMBy3SKiT2/PzGga3rn0tbxZ+ZXZRdS6QKz8Ku5y0cSdTgWS2cn+54LcQRAKz5w2F2KzPtOkwTF9umWfy2fANH3UQocopNtwAAAABJRU5ErkJggg=="
              alt=""
            />
          </div>
        </a>
        <a href="/user/address" class="flex flex-nowrap items-center justify-between px-4 py-0 h-[54px]">
          <img
            :class="{ 'w-[24px] h-[24px]': isH5 }"
            :style="{ width: isH5 ? '' : '24px', height: isH5 ? '' : '24px' }"
            src="data:image/png;base64,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"
            alt=""
          />
          <div class="flex-1 ml-2.5">收货地址</div>
          <div class="arrow">
            <img
              :class="{ 'w-[12px] h-[12px]': isH5 }"
              :style="{ width: isH5 ? '' : '12px', height: isH5 ? '' : '12px' }"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAa1JREFUSEvNls1Kw0AQx2c29ePopQgi9UWkV6FFqIfmbhUT0n2FahTfwNhsC4Ln9NCD2gcQfBArlEpQPFuzI2m7RaH5KI1grjuZX3b+M/8JQsxDRNjpdFgYUq1WJSJSXPy8M1z0hUXjEwGO266hhHXfHwjbtmUmAM/zNF3XA8d1awzYzTgpUcOyzEt1lhY09wYqieu2awQUAr5CBEOqmKbZWwQSWyLbtll+c+sOgUrTL37RGOwahtEPGyCN6JGAMHlYc8dxdpi28ggAhXGlgHo5hhXDMEZpILE3mGnhiBLT8GFaqhwQXViWeaY+Ik6PxC5SSZpNcQ6IpwrCkMpp9EgEqDLYnrea9z+6yGZ69GWgFTk/fo67SSJg0qETQVutVkFKeCKA7Yke2PNfB/tx85EKECZTely57p4G7B4ANABAknhYr5/cRrXu/wD8aYl+ifz23kVANXR9GYyKnPPlRI5qUxlQmfNk20g1aEKIkqSMBy3SKiT2/PzGga3rn0tbxZ+ZXZRdS6QKz8Ku5y0cSdTgWS2cn+54LcQRAKz5w2F2KzPtOkwTF9umWfy2fANH3UQocopNtwAAAABJRU5ErkJggg=="
              alt=""
            />
          </div>
        </a>
        <a href="/support/record" class="flex flex-nowrap items-center justify-between px-4 py-0 h-[54px]">
          <img
            :class="{ 'w-[24px] h-[24px]': isH5 }"
            :style="{ width: isH5 ? '' : '24px', height: isH5 ? '' : '24px' }"
            src="data:image/png;base64,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"
            alt=""
          />
          <div class="flex-1 ml-2.5">投稿记录</div>
          <div class="arrow">
            <img
              :class="{ 'w-[12px] h-[12px]': isH5 }"
              :style="{ width: isH5 ? '' : '12px', height: isH5 ? '' : '12px' }"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAa1JREFUSEvNls1Kw0AQx2c29ePopQgi9UWkV6FFqIfmbhUT0n2FahTfwNhsC4Ln9NCD2gcQfBArlEpQPFuzI2m7RaH5KI1grjuZX3b+M/8JQsxDRNjpdFgYUq1WJSJSXPy8M1z0hUXjEwGO266hhHXfHwjbtmUmAM/zNF3XA8d1awzYzTgpUcOyzEt1lhY09wYqieu2awQUAr5CBEOqmKbZWwQSWyLbtll+c+sOgUrTL37RGOwahtEPGyCN6JGAMHlYc8dxdpi28ggAhXGlgHo5hhXDMEZpILE3mGnhiBLT8GFaqhwQXViWeaY+Ik6PxC5SSZpNcQ6IpwrCkMpp9EgEqDLYnrea9z+6yGZ69GWgFTk/fo67SSJg0qETQVutVkFKeCKA7Yke2PNfB/tx85EKECZTely57p4G7B4ANABAknhYr5/cRrXu/wD8aYl+ifz23kVANXR9GYyKnPPlRI5qUxlQmfNk20g1aEKIkqSMBy3SKiT2/PzGga3rn0tbxZ+ZXZRdS6QKz8Ku5y0cSdTgWS2cn+54LcQRAKz5w2F2KzPtOkwTF9umWfy2fANH3UQocopNtwAAAABJRU5ErkJggg=="
              alt=""
            />
          </div>
        </a>
        <a href="/support/editorjoin" class="flex flex-nowrap items-center justify-between px-4 py-0 h-[54px]">
          <img
            :class="{ 'w-[24px] h-[24px]': isH5 }"
            :style="{ width: isH5 ? '' : '24px', height: isH5 ? '' : '24px' }"
            src="data:image/png;base64,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"
            alt=""
          />
          <div class="flex-1 ml-2.5">教师加盟</div>
          <div class="arrow">
            <img
              :class="{ 'w-[12px] h-[12px]': isH5 }"
              :style="{ width: isH5 ? '' : '12px', height: isH5 ? '' : '12px' }"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAa1JREFUSEvNls1Kw0AQx2c29ePopQgi9UWkV6FFqIfmbhUT0n2FahTfwNhsC4Ln9NCD2gcQfBArlEpQPFuzI2m7RaH5KI1grjuZX3b+M/8JQsxDRNjpdFgYUq1WJSJSXPy8M1z0hUXjEwGO266hhHXfHwjbtmUmAM/zNF3XA8d1awzYzTgpUcOyzEt1lhY09wYqieu2awQUAr5CBEOqmKbZWwQSWyLbtll+c+sOgUrTL37RGOwahtEPGyCN6JGAMHlYc8dxdpi28ggAhXGlgHo5hhXDMEZpILE3mGnhiBLT8GFaqhwQXViWeaY+Ik6PxC5SSZpNcQ6IpwrCkMpp9EgEqDLYnrea9z+6yGZ69GWgFTk/fo67SSJg0qETQVutVkFKeCKA7Yke2PNfB/tx85EKECZTely57p4G7B4ANABAknhYr5/cRrXu/wD8aYl+ifz23kVANXR9GYyKnPPlRI5qUxlQmfNk20g1aEKIkqSMBy3SKiT2/PzGga3rn0tbxZ+ZXZRdS6QKz8Ku5y0cSdTgWS2cn+54LcQRAKz5w2F2KzPtOkwTF9umWfy2fANH3UQocopNtwAAAABJRU5ErkJggg=="
              alt=""
            />
          </div>
        </a>
      </div>

      <!-- 快捷入口 -->
      <div class="rounded-lg bg-[hsla(0,0%,100%,.7)] m-4 mt-0 pt-2.5">
        <a href="/user/question" class="flex flex-nowrap items-center justify-between px-4 py-0 h-[54px]">
          <img
            :class="{ 'w-[24px] h-[24px]': isH5 }"
            :style="{ width: isH5 ? '' : '24px', height: isH5 ? '' : '24px' }"
            src="data:image/png;base64,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"
            alt=""
          />
          <div class="flex-1 ml-2.5">常见问题</div>
          <div class="arrow">
            <img
              :class="{ 'w-[12px] h-[12px]': isH5 }"
              :style="{ width: isH5 ? '' : '12px', height: isH5 ? '' : '12px' }"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAa1JREFUSEvNls1Kw0AQx2c29ePopQgi9UWkV6FFqIfmbhUT0n2FahTfwNhsC4Ln9NCD2gcQfBArlEpQPFuzI2m7RaH5KI1grjuZX3b+M/8JQsxDRNjpdFgYUq1WJSJSXPy8M1z0hUXjEwGO266hhHXfHwjbtmUmAM/zNF3XA8d1awzYzTgpUcOyzEt1lhY09wYqieu2awQUAr5CBEOqmKbZWwQSWyLbtll+c+sOgUrTL37RGOwahtEPGyCN6JGAMHlYc8dxdpi28ggAhXGlgHo5hhXDMEZpILE3mGnhiBLT8GFaqhwQXViWeaY+Ik6PxC5SSZpNcQ6IpwrCkMpp9EgEqDLYnrea9z+6yGZ69GWgFTk/fo67SSJg0qETQVutVkFKeCKA7Yke2PNfB/tx85EKECZTely57p4G7B4ANABAknhYr5/cRrXu/wD8aYl+ifz23kVANXR9GYyKnPPlRI5qUxlQmfNk20g1aEKIkqSMBy3SKiT2/PzGga3rn0tbxZ+ZXZRdS6QKz8Ku5y0cSdTgWS2cn+54LcQRAKz5w2F2KzPtOkwTF9umWfy2fANH3UQocopNtwAAAABJRU5ErkJggg=="
              alt=""
            />
          </div>
        </a>
        <a href="/user/setting" class="flex flex-nowrap items-center justify-between px-4 py-0 h-[54px]">
          <img
            :class="{ 'w-[24px] h-[24px]': isH5 }"
            :style="{ width: isH5 ? '' : '24px', height: isH5 ? '' : '24px' }"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAACihJREFUaEPtWQ1slPUZ/z3/9+69oxXQSu3dewVB5+bWLfGDqFsU0G1KqswPInPTIcTEKOrm6gdqhLVg4uL3BATNgmD8LDqFOSiaCGocYwGVuDJjkHbae+8IWKCU9np37/9ZnrfvW47rXXutdcRkb9Kkd/f/+P2e7+d5Cd/yh4aLn5ndvUTEwz1jJPaVTIC5XgE/IOBqnQ+6l8waBexkono9EsBKPaMkAsyNBtEsxz9UPgMwvc/po3+rV/9LEgMS8CUrAJmbKuBwLTTVgvBdAJM8Ai1gfAbF62HQeqLp7b0E+2uqVKkOZV1RArk2ztmN1wO8AIxTAYjNH7WPWb5jYsaurKMXhsoufUlMrqGhHvX1ReHIOV/bfwYg0GsKnNnwMEB3ejB8MxKwpLWGYShGwGBACR4xLQDBR4im3iVCKMHJZY/4zbDIFCQg0usF3/RHAPMB+MBdgMy9NxrBMNjpwcH2TnzZtg8MdkQ5hkFGy+49y2dcuXj5hAkRM5vN9gPX2dnZ2tHRsd8DPmwS/Qj0gU83zQZhtQdexOuuZc2gQACOVnhrwxasXPUOdnzSikwm2yt8MSawDoWCqrs7rbVmh1ko93t6AGxj5qWJRGIdADlA7hiSJvJsuVflzBvL4fDHYHzHU68QgOAgI4Durh7ce98qrH5+M5QiBAyFVCrdh9A1bg2tFCnTDCAUCrp78x7flyQsv8DMN9m23TVUEnkEesMlp5vmgrAy12Fd8KSQdjTmzVuGF196D5WVY3Hg4GFUnTQW3z99fD5IVooomdz/5e6WPa2mGQzmaELAnw6gAoAwN4notXg8/mvvc8mayCOwKUB0YZYzTa8BuMpTa0Akpx0NFSrHMyvW4o67V+LEitHo6krjhrk/c/9OnnBSXmxy/cbQrNeEy2fMmjNnTviTVauc7b1qIMuyTgEgweEGn4TW+tZkMrlM9uX43YBRtY+AHzGY14eQVe8BOMc7xHClHwwg0bYPP79kIdr3dyKVyqDu9hm4f+EcMDsgncm/yCUAYAuME6cSTc7kRSVXypZlPQTgLs9E9yqlzorH422lmlIOAS/y8MbxcPRmMImEJNgox9EwQuW4Z/7TePqZjTAMA2edOQlr19ZjVEghm3Ek8uQTcPcC+DyV7ZpWVjazrbGx0Zg1a5Zfagi5rGVZZQDeBTDZO2C5bdvzStXCoAQcRysjNArb/7kTV139ILJZjWw2i9XP1mF67XnQPV1QhuvjhQkQdsHITCOaEfcjXM5C11Qsy7ocwBve9ykiuigej28phcTgJsRsIBjAddc+gvUbtoMIuOzSc7D6uTpwJiPVaD/kXsRxtGaDGf94e9OuabW1v+0pkth8U1oL4BfeYW/atj1jQOP3fhzQiR1HZ41QWWBN4zuYd8sKmKaBcNjEunULUFNzCnQ6BaWOSF+Ay58KBgAyskBA/nmeaMpvmLcFiSaLX+SXEK4WotHoZCISUxol9q+1vj6ZTD43mBaKhlEGr6SAwfsPdNFVVz6A5p1fIJ3Oou53l2Nhwxw4PYeljMgRkoAnUDCMzoMH0Nz8H/54Ryt99OHnrz/953UPnn32KZ9t3777YBHn9E3pYS8yiWb/RURT29ra2gdy6KKJzOlxdhihslMff2wNL1r8Mo0aZcKKnoCNTQ04sfJ4cCZ7xHy80kIFDax7YwsaFr0MO7HfyWSzQolCoaBEsjgR1cXj8UbPuXP7BteMIpFIpVLqQwDVXlS6N5FISDlTNKwWLyX4/dktu3avnl7bwJ2HUzh0qJuW/ulGzJ5be5T0JcG6bhAwcP99z2HJsr8hHA5qw1BKNCS/ez7hRiWt9dJkMnlbTkXrp2gXZCwWu5mZn/JMbX8mkzl37969u4ppoVg16h52ycXnbdj577bpHR1dmalTalTjK/cYITMA1rpP+lKRKrMMa19/D7PnPI7jjhvl1iOmaXza3Z1+2/ORiwDU+HkFwK9s2345T7KuFiZOnBhOp9ObAJznJtAjhCWhegXXEcstREAMW1dVVU1yHGwyTeNkRaRfeP4uNWXaGY5Od4njyj4pqUEBxZ0dXTT1wvuoLf6VEwwaRmXl2Nevu+6CG++885l9clVFRcWYcDj8BIC53tVfptPpmn379h3Kk6wruKqqqssMw5ACT+75wnGcaXv27GkpYHpHNybe4S7T6urqmQC/msk4UvPs/mj7E90BRSLFvoZGa4YyTWz9ezOumPmgoxQZhqF2WFZsytatWztqamrctrO5uTk9ceLE49PptGT4HwGQrPzTRCLxfiFQYpCWZUke8JPblbZtS57op4VCGvDD2u+J6DGJ893dPX/46qu9D2VSG2YFDTUdxN8DaJLjaDJCoz99YNGzJzy59M3TTDOomNnNpAJegAsB/3/LssS2b/ZM4+5kMilRJ99BXQuIRqOLieh+z5nrEonE44WceVACnlYW27a90JeW39R/8EFL4Pzz5x8aN+6kOtMMPOqtfcq27Vu+LgHLshYBWDAcAq6aotHoTCJ61QO1LRqN/mTbtvk6r1l3pTV+fPQCx6F3PBV/YprmlNbW1gPHyoT6nNgwjM0AJvT2MlybSCSajmiBqaGhgerr6/W4ceNGm6bZDGC8R/jZVCp1e3t7e8cQndg3n+lEtH64Tix3ulqIRCJLlFK3eqDeN03z4tbW1lShyGFZ1jUAXsoJlUJItCLPUMPoWwAu8PYus21bMJQcRmWfG5MrKytPCwaD2wCM7p0i0rx4PL68UPyWTTmE/VI6tx7LT2R993iLRjSRyZmuOiORyAKllDiUPG1a67OSyeTeApnRXW9Z1i8BiEPHchp0EUgcwB22bb/yjZYSOSJztVBdXV3BzO8y8w+93x6xbVs6qEL1ibtHfCIYDJ7JzOe6YibamslkPiqQuPzrRqaYy9V3rlojkchspZSMWMSbDyqlpsXj8Y8LkHAztNfJFTiud/qVNzrxTecMrfVmIhrrbbzG09aA/XGxWqjf5ZZl/RXAZd4Pa23bvmKAMtcn4p/vgy408/EbGsm00pnJM7yGppDIfCnHYrEfM7NElbC37grbtqWLKnmCUEzDI9JSFgF/lI1Go9HlRHST96VMSKZ4wygJcX3j90HOyj3Tb+qlRjrbM9EViURCyo2SBFOqCblqjsVi1VrrD4mo0kPxsG3bd5c6AskjNrJjlRKk5kcKSSpL/GEUACnQnrRtW8rdUueaMtiS9wsSzfoGWwBus217aanSdyNcCcD9Ja7EAIRisdiLzCyTO3csCED61k+HcF6h0eJfvNGiDH39uwaFNxQCPmGZppUR0QpmvtZLSv1eegx685G+YuSGuyVc2kdCapNoNCpznNuISBoP/51ZiccgzcxSpiwZsfF6qTd7KpakJJGHxowZc0J5ebn/zqykYw4fPtzyjbzgKOn23kVifj6JIWzrt3TYb2eG6sQDgfQz71CIfLMv+YaC5FiuHWoUOpZYC979fwLHWiXfeg38F34cSnyS5nU1AAAAAElFTkSuQmCC"
            alt=""
          />
          <div class="flex-1 ml-2.5">设置</div>
          <div class="arrow">
            <img
              :class="{ 'w-[12px] h-[12px]': isH5 }"
              :style="{ width: isH5 ? '' : '12px', height: isH5 ? '' : '12px' }"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAa1JREFUSEvNls1Kw0AQx2c29ePopQgi9UWkV6FFqIfmbhUT0n2FahTfwNhsC4Ln9NCD2gcQfBArlEpQPFuzI2m7RaH5KI1grjuZX3b+M/8JQsxDRNjpdFgYUq1WJSJSXPy8M1z0hUXjEwGO266hhHXfHwjbtmUmAM/zNF3XA8d1awzYzTgpUcOyzEt1lhY09wYqieu2awQUAr5CBEOqmKbZWwQSWyLbtll+c+sOgUrTL37RGOwahtEPGyCN6JGAMHlYc8dxdpi28ggAhXGlgHo5hhXDMEZpILE3mGnhiBLT8GFaqhwQXViWeaY+Ik6PxC5SSZpNcQ6IpwrCkMpp9EgEqDLYnrea9z+6yGZ69GWgFTk/fo67SSJg0qETQVutVkFKeCKA7Yke2PNfB/tx85EKECZTely57p4G7B4ANABAknhYr5/cRrXu/wD8aYl+ifz23kVANXR9GYyKnPPlRI5qUxlQmfNk20g1aEKIkqSMBy3SKiT2/PzGga3rn0tbxZ+ZXZRdS6QKz8Ku5y0cSdTgWS2cn+54LcQRAKz5w2F2KzPtOkwTF9umWfy2fANH3UQocopNtwAAAABJRU5ErkJggg=="
              alt=""
            />
          </div>
        </a>
      </div>
    </div>
  </basic-layout>
</template>
<script setup lang="ts">
import { getEnv, pxTransform } from '@tarojs/taro';
import { useNavInfo } from '@/hooks';
import defaultHeadImg from '@/assets/imgs/default-headimg.png';

const { navInfo } = useNavInfo();

const env = getEnv();
const isH5 = env === 'WEB';

const statusBarHeight = navInfo.appHeaderHeight;
</script>

<style lang="scss">
.user-page {
  background: #f8f8f8 url(https://m.tesoon.com/assets/img/index_bg.246025bf.png) no-repeat top;
  background-size: 100%;

  .user-info {
    .nut-avatar {
      border: 2px solid hsla(0, 0%, 100%, 0.3) !important;
    }
  }
}
</style>
