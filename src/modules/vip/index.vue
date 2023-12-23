<!--
 * @Author = ref(Ben 550461173@qq.com
 * @Date = ref(2023-12-14 20:02:25
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-23 19:43:27
 * @FilePath = ref(\oms-platform-app\src\modules\vip\index.vue
 * @Description:
-->
<template>
  <basic-layout>
    <div class="vip-page relative w-full overflow-hidden bg-[#f8f8f8] min-h-[calc(100vh-55px)]">
      <!-- 头部用户信息 -->
      <div class="user-container-tab svip-bg user-tab relative w-full bg-[#26262b] pb-[10px] -mb-[2.5px]">
        <div class="user-tab-box flex-center mt-[30px] mb-[25px]">
          <!-- <image v-if="userLogin == true" :src="userData.headUrl" class="head-img" />
				<image v-else src="https://oss.jinyongci.com/weapp/imgs/logo/default-avator.png" class="head-img" /> -->
          <div>
            <div class="user-info flex items-center justify-start text-white text-[18px] font-bold">
              <div class="user-name">您当前为游客</div>
              <image
                v-if="userLogin == true"
                class="vip-icon"
                src="https://oss.jinyongci.com/weapp/imgs/vip/vip_free.png"
              />
              <div v-if="userLogin == true" class="change-account">切换账号</div>
              <div v-else class="change-account text-[12px]">点击登录</div>
            </div>
            <div v-if="userLogin == true" class="open-vip">成为会员，行业筛选更精准</div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="vip-container">
        <!-- Start 会员类型切换 -->
        <div class="package-tab">
          <div class="package-tab-one">
            VIP
            <div class="active"></div>
          </div>
        </div>
        <div class="commodity-container bg-white">
          <!-- 商品列表 -->
          <div v-if="goodsSelected" class="vip_package_container">
            <div>
              <div class="package_item">
                <!-- <div class="package_item_top">
                  <div class="package_name">{{ item.skuName }}</div>
                  <div class="package_discount_price">
                    ￥
                    <div class="price">{{ item.price }}</div>
                  </div>
                </div>
                <div v-if="currentGoods == 'qvip'" class="package_item_bottom">
                  每天仅需{{ (item.price / (item.quantity * 365) / 31).toFixed(2) }}元
                </div>
                <div v-else class="package_item_bottom">
                  每天仅需{{ (item.price / item.quantity / 31).toFixed(2) }}元
                </div>
                <div v-if="item.slogan" class="ad_tag">{{ item.slogan }}</div> -->
              </div>
            </div>
          </div>
          <div v-else class="vip_package_container">loading...</div>
          <div class="statement">*本商品属于虚拟商品，购买后未使用才可退款</div>
          <div class="coupon">
            <div class="l"><span class="title">优惠券/码</span></div>
            <div v-if="promotion.usePromoCode" class="r">
              已减免
              <span class="coupon-amount">{{ promotion.amount }}元</span>
              <span
                @click="
                  showPop = true;
                  promotion.code = '';
                "
              >
                更换
              </span>
              <span>不使用</span>
            </div>
            <div v-else class="r" @click="showPop = true"><span class="des">点此输入优惠券/码</span></div>
          </div>
          <u-popup v-model="showPop" mode="bottom" border-radius="14" height="140px" :mask-close-able="false">
            <div class="coupon_wrapper">
              <!-- <u-form>
							<u-form-item label="输入优惠码" :label-width="150">
								<u-input placeholder="输入优惠码" type="text" border class="lt-input"
									v-model="promotion.code"></u-input>
							</u-form-item>
						</u-form> -->
              <div class="coupon-btn">
                <!-- <u-button style="margin-right:20px" v-if="promotion.code == ''">确定</u-button>
							<u-button v-else type="primary" style="margin-right:20px" @click="handlePromotionCode">确定
							</u-button>
							<u-button class="default-btn" @click="showPop = false;promotion.code = ''">取消</u-button> -->
              </div>
            </div>
          </u-popup>
        </div>
        <!-- 购买说明 -->
        <div class="explain">
          <div class="explain_title">购买说明</div>
          <div>
            <div class="explain_content">
              <div>
                1. 开通会员即视为您同意·
                <span class="agreement">
                  <!-- <u-link href="https://www.jinyongci.com/about/vip.html" target="_blank">会员服务协议</u-link> -->
                </span>
              </div>
            </div>
            <div class="explain_content">
              <div>2. 购买的会员以自然天计算，多次购买可累加，会员可在禁用词查询官网、小程序使用；</div>
            </div>
            <div class="explain_content">
              <div>
                3. 若您在购买前后有任何问题，请·
                <span class="agreement">联系客服</span>
                ，我们会为您尽快解决。
              </div>
            </div>
          </div>
        </div>
        <!-- 会员权益 -->
        <div class="pricing">
          <div class="pricing_title">- VIP权益 -</div>
          <div class="pricing_funcs">
            <div class="funcs-type">
              <div class="title">功能</div>
              <div class="line"></div>
            </div>
            <div class="funcs-item">
              <div class="left">快速的在线检索工具</div>
              <div class="right">
                <svg>
                  <path
                    d="M13.452 3.26l-7.697 7.583-3.207-3.159a.92.92 0 00-1.283 0 .886.886 0 000 1.264l3.843 3.786.005.005a.91.91 0 00.642.261.912.912 0 00.642-.261l.005-.005 8.333-8.21a.886.886 0 000-1.263.92.92 0 00-1.283 0z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="funcs-item flex justify-between py-8">
              <div class="left">20+特定行业</div>
              <div class="right">
                <svg>
                  <path
                    d="M13.452 3.26l-7.697 7.583-3.207-3.159a.92.92 0 00-1.283 0 .886.886 0 000 1.264l3.843 3.786.005.005a.91.91 0 00.642.261.912.912 0 00.642-.261l.005-.005 8.333-8.21a.886.886 0 000-1.263.92.92 0 00-1.283 0z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <template v-if="currentGoods == 'vip'">
              <div class="funcs-item flex justify-between py-8">
                <div class="left">文字查询数量</div>
                <div class="right">100万字/月</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">图片查询数量</div>
                <div class="right">500张/月</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">文档查询数量</div>
                <div class="right">100个/月</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">网址查询数量</div>
                <div class="right">200个/月</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">商品查询数量</div>
                <div class="right">20个/月</div>
              </div>
            </template>
            <template v-if="currentGoods == 'svip'">
              <div class="funcs-item flex justify-between py-8">
                <div class="left">文字查询数量</div>
                <div class="right">200万字/月</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">图片查询数量</div>
                <div class="right">1000张/月</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">文档查询数量</div>
                <div class="right">200个/月</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">网址查询数量</div>
                <div class="right">500个/月</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">商品查询数量</div>
                <div class="right">50个/月</div>
              </div>
            </template>
            <template v-if="currentGoods == 'qvip'">
              <div class="funcs-item flex justify-between py-8">
                <div class="left">文字查询数量</div>
                <div class="right">每个账户4,800,000字</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">图片查询数量</div>
                <div class="right">每个账户6,000张</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">文档查询数量</div>
                <div class="right">每个账户3,000个</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">网址查询数量</div>
                <div class="right">每个账户6,000个</div>
              </div>
              <div class="funcs-item flex justify-between py-8">
                <div class="left">商品查询数量</div>
                <div class="right">每个账户50个</div>
              </div>
            </template>
            <div class="funcs-item flex justify-between py-8">
              <div class="left">查询历史留档</div>
              <div class="right">
                <svg>
                  <path
                    d="M13.452 3.26l-7.697 7.583-3.207-3.159a.92.92 0 00-1.283 0 .886.886 0 000 1.264l3.843 3.786.005.005a.91.91 0 00.642.261.912.912 0 00.642-.261l.005-.005 8.333-8.21a.886.886 0 000-1.263.92.92 0 00-1.283 0z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="funcs-item flex justify-between py-8">
              <div class="left">查询结果下载</div>
              <div class="right">仅支持PC网页版</div>
            </div>
            <div class="funcs-item flex justify-between py-8">
              <div class="left">登录日志</div>
              <div class="right">
                <svg>
                  <path
                    d="M13.452 3.26l-7.697 7.583-3.207-3.159a.92.92 0 00-1.283 0 .886.886 0 000 1.264l3.843 3.786.005.005a.91.91 0 00.642.261.912.912 0 00.642-.261l.005-.005 8.333-8.21a.886.886 0 000-1.263.92.92 0 00-1.283 0z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="funcs-item flex justify-between py-8">
              <div class="left">身份标识</div>
              <div class="right">
                <svg>
                  <path
                    d="M13.452 3.26l-7.697 7.583-3.207-3.159a.92.92 0 00-1.283 0 .886.886 0 000 1.264l3.843 3.786.005.005a.91.91 0 00.642.261.912.912 0 00.642-.261l.005-.005 8.333-8.21a.886.886 0 000-1.263.92.92 0 00-1.283 0z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="funcs-type">
              <span class="title">发票</span>
              <span class="line"></span>
            </div>
            <div class="funcs-item">
              <div class="left">发票</div>
              <div class="right">企业/个人抬头</div>
            </div>
          </div>
        </div>
        <!-- 更多信息提示 -->
        <div class="more-func">
          更多功能、权益详情，请使用电脑浏览器访问
          <!-- <u-link
            href="https://www.jinyongci.com/vip/index.html?source=m.jinyongci.com/vip/vip"
            target="_blank"
            style="color = ref(rgb(59, 130, 246)"
          >
            www.jinyongci.com
          </u-link> -->
          查看
        </div>
        <!-- Start 底部信息&支付按钮 -->
        <div class="bottom-wrap h-[78px]">
          <div class="bottom-area-container">
            <div v-if="time > 0" class="bottom-area-coupon bottom-[78px]">
              <div class="content">
                <div class="text-center w-full">限时特惠 | 距结束仅剩：</div>
              </div>
            </div>

            <div class="bottom-area-box">
              <div class="info-area-union">
                <div class="first-line flex items-end justify-start">
                  <div class="price-des">实付：</div>
                  <div class="price-num">¥ {{ payPrice }}</div>
                </div>
              </div>
              <div class="purchase-area">
                <div class="purchase-btn">立即开通</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </basic-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const userLogin = ref(false);
const goodsSelected = ref(null);
const time = ref(0);
const showPop = ref(false);
/**
 * 优惠券信息
 * */
const promotion = ref({
  code: '',
  // 1.满减 2.折扣
  type: 1,
  // 折扣率
  discount: 0,
  amount: 0,
  minAmount: 0,
  usePromoCode: false
});
// 授权令牌
// 商品价格
const payPrice = ref(0);
// 当前选择商品类型
const currentGoods = ref('');
</script>

<style></style>
