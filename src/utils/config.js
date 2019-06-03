import axios from 'axios'

import { sessionExpired } from '../actions/admin/authetication'
import {toastr} from 'react-redux-toastr'

const url = {
   local: "http://192.168.1.10:4088",
   heroku: "https://blog-saude-server.herokuapp.com"
}

export const baseUrl = url.heroku

export const devtools = {
   redux: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
}

export function setConfigApi() {

   axios.defaults.baseURL = baseUrl

   axios.interceptors.response.use(function (response) {
      return response
   }, function (error) {
      if (typeof error.response == "undefined") {
         return toastr.error('Erro', 'Sem acesso a internet')
      }
      if (error.response.status === 401) {
         sessionExpired()
      }
   })
}