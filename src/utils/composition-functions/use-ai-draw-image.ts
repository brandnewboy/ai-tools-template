import { generateImageByPrompt, getImageByUUid } from '@/api'
import { useAppBaseStore } from '@/store'
import type { GenerateImageByPromptResPonse } from '@/types/ai'
import { reactive, ref } from 'vue'
import { $toast } from '..'

export interface PromptForm {
  prompt1: string
  prompt2: string
  prompt3: string
}

export const useAiDrawImage = () => {
  const appStore = useAppBaseStore()

  const promptFormData = reactive<PromptForm>({
    prompt1: '',
    prompt2: '',
    prompt3: ''
  })

  const responseUUid = ref<string>('')
  const isError = ref<boolean>(false)
  const error = ref<Error>()

  let validator: (args: PromptForm) => boolean

  const setValidator = (func: (args: PromptForm) => boolean) => {
    validator = func
  }

  const getParam = () => {
    if (!validator) {
      validator = args => {
        if (!args.prompt1 || !args.prompt2 || !args.prompt3) {
          return false
        }

        return true
      }
    }
    if (validator(promptFormData)) {
      return (
        promptFormData.prompt1 +
        ',' +
        promptFormData.prompt2 +
        ',' +
        promptFormData.prompt3
      )
    }

    return ''
  }

  const getImageUrlAndCache = (
    uuid: string,
    cb: (...args: unknown[]) => unknown
  ) => {
    getImageByUUid(uuid).then(res => {
      const d = new Date()
      const detailInfoObj = {
        prompt: getParam(),
        title: promptFormData.prompt1,
        url: res.data.cdn,
        uuid: res.data.uid,
        createTime: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      }
      appStore.currentAiImageExample = detailInfoObj
      if (res.data.status === 'finished') {
        cb()
      } else {
        getImageUrlAndCache(uuid, cb)
      }
    })
  }

  const execute = (param?: string) => {
    uni.showLoading({
      title: '生成中'
    })
    return new Promise<GenerateImageByPromptResPonse>((resolve, reject) => {
      generateImageByPrompt(param ? param : getParam())
        .then(uuidres => {
          if ([10009, 401].includes(uuidres.code)) {
            $toast({
              title: '接口可用次数已用完,请充值!',
              icon: 'none',
              success() {
                reject()
              }
            })
            return
          }
          responseUUid.value = uuidres.data.uid
          appStore.aiDrawImageResults = [responseUUid.value]
          setTimeout(() => {
            getImageUrlAndCache(uuidres.data.uid, () => {
              uni.hideLoading()
              resolve(uuidres)
            })
          }, 5000)
        })
        .catch(err => {
          isError.value = true
          error.value = new Error(err)
          reject(err)
        })
    })
  }

  return {
    promptFormData,
    setValidator,
    getParam,
    execute
  }
}
