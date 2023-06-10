export const useUniAnimate = (options?: UniApp.CreateAnimationOptions) => {
  const animation = uni.createAnimation({
    transformOrigin: '50% 50%',
    duration: 1000 / 3,
    timingFunction: 'ease',
    delay: 0
  })

  return animation
}
