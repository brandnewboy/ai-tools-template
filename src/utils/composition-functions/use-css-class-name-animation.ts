import { reactive } from 'vue'

/**
 * 简易配合 css '@keyframes' 控制调用动画 hook
 * @param options 配置选项
 * @returns [调用动画方法, 动画类名对象]
 */
export const useCssClassNameAnimation = (options: {
  className: string
  duration: number
}) => {
  const { className, duration } = options
  const animateClassObj = reactive({ [className]: false })
  const animate = () => {
    animateClassObj[className] = true
    setTimeout(() => (animateClassObj[className] = false), duration)
  }
  return [animate, animateClassObj] as const
}
