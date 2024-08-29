import axios from 'axios'
import storgeUtils from './storageUtils'
export const baseURL = 'http://127.0.0.1:8000'
const axios_instance = axios.create({
  baseURL: baseURL,
  timeout: 10000000,
  crossDomain: true
})

axios_instance.interceptors.request.use(
  req => {
    return req
  },
  err => {
    return Promise.reject(err)
  }
);

axios_instance.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response) {
      if (err.response.status === 401){
        storgeUtils.removeSession()
        storgeUtils.removeUser()
        window.location.href = '/login'
      }
      // else if (err.response.status === 403){
      //   window.location.href = '/users/students'
      // }
      return Promise.reject(err.response)
    }
    else {
      return Promise.reject(err)
    }
  }
);

export { axios_instance }