package main

import (
	"fmt"
	"goreactapp/routes"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

//#--main--#//

func main() {
	fmt.Println("listening default port")

	port := os.Getenv("PORT") //for Heroku hosting

	defer func() {
		fmt.Println("Server Stopped!")
	}()

	r := mux.NewRouter()
	routes.Register(r)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./build/")))
	http.ListenAndServe(":"+port, r)
}
