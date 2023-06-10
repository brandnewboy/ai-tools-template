<template>
  <view class="wrapper index-page">
    <TabBar @onSelect="onSelect"></TabBar>
    <view
      class="main-view"
      :style="{
        transform: `translateX(${trsnum}rpx)`
      }"
    >
      <DrawImage class="draw-img" />
      <ImageIdentify class="img-id" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TabBar as TB_CONSTS } from '@/constants'
import ImageIdentify from './components/ImageIdentify.vue'
import DrawImage from './components/DrawImage.vue'
import TabBar from './components/TabBar.vue'
import type { SelectStatus } from '@/types/base'

const trsnum = ref<number>(0)
const onSelect = (selectStatus: SelectStatus) => {
  trsnum.value = selectStatus === TB_CONSTS.ImageIdentify ? 0 : -750
}
</script>
<style>
.main-view {
  height: 90vh;
  color: white;
  transition: all 0.3s;
  flex: 1;
}

.index-page {
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.img-id {
  position: relative;
  left: 100vw;
  top: -80vh;
}
</style>
