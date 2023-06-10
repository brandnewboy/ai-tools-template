import { useAppBaseStore } from '@/store'
import { nextTick } from 'vue'
import { sleep } from '..'

export const usePrintText = (duration?: number) => {
  const appStore = useAppBaseStore()

  const saveText = (text: string) => {
    appStore.state.printTextInfo.textArr = text.split('') || ['']
    appStore.state.printTextInfo.textLen = text.length || 0
    appStore.state.printTextInfo.done = false
  }

  const nextChar = () => {
    const char =
      appStore.state.printTextInfo.textArr[appStore.state.printTextInfo.index]

    appStore.state.printTextInfo.index++

    if (
      appStore.state.printTextInfo.index ===
      appStore.state.printTextInfo.textLen - 1
    ) {
      appStore.state.printTextInfo.done = true
    }

    return char
  }

  const print = (cb: (next: () => void, done: boolean) => void) => {
    const next = () => {
      print(cb)
    }
    nextTick(() => {
      sleep(duration || 100)
      cb(next, appStore.state.printTextInfo.done)
    })
  }

  const endPrint = () => {
    appStore.state.printTextInfo.done = true
    appStore.state.printTextInfo.index = 0
  }

  return {
    saveText,
    nextChar,
    print,
    endPrint
  }
}
