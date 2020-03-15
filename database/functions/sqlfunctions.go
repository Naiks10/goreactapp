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
func JSONGetAll(table database.Table, w http.ResponseWriter, r *http.Request, query string, params ...interface{}) {
	table.Clear()
	if params != nil {
		errs := db.DB.Select(table.GetItems(), query, params)
		fmt.Println(errs)
	} else {
		errs := db.DB.Select(table.GetItems(), query)
		fmt.Println(errs)
	}
	//table.GetPrimaryKey()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(table)
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

	type Item struct {
		Data interface{} `json:"data"`
	}

	fmt.Println(val)
	//fmt.Println(table.GetPrimaryKey())

	query, params, _ := exSb.Where(sqrl.Eq{table.GetPrimaryKey(): val}).ToSql()
	fmt.Println(query)

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
func GetResult(w http.ResponseWriter, query string) {
	s, _ := gosqljson.QueryDbToMapJSON(db.DB.DB, "lower", query)
	s = "{\"items\":" + s + "}"
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, s)
}

//GetQueries is RESTapi provider for creating agile queries
func GetQueries(sb *sqrl.SelectBuilder, r *http.Request) string {
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

	str, _, _ := selectBuilder.ToSql()

	fmt.Println(str)

	return str

}

//---VARIABLES---//

//Roles => SELECT * FROM roles
var Roles = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetAll(&database.ExUser, w, r, GetQueries(SelectRoles, r))
})

//Users => SELECT * FROM users
var Users = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetAll(&database.ExUser, w, r, GetQueries(SelectUsers, r))
})

//Organizations => SELECT * FROM organisations
var Organizations = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExOrganisation, w, r, GetQueries(SelectOrgs, r))
})

//Clients => SELECT * FROM clients
var Clients = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExClient, w, r, GetQueries(SelectClients, r))
})

//WorkGroups => SELECT * FROM workgroups
var WorkGroups = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExWorkGroup, w, r, GetQueries(SelectWorkGroups, r))
})

//Developers => SELECT * FROM developers
var Developers = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExDeveloper, w, r, GetQueries(SelectDevs, r))
})

//ProjectStatuses => SELECT * FROM statuses
var ProjectStatuses = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExProjectStatus, w, r, GetQueries(SelectStatus, r))
})

//Projects => SELECT * FROM projects
var Projects = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetAll(&database.ExProject, w, r, GetQueries(SelectProjects, r))
})

//ProjectsPreview => UNIQUE QUERY
var ProjectsPreview = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetAll(&database.ExProjectPreview, w, r, GetQueries(SelectProjectsPreview, r))
})

//Managers => SELECT * FROM managers
var Managers = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExManager, w, r, SelectManagers)
})

var Role = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExRole, w, r, SelectRoles)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExRole.Items {
		if strconv.Itoa(item.ID) == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var User = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExUser, w, r, SelectUsers)
	/*w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExUser.Items {
		if item.UserLogin == params["login"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}*/
	JSONGetOne(&database.ExUser, w, r, SelectUsers)
})

var Organization = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExOrganisation, w, r, GetQueries(SelectOrgs, r))
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExOrganisation.Items {
		if strconv.Itoa(item.OrganizationID) == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var Client = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExClient, w, r, SelectRoles)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExClient.Items {
		if item.UserLogin == params["login"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var Group = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExWorkGroup, w, r, SelectRoles)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExWorkGroup.Items {
		if strconv.Itoa(item.ID) == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var Developer = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExDeveloper, w, r, SelectRoles)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExDeveloper.Items {
		if item.UserLogin == params["login"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var Status = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExProjectStatus, w, r, SelectRoles)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExProjectStatus.Items {
		if strconv.Itoa(item.ID) == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var Project = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExProjectPreview, w, r, SelectProjectsPreview)
	/*w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExProject.Items {
		if strconv.Itoa(item.ID) == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}*/
})

