// @React/Redux
import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// @Components
import Pagination from '../items/Pagination';
import PostForm from '../admin/PostForm';
import Post from './Post';
import Title from '../items/Title';
import Mount from '../items/Mount';
import NotFound from '../items/NotFount'
import Search from '../items/Search';
// @Actions
import { Creators as post } from '../../store/user/post'
const actions = {...post}
// @Utils

class Main extends Component {

   componentWillMount() {
      this.props.getPosts(this.props.options)
   }

   posts() {
      const posts = []

      if (Array.isArray(this.props.posts) && this.props.posts.length > 0) {

         this.props.posts.map(post => {
               posts.push(
                  <Post key={post.id}
                     id={post.id}
                     title={post.title}
                     text={post.content}
                     image={post.image}
                     date={post.date}
                     time={post.time}
                     link={post.link}
                     clicks={post.clicks}
                     category={post.category}
                  />
               )
            })

         return posts

      } else {
         
         return <NotFound warn="Nada encontrado" />
      }
   }

   render() {

      return (
         <Fragment>

            <Mount render={this.props.isAuthetication}>
               <PostForm />
            </Mount>

            <main>

            <Title title="Artigos" />

               <div className="posts-container">

                  <Search />

                  <div className="posts">
                     {this.posts()}
                  </div>
               </div>

               <Mount render={Array.isArray(this.props.posts) && this.props.posts.length > 0}>

                  <Pagination onClick={_ => {this.props.morePosts()}} />

               </Mount>

            </main>

         </Fragment>
      )
   }
}

const mapDispatchToProps = (dispatch) => {

   return bindActionCreators(actions, dispatch)
}

export default connect((state) => ({

   isAuthetication: state.auth.isAuthetication,
   posts: state.post.posts,
   form: state.form,
   options: state.post.options

}), mapDispatchToProps)(Main)