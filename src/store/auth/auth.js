import axios from 'axios'
import { getAuthetication, decodedToken} from '../../actions/admin/authetication'

const initialState = {
   isAuthetication: getAuthetication(),
   user: decodedToken(),
   error: ""
}

const Types = {
   AUTH_ERROR: "AUTH_ERROR"
}

export const Creators = {

   login: (data) => {
      return (dispatch) => {

         axios.post('/admin/login', data)
            .then(res => {
               if (!res.data.error) {

                  localStorage.setItem('token', res.data.token)
                  window.location.href = '/'

               } else {
                  return dispatch({
                     type: Types.AUTH_ERROR,
                     payload: res.data.error
                  })
               }
            })
      }
   },
}

export default function (state = initialState, action = {}) {

   const { type, payload } = action

   switch (type) {
      case Types.AUTH_ERROR:
         return {
            ...state,
            error: payload
         }
      default:
         return state
   }
}