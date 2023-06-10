<template>
  <view class="msg-item-container-base msg-item-container-robot">
    <image class="avatar-base avatar-robot" src="../../../static/robot.png" />

    <view class="triangle-base triangle-left"></view>

    <view class="box-base box-robot robot-content">
      {{ props.msg }}
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * 组件属性
 * msg: 消息内容
 */
const props = defineProps<{
  msg: string
}>()
</script>

<style scoped>
@import url(../../../styles/message-box-base.css);

.msg-item-container-robot {
  justify-content: flex-start;
}

.avatar-robot {
  left: 20rpx;
}

/* 机器消息内容盒子 */
.box-robot {
  background-color: aliceblue;
}

/* 左边三角形 */
.triangle-left {
  border-right-color: aliceblue;
}
</style>
