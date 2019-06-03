import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Select extends Component {

   state = {
   }

   render() {

      return (
         <select name="posts-order" id="posts-order-select"
            onChange={(e) => console.log(e.target.value)}
         >
            <option value="0">Recentes</option>
            <option value="1">Populares</option>
         </select>
      )
   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators({}, dispatch)
}

export default connect((state) => ({


}), mapDispatchToProps)(Select)