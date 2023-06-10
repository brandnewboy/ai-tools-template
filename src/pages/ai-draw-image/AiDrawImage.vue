<template>
  <view class="wrapper form-wrapper">
    <view class="form-page-card">
      <!-- 提示 -->
      <view class="page-tips">
        <view class="text">告诉AI<br />你想要画什么</view>
        <view class="tip-image">
          <image src="../../static/draw-tip.png" />
        </view>
      </view>

      <!--  -->
      <view class="form-item">
        <view>画中的主体</view>
        <textarea
          class="input-box"
          placeholder="例如：一只粉色的蝴蝶停在一朵黄色的小花上"
          v-model="formData.prompt1"
        ></textarea>
      </view>

      <view class="form-item">
        <view>主题周围的环境</view>
        <textarea
          class="input-box"
          placeholder="例如：有阳光照射，大草原"
          v-model="formData.prompt2"
        ></textarea>
      </view>

      <view class="form-item">
        <view>美术风格</view>
        <textarea
          class="input-box"
          placeholder="例如：传统绘画、动漫"
          v-model="formData.prompt3"
        ></textarea>
      </view>
    </view>

    <button class="btn-start" @click="generate">开始作画</button>
  </view>
</template>

<script lang="ts" setup>
import { goBack } from '@/utils'
import { useAiDrawImage } from '@/utils/hooks/use-ai-draw-image'

/**
 * 调用小组成员封装的作图函数
 * promptFormData(formData): 用于存放用户输入
 * getParam: 获取拼接后字符串
 * execute: 执行
 */
const { promptFormData: formData, getParam, execute: exec } = useAiDrawImage()

/**
 * 处理点击按钮的事件
 */
const generate = () => {
  const param = getParam()
  exec(param).then(goBack)
}
</script>

<style>
/* 整体页面盒子 */
.form-wrapper {
  /* 弹性布局 */
  display: flex;
  flex-direction: column; /* 纵向排列 */
  align-items: center; /* 侧轴居中 水平居中 */
}

.form-page-card {
  margin-top: 50rpx;
  box-sizing: border-box;
  width: 650rpx;
  height: 83%;
  border-radius: 30rpx; /* 圆角 */
  background-color: rgba(67, 55, 74, 0.3);

  /* 控制内部的盒子排列 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  padding: 5rpx;
}

/* 第一个文字和图片的盒子 */
.page-tips {
  margin-top: 50rpx;
  width: 80%;
  display: flex;
  /* 文字和图片两端对齐 */
  justify-content: space-between;
}
/* 第一个盒子里面的文字样式 */
.page-tips .text {
  color: rgb(60, 255, 222);
  font-size: 40rpx;
}
/* 第一个盒子里面的图片样式 */
.tip-image image {
  width: 100rpx;
  height: 100rpx;
}

/**
 */
.form-item {
  font-size: 30rpx;
  color: rgb(89, 111, 120);
  margin-top: 60rpx;
}

.input-box {
  margin-top: 15rpx;
  width: 550rpx;
  height: 200rpx;
  box-sizing: border-box;
  padding: 10px; /* 输入框里面的文字不和框贴边 */
  background-color: rgba(42, 65, 98, 0.1);

  border: 2rpx rgba(255, 255, 255, 0.1) solid;
  border-radius: 30rpx;

  font-size: 28rpx;
}

.btn-start {
  margin-top: 50rpx;
  width: 400rpx;
  background: linear-gradient(141deg, #9fb8ad 0%, #1fdba9 51%, #2cb5e8 75%);
}
</style>
