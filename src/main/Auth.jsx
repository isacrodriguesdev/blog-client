import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Creators as auth } from '../store/auth/auth'
const actions = {...auth}

class Auth extends Component {

   state = {
      username: "",
      password: ""
   }

   submitForm() {
      this.props.login({
         username: this.state.username,
         password: this.state.password
      })
   }

   render() {

      return (
         <section id="auth-admin">
            <div id="auth-content">
               <legend id="auth-title">Acesso administrativo</legend>
               <form>
                  
                  <input type="text" placeholder="Nome de usúario" name="username"
                     value={this.state.username}
                     onChange={(e) => this.setState({ username: e.target.value })}
                  />
                  
                  <input type="password" placeholder="Senha" name="password"
                     value={this.state.password}
                     onChange={(e) => this.setState({ password: e.target.value })}
                  />

               </form>
               <div id="auth-footer">
                  <p>{this.props.error}</p>
                  <button id="auth-btn"
                     onClick={this.submitForm.bind(this)}>Entrar</button>
               </div>
            </div>

            <button id="back-btn"
               onClick={_=>window.location.href = "/"}>Voltar</button>
         </section>
      )
   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators(actions, dispatch)
}

export default connect((state) => ({

   isAuthetication: state.auth.isAuthetication,
   error: state.auth.error

}), mapDispatchToProps)(Auth)