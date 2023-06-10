export const go = (options: UniApp.NavigateToOptions) => {
  uni.navigateTo(options)
}

export const goBack = () => {
  uni.navigateBack()
}

export const goSearchDetail = () => {
  uni.navigateTo({
    url: '/pages/identify-detail/IdentifyDetail'
  })
}

export const goChatAi = () => {
  uni.navigateTo({
    url: '/pages/chat-ai/ChatAi'
  })
}

export const goAiImageDetail = () => {
  uni.navigateTo({
    url: '/pages/ai-image-detail/AiImageDetail'
  })
}

/**
 * 跳转到ai绘画
 */
export const goAiDrawImage = () => {
  uni.navigateTo({
    url: '/pages/ai-draw-image/AiDrawImage'
  })
}
