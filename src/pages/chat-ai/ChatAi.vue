<template>
  <view class="wrapper">
    +
    <view class="chat-content">
      <scroll-view
        class="scroll-y"
        :scroll-top="scrollTopHeight"
        scroll-with-animation="true"
        scroll-y="true"
      >
        <template v-for="(item, index) in messageList" :key="index">
          <UserMessage v-if="item.role === 'user'" :msg="item.msg" />
          <RobotMessage v-if="item.role === 'robot'" :msg="item.msg" />
        </template>
      </scroll-view>
    </view>

    <view class="input-box">
      <input v-model="userInput" type="text" placeholder="请输入" />
      <view v-if="store.state.printTextInfo.done" @click="sendMessage">
        <image src="../../static/send.png" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { MessageItemProps } from '@/types/base'
import { reactive, ref } from 'vue'
import UserMessage from './components/UserMessage.vue'
import RobotMessage from './components/RobotMessage.vue'
import { sendMessageToAi } from '@/api'
import { usePrintText } from '@/utils/composition-functions/use-print-text'
import { useAppBaseStore } from '@/store'

const messageList = reactive<MessageItemProps[]>([])

const userInput = ref('')

const store = useAppBaseStore()

const { saveText, print, nextChar, endPrint } = usePrintText(100)

const scrollTopHeight = ref(0)

/**
 * 发送消息
 */
const sendMessage = function () {
  /**
   * 先把自己输入的消息添加到列表中
   */
  messageList.push({
    role: 'user',
    msg: userInput.value
  })

  /**
   * 调用小组成员封装的接口函数拿到响应
   */
  const res = sendMessageToAi(userInput.value)

  /**
   * 拿到ai返回的消息
   * 用打印文字方法返回的saveText函数保存起来
   */
  saveText(res.msg || '')

  /**
   * 给消息列表加一个消息项
   * 是为了给打印文字留空
   */
  messageList.push({
    role: 'robot',
    msg: ''
  })

  /**
   * 清空用户输入框
   */
  userInput.value = ''

  print((next: () => void, done: boolean) => {
    messageList[messageList.length - 1].msg += nextChar()
    scrollTopHeight.value += 3
    if (!done) {
      next()
    } else {
      endPrint()
    }

    return
  })
}
</script>

<style scoped>
/* 底部输入框 */
.input-box {
  /* 弹性布局 使其横向排列 */
  display: flex;
  justify-content: space-between;
  padding-left: 20rpx;
  padding-right: 20rpx;

  /* fixed 相对于整个窗口 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50rpx;
}

.input-box input {
  width: 640rpx;
  height: 90rpx;
  box-sizing: border-box;
  padding: 10rpx;
  border-radius: 15rpx;
  color: black;
  background-color: aliceblue;
}

.input-box image {
  width: 90rpx;
  height: 90rpx;
}

.scroll-y {
  height: 88vh;
}
</style>
