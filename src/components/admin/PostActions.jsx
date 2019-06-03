import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Creators as postActions } from '../../store/user/post'
const actions = { ...postActions }

class PostController extends Component {

   putPost() {

   }

   // Funcão administrativa
   deletePost(e) {
      e.stopPropagation()
      this.props.deletePost(e.currentTarget.dataset.id)

   }

   render() {

      return (

         <div className="post-actions">

            <div className="info">
               <div className="total-info-post">
                  <p><span>{this.props.clicks}</span> Cliques de usuários</p>
               </div>
            </div>

            <div className="btns">

               <button title="Deletar" func="delete"
                  data-id={this.props.postId}
                  onClick={this.deletePost.bind(this)}>
                  <i className="fas fa-trash"></i> Remover</button>

               <button title="Alterar" func="edit"
                  data-id={this.props.postId}
                  onClick={() => this.props.getOnePost(this.props.postId)}>
                  <i className="fas fa-edit"></i> Alterar</button>

            </div>

         </div>
      )
   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators(actions, dispatch)
}

export default connect((state) => ({

   options: state.post.options

}), mapDispatchToProps)(PostController)