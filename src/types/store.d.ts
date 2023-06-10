export interface AppBaseStoreState {
  appName: string
  access_token: string
  lastSearch: IdentifyImageResponse
  currentAiImageExample: AiImageDetailItemProp
  aiDrawImageResults: string[]
  aiDrawImageUrls: string[]
  printTextInfo: PrintTextInfo
}

interface PrintTextInfo {
  index: number
  textArr: string[]
  textLen: number
  done: boolean
}

export interface AccessTokenStorageParam {
  access_token: string
  expires_in: number
  timeline: number
}
