import axios from 'axios'
import { Notify } from 'vant'
const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// request interceptor
request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res.code !== 1) {
      Notify({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    Notify({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export function getGames(params) {
  return request({
    url: '/game/games',
    method: 'get',
    params
  })
}
export function addOrder(data) {
  return request({
    url: '/order/addOrder',
    method: 'post',
    data
  })
}
