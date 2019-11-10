import jwt from "jsonwebtoken"

export const isMobile = () => {
   return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export const getJWT = () => {
   return localStorage.getItem("jwt")
}

export const getRole = () => {
   var token = getJWT()
   var decode = jwt.decode(token)
   if (decode === '' || decode === null) {
      return 0
   } else {
      return decode.role
   }
}