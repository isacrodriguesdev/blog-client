import axios from 'axios'
import jwt from 'jsonwebtoken'
import {toastr} from 'react-redux-toastr'

export function setAuthetication() {

   const token = localStorage.getItem('token')

   if(token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
   }else {
      delete axios.defaults.headers.common['Authorization']
   }
   
}

export function deleteAuthetication(ref = "/admin") {
   
   localStorage.removeItem('token')
   delete axios.defaults.headers.common['Authorization']
   window.location.href = ref
   
}

export function getAuthetication() {
   return localStorage.getItem('token')
}

export function sessionExpired(){

   toastr.error('Erro', 'Sua sessão expirou')

   setTimeout(function(){
      deleteAuthetication()
   }, 1000 * 4)
}

export function logout() {

   toastr.success('Sucesso', 'Você saiu da conta administrativa')
   
   setTimeout(function(){
      deleteAuthetication('/')
   }, 1000 * 3)
}

export function decodedToken() {
   return jwt.decode(localStorage.getItem('token'))
}