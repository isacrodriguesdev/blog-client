import React, {Component, Fragment} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Header from '../components/main/Header'
import Footer from '../components/main/Footer'

import Contact from '../components/main/Contact'
import Main from '../components/main/Main'

class App extends Component {

   render() {

      return (
         <Fragment>
            <Header />
            <Main />
            <Contact />
            <Footer />
         </Fragment>
      )
   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators({}, dispatch)
}

export default connect((state) => ({
   

}), mapDispatchToProps)(App)