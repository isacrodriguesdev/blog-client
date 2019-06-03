import React from 'react'

export default function (props) {

   const style = {
      category: {
         esporte: { backgroundColor: 'rgba(40,200,120,0.6)' },
         cursos: { backgroundColor: 'rgba(55,55,80,.5)' },
         beleza: { backgroundColor: 'rgba(255,77,148,.6)' },
         culinaria: { backgroundColor: 'rgba(255, 166, 0, .6)' },
         noticia: { backgroundColor: 'rgba(20,120,200, .6)' },
      }
   }

   function setBackground() {

      const bg = style.category

      switch (props.category) {
         case 'Esporte':
            return bg.esporte 
         case 'Cursos':
            return bg.cursos 
         case 'Beleza':
            return bg.beleza 
         case 'Culinária':
            return bg.culinaria 
         case 'Notícia':
            return bg.noticia 
         default: return {backgroundColor: "rgba(113,89,193,.5)"}
      }
   }

   return (
      <div style={setBackground()} className="category-color">
         <span>{props.label}</span>
      </div>
   )
}