import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import Title from '../items/Title';
import Abount from '../main/About'

import axios from 'axios'

class Contact extends Component {

   state = {
      errors: {},
      message: ""
   }

   validateForm(value) {

      const errors = {}

      if (value.title.length < 8)
         errors.title = 'O assunto e muito curto!'
      if (value.name.length < 3)
         errors.name = 'Nome muito curto!'
      if (value.email.length < 8)
         errors.email = 'Email muito curto!'
      if (value.message.length < 8)
         errors.message = 'Messagem muito curta!'
      if (value.message.length > 605)
         errors.message = 'Messagem muito longa!'

      this.setState({ errors })
   }

   submit(values) {

      this.validateForm(values)
      if (this.state.errors.length > 0) return

      axios.post('/mail', values)
         .then(res => {
            this.setState({message: "Email enviado com sucesso!"})
         })
   }

   render() {

      const { handleSubmit } = this.props

      return (
         <Fragment>

            <Title title="Contato" />

            <section className="form-contact" style={{display:"flex",marginTop:"25px"}}>

               <div id="contact">

                  <form onSubmit={handleSubmit(this.submit.bind(this))}>

                     <Field
                        name="title"
                        component="input"
                        type="text"
                        placeholder="Assunto*"
                        ref="inputTitle"
                        required={true}
                     />
                     <span className="warn-invalid-input">{this.state.errors.title}</span>

                     <Field
                        name="name"
                        component="input"
                        type="text"
                        placeholder="Nome*"
                        ref="inputName"
                        required={true}
                     />
                     <span className="warn-invalid-input">{this.state.errors.name}</span>
                     <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="E-mail*"
                        ref="inputEmail"
                        required={true}
                     />
                     <span className="warn-invalid-input">{this.state.errors.email}</span>

                     <Field
                        name="message"
                        component="textarea"
                        placeholder="Envie uma mensagem*"
                        rows="5"
                        ref="inputMessage"
                     />
                     <span className="warn-invalid-input">{this.state.errors.message}</span>

                     <div style={{display: "flex",justifyContent:"flex-end"}}>
                        <button className="input-btn">Resetar</button>
                        <button className="input-btn">Enviar</button>
                     </div>

                  </form>

                  <Abount />
               </div>

            </section>

         </Fragment>
      )
   }
}

const mapStateToProps = (state) => {
   return {

   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators({}, dispatch)
}

Contact = reduxForm({ form: "contact" })(Contact)

export default connect(mapStateToProps, mapDispatchToProps)(Contact)