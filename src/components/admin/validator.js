
export default function (data) {

   let errors = {}

   if (!data.title)
      errors.title = "* Campo obrigatorio"

   if (!data.content)
      errors.content = "* Campo obrigatorio"

   if (!data.category)
      errors.category = "Selecione uma categoria"

   if (data.title && data.title.length < 5)
      errors.title = "Título muito curto"

   if (data.title && data.title.length > 70)
      errors.title = "Título muito longo"

   if (data.link)
      if (!data.link.includes('http'))
         errors.link = "O link não e uma url valida"

   if (data.content && data.content.length < 20)
      errors.content = "O assunto deve ter no mínimo 20 caracteres"

   if (data.content && data.content.length > 2000)
      errors.content = "O assunto deve ter no maximo 2000 caracteres"

   if (data.file && !data.file.type.includes('image/'))
      errors.image = "Envie apenas imagem"

   return errors
}