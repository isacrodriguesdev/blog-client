import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import {Creators as post} from '../../store/user/post'

const actions = {...post}

class Search extends Component {

   state = {
      category: "",
      OPENED_LIST: false,
   }

   submit(data) {
      if(this.state.category != undefined) 
         data.category = this.state.category
      
      this.props.searchPost(data.keyword)
      this.props.resetSearch()
   }

   select(e) {
      e.stopPropagation()
      this.props.loadCategory(e.target.dataset.option)

      this.refs.category.innerHTML = e.target.innerHTML
      this.setState({option: e.target.dataset.option, OPENED_LIST:false})

   }

   openList(e) {
      e.stopPropagation()
      if (this.state.OPENED_LIST === false) 
         this.setState({ OPENED_LIST: true })
      else 
         this.setState({ OPENED_LIST: false })
   }


   render() {

      const { handleSubmit } = this.props

      return (
         <div className="search-select">

            <div className="select" onClick={this.openList.bind(this)}>
               <span ref="category">Todos</span> <i className="fas fa-caret-down"></i>
            </div>

            <div className="select-list" style={{
               display: this.state.OPENED_LIST ? "block" : "none"
            }} ref="search">
               <ul id="options" onClick={this.select.bind(this)}>
                  <li data-option="">Todos</li>
                  <li data-option="Notícia">Notícia</li>
                  <li data-option="Esporte">Esporte</li>
                  <li data-option="Cursos">Cursos</li>
                  <li data-option="Idiomas">Idiomas</li>
                  <li data-option="Beleza">Beleza</li>
                  <li data-option="Culinária">Culinária</li>
               </ul>
            </div>

            <div className="search">
               <form onSubmit={handleSubmit(this.submit.bind(this))}>
                  <Field type="text" placeholder="Faça uma pesquisa..."
                     name="keyword"
                     component="input"
                  />
                  <button><i className="fas fa-search"></i></button>
               </form>
            </div>


         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      options: state.post.options
   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators(actions, dispatch)
}

Search = reduxForm({ form: 'search' })(Search)

export default connect(mapStateToProps, mapDispatchToProps)(Search)

