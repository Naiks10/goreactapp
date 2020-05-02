package main

import (
	"fmt"
	"goreactapp/routes"
	"goreactapp/utils"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

//Main function => Entry point
func main() {
	fmt.Println("listening default port")

	defer func() {
		fmt.Println("Server Stopped!")
	}()

	router := mux.NewRouter()
	routes.Register(router)

	router.PathPrefix("/data/").Handler(http.StripPrefix("/data/", http.FileServer(http.Dir("./data/"))))

	spa := utils.SpaHandler{StaticPath: "build", IndexPath: "index.html"}
	router.PathPrefix("/").Handler(spa)

	server := &http.Server{
		Addr:           ":8085", //os.Getenv("PORT") //for Heroku hosting
		Handler:        router,
		ReadTimeout:    1000 * time.Second,
		WriteTimeout:   1000 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Fatal(server.ListenAndServe())
}