var Manager = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//JSONGetAll(&database.ExManager, w, r, SelectRoles)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExManager.Items {
		if item.UserLogin == params["login"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

//#--All-INSERTS--#//

var CreateRole = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var role database.Role

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &role)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	res, er := pg.Insert("roles").Columns("role_name").Values(role.Name).Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateUser = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var user database.User

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &user)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	res, er := pg.
		Insert("users").
		Columns("user_login", "user_password", "user_surname", "user_name", "user_midname", "user_birthdate", "user_phone", "user_email", "user_role").
		Values(user.UserLogin, user.UserPassword, user.UserSurname, user.UserName, user.UserMidname, user.UserBirthdate, user.UserPhone, user.UserMail, user.Role.ID).
		Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateOrg = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var org database.Organisation

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &org)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	res, er := pg.
		Insert("organisations").
		Columns("organisation_name", "organisation_data").
		Values(org.ShortName, org.OrganizationDesc).
		Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateClient = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var cli database.Client

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &cli)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	res, er := pg.
		Insert("clients").Values(cli.User.UserLogin, cli.Organisation.OrganizationID).Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateGroup = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var wg database.WorkGroup

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &wg)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	res, er := pg.Insert("workgroups").Columns("workgroup_name").Values(wg.WorkGroupName).Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateDeveloper = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var dev database.Developer

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &dev)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	res, er := pg.
		Insert("developers").
		Columns("developer_user_login", "workgroup_id", "is_general").
		Values(dev.User.UserLogin, nil, nil).
		Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateProject = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var pr database.Projects

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &pr)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	/*res, er := pg.
	Insert("projects").
	Columns("cost", "project_info", "project_workgroup_id", "project_status_id", "project_data", "client_user_login", "manager_user_login").
	Values(pr.Cost, pr.ProjectInfo, pr.WorkGroups.ID, pr.ProjectStatuses.ID, pr.ProjectData, pr.Clients_dop.UserLogin, pr.Managers.UserLogin).
	Exec()*/

	/*if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)*/
})

var CreateManager = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var man database.Manager

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &man)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	res, er := pg.Insert("managers").Values(man.UserLogin).Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

//#--ALL-UPDATES--#//

var UpdateRole = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	var role database.Role

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &role)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	res, er := pg.Update("roles").Set("role_name", role.Name).Where("role_id = ?", params["id"]).Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)

})

var UpdateUser = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	var user database.User

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &user)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	res, er := pg.
		Update("users").
		Set("user_surname", user.UserSurname).
		Set("user_name", user.UserName).
		Set("user_midname", user.UserMidname).
		Set("user_birthdate", user.UserBirthdate).
		Set("user_phone", user.UserPhone).
		Set("user_email", user.UserMail).
		Where("user_login = ?", params["login"]).
		Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
	fmt.Println(user.UserName)

})

var UpdateOrg = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//params := mux.Vars(r)

	var org database.Organisations

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &org)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	/*res, er := pg.
		Update("organisations").
		Set("organisation_name", org.OrganizationName).
		Set("organisation_data", org.OrganizationData).
		Where("organisation_id = ?", params["id"]).
		Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)*/

})

var UpdateClients = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//params := mux.Vars(r)

	var cli database.Clients

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &cli)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	/*fmt.Println(cli.Organisations.OrganizationId)

	res, er := pg.Update("clients").Set("organisation_id", cli.Organisations.OrganizationId).Where("client_user_login = ?", params["login"]).Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)*/

})

var UpdateGroups = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	var wg database.WorkGroup

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &wg)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	res, er := pg.Update("workgroups").Set("workgroup_name", wg.WorkGroupName).Where("workgroup_id = ?", params["id"]).Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)

})

var UpdateDevelopers = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//params := mux.Vars(r)

	var dev database.Developers

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &dev)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	/*res, er := pg.
		Update("developers").
		Set("workgroup_id", dev.WorkGroups.ID).
		Set("is_general", dev.IsGeneral).
		Where("developer_user_login = ?", params["login"]).
		Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)*/

})

var UpdateProjects = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//params := mux.Vars(r)

	var pr database.Projects

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &pr)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	/*res, er := pg.
		Update("projects").
		Set("cost", pr.Cost).
		Set("project_info", pr.ProjectInfo).
		Set("project_workgroup_id", pr.WorkGroups.ID).
		Set("project_status_id", pr.ProjectStatuses.ID).
		Set("project_data", pr.ProjectData).
		Set("client_user_login", pr.Clients_dop.UserLogin).
		Set("manager_user_login", pr.Managers.UserLogin).
		Where("project_id = ?", params["id"]).
		Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)*/

})

//#--ALL_DELETES--#//

var DeleteRole = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("roles").Where("role_id = ?", params["id"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

var DeleteUser = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("users").Where("user_login = ?", params["login"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

var DeleteOrg = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("organisations").Where("organisation_id = ?", params["id"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

var DeleteClient = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("clients").Where("client_user_login = ?", params["login"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

var DeleteGroup = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("workgroups").Where("workgroup_id = ?", params["id"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

var DeleteDeveloper = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("developers").Where("developer_user_login = ?", params["login"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

var DeleteProject = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("projects").Where("project_id = ?", params["id"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

var DeleteManager = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("managers").Where("manager_user_login = ?", params["login"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})
