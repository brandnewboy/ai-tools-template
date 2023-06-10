<template>
  <view class="dr-container primary-bg wrapper-with-size">
    <view class="water-fall">
      <view
        class="water-fall-item"
        v-for="item in aiImageExamples"
        :key="item.uuid"
        @click="goAiImageDetail(item.uuid)"
      >
        <image :src="item.url" />
        <view class="mask">{{ item.title }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { aiImageExamples } from '@/store'
import { goAiImageDetail as go } from '@/utils'
import { useAppBaseStore } from '@/store'

const appStore = useAppBaseStore()

const goAiImageDetail = (uuid: string) => {
  appStore.currentAiImageExample =
    aiImageExamples.find(value => value.uuid === uuid) || aiImageExamples[0]

  go()
}
</script>

<style>
.dr-container {
  width: 100vw;
  overflow: scroll;
}
.water-fall {
  margin: 10px;
  column-count: 2;
  column-gap: 15rpx;
}
.water-fall-item {
  position: relative;
  width: 100%;
  height: 350rpx;
  margin-bottom: 15rpx;
}
.water-fall-item image {
  width: 100%;
  height: 100%;
}

.mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 60rpx;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 24rpx;
  text-align: center;
  line-height: 60rpx;
}
</style>
