export const config = {
  method: 'get',
  // 基础url前缀
  baseUrl: '',
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 300 * 1000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}

/**
 * 百度ai配置
 */
export const aiConfig = {
  /**
   * 接口根路径
   */
  BASE_URL: 'https://aip.baidubce.com',

  /**
   *获取 Access_Token 路径
   */

  generateAKURL: '/oauth/2.0/token',

  /**
   * 图片识别路径
   */
  identifyImageURL: '/rest/2.0/image-classify/v2/advanced_general',

  /**
   * 接口请求验证参数
   */
  grant_type: 'client_credentials',
  client_id: 'xxxxxxxxxxxxxxxxxxx',
  client_secret: 'xxxxxxxxxxxxxxxxxxx'
}

/**
 * APISpace配置
 */
export const AISpaceConfig = {
  /**
   * 接口跟路径
   */
  BASE_URL: 'https://23329.o.apispace.com/aigc',

  /**
   * 图片生成接口路径
   */
  generateImageURL: '/txt2img',

  /**
   * 查询图片接口路径
   */
  getImageByUUidURL: '/query-image',

  /**
   * 请求头配置
   */
  headers: {
    'X-APISpace-Token': 'xxxxxxxxxxxxxxxxxx',
    'Authorization-Type': 'apikey',
    'Content-Type': 'application/json'
  }
}

export default config
