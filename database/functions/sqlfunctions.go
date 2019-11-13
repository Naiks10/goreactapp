package functions

import (
	"encoding/json"
	"fmt"
	"goreactapp/database"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
)

var db = database.DB()

//#--ALL-SELECTIONS--#//

func JsonGetAll(i, s interface{}, isEncode bool, w http.ResponseWriter, r *http.Request, query string, params ...interface{}) {
	if params != nil {
		errs := db.DB.Select(s, query, params)
		fmt.Println(errs)
	} else {
		errs := db.DB.Select(s, query)
		fmt.Println(errs)
	}
	if isEncode {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(i)
	}
}

var Roles = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	database.ExRole.Items = nil
	//sql, args, err := squirrel.Select("*").From("roles").ToSql()
	JsonGetAll(&database.ExRole, &database.ExRole.Items, true, w, r, SelectRoles)
})

var Users = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	database.ExUser.Items = nil
	JsonGetAll(&database.ExUser, &database.ExUser.Items, true, w, r, SelectUsers)
})

var Organizations = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	database.ExOrganisation.Items = nil
	JsonGetAll(&database.ExOrganisation, &database.ExOrganisation.Items, true, w, r, SelectOrgs)
})

var Clients = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	database.ExClient.Items = nil
	JsonGetAll(&database.ExClient, &database.ExClient.Items, true, w, r, SelectClients)
})

var WorkGroups = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	database.ExWorkGroup.Items = nil
	JsonGetAll(&database.ExWorkGroup, &database.ExWorkGroup.Items, true, w, r, SelectWorkGroups)
})

var Developers = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	database.ExDeveloper.Items = nil
	JsonGetAll(&database.ExDeveloper, &database.ExDeveloper.Items, true, w, r, SelectDevs)
})

var ProjectStatuses = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	database.ExProjectStatus.Items = nil
	JsonGetAll(&database.ExProjectStatus, &database.ExProjectStatus.Items, true, w, r, SelectStatus)
})

var Projects = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	database.ExProject.Items = nil
	JsonGetAll(&database.ExProject, &database.ExProject.Items, true, w, r, SelectProjects)
})

var Managers = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	database.ExManager.Items = nil
	JsonGetAll(&database.ExManager, &database.ExManager.Items, true, w, r, SelectManagers)
})

var Role = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JsonGetAll(&database.ExRole, &database.ExRole.Items, false, w, r, SelectRoles)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExRole.Items {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var User = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JsonGetAll(&database.ExUser, &database.ExUser.Items, false, w, r, SelectUsers)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExUser.Items {
		if item.UserLogin == params["login"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var Organization = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JsonGetAll(&database.ExOrganisation, &database.ExOrganisation.Items, false, w, r, SelectOrgs)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExOrganisation.Items {
		if item.OrganizationId == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var Client = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JsonGetAll(&database.ExClient, &database.ExClient.Items, false, w, r, SelectRoles)
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
	JsonGetAll(&database.ExWorkGroup, &database.ExWorkGroup.Items, false, w, r, SelectRoles)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExWorkGroup.Items {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var Developer = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JsonGetAll(&database.ExDeveloper, &database.ExDeveloper.Items, false, w, r, SelectRoles)
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
	JsonGetAll(&database.ExProjectStatus, &database.ExProjectStatus.Items, false, w, r, SelectRoles)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExProjectStatus.Items {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var Project = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JsonGetAll(&database.ExProject, &database.ExProject.Items, false, w, r, SelectRoles)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExProject.Items {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var Manager = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JsonGetAll(&database.ExManager, &database.ExManager.Items, false, w, r, SelectRoles)
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range database.ExManager.Items {
		if item.UserLogin == params["login"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
})

var CreateRole = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var role database.Roles

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

	query, args, _ := postgres.Insert("roles").Columns("role_name").Values(role.Name).ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateUser = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var user database.Users

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

	query, args, _ := postgres.
		Insert("users").
		Columns("user_login", "user_password", "user_surname", "user_name", "user_midname", "user_birthdate", "user_phone", "user_email", "user_role").
		Values(user.UserLogin, user.UserPassword, user.UserSurname, user.UserName, user.UserMidname, user.UserBirthdate, user.UserPhone, user.UserMail, user.Roles.ID).
		ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateOrg = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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

	query, args, _ := postgres.
		Insert("organisations").
		Columns("organisation_name", "organisation_data").
		Values(org.OrganizationName, org.OrganizationData).
		ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateClient = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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

	query, args, _ := postgres.
		Insert("clients").Values(cli.Users.UserLogin, cli.Organisations.OrganizationId).ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateGroup = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var wg database.WorkGroups

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

	query, args, _ := postgres.Insert("workgroups").Columns("workgroup_name").Values(wg.WorkGroupName).ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateDeveloper = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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

	query, args, _ := postgres.
		Insert("developers").
		Columns("developer_user_login", "workgroup_id", "is_general").
		Values(dev.Users.UserLogin, dev.WorkGroups.ID, dev.IsGeneral).
		ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

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

	query, args, _ := postgres.
		Insert("projects").
		Columns("cost", "project_info", "project_workgroup_id", "project_status_id", "project_data", "client_user_login", "manager_user_login").
		Values(pr.Cost, pr.ProjectInfo, pr.WorkGroups.ID, pr.ProjectStatuses.ID, pr.ProjectData, pr.Clients_dop.UserLogin, pr.Managers.UserLogin).
		ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var CreateManager = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var man database.Managers

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

	query, args, _ := postgres.Insert("managers").Values(man.UserLogin).ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

var UpdateRole = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	var role database.Roles

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

	query, args, _ := postgres.Update("roles").Set("role_name", role.Name).Where("role_id = ?", params["id"]).ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)

})

var UpdateUser = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	var user database.Users

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

	query, args, _ := postgres.
		Update("users").
		Set("user_surname", user.UserSurname).
		Set("user_name", user.UserName).
		Set("user_midname", user.UserMidname).
		Set("user_birthdate", user.UserBirthdate).
		Set("user_phone", user.UserPhone).
		Set("user_email", user.UserMail).
		Where("user_login = ?", params["login"]).
		ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
	fmt.Println(user.UserName)

})

var UpdateOrg = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

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

	query, args, _ := postgres.
		Update("organisations").
		Set("organisation_name", org.OrganizationName).
		Set("organisation_data", org.OrganizationData).
		Where("organisation_id = ?", params["id"]).
		ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)

})

