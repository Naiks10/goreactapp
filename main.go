package main

import (
	"fmt"
	"goreactapp/routes"
	"html/template"
	"net/http"

	"github.com/gorilla/mux"
)

func indexHandler(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("./build/index.html")
	if err != nil {
		fmt.Println("IndexHandler status : Error => ", err)
	} else {
		fmt.Println("IndexHandler status : OK")
	}

	t.Execute(w, nil)
}

func main() {
	fmt.Println("listening default port")

	port := "1012" //os.Getenv("PORT")

	defer func() {
		fmt.Println("Server Stopped!")
	}()

	r := mux.NewRouter()

	//r.HandleFunc("/accounts", functions.Accounts).Methods("GET")
	routes.Register(r)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./build/")))

	r.HandleFunc("/", indexHandler)
	http.ListenAndServe(":"+port, r)
}
