<template>
  <view class="tab-bar-container primary-bg">
    <view class="tab-bar set-align-center-x">
      <view class="tab-bar-item" @click="selectLeft">AI作画</view>
      <view class="tab-bar-item" @click="selectRight">AI识图</view>
      <view
        class="select-mask"
        :style="{
          transform: `translateX(${trsnum}rpx)`
        }"
      ></view>
    </view>
  </view>
  <view class="placeholder"></view>
</template>

<script lang="ts" setup>
import { TabBar } from '@/constants'
import { ref } from 'vue'

const trsnum = ref(-100)

const selectLeft = () => {
  trsnum.value = -100
  emits('onSelect', TabBar.ImageIdentify)
}
const selectRight = () => {
  trsnum.value = 100
  emits('onSelect', TabBar.DrawImage)
}

const emits = defineEmits(['onSelect'])
</script>

<style>
.tab-bar-container {
  width: 750rpx;
  height: 90rpx;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}

.tab-bar {
  width: 400rpx;
  height: 80rpx;
  display: flex;
  justify-content: space-around;
  background: rgba(244, 249, 253, 0.2);
  color: rgb(255, 255, 255);
  font-size: 14px;
  border-radius: 15rpx;
}

.tab-bar-item {
  line-height: 80rpx;
  text-align: center;
  width: 200rpx;
  height: 80rpx;
  z-index: 10;
}

.select-mask {
  position: absolute;
  z-index: 5;
  width: 200rpx;
  height: 80rpx;
  background: linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);
  transition: all 0.3s;
  border-radius: 15rpx;
}

.placeholder {
  width: 750rpx;
  height: 90rpx;
}
</style>
