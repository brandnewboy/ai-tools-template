export type SelectStatus = 0 | 1
export type SelectType = 'ImageIdentify' | 'DrawImage'
export type ChooseImageType = 'album' | 'camera'
export type AiImageDetailItemProp = {
  title: string
  uuid: string
  prompt: string
  url: string
  createTime?: string
}
export type MessageItemProps = {
  role: 'user' | 'robot'
  msg: string
}
