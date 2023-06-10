import { defineStore } from 'pinia'
import { StoreIdKey } from '../constants'
import { reactive, computed } from 'vue'
import type { AppBaseStoreState, AccessTokenStorageParam } from '@/types/store'
import * as storage from '@/utils/storage'
import { getAccessTokenFromStorage } from '@/utils'
import type { IdentifyImageResponse } from '@/types/ai'
import { aiImageExamples } from '.'
import type { AiImageDetailItemProp } from '@/types/base'

export const mockData = {
  result_num: 5,
  result: [
    { keyword: '辣子鸡', score: 0.807752, root: '商品-食物', baike_info: {} },
    {
      keyword: '小炒肉',
      score: 0.63602,
      root: '商品-食物',
      baike_info: {
        baike_url:
          'http://baike.baidu.com/item/%E5%B0%8F%E7%82%92%E8%82%89/1073233',
        image_url:
          'https://bkimg.cdn.bcebos.com/pic/9d82d158ccbf6c81885f8a93b33eb13533fa4064',
        description:
          '小炒肉是湖南省一道常见的特色传统名菜，属于湘菜系。麻辣鲜香，口味滑嫩。制作原料主要是五花肉,青椒、红椒等。'
      }
    },
    {
      keyword: '干锅肥肠',
      score: 0.467742,
      root: '商品-食物',
      baike_info: {
        baike_url:
          'http://baike.baidu.com/item/%E5%B9%B2%E9%94%85%E8%82%A5%E8%82%A0/10785981',
        image_url: 'https://bkimg.cdn.bcebos.com/pic/245e8bca227716cac8176829',
        description:
          '干锅肥肠是一道传统名菜，在湖南、湖北、江西、四川、重庆一带较流行。肥肠劲道十足，味道鲜美，色泽红亮，质地软烂，滋味鲜香，回味悠长。味道相当诱惑，不老不嫩，又辣又香，超级过瘾，绝对是米饭的杀手。'
      }
    },
    {
      keyword: '四川回锅肉',
      score: 0.30044,
      root: '商品-食物',
      baike_info: {
        baike_url:
          'http://baike.baidu.com/item/%E5%9B%9E%E9%94%85%E8%82%89/254670',
        image_url:
          'https://bkimg.cdn.bcebos.com/pic/203fb80e7bec54e736d18e977f728c504fc2d4623cad',
        description:
          '回锅肉，是四川传统菜式中家常菜肴的代表菜之一，属于川菜。其制作原料主要有猪后臀肉(二刀肉)、青椒、蒜苗等，口味独特，色泽红亮，肥而不腻。回锅肉起源四川农村地区。古代时期称作油爆锅，四川地区大部分家庭都会制作。所谓回锅，就是再次烹调的意思。回锅肉在川菜中的地位是非常重要的，回锅肉一直被认为是川菜之首，川菜之化身，提到川菜必然想到回锅肉。回锅肉色香味俱全，是下饭菜中大部分人会选的菜。川菜中的回锅肉，最佳是蒜苗、仔姜、青椒做“翘头”，而自贡家常菜中的回锅肉，就有青椒、仔姜、葱白配，藠头配，干豇豆配，莲花白配，甚至锅盔配。配料各有不同，除了蒜苗(青蒜)还可以用彩椒，洋葱，韭菜，锅盔等来制作回锅肉，“家常”顾名思义，“调料家家常有之意，”故每一家制作出的味道都不相同，这一特性，也是赋予了回锅肉这道菜独特的魅力。2018年9月10日，“中国菜”正式发布，“四川回锅肉“被评为“中国菜”四川十大经典名菜。'
      }
    },
    {
      keyword: '干锅鸡',
      score: 0.133322,
      root: '商品-食物',
      baike_info: {
        baike_url:
          'http://baike.baidu.com/item/%E5%B9%B2%E9%94%85%E9%B8%A1/2983893',
        image_url:
          'https://bkimg.cdn.bcebos.com/pic/0823dd54564e925881cef59c9282d158cdbf4ecd',
        description:
          '干锅鸡是一道四川特色传统川菜，以鸡肉为主要食材，整道菜香脆酸辣俱全，颜色五彩缤纷，能促进食欲，营养价值丰富。鸡肉有温中益气、补虚填精、健脾胃、活血脉、强筋骨的功效。青红椒粒、甜玉米粒、青豆粒等能为孕妇提供足量的维生素。'
      }
    }
  ],
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  log_id: 1665347453334373215
}

export const useAppBaseStore = defineStore(StoreIdKey.appBase, () => {
  /**
   * 状态对象
   */
  const state = reactive<AppBaseStoreState>({
    appName: 'uni-chat',
    lastSearch: mockData,
    access_token: getAccessTokenFromStorage() || '',
    currentAiImageExample: aiImageExamples[0],
    aiDrawImageResults: storage.getItemSync(StoreIdKey.AI_DRAW_IMAGE_RES) || [
      '058ce3f70e276494bfcffc1e555d2910',
      '2c1c7267713dbaa026c24978275fcb68',
      '9ac23eb5ff99fd40bd93ff28edfd004a',
      '705a2acb2f95e57d0db0c18c41f58dbc',
      '752999832b0de7f0372e6668c372dec3',
      'cf35c4aa3dff89b999efb82059ea5842',
      '159de2fbf4aceec74cc183da1b70cb37',
      '6433eabfa92d3d64e32ee753585229b1',
      'eb09ded710d416bbe007c1d02cb924f4'
    ],
    aiDrawImageUrls: [],
    printTextInfo: {
      index: 0,
      textArr: [''],
      textLen: 0,
      done: true
    }
  })

  /**
   * 设置access_token
   * @param newVal 新值
   */
  const setAccessToken = (newVal: AccessTokenStorageParam) => {
    storage.setItem<AccessTokenStorageParam>(StoreIdKey.ACCESS_TOKEN, newVal)
    state.access_token = newVal.access_token
  }

  const access_token = computed(() => state.access_token)

  const lastSearch = computed<IdentifyImageResponse>({
    get: () => state.lastSearch,
    set: newVal => (state.lastSearch = newVal)
  })

  const currentAiImageExample = computed<AiImageDetailItemProp>({
    get: () => state.currentAiImageExample,
    set: newVal => (state.currentAiImageExample = newVal)
  })

  const aiDrawImageResults = computed({
    get: () => state.aiDrawImageResults,
    set: newVal => {
      storage.setItem(StoreIdKey.AI_DRAW_IMAGE_RES, [
        ...state.aiDrawImageResults,
        ...newVal
      ])

      state.aiDrawImageResults = [...state.aiDrawImageResults, ...newVal]
    }
  })

  return {
    state,
    setAccessToken,
    access_token,
    lastSearch,
    currentAiImageExample,
    aiDrawImageResults
  }
})
