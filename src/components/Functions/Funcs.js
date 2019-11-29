import jwt from "jsonwebtoken"

//-this-function-check-is-mobile-browser-or-not-//

export function isMobile () {
   if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      console.log(true)
      localStorage.setItem("type", "bottom")
      return true
   } else {
      console.log(false)
      localStorage.setItem("type", "standart")
      return false
   }
}

//--Get-jwt-grom-locale-storage--//

export const getJWT = () => {
   return localStorage.getItem("jwt")
}

//--Get-Role--//

export const getRole = () => {
   var token = getJWT()
   var decode = jwt.decode(token)
   if (decode === '' || decode === null) {
      return 0
   } else {
      return decode.role
   }
}

//--get-login--//

export const getLogin = () => {
   var token = getJWT()
   var decode = jwt.decode(token)
   if (decode === '' || decode === null) {
      return 0
   } else {
      return decode.login
   }
}