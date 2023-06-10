import { GenerateImageRequestModel } from '@/utils/models/GenarateImageRequest'
import { AISpaceConfig } from '../request/config'
import $request from '../request/request'
import service from '../request/uni-request'

export const test = () => {
  return $request<{ username: string; password: string }>({
    method: 'GET',
    url: '/api/v1/user/test'
  })
}

export const testService = (text: string) => {
  return service({
    url: AISpaceConfig.BASE_URL + AISpaceConfig.generateImageURL,
    method: 'POST',
    header: {
      ...AISpaceConfig.headers
    },
    data: GenerateImageRequestModel.create(text)
  })
}
