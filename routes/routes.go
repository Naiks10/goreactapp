package routes

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/gorilla/mux"
)

var sessionAdminKey string

//---Subdomain-Handler-for-admin-panel---//

//IndexHandler handles index.html (start page) and return page to client
func IndexHandler(w http.ResponseWriter, r *http.Request) {
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

//---Post-Handler-for-admin-panel-(authorization)---//

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

//---Register-all-RESTapi-funcs---//

/*Register func
This function describes all RESTapi Queries
by all paradigmes :
	-> GET
	-> POST
	-> PUT
	-> DELETE
*/
func Register(r *mux.Router) {

	//#--< GET >queries--#//

	fmt.Println("Создайте новый ключ-пароль для входа в панель администратора :")
	//fmt.Fscan(os.Stdin, &sessionAdminKey)
	fmt.Println("Пароль успещно создан")

	//sessionAdminKey = wordGenerator.GetWord(128)

	fmt.Println("session key for admin =>  | ", sessionAdminKey, " | ")

	r.HandleFunc("/admin", subdomainIndexHandler)
	r.HandleFunc("/admin/login", postHandler).Methods("POST")

	StartRouting(r, GET, ReadAllData)
	StartRouting(r, GET, ReadOne)
	StartRouting(r, POST, CreateData)
	StartRouting(r, PUT, UpdateOne)
	StartRouting(r, DELETE, DeleteOne)

	fmt.Println("status : all RESTapi requests registered1")
}
