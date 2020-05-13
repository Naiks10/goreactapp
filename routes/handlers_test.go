package routes

import (
	"net/http"
	"testing"

	"github.com/gorilla/mux"
)

func Test_route_Init(t *testing.T) {
	type fields struct {
		path     string
		function interface {
			ServeHTTP(w http.ResponseWriter, r *http.Request)
		}
	}
	tests := []struct {
		name   string
		fields fields
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			_route := &route{
				path:     tt.fields.path,
				function: tt.fields.function,
			}
			_route.Init()
		})
	}
}

func TestStartRouting(t *testing.T) {
	type args struct {
		router     *mux.Router
		HTTPMethod string
		routes     []route
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			StartRouting(tt.args.router, tt.args.HTTPMethod, tt.args.routes)
		})
	}
}
