import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Pagination extends Component {

   render() {

      return (
         <nav className="navigation" onClick={this.props.onClick}>
            <ul>
               <li><i className="fas fa-plus"></i> Carregar mais</li>
            </ul>
         </nav>
      )
   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators({}, dispatch)
}

export default connect((state) => ({


}), mapDispatchToProps)(Pagination)