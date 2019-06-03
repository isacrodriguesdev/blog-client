// @React/Redux
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import Toastr from 'react-redux-toastr'
// @Middlewares
import multi from 'redux-multi'
import thunk from 'redux-thunk'
// @Services
// @Routes
import Routes from './main/routes'
// @Styles
import './interface/styles/css/style.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
// @Utils
import {setAuthetication} from './actions/admin/authetication'
import {setConfigApi, devtools} from './utils/config'

import duckStore from './store/stores'
import { registerUserOnline } from './utils/socket';

const store = applyMiddleware(multi, thunk)(createStore)(duckStore, devtools.redux)

setAuthetication()
setConfigApi()
registerUserOnline()

ReactDOM.render(
   <Provider store={store}>
      <Routes />
      <Toastr timeOut={6000}
            newestOnTop={false}
            preventDuplicates={true}
            position="top-right"
            transitionIn="fadeIn"
            progressBar={true}
            transitionOut="fadeOut"
            className="mytoastr"
            />
   </Provider>, document.getElementById('root'))
