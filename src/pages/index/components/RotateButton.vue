<template>
  <view class="btn-wrapper">
    <view
      class="btn-photo btn-container"
      @click="photo"
      :style="{
        transform: `translate(${photoTransform.x}rpx, ${photoTransform.y}rpx) scale(${photoTransform.scale})`
      }"
      >拍照</view
    >
    <view
      class="btn-choose btn-container"
      @click="choose"
      :style="{
        transform: `translate(${chooseTransform.x}rpx, ${chooseTransform.y}rpx) scale(${chooseTransform.scale})`
      }"
      >选择</view
    >
    <view
      class="btn-photo btn-container"
      @click="gotoLast"
      :style="{
        transform: `translate(${lastTransform.x}rpx, ${lastTransform.y}rpx) scale(${lastTransform.scale})`
      }"
      >上次</view
    >
    <view
      class="btn-choose btn-container"
      @click="goChatAi"
      :style="{
        transform: `translate(${donateTransform.x}rpx, ${donateTransform.y}rpx) scale(${donateTransform.scale})`
      }"
      >聊天</view
    >
    <view @click="onClick" class="btn-primary btn-container">
      <view :animation="animationData">{{ primaryButtonTrans.content }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { goChatAi, goSearchDetail } from '@/utils'
import { useUniAnimate } from '@/utils/composition-functions/use-uni-animation'
import { ref } from 'vue'

interface TransformValue {
  x: number
  y: number
  scale: number
  rotate: number
  content?: string
}

const emits = defineEmits(['onChoose', 'onPhoto'])

const choose = () => {
  emits('onChoose')
}

const photo = () => {
  emits('onPhoto')
}

const status = ref<'open' | 'close'>('close')
const isOpen = ref(false)
const toggleStatus = () => {
  isOpen.value = !isOpen.value
  status.value = status.value === 'close' ? 'open' : 'close'
}

const photoTransform = ref<Omit<TransformValue, 'rotate'>>({
  x: 0,
  y: 0,
  scale: 0
})
const chooseTransform = ref<Omit<TransformValue, 'rotate'>>({
  x: 0,
  y: 0,
  scale: 0
})

const lastTransform = ref<Omit<TransformValue, 'rotate'>>({
  x: 0,
  y: 0,
  scale: 0
})
const donateTransform = ref<Omit<TransformValue, 'rotate'>>({
  x: 0,
  y: 0,
  scale: 0
})

const primaryButtonTrans = ref<Pick<TransformValue, 'rotate' | 'content'>>({
  rotate: 0,
  content: 'try'
})
const transVal = {
  POSITIVE: 200,
  NEGATIVE: -200,
  ZERO: 0,
  ONE: 1,
  DEG: 135
}

const gotoLast = () => goSearchDetail()

const uniAnimation = useUniAnimate({ duration: 1000 / 3 })
const animationData = ref()
const startUniAnimation = () => {
  uniAnimation.translateX(50).opacity(0).step()
  uniAnimation.opacity(1).translateX(0).step()
  animationData.value = uniAnimation.export()
  setTimeout(() => (animationData.value = null), 1000 / 3)
}

const onClick = () => {
  toggleStatus()
  photoTransform.value.y = isOpen.value ? transVal.POSITIVE : transVal.ZERO
  photoTransform.value.scale = isOpen.value ? transVal.ONE : transVal.ZERO

  chooseTransform.value.y = isOpen.value ? transVal.NEGATIVE : transVal.ZERO
  chooseTransform.value.scale = isOpen.value ? transVal.ONE : transVal.ZERO

  lastTransform.value.x = isOpen.value ? transVal.POSITIVE : transVal.ZERO
  lastTransform.value.scale = isOpen.value ? transVal.ONE : transVal.ZERO

  donateTransform.value.x = isOpen.value ? transVal.NEGATIVE : transVal.ZERO
  donateTransform.value.scale = isOpen.value ? transVal.ONE : transVal.ZERO

  primaryButtonTrans.value.content = isOpen.value ? '×' : 'try'

  startUniAnimation()
}
</script>

<style>
.btn-wrapper {
  height: 100rpx;
  width: 100rpx;
  position: relative;
}

.btn-container {
  position: absolute;
  height: 100rpx;
  width: 100rpx;
  color: rgb(11, 40, 77);
  background-color: aliceblue;
  border-radius: 50%;
}

.btn-photo {
  line-height: 100rpx;
  text-align: center;
  transition: all 0.3s;
}
.btn-choose {
  line-height: 100rpx;
  text-align: center;
  transition: all 0.3s;
}
.btn-primary {
  transition: all 0.3s;
  font-size: 50rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.animate {
  animation: fade 0.3s linear;
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 0;
    transform: translateX(50rpx);
  }
  60% {
    transform: translateX(-50rpx);
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    transform: translateX(0rpx);
  }
}
</style>
