import axios from 'axios'
import { deleteAuthetication, sessionExpired, } from '../../actions/admin/authetication'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'

const initialState = {
   posts: null,
   formInitialValues: {},
   category: "",
   totalPosts: 0,
   totalClicks: 0,
   connections: 0,
   options: {
      category: "",
      search: "",
      pages: 8
   }
}

const Types = {
   GETED_POSTS: "user/GETED_POSTS",
   MORE_POSTS: "user/MORE_POSTS",
   LOADED_CATEGORY: "user/LOADED_CATEGORY",
   POST_SEARCH: "user/POST_SEARCH",
   RESETED_SEARCH: "user/RESETED_SEARCH",
   REGISTERED_CLICK: "user/REGISTERED_CLICK",
   // ADMINISTRATIVA
   LOADED_POST_FORM: "admin/LOADED_POST_FORM",
   ADDED_POST: "admin/ADDED_POST",
   COUNT_TOTAL: "admin/COUNT_TOTAL",
   EDITED_POST: "admin/EDITED_POST",
   DEMOVED_POST: "admin/DEMOVED_POST"
}

export const Creators = {

   getPosts: ({pages,category,search} = initialState.options) => {

      return (dispatch, getState) => {
         axios.get(`/post?category=${category}&search=${search}&pages=${pages}`)
            .then(res => {
               return dispatch({
                  type: Types.GETED_POSTS,
                  payload: { posts: res.data }
               })
            }).catch(error => {
               console.log(error)
            })
      }
   },
   morePosts: () => {
      return (dispatch, getState) => {

         dispatch({
            type: Types.MORE_POSTS,
            payload: getState().post.options.pages += initialState.options.pages
         })
         dispatch(Creators.getPosts(getState().post.options))
      }
   },
   loadCategory: (category) => {

      return (dispatch, getState) => {

         dispatch({
            type: Types.LOADED_CATEGORY,
            payload: category
         })
         dispatch(Creators.getPosts(getState().post.options))

      }
   },
   searchPost: (keyword) => {
      return (dispatch, getState) => {

         dispatch({
            type: Types.POST_SEARCH,
            payload: keyword
         })
         dispatch(Creators.getPosts(getState().post.options))
      }
   },
   resetSearch: () => {
      return [{
         type: Types.RESETED_SEARCH
      },
      initialize('search', {})
      ]
   },
   countClicks: (id) => {
      return (dispatch, getState) => {

         axios.put('/post/clicked/' + id)
            .then(res => {
               dispatch({
                  type: Types.REGISTERED_CLICK,
                  payload: res.data.id
               })
               dispatch(Creators.getPosts(getState().post.options))
            })
      }
   },
   // ADMINISTRATIVA
   getOnePost: (id) => {
      return (dispatch) => {

         axios.get('/post/' + id)
            .then(res => {
               return dispatch({
                  type: Types.LOADED_POST_FORM,
                  payload: res.data
               })
            })
      }
   },
   addPost: (post) => {

      return (dispatch, getState) => {

         const data = new FormData()

         for (let i = 0; i < Object.keys(post).length; i++) {

            data.set(Object.keys(post)[i], Object.values(post)[i])
         }
         axios.post('/post', data, {
            headers: {
               "Content-Type": "multipart/form-data",
               "Content-Type": "application/json",
            },
         }).then(res => {
            toastr.success('Sucesso', 'Artigo criado com exito')

            dispatch([
               Creators.getPosts(getState().post.options),
               initialize('PostForm', {}),
               dispatch(Creators.info(true)),
            ])
         })

      }
   },
   deletePost: (id) => {
      return (dispatch, getState) => {

         axios.delete("/post/" + id)
            .then(_ => {
               toastr.success('Sucesso', 'O artigo foi removido')
               return dispatch([
                  Creators.getPosts(getState().post.options),
                  dispatch(Creators.info(true))
               ])
            })
      }
   },
   updatePost: (data, id) => {

      delete data.id

      return (dispatch, getState) => {

         axios.put('/post/' + id, data)
            .then(res => {
               console.log(res)
               toastr.success('Sucesso', 'O artigo foi alterado')
               return dispatch([
                  Creators.getPosts(getState().post.options),
                  initialize('PostForm', {})
               ])
            })
      }
   },
   cancelUpdateForm: () => {
      return [
         initialize('PostForm', {})
      ]
   },
   info: (update = false) => {

      return (dispatch, getState) => {

         if (update === false && localStorage.getItem('info'))
            return dispatch({
               type: Types.COUNT_TOTAL,
               payload: JSON.parse(localStorage.getItem('info'))
            })
         else localStorage.removeItem('info')

         axios.get('/info')
            .then(res => {
               dispatch({
                  type: Types.COUNT_TOTAL,
                  payload: res.data
               })
               if(res.data)
                  localStorage.setItem('info', JSON.stringify(res.data))
            }).then(res => {
               if(res.data)
                  toastr.success('Sucesso', 'O status foi atualizado')
            })
            .catch(error => {
               return {error}
            })
      }
   },
   refreshInfo: () => {
      return dispatch => {
        dispatch(Creators.info(true))
      }
   }
}

export default function (state = initialState, action = {}) {

   const { type, payload } = action

   switch (type) {
      case Types.GETED_POSTS:
         return {
            ...state,
            posts: payload.posts,
         }
      case Types.LOADED_POST_FORM:
         return {
            ...state,
            formInitialValues: payload
         }
      case Types.MORE_POSTS:
         return {
            ...state,
            options: { ...state.options, pages: payload }
         }
      case Types.LOADED_CATEGORY:
         return {
            ...state,
            options: { ...state.options, category: payload, pages: 5 }
         }
      case Types.POST_SEARCH:
         return {
            ...state,
            options: { ...state.options, search: payload }
         }
      case Types.RESETED_SEARCH:
         return {
            ...state,
            options: { ...state.options, search: "" }
         }
      case Types.COUNT_TOTAL:
         return {
            ...state,
            ...payload
         }
      case Types.REGISTERED_CLICK:
         return {
            ...state
         }
      case Types.ADDED_POST:
         return {
            ...state
         }
      default:
         return state
   }
}