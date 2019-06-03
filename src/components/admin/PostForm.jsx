// @Images
import iconPicture from '../../assets/images/icons/picture.png'
// @ React/Redux
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, initialize } from 'redux-form'
// @Components
import Card from './Card'
import Mount from '../items/Mount';
// @Utils
import { date, time } from '../../utils/datetime'
import validate from './validator'
// @Actions
import { Creators as adminActions } from '../../store/user/post'
const actions = { ...adminActions }

class CreatePost extends Component { // Componente administrativo

   constructor(props) {
      super(props)

      this.initialState = {
         image: {
            file: "",
            url: "",
            name: ""
         },
         toggleCategory: false,
         errors: {},
         category:  "",
      }
      this.state = this.initialState
   }

   async addPost(data) {
      if(this.state.image.file)
         data.file = this.state.image.file
      if(this.state.category)
         data.category = this.state.category
      
      const errors = await validate(data)
      
      if (Object.keys(errors).length > 0)
      return this.setState({ errors })
      
      data.date = date()
      data.time = time()

      await this.props.addPost(data)
      this.resetState()
   }

   async updatePost(data) {
      if(this.state.image.file)
         data.file = this.state.image.file
      if(this.state.category)
         data.category = this.state.category
      
      const errors = await validate(data)
      
      if (Object.keys(errors).length > 0)
         return this.setState({ errors })

      await this.props.updatePost(data, data.id)
      this.resetState()
   }

   async viewBanner(e) {
      if (!e.target.files[0]) return

      this.refs.errorImageType.innerHTML = ""
      this.refs.loadRun.style.width = "0%"

      await this.setState({image: {file: e.target.files[0]}})

      if (!this.state.image.file.type.includes('image/'))
         return this.refs.errorImageType.innerHTML = "Envie apenas imagem"

      const reader = new FileReader()

      reader.readAsDataURL(this.state.image.file)

      reader.onprogress = (fileLoad) => {
         this.refs.loadRun
            .style.width = ((fileLoad.loaded / fileLoad.total) * 100) + "%"
      }
      reader.onload = () => {
         this.setState({
            image: {
               file: this.state.image.file,
               url: reader.result,
               name: this.state.image.file.name
            }
         })
      }
   }

   cancelUpdate(e) {
      e.stopPropagation()
      e.preventDefault()
      this.props.cancelUpdateForm()
      this.resetState()
   }

   resetState() {
      this.setState(this.initialState)
      this.refs.categorypost.innerHTML = "Categorias"
      this.refs.loadRun.style.width = "0%"
      initialize('PostForm', {})
      delete this.props.poster.id
      delete this.props.poster.image
   }

   async select(e) {
      e.stopPropagation()
      await this.setState({ category: e.target.dataset.option, toggleCategory: false })
      this.refs.categorypost.innerHTML = this.state.category
   }

   openList(e) {
      e.stopPropagation()
      if (this.state.toggleCategory === false)
         this.setState({ toggleCategory: true })
      else
         this.setState({ toggleCategory: false })
   }

   render() {

      const { handleSubmit } = this.props

      return (
         <div className="admin-area">

            {/* CARD ADMIN */}
            <Card />

            <form>

               <input type="file" id="upload-file"
                  name="file"
                  onChange={this.viewBanner.bind(this)}
                  accept=".png,.jpg,.jpeg,.pjpeg"
                  hidden
               />

               <div id="post-banner">
                  <label htmlFor="upload-file">

                     <Mount 
                        render={this.state.image.url || this.props.poster.image}>
                        <img src={this.state.image.url || this.props.poster.image} />
                     </Mount>

                     <Mount 
                        render={!this.state.image.url && !this.props.poster.image}>
                        <img src={iconPicture} style={{ objectFit: "cover", width: "max-content", height: "max-content" }} />
                        <span>Selecione uma imagem</span>
                     </Mount>

                  </label>

                  <div className="upload-progress"
                     style={{ width: "0%" }}
                     ref="loadRun"></div>

                  <span className="warn-invalid-input"
                     ref="errorImageSize">{this.state.errors.image}</span>
                  <span className="warn-invalid-input"
                     ref="errorImageType">{this.state.errors.image}</span>
               </div>

               <div className="post-input">

                  {/* ENTRADA DE DADOS */}
                  <Field
                     type="text" placeholder="Título do post*"
                     name="title"
                     component="input"
                  />
                  <span className="warn-invalid-input">{this.state.errors.title}</span>

                  {/* NOME DA IMAGEM, NÃO E POSSIVEL EDITAR */}
                  <Mount render={this.state.image.name}>
                     <input
                        type="text" placeholder="Nome da imagem"
                        value={this.state.image.name}
                        readOnly={true}
                        onChange={null}
                     />
                  </Mount>

                  <div screen-to="desktop">
                     <Field type="text" placeholder="Link do post"
                        name="link"
                        component="input"
                     />

                     <div className="select-add-post" 
                        onClick={this.openList.bind(this)}>
                        <span ref="categorypost">
                           { !this.props.poster.category ? "Categorias" : this.props.poster.category}
                           </span> <i className="fas fa-caret-down"></i>
                     </div>

                     <div className="select-list-post-add" style={{
                        display: this.state.toggleCategory ? "block" : "none"
                     }}>
                        <ul id="options" onClick={this.select.bind(this)}>
                           <li data-option="Notícia">Notícia</li>
                           <li data-option="Esporte">Esporte</li>
                           <li data-option="Cursos">Cursos</li>
                           <li data-option="Idiomas">Idiomas</li>
                           <li data-option="Beleza">Beleza</li>
                           <li data-option="Culinária">Culinária</li>
                        </ul>
                     </div>
                  </div>

                  <span className="warn-invalid-input">{this.state.errors.link}</span>

                  <Field name="content" rows="5"
                     placeholder="Escreva um assunto para seu post*"
                     component="textarea"
                  />
                  <span className="warn-invalid-input">{this.state.errors.content}</span>

                  <div className="post-end">

                     <p className="post-warn">{this.state.errors.category}</p>

                     <Mount render={!this.props.poster.id}>
                        <button className="post-btn-add" onClick={
                           handleSubmit(this.addPost.bind(this))}>
                           <i className="fas fa-plus"></i> Adicionar</button>
                     </Mount>

                     <Mount render={this.props.poster.id}>
                        <button className="post-btn-add" 
                           onClick={this.cancelUpdate.bind(this)}>
                           <i className="fas fa-plus"></i> Cancelar</button>
                     </Mount>

                     <Mount render={this.props.poster.id}>
                        <button className="post-btn-add" onClick={
                           handleSubmit(this.updatePost.bind(this))}>
                           <i className="fas fa-plus"></i> Alterar</button>
                     </Mount>                     

                  </div>
               </div>

            </form>
         </div >
      )
   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators(actions, dispatch)
}

const mapStateToProps = (state) => {
   return {
      initialValues: state.post.formInitialValues,
      poster: state.post.formInitialValues,
   }
}

CreatePost = reduxForm({ 
   form: "PostForm",
   enableReinitialize: true,

})(CreatePost)

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)