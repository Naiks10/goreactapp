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

	res, er := db.ExecuteQueryNonResult("INSERT INTO roles (role_name) VALUES ($1)", role.Name)

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

	res, er := db.ExecuteQueryNonResult(`INSERT 
	INTO users (
        user_login, 
        user_password,
        user_surname,
        user_name,
        user_midname,
        user_birthdate,
		user_phone,
		user_email,
        user_role
	) VALUES (
		$1,
		$2,
		$3,
		$4,
		$5,
		$6,
		$7,
		$8,
		$9	
	)`,
		user.UserLogin,
		user.UserPassword,
		user.UserSurname,
		user.UserName,
		user.UserMidname,
		user.UserBirthdate,
		user.UserPhone,
		user.UserMail,
		user.ID)

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

	res, er := db.ExecuteQueryNonResult(`INSERT 
		INTO organisations 
		(
			organisation_name, 
			organisation_data
		) VALUES (
			$1, 
			$2
			)`,
		org.OrganizationName,
		org.OrganizationData)

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

	res, er := db.ExecuteQueryNonResult(`INSERT 
	INTO clients VALUES ($1, $2)`,
		cli.UserLogin,
		cli.OrganizationId)

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

	res, er := db.ExecuteQueryNonResult(`INSERT 
		INTO workgroups 
		(workgroup_name) 
		VALUES 
		($1)`,
		wg.WorkGroupName)

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

	res, er := db.ExecuteQueryNonResult(`INSERT 
	INTO developers (
		developer_user_login, 
		workgroup_id, 
		is_general
		) VALUES (
			$1, 
			$2, 
			$3)`,
		dev.UserLogin,
		dev.ID,
		dev.IsGeneral)

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

	res, er := db.ExecuteQueryNonResult(`INSERT 
		INTO projects (
			cost, 
			project_info, 
			project_workgroup_id, 
			project_status_id, 
			project_data, 
			client_user_login,
			manager_user_login
			) VALUES (
				$1, 
				$2, 
				$3, 
				$4, 
				$5, 
				$6,
				$7)`,
		pr.Cost,
		pr.ProjectInfo,
		pr.WorkGroups.ID,
		pr.ProjectStatuses.ID,
		pr.ProjectData,
		pr.Clients_dop.UserLogin,
		pr.Managers.UserLogin)

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

	res, er := db.ExecuteQueryNonResult(`INSERT INTO managers 
	VALUES ($1);`, man.UserLogin)

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

	res, er := db.ExecuteQueryNonResult("UPDATE roles SET role_name = $1 WHERE role_id = $2", role.Name, params["id"])

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

	res, er := db.ExecuteQueryNonResult(`UPDATE 
	users SET (
        user_surname,
        user_name,
        user_midname,
        user_birthdate,
		user_phone,
		user_email
	) = (
		$1,
		$2,
		$3,
		$4,
		$5,
		$6	
	) WHERE user_login = $7`,
		user.UserSurname,
		user.UserName,
		user.UserMidname,
		user.UserBirthdate,
		user.UserPhone,
		user.UserMail,
		params["login"])

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

	res, er := db.ExecuteQueryNonResult(`INSERT 
	INTO organisations 
	(
		organisation_name, 
		organisation_data
	) VALUES (
		$1, 
		$2
		) WHERE organisation_id = $3`,
		org.OrganizationName,
		org.OrganizationData,
		params["id"])

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

	res, er := db.ExecuteQueryNonResult(`UPDATE
	clients SET organisation_id = $1 WHERE client_user_login = $2`,
		cli.OrganizationId,
		params["login"])

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

	res, er := db.ExecuteQueryNonResult(`UPDATE 
	workgroups SET
	workgroup_name 
	= 
	$1 WHERE workgroup_id = $2`,
		wg.WorkGroupName, params["id"])

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

	res, er := db.ExecuteQueryNonResult(`INSERT 
	INTO developers ( 
		workgroup_id, 
		is_general
		) = (
			$1, 
			$2 ) WHERE developer_user_login = $3`,
		dev.ID,
		dev.IsGeneral, params["login"])

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

	res, er := db.ExecuteQueryNonResult(`INSERT 
	INTO projects (
		cost, 
		project_info, 
		project_workgroup_id, 
		project_status_id, 
		project_data, 
		client_user_login,
		manager_user_login
		) VALUES (
			$1, 
			$2, 
			$3, 
			$4, 
			$5, 
			$6,
			$7) WHERE project_id = $8`,
		pr.Cost,
		pr.ProjectInfo,
		pr.WorkGroups.ID,
		pr.ProjectStatuses.ID,
		pr.ProjectData,
		pr.Clients_dop.UserLogin,
		pr.Managers.UserLogin, params["id"])

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)

})

/*
var UpdateManagers = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

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

	res, er := db.ExecuteQueryNonResult(`UPDATE managers SET manager_project
	= $1 WHERE manager_user_login = $2`,
		man.ProjectsID, params["id"])

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)

})*/

var DeleteRole = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	_, err := db.ExecuteQueryNonResult("DELETE FROM roles where role_id = $1", params["id"])

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteUser = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	_, err := db.ExecuteQueryNonResult("DELETE FROM users where user_login = $1", params["login"])

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteOrg = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	_, err := db.ExecuteQueryNonResult("DELETE FROM organisations where organisation_id = $1", params["id"])

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteClient = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	_, err := db.ExecuteQueryNonResult("DELETE FROM clients where client_user_login = $1", params["login"])

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteGroup = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	_, err := db.ExecuteQueryNonResult("DELETE FROM workgroups where workgroup_id = $1", params["id"])

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteDeveloper = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	_, err := db.ExecuteQueryNonResult("DELETE FROM developers where developer_user_login = $1", params["login"])

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteProject = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	_, err := db.ExecuteQueryNonResult("DELETE FROM projects where project_id = $1", params["id"])

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})

var DeleteManager = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	_, err := db.ExecuteQueryNonResult("DELETE FROM managers where manager_user_login = $1", params["login"])

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

})
