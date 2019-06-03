
export function validateInput(data) {

   const errors = {}

   if(!data.category) {
      errors.category = "Informe uma categoria"
   }

   if (data.title && data.title.length < 5) {
      errors.title = "Títilo muito curto"
   }

   if (data.imageUrl && data.imageUrl.length > 0) {
      if (data.imageUrl.indexOf('http') < 0) {
         errors.imageUrl = "Entrada informada não e uma url"
      }
   } else { delete errors.imageUrl }

   if (data.link && data.link.length > 0) {
      if (data.link.indexOf('http') < 0) {
         errors.link = "Entrada informada não e um link"
      }
   } else { delete errors.link }

   if (data.content && data.content.length < 10) {
      errors.content = "O assunto deve ter no mínimo 10 caracteres"
   }

   if (data.content && data.content.length > 2048) {
      errors.content = "O assunto e muito longo"
   }

   if(errors && Object.keys(errors).length > 0) {
      return {errors}
   } else {
      return data
   }
}

export function validateFile(file) {

   if(!file) return

   const errors = {}

   const maxBytes = 3 * 1024 * 1024

   const mimetypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/pjpeg'
   ]

   if (!mimetypes.includes(file.type))
      errors.mimetype = "* Envie epenas imagens"

   if (file.size > maxBytes)
      errors.maxBytes = "* Tamanho maximo do arquivo 3MB"


   if(errors && Object.keys(errors).length > 0) 
   {
      return {errors}

   } else {
      return {}
   }

}