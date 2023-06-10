import type { GetAKResponse, IdentifyImageResponse } from '@/types/ai'
import $request from '../request/request'
import { aiConfig } from '../request/config'
import { useAppBaseStore } from '@/store'

/**
 * 获取百度接口access_token
 * @returns PromiseLike<GetAKResponse>
 */
export const getAccessToken = () => {
  const appStore = useAppBaseStore()
  return new Promise<GetAKResponse>((resolve, reject) => {
    $request<GetAKResponse>({
      url:
        aiConfig.BASE_URL +
        aiConfig.generateAKURL +
        `?client_id=${aiConfig.client_id}&client_secret=${aiConfig.client_secret}&grant_type=${aiConfig.grant_type}`,
      method: 'GET'
    })
      .then(res => {
        appStore.setAccessToken({
          access_token: res.access_token,
          expires_in: res.expires_in,
          timeline: Date.now()
        })
        resolve(res)
      })
      .catch(reject)
  })
}

/**
 * 图片识别
 * @param image 图片
 * @param ak access_token
 * @returns PromiseLike<IdentifyImageResponse>
 */
export const imageIdentify = (image: string) => {
  const appStore = useAppBaseStore()
  let ak = appStore.access_token
  if (!ak) {
    getAccessToken().then(res => (ak = res.access_token))
  }
  return $request<IdentifyImageResponse>({
    url: `${aiConfig.BASE_URL}${aiConfig.identifyImageURL}?access_token=${ak}`,
    method: 'POST',
    data: {
      image,
      baike_num: 5
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
