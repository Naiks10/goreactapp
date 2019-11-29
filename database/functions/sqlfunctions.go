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

var pg = postgres.RunWith(db.DB)

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

//#--All-INSERTS--#//

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

	res, er := pg.Insert("roles").Columns("role_name").Values(role.Name).Exec()

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

	res, er := pg.
		Insert("users").
		Columns("user_login", "user_password", "user_surname", "user_name", "user_midname", "user_birthdate", "user_phone", "user_email", "user_role").
		Values(user.UserLogin, user.UserPassword, user.UserSurname, user.UserName, user.UserMidname, user.UserBirthdate, user.UserPhone, user.UserMail, user.Roles.ID).
		Exec()

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

	res, er := pg.
		Insert("organisations").
		Columns("organisation_name", "organisation_data").
		Values(org.OrganizationName, org.OrganizationData).
		Exec()

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

	res, er := pg.
		Insert("clients").Values(cli.Users.UserLogin, cli.Organisations.OrganizationId).Exec()

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

	res, er := pg.Insert("workgroups").Columns("workgroup_name").Values(wg.WorkGroupName).Exec()

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

	res, er := pg.
		Insert("developers").
		Columns("developer_user_login", "workgroup_id", "is_general").
		Values(dev.Users.UserLogin, dev.WorkGroups.ID, dev.IsGeneral).
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

	res, er := pg.
		Insert("projects").
		Columns("cost", "project_info", "project_workgroup_id", "project_status_id", "project_data", "client_user_login", "manager_user_login").
		Values(pr.Cost, pr.ProjectInfo, pr.WorkGroups.ID, pr.ProjectStatuses.ID, pr.ProjectData, pr.Clients_dop.UserLogin, pr.Managers.UserLogin).
		Exec()

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

	res, er := pg.Update("roles").Set("role_name", role.Name).Where("role_id = ?", params["id"]).Exec()

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

	res, er := pg.
		Update("organisations").
		Set("organisation_name", org.OrganizationName).
		Set("organisation_data", org.OrganizationData).
		Where("organisation_id = ?", params["id"]).
		Exec()

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

	res, er := pg.Update("clients").Set("organisation_id", cli.Organisations.OrganizationId).Where("client_user_login = ?", params["login"]).Exec()

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

	res, er := pg.Update("workgroups").Set("workgroup_name", wg.WorkGroupName).Where("workgroup_id = ?", params["id"]).Exec()

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

	res, er := pg.
		Update("developers").
		Set("workgroup_id", dev.WorkGroups.ID).
		Set("is_general", dev.IsGeneral).
		Where("developer_user_login = ?", params["login"]).
		Exec()

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

	res, er := pg.
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

	fmt.Println(res)

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