var UpdateClients = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

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

	fmt.Println(cli.Organisations.OrganizationId)

	query, args, _ := postgres.Update("clients").Set("organisation_id", cli.Organisations.OrganizationId).Where("client_user_login = ?", params["login"]).ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)

})

var UpdateGroups = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	var wg database.WorkGroups

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

	query, args, _ := postgres.Update("workgroups").Set("workgroup_name", wg.WorkGroupName).Where("workgroup_id = ?", params["id"]).ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)

})

var UpdateDevelopers = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

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

	query, args, _ := postgres.
		Update("developers").
		Set("workgroup_id", dev.WorkGroups.ID).
		Set("is_general", dev.IsGeneral).
		Where("developer_user_login = ?", params["login"]).
		ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)

})

var UpdateProjects = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

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

	query, args, _ := postgres.
		Update("projects").
		Set("cost", pr.Cost).
		Set("project_info", pr.ProjectInfo).
		Set("project_workgroup_id", pr.WorkGroups.ID).
		Set("project_status_id", pr.ProjectStatuses.ID).
		Set("project_data", pr.ProjectData).
		Set("client_user_login", pr.Clients_dop.UserLogin).
		Set("manager_user_login", pr.Managers.UserLogin).
		Where("project_id = ?", params["id"]).
		ToSql()

	res, er := db.ExecuteQueryNonResult(query, args)

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)

})

var DeleteRole = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	query, args, _ := postgres.Delete("roles").Where("role_id = ?", params["id"]).ToSql()

	_, err := db.ExecuteQueryNonResult(query, args)

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteUser = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	query, args, _ := postgres.Delete("users").Where("user_login = ?", params["login"]).ToSql()

	_, err := db.ExecuteQueryNonResult(query, args)

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteOrg = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	query, args, _ := postgres.Delete("organisations").Where("organisation_id = ?", params["id"]).ToSql()
	_, err := db.ExecuteQueryNonResult(query, args)

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteClient = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	query, args, _ := postgres.Delete("clients").Where("client_user_login = ?", params["login"]).ToSql()
	_, err := db.ExecuteQueryNonResult(query, args)

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteGroup = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	query, args, _ := postgres.Delete("workgroups").Where("workgroup_id = ?", params["id"]).ToSql()
	_, err := db.ExecuteQueryNonResult(query, args)

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteDeveloper = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	query, args, _ := postgres.Delete("developers").Where("developer_user_login = ?", params["login"]).ToSql()
	_, err := db.ExecuteQueryNonResult(query, args)

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteProject = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	query, args, _ := postgres.Delete("projects").Where("project_id = ?", params["id"]).ToSql()
	_, err := db.ExecuteQueryNonResult(query, args)

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteManager = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	query, args, _ := postgres.Delete("managers").Where("manager_user_login = ?", params["login"]).ToSql()
	_, err := db.ExecuteQueryNonResult(query, args)

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})
