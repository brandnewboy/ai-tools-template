<template>
  <view class="id-con-center primary-bg wrapper-with-size">
    <RotateButton
      class="btn"
      @onChoose="onchoose('album')"
      @onPhoto="onchoose('camera')"
    />
  </view>
</template>

<script lang="ts" setup>
import { useIdentifyImage } from '@/utils/composition-functions/use-identify-image'
import { useAppBaseStore } from '@/store'
import RotateButton from '@/pages/index/components/RotateButton.vue'
import { goSearchDetail } from '@/utils'
import type { ChooseImageType } from '@/types/base'

const appStore = useAppBaseStore()

// 调用图片识别 hook
const { executeAll: exec } = useIdentifyImage()

const onchoose = (type?: ChooseImageType) => {
  exec(type)
    .then(res => {
      appStore.lastSearch = res
    })
    .finally(goSearchDetail)
}
</script>

<style scoped>
.id-con-center {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.btn {
  margin-top: 400rpx;
}

.bike-info-desc {
  padding: 15rpx;
}
</style>
