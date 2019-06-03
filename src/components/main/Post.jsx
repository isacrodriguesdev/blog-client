import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Mount from '../items/Mount'
import PostActions from '../admin/PostActions'
import SharePost from '../items/SharePost'
import Category from '../items/Category'

import { Creators as post } from '../../store/user/post'
const actions = {...post} 

class Posts extends Component {

   handlePost(e) {

      if (e.currentTarget.dataset.link) {
         window.open(e.currentTarget.dataset.link, 'blank')
         this.props.countClicks(e.currentTarget.dataset.id, this.props.options)
      }
   }

   handlePostShareFacebook(e) {
      e.stopPropagation()

   }
   handlePostShareTwitter(e) {
      e.stopPropagation()
   }

   render() {

      return (
         <article className="post-article">

            <div className="post">

               <Mount render={this.props.image}>
                  <div className="post-stream">
                     <img src={this.props.image} />
                  </div>
               </Mount>

               <div className="post-text">

                  <div className="txt-1">

                     <h4 style={{
                        cursor: "pointer", maxWidth: "max-content",
                        wordWrap: "break-word"
                     }}
                        data-link={this.props.link} data-id={this.props.id}
                        onClick={this.handlePost.bind(this)}>
                        {this.props.title}
                     </h4>

                     <p>{this.props.text}</p>

                  </div>

                  <div className="txt-2">

                     <p><span>{this.props.date + " as " + this.props.time}</span></p>

                     <div className="post-fotter">

                        <Category category={this.props.category} label={this.props.category} />
                        <SharePost
                           clickFacebook={this.handlePostShareFacebook.bind(this)}
                           clickTwitter={this.handlePostShareTwitter.bind(this)}
                        />
                     </div>

                  </div>

               </div>
            </div>

            <Mount render={this.props.isAuthetication}>
               <PostActions
                  postId={this.props.id}
                  clicks={this.props.clicks}
               />
            </Mount>

         </article>
      )
   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators(actions, dispatch)
}

export default connect((state) => ({

   isAuthetication: state.auth.isAuthetication

}), mapDispatchToProps)(Posts)