package security

import (
	"encoding/json"
	"fmt"
	"goreactapp/database"
	"io/ioutil"
	"net/http"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
)

//#--Inizialize-DataBase--#//

var db = database.DBexist()

//#--create-the-secret-key--#//

var mySigningKey = []byte("thedayofthesecondmorning")

//#--var-function-for-jwtMiddleWare--#//

var JwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return mySigningKey, nil
	},
	SigningMethod: jwt.SigningMethodHS256,
})

//#--get-token-for-authorization--#//

var GetTokenHandler = http.HandlerFunc(func(w http.ResponseWriter,
	r *http.Request) {

	var tempAcc database.Users

	tempResult, err := ioutil.ReadAll(r.Body)
	fmt.Println("error on ioutil -> ", err)
	err = json.Unmarshal(tempResult, &tempAcc)
	fmt.Println("error on json -> ", err)

	var role string
	err = db.ExecuteQueryRow(
		"SELECT user_role FROM users WHERE user_login=$1 AND user_password=$2",
		tempAcc.UserLogin, tempAcc.UserPassword).
		Scan(&role)
	fmt.Println("error on select -> ", err)

	if err == nil {
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"login":    tempAcc.UserLogin,
			"password": tempAcc.UserPassword,
			"role":     role,
			"time":     time.Now().Add(time.Hour * 24).Unix(),
		})

		// Sign and get the complete encoded token as a string using the secret
		tokenString, err := token.SignedString(mySigningKey)

		fmt.Println(err)

		fmt.Fprintf(w, tokenString)
	} else {
		http.Error(w, err.Error(), 401)
	}
})
