import type {
  GenerateImageByPromptRequest,
  GenerateImageRequestParams
} from '@/types/ai'

export class GenerateImageRequestModel {
  public task = 'txt2img.sd'

  public params: GenerateImageRequestParams = {
    model: 'basic',
    text: '',
    w: 512,
    h: 512,
    guidance_scale: 14,
    negative_prompt: '',
    sampler: 'k_euler',
    seed: -1,
    num_steps: 25
  }

  public notify_url = ''

  private constructor()
  private constructor(text: string)
  private constructor(config?: Partial<GenerateImageByPromptRequest>)
  private constructor(args?: string | Partial<GenerateImageByPromptRequest>) {
    if (typeof args === 'string') {
      this.params.text = args
    } else if (args) {
      const { task, params, notify_url } = args
      if (task) this.task = task
      if (params) this.params = { ...params }
      if (notify_url) this.notify_url = notify_url
    }
  }

  public static create(text: string): GenerateImageRequestModel

  public static create(
    config?: Partial<GenerateImageByPromptRequest>
  ): GenerateImageRequestModel

  public static create(
    args?: string | Partial<GenerateImageByPromptRequest>
  ): GenerateImageRequestModel {
    if (typeof args === 'string') {
      const instance = new GenerateImageRequestModel()
      instance.params.text = args
      return instance
    } else if (args) {
      return new GenerateImageRequestModel(args)
    }

    return new GenerateImageRequestModel()
  }
}
