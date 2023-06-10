<template>
  <view class="detail-page primary-bg">
    <view class="list">
      <view
        class="list-item"
        v-for="(item, index) in appStore.lastSearch.result"
        :key="index"
      >
        <view v-if="item.baike_info?.image_url" class="list-item-content">
          <view class="img-content">
            <image :src="item.baike_info?.image_url" />
            <view class="img-desc-mask">{{ item.keyword }}</view>
          </view>
          <view class="bike-info-desc">{{ item.baike_info?.description }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 公共数据仓库
import { useAppBaseStore } from '@/store'

// 调用仓库里面的数据
const appStore = useAppBaseStore()
</script>

<style>
/* 整个页面背景 */
.detail-page {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}

/* 列表项样式 */
.list-item-content {
  display: flex;
  margin-bottom: 15rpx;
}

/* 右边 文字盒子的样式 */
.bike-info-desc {
  height: 300rpx;
  overflow: scroll;
  box-sizing: border-box;
  padding: 10rpx;
  font-size: 28rpx;
  font-family: cursive;
  color: rgba(255, 255, 255, 0.8); /*白色半透明*/
}

/* 左边 图片盒子样式 */
.img-content {
  position: relative;
}

/* 遮罩 */
.img-content .img-desc-mask {
  /* 子绝父相 */
  position: absolute;
  height: 80rpx;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  color: rgb(255, 255, 255);
  font-size: 24rpx;
  font-family: cursive;
  /* 设置该样式所在元素为块级弹性容器。*/
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 图片样式 */
.list-item image {
  border-radius: 10rpx;
  width: 300rpx;
  height: 300rpx;
}
</style>
