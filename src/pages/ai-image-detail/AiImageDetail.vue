<template>
  <view class="ai-image-detail primary-bg">
    <view class="detail-wrapper">
      <!-- 头像 -->
      <view class="avatar">
        <image src="../../static/avatar.jpg" />
      </view>

      <!-- 昵称 -->
      <view class="nick-name">混吃等死的咸鱼仔</view>

      <!-- 时间 -->
      <view class="create-time">{{
        appStore.currentAiImageExample.createTime || '2023-06-10'
      }}</view>

      <!-- 描述 -->
      <view class="desc-title-container">
        <view class="base-dot dot1"></view>
        <view class="base-dot dot2"></view>
        <view class="base-dot dot3"></view>
        <view class="desc-title">创意描述</view>
        <view class="base-dot dot4"></view>
        <view class="base-dot dot5"></view>
        <view class="base-dot dot6"></view>
      </view>

      <!-- 文字描述 -->
      <view class="description">{{
        appStore.currentAiImageExample.prompt
      }}</view>

      <!-- 图片 -->
      <view class="img-container">
        <!-- mode="aspectFit"
        让图片保持比例正常完整的显示
        -->
        <image mode="aspectFit" :src="appStore.currentAiImageExample.url" />
      </view>
    </view>

    <button @click="goAiDrawImage" class="btn-try">我也试试</button>
  </view>
</template>

<script lang="ts" setup>
/* 全局数据仓库 */
import { useAppBaseStore } from '@/store'
import { goAiDrawImage } from '@/utils'
const appStore = useAppBaseStore()
</script>

<style>
/* 整个页面容器 */
.ai-image-detail {
  overflow: auto; /* 触发BFC 避免外边距合并  */
  width: 750rpx;
  height: 100vh;
}

/* 绿色的画布 */
.detail-wrapper {
  width: 650rpx;
  height: 80%;
  margin: auto;
  margin-top: 50rpx;
  padding: 20rpx;
  background-color: rgba(8, 71, 54, 0.3);
  box-sizing: border-box;
  border-radius: 20rpx;

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 图片容器 */
.img-container {
  margin-top: 15rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-container image {
  width: 400rpx;
  height: 400rpx;
}

/* 头像图片样式 */
.avatar image {
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
}

/* 所有的文字 */
.description,
.desc-title,
.create-time,
.nick-name {
  color: rgb(184, 252, 183);
  font-weight: bold;
  font-size: 28rpx;
  margin-top: 20rpx;
}

.desc-title-container {
  display: flex;
  align-items: center;
}

/* 点的公共样式 */
.base-dot {
  width: 10rpx;
  height: 20rpx;
  border-radius: 5rpx;
  margin-left: 5rpx;
  margin-right: 5rpx;
}

/* 创意描述文字间距 */
.desc-title {
  margin: 20rpx 10rpx;
}

/* 最边上两个 */
.dot1,
.dot6 {
  background-color: rgb(18, 184, 140);
}

.dot2,
.dot5 {
  height: 25rpx;
  background-color: rgb(54, 210, 168);
}

.dot3,
.dot4 {
  height: 30rpx;
  background-color: rgb(126, 244, 212);
}

/* 底部按钮 */
.btn-try {
  margin-top: 50rpx;
  width: 400rpx;
  background: linear-gradient(141deg, #9fb8ad 0%, #1fdba9 51%, #2cb5e8 75%);
}
</style>
