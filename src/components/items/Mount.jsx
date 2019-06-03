import React from 'react'

export default function(props) {

   if(props.render) {
      return props.children
   }else {
      return null
   }
}