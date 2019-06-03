import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class SharePost extends Component {

   render() {

      return (
         <div className="social-icons-post">

            <button href="" 
               title="Facebook"
               onClick={this.props.clickFacebook}
               >

               <img src={"https://image.flaticon.com/icons/svg/174/174848.svg"} />

            </button>

            <button href="" 
               title="Twitter"
               onClick={this.props.clickTwitter}
               >

               <img src={"https://image.flaticon.com/icons/svg/124/124021.svg"} style={{borderRadius:"3px"}} />

               </button>
         </div>
      )
   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators({}, dispatch)
}

export default connect((state) => ({


}), mapDispatchToProps)(SharePost)