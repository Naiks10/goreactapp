package main

import (
	"fmt"
	"html/template"
	"net/http"
)

type Handler struct {
	Template string
}

func (m *Handler) SetTemplate(template string) string {
	m.Template = template
	return m.Template
}

func (m Handler) Start(template string) {
	http.HandleFunc("/"+m.SetTemplate(template), m.Execute)
}

func (m Handler) Execute(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("./templates/"+m.Template+".html", "./templates/footer.html", "./templates/header.html")
	if err != nil {
		fmt.Println("UniversalHandler status : Error => ", err)
	} else {
		fmt.Println("UniversalHandler status : OK")
	}
	if r.URL.Path != "/"+m.Template {
		ErrorHandler(w, r, http.StatusNotFound)
		return
	}
	t.ExecuteTemplate(w, m.Template, nil)
}

func ErrorHandler(w http.ResponseWriter, r *http.Request, status int) {
	w.WriteHeader(status)
	if status == http.StatusNotFound {
		t, err := template.ParseFiles("./templates/404.html", "./templates/header.html", "./templates/footer.html")
		if err != nil {
			fmt.Println("ErrorHandler status : Error => ", err)
		} else {
			fmt.Println("ErrorHandler status : OK")
		}
		t.ExecuteTemplate(w, "404", nil)
	}
}
