package main

import (
	"fmt"
	"goreactapp/routes"
	"html/template"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/zhexuany/wordGenerator"
)

var sessionAdminKey string

func indexHandler(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("./build/index.html")
	if err != nil {
		fmt.Println("IndexHandler status : Error => ", err)
	} else {
		fmt.Println("IndexHandler status : OK")
	}

	t.Execute(w, nil)
}

func subdomainIndexHandler(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("./build/login.html")
	if err != nil {
		fmt.Println("IndexHandler status : Error => ", err)
	} else {
		fmt.Println("IndexHandler status : OK")
	}

	t.Execute(w, nil)
}

func postHandler(w http.ResponseWriter, r *http.Request) {
	if sessionAdminKey == r.FormValue("key") {
		t, err := template.ParseFiles("./build/adminpanel.html")
		if err != nil {
			fmt.Println("IndexHandler status : Error => ", err)
		} else {
			fmt.Println("IndexHandler status : OK")
		}

		t.Execute(w, nil)
	} else {
		fmt.Fprintf(w, "Пользователь не авторизован")
	}
}

func main() {
	fmt.Println("listening default port")

	port := "1012" //os.Getenv("PORT")

	defer func() {
		fmt.Println("Server Stopped!")
	}()

	r := mux.NewRouter()

	admin := r.Host("admin.localhost:1012").Subrouter()

	admin.HandleFunc("/", subdomainIndexHandler)
	admin.HandleFunc("/login", postHandler).Methods("POST")

	//r.HandleFunc("/accounts", functions.Accounts).Methods("GET")
	routes.Register(r)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./build/")))

	sessionAdminKey = wordGenerator.GetWord(128)

	fmt.Println("session admin key => ", sessionAdminKey)

	r.HandleFunc("/", indexHandler)
	http.ListenAndServe(":"+port, r)
}
