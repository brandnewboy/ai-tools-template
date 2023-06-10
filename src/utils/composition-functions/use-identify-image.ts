import { ref } from 'vue'
import { chooseImage as ch, base64, base64InApp } from '../index'
import { imageIdentify } from '@/api'
import type { IdentifyImageResponse } from '@/types/ai'
import type { ChooseImageType } from '@/types/base'

/**
 * 图片识别hook
 */
export const useIdentifyImage = () => {
  const imagePath = ref('')
  const base64Str = ref('')
  const identifyResult = ref<IdentifyImageResponse>()
  const isError = ref(false)
  const isSuccess = ref(false)
  const error = ref()

  const chooseImage = async (type?: ChooseImageType) => {
    imagePath.value = (await ch({
      count: 1,
      sourceType: [type || 'album']
    })) as string
  }

  const base64Encode = async () => {
    // #ifdef APP-PLUS
    base64Str.value = (await base64InApp(imagePath.value)) as string
    // #endif

    //#ifdef H5 || MP-WEIXIN
    base64Str.value = await base64(imagePath.value as string)
    //#endif
  }

  const executeIdentify = () => {
    uni.showLoading({
      title: '识别中'
    })
    return new Promise<IdentifyImageResponse>((resolve, reject) => {
      imageIdentify(base64Str.value)
        .then(res => {
          identifyResult.value = res
          isSuccess.value = true
          resolve(res)
        })
        .catch(err => {
          isError.value = true
          error.value = err
          reject()
        })
        .finally(() => {
          uni.hideLoading()
        })
    })
  }

  const executeAll = async (chooseImageType?: ChooseImageType) => {
    if (!chooseImageType) await chooseImage()
    if (chooseImageType) await chooseImage(chooseImageType)
    await base64Encode()
    return executeIdentify()
  }

  return {
    chooseImage,
    base64Encode,
    executeIdentify,
    executeAll,
    imagePath,
    base64Str,
    isError,
    isSuccess,
    error,
    identifyResult
  }
}
