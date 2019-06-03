import React, { Fragment } from 'react'
import Title from '../items/Title';

export default function (props) {

   return (
      <Fragment>

         <div className="band">

            <div className="about-avatar">

               <div className="owner-blog-perfil">
                  <input type="file" id="up-photo-admin" hidden />
                  <label htmlFor="up-photo-admin">
                     <img src="https://blog-saude-server.herokuapp.com/avatar/admin_primary.jpg" />
                  </label>
               </div>

               <div className="owner-blog-about">
                  <h4>Neuza Rodrigues</h4>
                  <p>O meu objetivo e te ajudar a ter uma qualidade de vida, formas, métodos e produtos que uso, que assim como eu, você também ira conseguir seus resultados desejados. Tudo em seu tempo, do jeito certo sem afetar sua saúde.</p>
               </div>

            </div>

         </div>

      </Fragment>
   )
}