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
	fmt.Println("APP STARTED")

	defer func() {
		fmt.Println("Server Stopped!")
	}()

	conf := GetConf()

	router := mux.NewRouter()
	routes.Register(router)

	router.PathPrefix(conf.Controller.Data).
		Handler(
			http.StripPrefix(
				conf.Controller.Data,
				http.FileServer(http.Dir("."+conf.Controller.Data)),
			),
		)

	spa := utils.SpaHandler{
		StaticPath: conf.View.Dest,
		IndexPath:  conf.View.Index,
	}

	router.PathPrefix("/").Handler(spa)

	server := &http.Server{
		Addr:           conf.Controller.Port, //os.Getenv("PORT") //for Heroku hosting
		Handler:        router,
		ReadTimeout:    1000 * time.Second,
		WriteTimeout:   1000 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Fatal(server.ListenAndServe())
}
