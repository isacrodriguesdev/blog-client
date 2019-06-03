import io from 'socket.io-client'
import { baseUrl } from './config';

export function registerUserOnline() {

   const socket = io.connect(baseUrl)

   try {
      socket.on('conn', function (res) {
         socket.emit('user', { msg: "Estou online" })
      })
   } catch (e) {
      console.log('Socket error')
   }
}