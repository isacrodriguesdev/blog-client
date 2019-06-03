import React from 'react'

import facebookIcon from '../../assets/images/icons/facebook.png' 
import twitterIcon from '../../assets/images/icons/twitter.png' 
import youtubeIcon from '../../assets/images/icons/youtube.png' 

export default function (props) {

   function logout() {
      localStorage.removeItem('token')
      window.location.href = "/"
   }

   return (
      <header className="header">
         <div className="h-top">
            <h5 onClick={() => logout()}>Blog <i className="far fa-heart"></i> </h5>
            <div id="social-icons-header">

               <a href="https://www.facebook.com/neusa.rodrigues.524934" title="Facebook" target="blank">
                  <img src={facebookIcon} />
               </a>
               <a href="" title="Twitter" target="blank">
                  <img src={twitterIcon} />
               </a>
               <a href="" title="Youtube" target="blank">
                  <img src={youtubeIcon} />
               </a>
               
            </div>
         </div>
         <div className="h-banner">

            <hgroup className="title">
               <h1>Saúde e Disciplina</h1>
               <h2>
                  Foco nos objetivos e sempre vivendo e trabalhando com muita saúde. 
               </h2>
            </hgroup>

         </div>
      </header>
   )
}