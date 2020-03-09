package main

import (
	"fmt"
	"goreactapp/routes"
	"net/http"

	"github.com/gorilla/mux"
)

//Main function => Entry point
func main() {
	fmt.Println("listening default port")

	port := "1012" //os.Getenv("PORT") //for Heroku hosting

	defer func() {
		fmt.Println("Server Stopped!")
	}()

	r := mux.NewRouter()
	routes.Register(r)

	//r.PathPrefix("/").Handler(http.FileServer(http.Dir("./build/")))
	r.PathPrefix("/data/").Handler(http.StripPrefix("/data/", http.FileServer(http.Dir("./data/"))))
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./build/static/"))))
	r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("./build/assets/"))))
	r.HandleFunc("/", routes.IndexHandler)
	http.ListenAndServe(":"+port, r)
}
