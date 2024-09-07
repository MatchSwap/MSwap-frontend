import { message } from 'antd'
import axios from 'axios'
import { SERVER_URL } from './api'

export function axiosCustom({
  cmd = '',
  headers = {},
  params = {},
  method = 'get',
  data = {},
  api = SERVER_URL, //SERVER_URL, SERVER_TEST_URL
  successCode = 0
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: api + cmd,
        method: method,
        headers,
        params,
        data
      })
      const resData = res.data
      if (resData.code === successCode) {
        resolve(resData.data)
      } else {
        console.log({
          cmd: api + cmd,
          method: method,
          data: resData
        })
        message.error(resData.msg)
        reject({
          cmd: api + cmd,
          method: method,
          msg: resData.msg
        })
      }
    } catch (e) {
      console.log({
        cmd: api + cmd,
        method: method,
        data: e
      })
      reject({
        cmd: api + cmd,
        method: method,
        msg: e
      })
    }
  })
}
