<template>
  <view class="msg-item-container-base msg-item-container-user">
    <view class="box-base box-user">
      {{ props.msg }}
    </view>

    <view class="triangle-base triangle-right"></view>

    <image class="avatar-base avatar-user" src="../../../static/user.png" />
  </view>
</template>

<script lang="ts" setup>
const props = defineProps<{
  msg: string
}>()
</script>

<style scoped>
@import url(../../../styles/message-box-base.css);

.msg-item-container-user {
  justify-content: flex-end;
}

/* 头像 */
.avatar-user {
  right: 20rpx;
}

/* 用户消息内容盒子 */
.box-user {
  background-color: greenyellow;
}

/* 右边三角形 */
.triangle-right {
  border-left-color: greenyellow;
}
</style>
