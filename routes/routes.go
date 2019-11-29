package routes

import (
	"fmt"
	"goreactapp/database/functions"
	"goreactapp/security"
	"html/template"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/zhexuany/wordGenerator"
)

var sessionAdminKey string

//#--Subdomain-Handler-for-admin-panel--#//

func subdomainIndexHandler(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("./build/login.html")
	if err != nil {
		fmt.Println("IndexHandler status : Error => ", err)
	} else {
		fmt.Println("IndexHandler status : OK")
	}

	t.Execute(w, nil)
}

//#--Post-Handler-for-admin-panel-(authorization)--#//

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

//#--Register-all-RESTapi-funcs--#//

func Register(r *mux.Router) {

	//#--< GET >queries--#//

	sessionAdminKey = wordGenerator.GetWord(128)

	fmt.Println("session key for admin =>  | ", sessionAdminKey, " | ")

	r.HandleFunc("/admin", subdomainIndexHandler)
	r.HandleFunc("/admin/login", postHandler).Methods("POST")

	r.Handle("/roles", security.JwtMiddleware.Handler(functions.Roles)).Methods("GET")
	r.Handle("/users", security.JwtMiddleware.Handler(functions.Users)).Methods("GET")
	r.Handle("/orgs", security.JwtMiddleware.Handler(functions.Organizations)).Methods("GET")
	r.Handle("/clients", security.JwtMiddleware.Handler(functions.Clients)).Methods("GET")
	r.Handle("/groups", security.JwtMiddleware.Handler(functions.WorkGroups)).Methods("GET")
	r.Handle("/devs", security.JwtMiddleware.Handler(functions.Developers)).Methods("GET")
	r.Handle("/statuses", security.JwtMiddleware.Handler(functions.ProjectStatuses)).Methods("GET")
	r.Handle("/projects", security.JwtMiddleware.Handler(functions.Projects)).Methods("GET")
	r.Handle("/managers", security.JwtMiddleware.Handler(functions.Managers)).Methods("GET")

	//#--< GET + /{?} >queries--#//

	r.Handle("/roles/{id}", security.JwtMiddleware.Handler(functions.Role)).Methods("GET")
	r.Handle("/users/{login}", security.JwtMiddleware.Handler(functions.User)).Methods("GET")
	r.Handle("/orgs/{id}", security.JwtMiddleware.Handler(functions.Organization)).Methods("GET")
	r.Handle("/clients/{login}", security.JwtMiddleware.Handler(functions.Client)).Methods("GET")
	r.Handle("/groups/{id}", security.JwtMiddleware.Handler(functions.Group)).Methods("GET")
	r.Handle("/devs/{login}", security.JwtMiddleware.Handler(functions.Developer)).Methods("GET")
	r.Handle("/statuses/{id}", security.JwtMiddleware.Handler(functions.Status)).Methods("GET")
	r.Handle("/projects/{id}", security.JwtMiddleware.Handler(functions.Project)).Methods("GET")
	r.Handle("/managers/{login}", security.JwtMiddleware.Handler(functions.Manager)).Methods("GET")

	//#--< PUT + /{?} >queries--#//

	r.Handle("/roles/{id}", security.JwtMiddleware.Handler(functions.Roles)).Methods("PUT")
	r.Handle("/users/{login}", security.JwtMiddleware.Handler(functions.UpdateUser)).Methods("PUT")
	r.Handle("/orgs/{id}", security.JwtMiddleware.Handler(functions.Organizations)).Methods("PUT")
	r.Handle("/clients/{login}", security.JwtMiddleware.Handler(functions.UpdateClients)).Methods("PUT")
	r.Handle("/groups/{id}", security.JwtMiddleware.Handler(functions.WorkGroups)).Methods("PUT")
	r.Handle("/devs/{login}", security.JwtMiddleware.Handler(functions.Developers)).Methods("PUT")
	r.Handle("/statuses/{id}", security.JwtMiddleware.Handler(functions.ProjectStatuses)).Methods("PUT")
	r.Handle("/projects/{id}", security.JwtMiddleware.Handler(functions.Projects)).Methods("PUT")
	//r.Handle("/managers/{login}", security.JwtMiddleware.Handler(functions.UpdateManagers)).Methods("PUT")

	//#--< POST >queries--#//

	r.Handle("/roles", security.JwtMiddleware.Handler(functions.CreateRole)).Methods("POST")
	r.Handle("/users", security.JwtMiddleware.Handler(functions.CreateUser)).Methods("POST")
	r.Handle("/orgs", security.JwtMiddleware.Handler(functions.CreateOrg)).Methods("POST")
	r.Handle("/clients", security.JwtMiddleware.Handler(functions.CreateClient)).Methods("POST")
	r.Handle("/groups", security.JwtMiddleware.Handler(functions.CreateGroup)).Methods("POST")
	r.Handle("/devs", security.JwtMiddleware.Handler(functions.CreateDeveloper)).Methods("POST")
	r.Handle("/projects", security.JwtMiddleware.Handler(functions.CreateProject)).Methods("POST")
	r.Handle("/managers", security.JwtMiddleware.Handler(functions.CreateManager)).Methods("POST")
	r.HandleFunc("/get-token", security.GetTokenHandler).Methods("POST")

	//#--< DELETE + /{?} >queries--#//

	r.Handle("/roles/{id}", security.JwtMiddleware.Handler(functions.DeleteRole)).Methods("DELETE")
	r.Handle("/users/{login}", security.JwtMiddleware.Handler(functions.DeleteUser)).Methods("DELETE")
	r.Handle("/orgs/{id}", security.JwtMiddleware.Handler(functions.DeleteOrg)).Methods("DELETE")
	r.Handle("/clients/{login}", security.JwtMiddleware.Handler(functions.DeleteClient)).Methods("DELETE")
	r.Handle("/groups/{id}", security.JwtMiddleware.Handler(functions.DeleteGroup)).Methods("DELETE")
	r.Handle("/devs/{login}", security.JwtMiddleware.Handler(functions.DeleteDeveloper)).Methods("DELETE")
	r.Handle("/projects/{id}", security.JwtMiddleware.Handler(functions.DeleteProject)).Methods("DELETE")
	r.Handle("/managers/{login}", security.JwtMiddleware.Handler(functions.DeleteManager)).Methods("DELETE")

	//#--< LOGS >--#//

	fmt.Println("status : all RESTapi requests registered")
}
