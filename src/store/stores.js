import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {reducer as toastrReducer} from 'react-redux-toastr'

import post from './user/post'
import auth from './auth/auth'

const root = combineReducers({
   post: post, 
   auth: auth , 
   form: formReducer, 
   toastr: toastrReducer

})

export default root