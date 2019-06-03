
export function date() {

   const date = new Date()

   let day = date.getDate()
   let month = date.getMonth() + 1  

   if (day <= 9) day = "0"+day
   if (month <= 9) month = "0"+month

   return `${day}/${month}/${date.getFullYear()}`
}

export function time() {
   
   const date = new Date()

   let hours = date.getHours()
   let minutes = date.getMinutes()

   if(hours <= 9) hours = "0" + hours
   if(minutes <= 9) minutes = "0" + minutes

   return `${hours}:${minutes}`
}
