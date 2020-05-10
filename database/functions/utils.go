package functions

import (
	"encoding/json"
	"fmt"
	"goreactapp/database"
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"

	"github.com/elgris/sqrl"
	"github.com/elgs/gosqljson"
	"github.com/gorilla/mux"
)

//---ENTRY-VARIABLES---//

var db = database.DB()

var pg = postgres.RunWith(db.DB)

//---FUNCTIONS---//

//JSONGetAll converts Go data (array(s)) to JSON model
func JSONGetAll(table database.Table, w http.ResponseWriter, r *http.Request, sb *sqrl.SelectBuilder) {
	table.Clear()

	query, params, _ := sb.ToSql()

	if params != nil {
		errs := db.DB.Select(table.GetItems(), query, params[0])
		fmt.Println("hello", errs)
	} else {
		errs := db.DB.Select(table.GetItems(), query)
		fmt.Println("bey", errs)
	}
	//table.GetPrimaryKey()
	w.Header().Set("Content-Type", "application/json")
	fmt.Println(table, "|||", query, params)
	json.NewEncoder(w).Encode(table)
	table.Clear()
}

func JSONGetAll1(table database.Table, w http.ResponseWriter, r *http.Request, sb *sqrl.SelectBuilder) []byte {
	table.Clear()

	query, params, err := sb.ToSql()
	fmt.Println(err)

	if params != nil {
		errs := db.DB.Select(table.GetItems(), query, params[0])
		fmt.Println("hello", errs)
	} else {
		errs := db.DB.Select(table.GetItems(), query)
		fmt.Println("bey", errs)
	}
	//table.GetPrimaryKey()
	w.Header().Set("Content-Type", "application/json")
	fmt.Println(table, "|||", query, params)
	e, _ := json.Marshal(table)
	json.NewEncoder(w).Encode(table)
	table.Clear()
	return e
}

//JSONGetOne converts Go data (one SELECTed element) to JSON model
func JSONGetOne(table database.Table, w http.ResponseWriter, r *http.Request, sb *sqrl.SelectBuilder) {
	table.Clear()

	exSb := *sb

	vars := mux.Vars(r)
	fmt.Println("query")

	var val string

	if value, ok := vars["id"]; ok {
		val = value
	} else if value, ok := vars["login"]; ok {
		val = value
	}

	//fmt.Println(val)

	type Item struct {
		Data interface{} `json:"data"`
	}

	fmt.Println(val)
	//fmt.Println(table.GetPrimaryKey())

	query, params, rr := exSb.Where(sqrl.Eq{table.GetPrimaryKey(): val}).ToSql()
	fmt.Println(rr)
	fmt.Println(query)
	fmt.Println(params, "SQL")

	if params != nil {
		errs := db.DB.Select(table.GetItems(), query, params[0])
		fmt.Println(errs)
	} else {
		errs := db.DB.Select(table.GetItems(), query)
		fmt.Println(errs)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Item{Data: table.GetItem()})
}

/*GetResult is universal converter to JSON from Go Structs,
Neaded for dynamic added RESTapi queries.*/
func GetResult(w http.ResponseWriter, query string, args []interface{}) {
	s, _ := gosqljson.QueryDbToMapJSON(db.DB.DB, "lower", query, args[0])
	s = "{\"items\":" + s + "}"
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, s)
}

/*GetResult is universal converter to JSON from Go Structs,
Neaded for dynamic added RESTapi queries.*/
func GetResultWA(w http.ResponseWriter, query string) {
	s, _ := gosqljson.QueryDbToMapJSON(db.DB.DB, "lower", query)
	s = "{\"items\":" + s + "}"
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, s)
}

//GetQueries is RESTapi provider for creating agile queries
func GetQueries(sb *sqrl.SelectBuilder, r *http.Request) *sqrl.SelectBuilder {
	var selectBuilder sqrl.SelectBuilder = *sb
	query, _ := url.ParseQuery(r.URL.RawQuery)
	if value, ok := query["limit"]; ok {
		i, _ := strconv.Atoi(value[0])
		selectBuilder.Limit(uint64(i))
	}
	if value, ok := query["offset"]; ok {
		i, _ := strconv.Atoi(value[0])
		selectBuilder.Offset(uint64(i))
	}
	if value, ok := query["asc.orderby"]; ok {
		selectBuilder.OrderBy(value[0] + " ASC")
	}
	if value, ok := query["desc.orderby"]; ok {
		selectBuilder.OrderBy(value[0] + " DESC")
	}
	return &selectBuilder

}

func InsertNewData(table interface{}, w http.ResponseWriter, r *http.Request) {

	b, err := ioutil.ReadAll(r.Body)
	fmt.Println(b)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &table)
	fmt.Println("inInsert", table)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
}
