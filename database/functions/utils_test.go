package functions

import (
	"goreactapp/database"
	"net/http"
	"reflect"
	"testing"

	"github.com/elgris/sqrl"
)

func TestJSONGetAll(t *testing.T) {
	type args struct {
		table database.Table
		w     http.ResponseWriter
		r     *http.Request
		sb    *sqrl.SelectBuilder
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			JSONGetAll(tt.args.table, tt.args.w, tt.args.r, tt.args.sb)
		})
	}
}

func TestJSONGetAll1(t *testing.T) {
	type args struct {
		table database.Table
		w     http.ResponseWriter
		r     *http.Request
		sb    *sqrl.SelectBuilder
	}
	tests := []struct {
		name string
		args args
		want []byte
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := JSONGetAll1(tt.args.table, tt.args.w, tt.args.r, tt.args.sb); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("JSONGetAll1() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestJSONGetOne(t *testing.T) {
	type args struct {
		table database.Table
		w     http.ResponseWriter
		r     *http.Request
		sb    *sqrl.SelectBuilder
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			JSONGetOne(tt.args.table, tt.args.w, tt.args.r, tt.args.sb)
		})
	}
}

func TestGetResult(t *testing.T) {
	type args struct {
		w     http.ResponseWriter
		query string
		args  []interface{}
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			GetResult(tt.args.w, tt.args.query, tt.args.args)
		})
	}
}

func TestGetResultWA(t *testing.T) {
	type args struct {
		w     http.ResponseWriter
		query string
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			GetResultWA(tt.args.w, tt.args.query)
		})
	}
}

func TestGetQueries(t *testing.T) {
	type args struct {
		sb *sqrl.SelectBuilder
		r  *http.Request
	}
	tests := []struct {
		name string
		args args
		want *sqrl.SelectBuilder
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := GetQueries(tt.args.sb, tt.args.r); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("GetQueries() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestInsertNewData(t *testing.T) {
	type args struct {
		table interface{}
		w     http.ResponseWriter
		r     *http.Request
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			InsertNewData(tt.args.table, tt.args.w, tt.args.r)
		})
	}
}
