import { config as defaultConfig } from './config'

const service = <Response = any, Request = any>(
  options: UniApp.RequestOptions
) => {
  const config = {
    url: defaultConfig.baseUrl + options.url,
    data: options.data,
    method: options.method,
    header: {
      'Content-Type': 'application/json; charset=UTF-8',
      ...options.header
    },
    dataType: 'json'
  }

  return new Promise<Response>(function (resolve, reject) {
    uni.request({
      ...config,
      success(result) {
        resolve(result.data as Response)
      },
      fail(err) {
        reject(reject(err))
      }
    })
  })
}
export default service
