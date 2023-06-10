export const setItem = <T>(key: string, data: T) => {
  return new Promise<void>((resolve, reject) => {
    uni.setStorage({
      key,
      data,
      success() {
        resolve()
      },
      fail() {
        reject()
      }
    })
  })
}

export const getItem = <T = unknown>(
  key: string,
  cb?: (data: T) => boolean
) => {
  return new Promise<T | null>((resolve, reject) => {
    uni.getStorage({
      key,
      success(res: UniApp.GetStorageSuccess) {
        if (!cb) resolve(res.data)
        if (cb) {
          resolve(cb(res.data) ? res.data : null)
        }
      },
      fail() {
        reject()
      }
    })
  })
}

export const getItemSync = <T = unknown>(key: string) => {
  try {
    const value = uni.getStorageSync(key)
    if (value) {
      return value as T
    }
  } catch (e) {
    throw new Error('读取缓存storage出错!缓存key为:' + key)
  }
}
