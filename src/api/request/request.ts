import axios from 'axios'
import config, { AISpaceConfig } from './config'
import axiosAdapterUniapp from 'axios-adapter-uniapp'
import type { RequestConfigProps } from '@/types/request'

const $request = <Res = any, Req = any>(options: RequestConfigProps<Req>) => {
  return new Promise<Res>((resolve, reject) => {
    const axiosInstance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        ...config.headers,
        ...AISpaceConfig.headers
      },
      timeout: config.timeout,
      withCredentials: config.withCredentials,
      adapter: axiosAdapterUniapp as any
    })

    /**
     * 请求拦截器
     */
    axiosInstance.interceptors.request.use(
      config => {
        const { headers } = options
        // TODO 添加请求令牌
        if (headers) {
          Object.keys(headers).forEach(key => {
            config.headers.set(key, headers[key])
            console.log(key, headers[key])
          })
          console.log(config.headers)
        }
        // 必须返回 config
        return config
      },
      error => Promise.reject(error)
    )

    /**
     * 响应拦截器
     */
    axiosInstance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.code === 401
        ) {
          //logoutTips()
        }
        return Promise.reject(error)
      }
    )

    axiosInstance<Res>(options.url, options)
      .then(res => resolve(res.data))
      .catch(err => {
        console.warn(err)
        reject(err)
      })
  })
}

export default $request
