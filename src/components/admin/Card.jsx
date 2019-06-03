// @Services
// @React/Redux
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// @Outers
// @Utils
import { logout } from '../../actions/admin/authetication'
// @Actions
import { Creators as post } from '../../store/user/post'
const actions = { ...post }

class AdminCard extends Component {

   componentWillMount() {
      this.props.info()
   }

   render() {

      return (
         <div className="admin-header">

            <div id="perfil">
               <label htmlFor="">
                  <img src={this.props.photo} />
               </label>

               <div id="admin">
                  <p id="name">{this.props.name}<br /></p>
                  <span id="sub">Administrador(a)</span>
               </div>
            </div>

            <div id="card-info">

               <p id="total-info">
                  <span>{this.props.totalPosts}</span> Artigos criados</p>

               <p id="total-info">
                  <span>{this.props.totalClicks}</span> Cliques totais</p>

               <p id="total-info">
                  <span>{this.props.connections}</span>
                  {this.props.connections < 2 ? " Usuário conectado" : " Usuários conectados"}
               </p>

            </div>

            <div id="btns-aria">
               <div id="btn-aria">
                  <button id="btn-update" onClick={_ => this.props.refreshInfo()}>Atualizar</button>
               </div>

               <div id="btn-aria">
                  <button id="btn-logout" onClick={_ => logout()}>Sair</button>
               </div>
            </div>

         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      name: state.auth.user.name,
      photo: state.auth.user.photo,
      totalClicks: state.post.totalClicks,
      totalPosts: state.post.totalPosts,
      connections: state.post.connections
   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCard)
