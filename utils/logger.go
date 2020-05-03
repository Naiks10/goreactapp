package utils

import (
	"log"
	"net/http"
	"os"
	"time"
)

//LogWrapper is middleware function for loggin all RESTapi queries
type LogWrapper struct {
	http.Handler
}

//ServeHTTPP rewriting func for middleware
func (wr LogWrapper) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	logFile, err := os.OpenFile("goreactapp.log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatal(err)
	}
	defer logFile.Close()
	logs := log.Logger{}
	logs.SetOutput(logFile)
	logs.Printf("%s %s %s %s\n", time.Now().Local(), r.Method, r.URL, ReadUserIP(r))
	wr.Handler.ServeHTTP(w, r)
}
