package routes

import (
	"goreactapp/security"
	"goreactapp/utils"
	"net/http"

	"github.com/gorilla/mux"
)

const (
	//GET const used for READ methods in CR(Read)UD RESTapi
	GET = "GET"
	//POST const used for CREATE methods in C(Create)RUD RESTapi
	POST = "POST"
	//PUT const used for UPDATE methods in CRU(Update)D RESTapi
	PUT = "PUT"
	//DELETE const used for DELETE methods in CRUD(Delete) RESTapi
	DELETE = "DELETE"
)

type route struct {
	path     string
	function interface {
		ServeHTTP(w http.ResponseWriter, r *http.Request)
	}
}

func (_route *route) Init() {
	_route.function = utils.LogWrapper{security.JwtMiddleware.Handler(_route.function)}
}

//StartRouting function get slice of routes and prepare it for listen
func StartRouting(router *mux.Router, HTTPMethod string, routes []route) {
	for _, value := range routes {
		value.Init()
		router.Handle(value.path, value.function).Methods(HTTPMethod)
	}
}
