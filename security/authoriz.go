package security

import (
	"encoding/json"
	"fmt"
	_ "fmt"
	"goreactapp/database"
	_ "goreactapp/database/functions"
	"io/ioutil"
	"net/http"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
)

var db = database.DBexist()

var mySigningKey = []byte("thedayofthesecondmorning")

var JwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return mySigningKey, nil
	},
	SigningMethod: jwt.SigningMethodHS256,
})

var GetTokenHandler = http.HandlerFunc(func(w http.ResponseWriter,
	r *http.Request) {

	var tempAcc database.Users

	tempResult, err := ioutil.ReadAll(r.Body)
	fmt.Println("error on ioutil -> ", err)
	err = json.Unmarshal(tempResult, &tempAcc)
	fmt.Println("error on json -> ", err)

	var class string
	err = db.ExecuteQueryRow("SELECT user_role FROM users WHERE user_login=$1 AND user_password=$2", tempAcc.UserLogin, tempAcc.UserPassword).Scan(&class)
	fmt.Println("error on select -> ", err)

	if err == nil {
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"login":    tempAcc.UserLogin,
			"password": tempAcc.UserPassword,
			"role":     class,
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
