import { TOKENCONF_URL, TOPTOKENS_URL, TOPPAIRS_URL, TRANSACTIONS_URL, TVL_URL, VOLUME_URL } from '../constants/api'
import { axiosCustom } from '../constants/axios'

//获取token的配置
export function getTokenConf() {
  return new Promise(async (resolve, reject) => {
    const res = await axiosCustom({
      cmd: TOKENCONF_URL
    })
    resolve(res)
  })
}

//总锁仓量折线图
export function getTVL() {
  return new Promise(async (resolve, reject) => {
    const res = await axiosCustom({
      cmd: TVL_URL
    })
    resolve(res)
  })
}

//历史交易量折线图
export function getVolume(params: any) {
  return new Promise(async (resolve, reject) => {
    const res = await axiosCustom({
      cmd: VOLUME_URL,
      params: params
    })
    resolve(res)
  })
}

// TOP代币列表
export function getTopTokens(params: any) {
  return new Promise(async (resolve, reject) => {
    const res = await axiosCustom({
      cmd: TOPTOKENS_URL,
      params: params
    })
    resolve(res)
  })
}

// //TOP资金池列表
export function getTopPairs(params: any) {
  return new Promise(async (resolve, reject) => {
    const res = await axiosCustom({
      cmd: TOPPAIRS_URL,
      params: params
    })
    resolve(res)
  })
}

//TOP交易列表
export function getTransactions(params: any) {
  return new Promise(async (resolve, reject) => {
    const res = await axiosCustom({
      cmd: TRANSACTIONS_URL,
      params: params
    })
    resolve(res)
  })
}
