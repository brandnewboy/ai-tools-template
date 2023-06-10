import type { GenerateImageRequest } from '@/utils/models/GenarateImageRequest'

/**
 * 获取Accexx_Token响应参数结构
 */
export interface GetAKResponse {
  refresh_token: string
  expires_in: number
  session_key: string
  access_token: string
  scope: string
  session_secret: string
}

/**
 * 图片识别响应参数结构
 */
export interface IdentifyImageResponse {
  log_id: number
  result: Array<{
    baike_info?: {
      baike_url?: string
      description?: string
      image_url?: string
    }
    keyword: string
    root: string
    score: number
  }>
  result_num: number
}

/**
 * 图片识别接口请求参数结构
 */
export interface IdentifyImageRequest {
  image: string
  baike_num: number
}

/**
 * 图片生成请求参数
 */
export interface GenerateImageRequestParams {
  model: 'basic' | 'anime' | 'art'
  text: string
  w: number
  h: number
  guidance_scale: number
  negative_prompt: string
  sampler: 'k_euler' | 'ddim' | 'plms' | 'klms' | 'solver' | 'k_euler_a'
  seed: number
  num_steps: number
}
export interface GenerateImageByPromptRequest {
  task: string
  params: GenerateImageRequestParams

  /**
   * 任务回调地址，成功后回调此地址，通知任务结果
   */
  notify_url?: string
}

/**
 * 图片生成响应参数
 */
export interface GenerateImageByPromptResPonse {
  code: number
  data: {
    uid: string
  }
  msg: string
}

/**
 * 查询图片请求参数
 */
export interface GetImageByUUidRequest {
  uuid: string
}

/**
 * 查询图片响应参数
 */
export interface GetImageByUUidResponse {
  code: number
  data: {
    uid: string
    status: string
    cdn: string
    safe: boolean
    reason: string
    create_time: number
    start_time: number
    end_time: number
    duration: number
  }
  msg: string
}
