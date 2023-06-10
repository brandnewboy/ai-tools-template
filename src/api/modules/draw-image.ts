import $request from '../request/request'
import { AISpaceConfig } from '../request/config'
import { GenerateImageRequestModel } from '@/utils/models/GenarateImageRequest'
import type {
  GenerateImageByPromptRequest,
  GenerateImageByPromptResPonse,
  GetImageByUUidRequest,
  GetImageByUUidResponse
} from '@/types/ai'
import service from '../request/uni-request'

/**
 * 根据文本生成图片
 * @param text 文本
 * @returns Primse<any>
 */
export const generateImageByPrompt = (text: string) => {
  return service<GenerateImageByPromptResPonse, GenerateImageByPromptRequest>({
    url: AISpaceConfig.BASE_URL + AISpaceConfig.generateImageURL,
    method: 'POST',
    header: {
      ...AISpaceConfig.headers
    },
    data: GenerateImageRequestModel.create(text)
  })
}

/**
 * 根据 uuid 获取图片地址
 * @param uuid 任务队列号
 * @returns Promise<any>
 */
export const getImageByUUid = (uuid: string) => {
  return service<GetImageByUUidResponse, GetImageByUUidRequest>({
    url: AISpaceConfig.BASE_URL + AISpaceConfig.getImageByUUidURL,
    method: 'POST',
    header: {
      'X-APISpace-Token': AISpaceConfig.headers['X-APISpace-Token'],
      'Authorization-Type': AISpaceConfig.headers['Authorization-Type']
    },
    data: {
      uid: uuid
    }
  })
}
