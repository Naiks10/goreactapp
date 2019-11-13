package main

import (
	"fmt"
	"goreactapp/routes"
	"html/template"
	"net/http"

	"github.com/Masterminds/squirrel"

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

	sql, args, err := squirrel.Select("*").From("roles").ToSql()

	fmt.Println(sql, args, err)

	psql := squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar)

	sql, args, err = psql.Select("column1", "column2").From("roles").Where("column=?", "sql").ToSql()

	fmt.Println(sql, args, err)

	sql, args, err = psql.Delete("Table1").Where("").ToSql()

	fmt.Println(sql)

	sql, args, err = psql.Select("user_login", "user_password", "user_surname", "user_name", "user_midname", "user_birthdate", "user_phone", "user_email", "role_id", "role_name").From("users").Join("roles ON user_role = ?", "role_id").ToSql()
	fmt.Println(sql, args, err)

	sql, args, err = squirrel.
		Insert("users").Columns("name", "age").
		Values("moe", 13).Values("larry", squirrel.Expr("? + 5", 12)).
		ToSql()

	fmt.Println(sql, args)

	r := mux.NewRouter()

	//r.HandleFunc("/accounts", functions.Accounts).Methods("GET")
	routes.Register(r)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./build/")))

	r.HandleFunc("/", indexHandler)
	http.ListenAndServe(":"+port, r)
}
