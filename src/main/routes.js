import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Auth from './Auth'
import App from './App'

export default function() {
   return (
      <BrowserRouter>
         <Switch>
            <Route exact path="/" component={App} />
            <Route path="/admin" component={Auth} />
         </Switch>
      </BrowserRouter>
   )
}