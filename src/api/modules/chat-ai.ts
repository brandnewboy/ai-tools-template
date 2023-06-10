/**
 * 模拟数据
 */
const mockData = [
  {
    tips: '你好',
    msg: '你好!有什么可以帮助你的?'
  },
  {
    tips: '可以帮我生成一份面试题吗?',
    msg: `当然可以，以下是为您生成的一份面试题：\n
    您最近一次与团队合作完成的一个重要项目是什么？您在其中扮演了什么样的角色？\n
    说下您的最大的缺点是什么，优点是什么？\n
    说下您最近失败的一件事是什么，您有没有做过分析失败的原因是什么，有复盘过吗？\n
    如何看待996，工作和生活如何平衡？\n
    周末领导叫你去拿一件东西，你去不去？\n
    对本专业和这个行业的看法？\n
    目前有收到别的offer吗？\n
    介绍一下在校经历？\n
    用三个词形容自己？
    `
  }
]

/**
 * ai聊天
 * @param text 文本
 * @returns Primse<any>
 */
export const sendMessageToAi = (text: string) => {
  return (
    mockData.find(val => val.tips === text) || {
      tips: '其他',
      msg: '抱歉,我没理解您的意思'
    }
  )
}
