/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { StoreIdKey } from '@/constants'
import { getItemSync } from './storage'
import type { AccessTokenStorageParam } from '@/types/store'

export * from './router'

export const promisify = <T extends (...args: any[]) => any>(
  func: T,
  args: Parameters<T>
) => {
  return new Promise((resolve, reject) => {
    func(args)
  })
}

/**
 * base64编码
 * @param srcUrl 编码资源路径
 */
export const base64 = (srcUrl: string): PromiseLike<string> => {
  return new Promise((resolve, reject) => {
    uni.getFileSystemManager().readFile({
      filePath: srcUrl,
      encoding: 'base64',
      success(res) {
        const base64Str = res.data as string
        resolve(base64Str)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const base64InApp = (path: string) => {
  return new Promise((resolve, reject) => {
    //app端
    plus.io.resolveLocalFileSystemURL(path, function (entry) {
      //参数path:图片相对路径
      // @ts-ignore
      entry.file(function (file) {
        // eslint-disable-next-line no-var
        // @ts-ignore
        var fileReader = new plus.io.FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onloadend = function (evt) {
          // eslint-disable-next-line no-var
          // @ts-ignore
          const base64 = evt.target.result.split(',')[1]
          resolve(base64)
        }
      })
    })
  })
}

/**
 * 选择图片
 * @param options 配置选项
 */
export const chooseImage = (
  options: UniApp.ChooseImageOptions = { count: 1 }
): PromiseLike<string | string[]> => {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: options.count, //默认1
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: options.sourceType || ['album'], //从相册选择
      success(res) {
        const path = res.tempFilePaths[0]
        options.count === 1 ? resolve(path) : resolve(res.tempFilePaths)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

/**
 * 从缓存获取baiduai的access_token
 */
export const getAccessTokenFromStorage = () => {
  const data = getItemSync<AccessTokenStorageParam>(StoreIdKey.ACCESS_TOKEN)
  if (data) {
    const oldTimeline = data.timeline
    const newTimeline = Date.now()
    if ((newTimeline - oldTimeline) / 1000 >= data.expires_in) {
      return null
    }
    return data.access_token
  }
}

export const getRestWindowHeight = () => {
  return new Promise<number | Error>((resolve, reject) => {
    uni.getSystemInfo({
      success(res) {
        resolve(res.windowHeight)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const $toast = (options: UniApp.ShowToastOptions) => {
  return new Promise((resolve, reject) => {
    uni.showToast({
      ...options,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const sleep = (delay: number) => {
  const endTime = new Date().getTime() + parseInt(delay + '')
  while (new Date().getTime() < endTime);
}
