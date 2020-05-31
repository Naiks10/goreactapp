package functions

import (
	"encoding/json"
	"fmt"
	"goreactapp/database"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"reflect"
	"strconv"
	"time"

	"github.com/gabriel-vasile/mimetype"

	"github.com/elgris/sqrl"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

//---VARIABLES---//

//Roles :
/*
	&query = 'SELECT ... FROM roles';
	&route = '/...'
*/
var Roles = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetAll(&database.ExRole, w, r, GetQueries(SelectRoles, r))
})

//Users :
/*
	&query: 'SELECT ... FROM users WHERE user_role = &role';
	&params:
		&param['role'] : 'integer'
	&route: '/...?role=1'
*/
var Users = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectUsers
	if value, ok := query["role"]; ok {
		i, _ := strconv.Atoi(value[0])
		querys.Where(sqrl.Eq{"user_role": i})
	}
	JSONGetAll(&database.ExUser, w, r, GetQueries(&querys, r))
})

//Organizations :
/*
	&query: 'SELECT ... FROM organisations'
	&route: '/...'
*/
var Organizations = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectOrgs
	if value, ok := query["client"]; ok {
		s := value[0]
		querys = *querys.Where("organisation_id = (SELECT client_organisation_id FROM clients WHERE client_login = ?)", s)
	}
	JSONGetAll(&database.ExOrganisation, w, r, GetQueries(&querys, r))
})

//Clients :
/*
	&query: 'SELECT ... FROM clients'
	&route: '/...'
*/
var Clients = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectClients
	if value, ok := query["orgs"]; ok {
		i, _ := strconv.Atoi(value[0])
		querys.Where(sqrl.Eq{"client_organisation_id": i})
	}
	JSONGetAll(&database.ExClient, w, r, GetQueries(&querys, r))
})

//WorkGroups :
/*
	&query: 'SELECT ... FROM workgroups'
	&route: '/...'
*/
var WorkGroups = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetAll(&database.ExWorkGroup, w, r, GetQueries(SelectWorkGroups, r))
})

//WorkGroupsLst :
/*
	&query: 'SELECT ... FROM workgroups'
	&route: '/...'
*/
var WorkGroupsLst = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectWorkGroupList
	if value, ok := query["worker"]; ok {
		i := value[0]
		querys.Where(sqrl.Eq{"developer_login": i})
	}
	q, p, _ := querys.ToSql()
	GetResult(w, q, p)
})

//Developers :
/*
	&query: 'SELECT ... FROM developers'
	&route: '/...'
*/
var Developers = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectDevs
	if value, ok := query["group"]; ok {
		i, _ := strconv.Atoi(value[0])
		querys.Where("developer_login IN (SELECT developer_login FROM working_developer_list WHERE workgroup_id = ?)", i)
	}
	JSONGetAll(&database.ExDeveloper, w, r, GetQueries(&querys, r))
})

//ProjectStatuses :
/*
	&query: 'SELECT ... FROM statuses'
	&route: '/...'
*/
var ProjectStatuses = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetAll(&database.ExProjectStatus, w, r, GetQueries(SelectStatus, r))
})

//Projects :
/*
	&query:'SELECT ... FROM projects WHERE (project_manager_login | project_client_login) = &(manager | client)';
	&params:
		 &param['manager'] : string;
		 &param['client']  : string;
	&route: '...?manager=who'
	&route: '...?client=who'

*/
var Projects = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectProjects
	if value, ok := query["manager"]; ok {
		i := value[0]
		querys.Where(sqrl.Eq{"project_manager_login": i})
	}
	if value, ok := query["client"]; ok {
		i := value[0]
		querys.Where(sqrl.Eq{"project_client_login": i})
	}
	if value, ok := query["orgs"]; ok {
		i, _ := strconv.Atoi(value[0])
		querys.Where("project_client_login IN (SELECT client_login FROM clients where client_organisation_id = ?)", i)
	}
	if value, ok := query["worker"]; ok {
		i := value[0]
		querys.Where("project_workgroup_id IN (SELECT workgroup_id FROM working_developer_list WHERE developer_login = ?)", i)
	}
	if value, ok := query["group"]; ok {
		i, _ := strconv.Atoi(value[0])
		querys.Where(sqrl.Eq{"project_workgroup_id ": i})
	}
	JSONGetAll(&database.ExProject, w, r, GetQueries(&querys, r))
})

//ProjectsPreview :
/*
	&query: 'UNIQUE QUERY'
	&params:
		&param['manager'] : string
		&param['client'] : string
	&route: '/...?manager=who'
	&route: '/...?client=who'
*/
var ProjectsPreview = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectProjectsPreview
	if value, ok := query["manager"]; ok {
		i := value[0]
		querys.Where(sqrl.Expr("(project_manager_login = ? OR project_manager_login = 'null')", i))
	}
	if value, ok := query["client"]; ok {
		i := value[0]
		querys.Where(sqrl.Eq{"project_client_login": i})
	}
	if value, ok := query["developer"]; ok {
		i := value[0]
		querys.Where(`project_workgroup_id IN (
			SELECT workgroup_id FROm working_developer_list where developer_login = $1
		)`, i)
	}
	if value, ok := query["search"]; ok {
		i := value[0]
		querys.Where("project_name LIKE ?", "%"+i+"%")
	}
	JSONGetAll(&database.ExProjectPreview, w, r, GetQueries(&querys, r))
})

//Managers :
/*
	&query: 'SELECT ... FROM managers'
	&route: '/...'
*/
var Managers = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetAll(&database.ExManager, w, r, GetQueries(SelectManagers, r))
})

//Modules :
/*
	&query: 'SELECT ... FROM modules WHERE module_project_id = &project'
	&params:
		&param['project'] : integer
	&route: '/...?project=1'
*/
var Modules = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectModules
	if value, ok := query["project"]; ok {
		i, _ := strconv.Atoi(value[0])
		querys.Where(sqrl.Eq{"module_project_id": i})
	}
	JSONGetAll(&database.ExModule, w, r, GetQueries(&querys, r))
})

//Stages :
/*
	&query: 'SELECT ... FROM stages WHERE stage_module_id = &module'
	&params:
		&param['module'] : 'integer'
	&route: '/...?module'

*/
var Stages = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectStages
	if value, ok := query["module"]; ok {
		i, _ := strconv.Atoi(value[0])
		querys.Where(sqrl.Eq{"stage_module_id": i})
	}
	JSONGetAll(&database.ExStage, w, r, GetQueries(&querys, r))
})

//Tasks :
/*
	&query: 'SELECT ... FROM stages WHERE task_stage_id = &stage AND task_supertask_id is NULL';
	&params:
		&param['stage'] : 'integer';
	&route: '/...?stage=1'
*/
var Tasks = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectTasks
	if value, ok := query["stage"]; ok {
		var s = "task_stage_id = " + value[0] + " AND task_supertask_id is NULL"
		querys.Where(s)
	}
	JSONGetAll(&database.ExTask, w, r, GetQueries(&querys, r))
})

//SubTasks :
/*
	&query: 'SELECT ... FROM tasks WHERE task_supertask = &task';
	&params:
		&param['task'] : 'integer';
	&route: '/...?task=1'
*/
var SubTasks = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectSubTasks
	if value, ok := query["task"]; ok {
		i, _ := strconv.Atoi(value[0])
		querys.Where(sqrl.Eq{"task_supertask_id": i})
	}
	JSONGetAll(&database.ExTask, w, r, GetQueries(&querys, r))
})

//Issues :
/*
	&query: 'SELECT ... FROM issues WHERE issue_task_id = &task';
	&params:
		&param['task'] : 'integer';
	&route: '/...?task=1'
*/
var Issues = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectIssues
	if value, ok := query["task"]; ok {
		i, _ := strconv.Atoi(value[0])
		querys.Where(sqrl.Eq{"issue_task_id": i})
	}
	JSONGetAll(&database.ExIssue, w, r, GetQueries(&querys, r))
})

var Notes = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectNotes
	if value, ok := query["task"]; ok {
		i, _ := strconv.Atoi(value[0])
		querys.Where(sqrl.Eq{"note_task_id": i})
	}
	JSONGetAll(&database.ExNote, w, r, GetQueries(&querys, r))
})

var WorkersList = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	var s int
	if value, ok := query["group"]; ok {
		s, _ = strconv.Atoi(value[0])
	}

	querys := postgres.Select(`user_image_src FROM developers
		`).Join(`users ON user_login IN (
			SELECT developer_login FROM working_developer_list WHERE workgroup_id = ?
		)`, s).OrderBy("random()").Limit(3)

	JSONGetAll(&database.ExSpec, w, r, GetQueries(querys, r))
})

var UploadUser = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 << 20)
	file, handler, err := r.FormFile("file")
	login := r.FormValue("login")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
		return
	}
	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}
	//fmt.Println(fileBytes)
	fmt.Println("-------")
	mime := mimetype.Detect(fileBytes)
	fmt.Println(mime.String(), mime.Extension())
	fmt.Println("-------")
	ioutil.WriteFile("./data/img/users/"+login+mime.Extension(), fileBytes, 0754)
	src := "/data/img/users/" + login + mime.Extension()
	_, err1 := pg.Update("users").Set("user_image_src", src).Where(sqrl.Eq{"user_login": login}).Exec()
	fmt.Println(err1)
})

var UploadOrg = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 << 20)
	file, handler, err := r.FormFile("file")
	login := r.FormValue("id")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
		return
	}
	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}
	//fmt.Println(fileBytes)
	fmt.Println("-------")
	mime := mimetype.Detect(fileBytes)
	fmt.Println(mime.String(), mime.Extension())
	fmt.Println("-------")
	ioutil.WriteFile("./data/img/orgs/"+login+mime.Extension(), fileBytes, 0754)
	src := "/data/img/orgs/" + login + mime.Extension()
	_, err1 := pg.Update("organisations").Set("organisation_image_src", src).Where(sqrl.Eq{"organisation_id": login}).Exec()
	fmt.Println(err1)
})

var UploadDoc = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 << 20)
	file, handler, err := r.FormFile("file")
	project := r.FormValue("project")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
		return
	}
	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}
	value, _ := strconv.Atoi(project)
	err = os.MkdirAll("./data/files/projects/"+project, 0755)
	ierr := ioutil.WriteFile("./data/files/projects/"+project+"/"+handler.Filename, fileBytes, 0754)
	src := "/data/files/projects/" + project + "/" + handler.Filename
	_, err1 := pg.Insert("files").
		Columns("file_path", "upload_time", "file_ext", "file_name", "file_project_id").
		Values(src, time.Now(), filepath.Ext(src), handler.Filename, value).Exec()
	fmt.Println(err1, ierr)
})

var DeleteDoc = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 << 20)
	file, handler, err := r.FormFile("file")
	project := r.FormValue("project")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
		return
	}
	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}
	value, _ := strconv.Atoi(project)
	err = os.MkdirAll("./data/files/projects/"+project, 0755)
	ierr := ioutil.WriteFile("./data/files/projects/"+project+"/"+handler.Filename, fileBytes, 0754)
	src := "/data/files/projects/" + project + "/" + handler.Filename
	_, err1 := pg.Insert("files").
		Columns("file_path", "upload_time", "file_ext", "file_name", "file_project_id").
		Values(src, time.Now(), filepath.Ext(src), handler.Filename, value).Exec()
	fmt.Println(err1, ierr)
})

//Workers :
/*
	&query: 'SELECT ... FROM workers WHERE workgroup_id = $workgroup';
	&params:
		&param['workgroup'] : 'integer';
	&route: '/...?workgroup=1'
*/
var Workers = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)
	querys := *SelectWorkers
	if value, ok := query["workgroup"]; ok {
		i, _ := strconv.Atoi(value[0])
		querys.Where(sqrl.Eq{"workgroup_id": i})
	}
	q, p, _ := querys.ToSql()
	GetResult(w, q, p)
})

type GraphStructs struct {
	Items []GraphStruct `json:"items"`
}

type GraphStruct struct {
	Progress int       `json:"progress" db:"prog"`
	Time     time.Time `json:"time" db:"time"`
}

func (t *GraphStructs) GetItems() interface{} {
	return &t.Items
}

func (t *GraphStructs) GetItem() interface{} {
	return &t.Items[0]
}

func (t *GraphStructs) Clear() {
	t.Items = nil
}

func GetTag(e interface{}) string {
	tag := reflect.TypeOf(e).Elem().Field(0).Tag
	return tag.Get("db")
}

func (t *GraphStructs) GetPrimaryKey() string {
	return GetTag(t.Items)
}

var ExGraph = GraphStructs{}

var ExGraphFact = GraphStructs{}

var ExGraphOne = GraphStruct{}

var Graph = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//query, _ := url.ParseQuery(r.URL.RawQuery)
	params := mux.Vars(r)

	s := `with dates as (
		select min(date_trunc('day', finish_date)) as startw,
			   max(date_trunc('day', finish_date)) + INTERVAL '1 day' as endw
		from tasks t WHERE task_stage_id IN (
		  SELECT stage_id FROM stages WHERE stage_module_id IN (
			SELECT module_id from modules WHERE module_project_id IN (
			  SELECT project_id from projects WHERE project_id = $1
			)
		  )
		)
	   ),
	
	   weeks as (
		select startw, endw, generate_series(startw, endw, '1 days') as weekstart
		from dates
	   )
	
	
		  
			SELECT DISTINCT ON ((round(count(*)::decimal/(
				SELECT count(*) from tasks where task_stage_id IN (
				  SELECT stage_id FROM stages 
				  WHERE stage_module_id IN (
					  SELECT module_id FROM modules
					  WHERE module_project_id = $1)
			)), 1)::numeric * 100)::int4) (round(count(*)::decimal/(
			  SELECT count(*) from tasks where
			   task_stage_id IN (
				SELECT stage_id FROM stages 
				WHERE stage_module_id IN (
					SELECT module_id FROM modules
					WHERE module_project_id = $1)
		  )), 1)::numeric * 100)::int4 as prog, (w.weekstart + INTERVAL '1 day') as time
		  FROM weeks w left outer join
			tasks i on date_trunc('day', finish_date) < (w.weekstart + INTERVAL '1 day')
			--AND i.task_supertask_id is NOT NULL 
			AND i.task_stage_id IN (
				SELECT stage_id FROM stages 
				WHERE stage_module_id IN (
					SELECT module_id FROM modules
					WHERE module_project_id = $1
				) 
		  )
				--AND (SELECT COUNT(*) FROM tasks where task_supertask_id = i.task_id) = 0
			group by w.weekstart
			order by prog, w.weekstart;	 `
	JSONGetAllRaw(&ExGraph, w, r, s, params["id"])
})

var GraphFact = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//query, _ := url.ParseQuery(r.URL.RawQuery)
	params := mux.Vars(r)

	s := `with dates as (
		select min(date_trunc('day', finish_date_fact)) as startw,
			   max(date_trunc('day', finish_date_fact))  as endw
		from tasks t WHERE task_stage_id IN (
		  SELECT stage_id FROM stages WHERE stage_module_id IN (
			SELECT module_id from modules WHERE module_project_id IN (
			  SELECT project_id from projects WHERE project_id = $1
			)
		  )
		) --AND t.task_status_id = 4 AND t.finish_date_fact > '1999-01-08'
	   ),
	
	   weeks as (
		select startw, endw, generate_series(startw, endw, '1 days') as weekstart
		from dates
	   )
	
	
		  
			SELECT 
            
            DISTINCT ON ((round(count(*)::decimal/(
				SELECT count(*) from tasks y where task_stage_id IN (
				  SELECT stage_id FROM stages 
				  WHERE stage_module_id IN (
					  SELECT module_id FROM modules
					  WHERE module_project_id = $1)
			) AND (SELECT COUNT(*) FROM tasks where task_supertask_id = y.task_id) = 0), 1)::numeric * 100)::int4) 
            
            (round(count(*)::decimal/(
			  SELECT count(*) from tasks y where task_stage_id IN (
				SELECT stage_id FROM stages 
				WHERE stage_module_id IN (
					SELECT module_id FROM modules
					WHERE module_project_id = $1)
		  ) AND (SELECT COUNT(*) FROM tasks where task_supertask_id = y.task_id) = 0 ), 1)::numeric * 100)::int4 as prog, (w.weekstart + INTERVAL '1 day') as time
		  FROM weeks w left outer join
			tasks i on date_trunc('day', finish_date_fact) < (w.weekstart + INTERVAL '1 DAY')
			--AND i.task_supertask_id is NOT NULL 
			AND i.task_stage_id IN (
				SELECT stage_id FROM stages 
				WHERE stage_module_id IN (
					SELECT module_id FROM modules
					WHERE module_project_id = $1
				) 
		  )
		  AND i.task_status_id = 4 AND i.finish_date_fact > '1999-01-08'
				AND (SELECT COUNT(*) FROM tasks where task_supertask_id = i.task_id) = 0
			group by w.weekstart
			order by prog, w.weekstart desc;	 `
	JSONGetAllRaw(&ExGraphFact, w, r, s, params["id"])
})

//ClientsView :
/*
	&query: 'SELECT ... FROM clients';
	&route: '/...'
*/
var ClientsView = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)

	querys := *SelectClientList
	if value, ok := query["client"]; ok {
		s := value[0]
		querys = *querys.Where("client_organisation_id = (SELECT client_organisation_id FROM clients WHERE client_login = $1)", s)
		q, p, _ := querys.ToSql()
		GetResult(w, q, p)
	} else {
		q, _, _ := querys.ToSql()
		GetResultWA(w, q)
	}
})

//ManagersView :
/*
	&query: 'SELECT ... FROM managers';
	&route: '/...'
*/
var ManagersView = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	querys := *SelectManagersList
	q, _, _ := querys.ToSql()
	GetResultWA(w, q)
})

var FileList = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	query, args, _ := pg.Select("*").From("files").Where(sqrl.Eq{"file_project_id": params["id"]}).ToSql()
	GetResult(w, query, args)
})

//DevsView :
/*
	&query: 'SELECT ... FROM developers';
	&route: '/...'
*/
var DevsView = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	querys := *SelectDeveloperList
	q, _, _ := querys.ToSql()
	GetResultWA(w, q)
})

//GroupsView :
/*
	&query: 'SELECT ... FROM workgroups';
	&route: '/...'
*/
var GroupsView = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	querys := *SelectManagersList
	q, _, _ := querys.ToSql()
	GetResultWA(w, q)
})

//Role :
/*
	&query: 'SELECT ... FROM roles WHERE role_id = &id';
	&route: '/.../&id'
*/
var Role = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExRole, w, r, SelectRoles)
})

//User :
/*
	&query: 'SELECT ... FROM users WHERE user_login = &id';
	&route: '/.../&id'
*/
var User = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExUser, w, r, SelectUsers)
})

//Value :
/*
	&query: 'SELECT ... FROM values WHERE value_id = &id';
	&route: '/.../&id'
*/
var Value = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExValue, w, r, SelectValues)
})

//Organization :
/*
	&query: 'SELECT ... FROM organisations WHERE organisation_id = &id';
	&route: '/.../&id'
*/
var Organization = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExOrganisation, w, r, SelectOrgs)
})

//Client :
/*
	&query: 'SELECT ... FROM clients WHERE client_login = &id';
	&route: '/.../&id'
*/
var Client = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExClient, w, r, SelectClients)
})

//Group :
/*
	&query: 'SELECT ... FROM workgroups WHERE workgroup_id = &id';
	&route: '/.../&id'
*/
var Group = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExWorkGroup, w, r, SelectWorkGroups)
})

//Developer :
/*
	&query: 'SELECT ... FROM developers WHERE developer_login = &id';
	&route: '/.../&id'
*/
var Developer = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExDeveloper, w, r, SelectDevs)
})

//Project :
/*
	&query: 'SELECT ... FROM projects WHERE project_id = &id';
	&route: '/.../&id'
*/
var Project = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExProject, w, r, SelectProjects)
})

//Manager :
/*
	&query: 'SELECT ... FROM managers WHERE manager_login = &id';
	&route: '/.../&id'
*/
var Manager = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExManager, w, r, SelectManagers)
})

//Module :
/*
	&query: 'SELECT ... FROM modules WHERE organisation_id = &id';
	&route: '/.../&id'
*/
var Module = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExModule, w, r, SelectModules)
})

//Stage :
/*
	&query: 'SELECT ... FROM stages WHERE stage_id = &id';
	&route: '/.../&id'
*/
var Stage = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExModule, w, r, SelectStages)
})

//Task :
/*
	&query: 'SELECT ... FROM stages WHERE stage_id = &id';
	&route: '/.../&id'
*/
var Task = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	JSONGetOne(&database.ExTask, w, r, SelectTasks)
})

//#--All-INSERTS--#//

//JSONUnmarshalBody func
func JSONUnmarshalBody(table interface{}, w http.ResponseWriter, r *http.Request, ib *sqrl.InsertBuilder) {
	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &table)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
}

//CreateRole func
/*
	&query: 'INSERT INTO roles (...) VALUES (&json.data)
	&route: '/...'
*/
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

	fmt.Println("inCreate", role)

	res, er := pg.Insert("roles").Columns("role_name").Values(role.Name).Exec()

	if er != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println(res)
})

//CreateTask func
/*
	&query: 'INSERT INTO tasks (...) VALUES (&json.data)
	&route: '/...'
*/
var CreateTask = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var task database.Task

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &task)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	var er error
	var er2 error

	if task.SuperTaskID == 0 {
		_, er = pg.Update("tasks").Set("task_index", sqrl.Expr("task_index + 1")).
			Where(sqrl.GtOrEq{"task_index": task.Index}).
			Where(sqrl.Eq{"task_stage_id": task.StageID}).
			Where(sqrl.Eq{"task_supertask_id": nil}).
			Exec()
		_, er2 = pg.Insert("tasks").
			Columns(
				"task_name",
				"task_stage_id",
				"task_developer_login",
				"task_status_id",
				"task_index",
				"start_date",
				"finish_date",
			).
			Values(
				task.Name,
				task.StageID,
				task.User.UserLogin,
				task.Status.ID,
				task.Index,
				task.StartDate,
				task.FinishDate,
			).Exec()
	} else {
		_, er = pg.Update("tasks").Set("task_index", sqrl.Expr("task_index + 1")).
			Where(sqrl.GtOrEq{"task_index": task.Index}).
			Where(sqrl.Eq{"task_stage_id": task.StageID}).
			Where(sqrl.Eq{"task_supertask_id": task.SuperTaskID}).
			Exec()
		_, er2 = pg.Insert("tasks").
			Columns(
				"task_name",
				"task_stage_id",
				"task_developer_login",
				"task_status_id",
				"task_supertask_id",
				"task_index",
				"start_date",
				"finish_date",
			).
			Values(
				task.Name,
				task.StageID,
				task.User.UserLogin,
				task.Status.ID,
				task.SuperTaskID,
				task.Index,
				task.StartDate,
				task.FinishDate,
			).Exec()
	}

	if er != nil || er2 != nil {
		http.Error(w, er.Error(), 500)
	}

	fmt.Println("Hello")
	fmt.Println(er2)
})

//EditTask func
/*
	&query: 'INSERT INTO tasks (...) VALUES (&json.data)
	&route: '/...'
*/
var EditTask = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var task database.Task

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &task)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	var er error
	var er2 error

	_, er2 = pg.Insert("tasks").
		Columns(
			"task_name",
			"task_stage_id",
			"task_developer_login",
			"task_status_id",
			"task_supertask_id",
			"task_index",
			"start_date",
			"finish_date",
		).
		Values(
			task.Name,
			task.StageID,
			task.User.UserLogin,
			task.Status.ID,
			task.SuperTaskID,
			task.Index,
			task.StartDate,
			task.FinishDate,
		).Exec()

	if er != nil || er2 != nil {
		http.Error(w, er.Error(), 500)
	}
	fmt.Println(er2)
})

//EditTaskStatus func
/*
	&query: 'INSERT INTO tasks (...) VALUES (&json.data)
	&route: '/...'
*/
var EditTaskStatus = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	query, _ := url.ParseQuery(r.URL.RawQuery)

	s := 0

	if value, ok := query["action"]; ok {
		switch value[0] {
		case "start":
			s = 2
			break
		case "finish":
			s = 4
			break
		case "abort":
			s = 6
			break
		}
	}
	params := mux.Vars(r)

	var er error
	var er2 error

	switch s {
	case 2:
		_, er2 = pg.
			Update("tasks").
			Set("task_status_id", s).
			Set("start_date_fact", time.Now()).
			Where(sqrl.Eq{"task_id": params["id"]}).
			Exec()
	case 4, 6:
		_, er2 = pg.
			Update("tasks").
			Set("task_status_id", s).
			Set("finish_date_fact", time.Now()).
			Where(sqrl.Eq{"task_id": params["id"]}).
			Exec()
	}

	if er != nil || er2 != nil {
		//http.Error(w, er.Error(), 500)
	}
	fmt.Println(er2)
})

//EditIssue func
/*
	&query: 'INSERT INTO tasks (...) VALUES (&json.data)
	&route: '/...'
*/
var EditIssue = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	var er error
	var er2 error

	_, er2 = pg.Update("issues").
		Set("issue_close_status", true).Where(sqrl.Eq{"issue_id": params["id"]}).Exec()

	if er != nil || er2 != nil {
		//http.Error(w, er.Error(), 500)
	}
	fmt.Println(er2)
})

//CreateStage func
/*
	&query: 'INSERT INTO stages (...) VALUES (&json.data)
	&route: '/...'
*/
var CreateStage = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var stage database.Stage

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &stage)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	var er error
	var er2 error

	_, er = pg.Update("stages").Set("stage_index", sqrl.Expr("stage_index + 1")).
		Where(sqrl.GtOrEq{"stage_index": stage.Index}).
		Where(sqrl.Eq{"stage_module_id": stage.ModuleID}).
		Exec()
	_, er2 = pg.Insert("stages").
		Columns(
			"stage_name",
			"stage_module_id",
			"stage_status_id",
			"stage_index",
			"start_date",
			"finish_date",
		).
		Values(
			stage.Name,
			stage.ModuleID,
			stage.Status.ID,
			stage.Index,
			stage.StartDate,
			stage.FinishDate,
		).Exec()

	if er != nil || er2 != nil {
		http.Error(w, er.Error(), 500)
	}
	fmt.Println("Hello___")
	fmt.Println(er2)
})

//CreateStage func
/*
	&query: 'INSERT INTO stages (...) VALUES (&json.data)
	&route: '/...'
*/
var CreateManagerOne = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var user database.Manager

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		fmt.Println(err)
		return
	}

	fmt.Println(err)

	err = json.Unmarshal(b, &user)
	if err != nil {
		http.Error(w, err.Error(), 500)
		fmt.Println(err)
		return
	}

	fmt.Println(err)

	var er2 error

	_, er2 = pg.Insert("users").
		Columns(
			"user_login",
			"user_password",
			"first_name",
			"middle_name",
			"sur_name",
			"birth_date",
			"phone_num",
			"email_addr",
			"user_image_src",
		).
		Values(
			user.User.UserLogin,
			user.User.UserPassword,
			user.User.UserName,
			user.User.UserMidname,
			user.User.UserSurname,
			user.User.UserBirthdate,
			user.User.UserPhone,
			user.User.UserMail,
			sqrl.Expr("DEFAULT"),
		).Exec()

	_, er1 := pg.Insert("managers").
		Columns("manager_login", "outsource_spec").
		Values(user.User.UserLogin, user.OSScpec).Exec()

	if er2 != nil || er1 != nil {
		//http.Error(w, er2.Error(), 500)
	}
	fmt.Println(er2)
	fmt.Println(er1)
})

//CreateStage func
/*
	&query: 'INSERT INTO stages (...) VALUES (&json.data)
	&route: '/...'
*/
var CreateDeveloperOne = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var user database.Developer

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		fmt.Println(err)
		return
	}

	fmt.Println(err)

	err = json.Unmarshal(b, &user)
	if err != nil {
		http.Error(w, err.Error(), 500)
		fmt.Println(err)
		return
	}

	fmt.Println(err)

	var er2 error

	_, er2 = pg.Insert("users").
		Columns(
			"user_login",
			"user_password",
			"first_name",
			"middle_name",
			"sur_name",
			"birth_date",
			"phone_num",
			"email_addr",
			"user_image_src",
		).
		Values(
			user.User.UserLogin,
			user.User.UserPassword,
			user.User.UserName,
			user.User.UserMidname,
			user.User.UserSurname,
			user.User.UserBirthdate,
			user.User.UserPhone,
			user.User.UserMail,
			sqrl.Expr("DEFAULT"),
		).Exec()

	_, er1 := pg.Insert("developers").
		Columns("developer_login", "outsource_spec", "tester_spec").
		Values(user.User.UserLogin, user.OSScpec, user.TestSpec).Exec()

	if er2 != nil || er1 != nil {
		//http.Error(w, er2.Error(), 500)
	}
	fmt.Println(er2)
	fmt.Println(er1)
})

//CreateIssue func
/*
	&query: 'INSERT INTO issues (...) VALUES (&json.data)
	&route: '/...'
*/
var CreateIssue = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var issue database.Issue

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &issue)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	var er2 error

	_, er2 = pg.Insert("issues").
		Columns(
			"issue_name",
			"issue_task_id",
			"issue_desc",
			"issue_date",
			"issue_close_status",
		).
		Values(
			issue.IssuesName,
			issue.TaskID,
			issue.IssuesDesc,
			time.Now(),
			false,
		).Exec()

	if er2 != nil {
		//&trash http.Error(w, er.Error(), 500)
	}
	fmt.Println("Hello___")
	fmt.Println(er2)
})

var CreateNote = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var issue database.Note

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &issue)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	var er2 error

	_, er2 = pg.Insert("notes").
		Columns(
			"note_name",
			"note_task_id",
			"note_desc",
			"note_date",
			"note_client_login",
		).
		Values(
			issue.NoteName,
			issue.Task,
			issue.Desc,
			time.Now(),
			issue.UserName,
		).Exec()

	if er2 != nil {
		//&trash http.Error(w, er.Error(), 500)
	}
	fmt.Println("Hello___")
	fmt.Println(er2)
})

//CreateModule func
/*
	&query: 'INSERT INTO modules (...) VALUES (&json.data)
	&route: '/...'
*/
var CreateModule = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var module database.Module

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &module)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	/*var role database.Role*/

	/*InsertNewData(role, w, r)*/
	var er error
	//fmt.Println(role)
	var er2 error
	_, er = pg.Update("modules").Set("module_index", sqrl.Expr("module_index + 1")).
		Where(sqrl.GtOrEq{"module_index": module.Index}).
		Where(sqrl.Eq{"module_project_id": module.ProjectID}).
		Exec()
	_, er2 = pg.Insert("modules").
		Columns(
			"module_name",
			"module_project_id",
			"module_status",
			"module_index",
			"start_date",
			"finish_date",
		).
		Values(
			module.Name,
			module.ProjectID,
			module.Status.ID,
			module.Index,
			module.StartDate,
			module.FinishDate,
		).Exec()

	if er != nil || er2 != nil {
		//&trash http.Error(w, er.Error(), 500)
	}
	fmt.Println("Hello___")
	fmt.Println(er2)
})

//CreateSubModule func
/*
	&query: 'INSERT INTO modules (...) VALUES (&json.data)
	&route: '/...'
*/
var CreateSubModule = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var module database.Module

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &module)
	if err != nil {
		http.Error(w, err.Error(), 500)
		fmt.Println(err)
		return
	}

	var er2 error
	_, er2 = pg.Insert("modules").
		Columns(
			"module_name",
			"module_project_id",
			"module_status",
			"module_index",
			"start_date",
			"finish_date",
		).
		Values(
			module.Name,
			module.ProjectID,
			module.Status.ID,
			sqrl.Expr("(SELECT COUNT(*) FROM modules WHERE module_project_id = ?) + 1", module.ProjectID),
			module.StartDate,
			module.FinishDate,
		).Exec()

	fmt.Println(module.StartDate)

	if er2 != nil {
		//&trash http.Error(w, er.Error(), 500)
	}
	fmt.Println("Hello___")
	fmt.Println(er2)
})

//CreateSubStage func
/*
	&query: 'INSERT INTO stages (...) VALUES (&json.data)
	&route: '/...'
*/
var CreateSubStage = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var stage database.Stage

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &stage)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	var er2 error
	_, er2 = pg.Insert("stages").
		Columns(
			"stage_name",
			"stage_module_id",
			"stage_status_id",
			"stage_index",
			"start_date",
			"finish_date",
		).
		Values(
			stage.Name,
			stage.ModuleID,
			stage.Status.ID,
			sqrl.Expr("(SELECT COUNT(*) FROM stages WHERE stage_module_id = ?) + 1", stage.ModuleID),
			stage.StartDate,
			stage.FinishDate,
		).Exec()

	if er2 != nil {
		//&trash http.Error(w, er.Error(), 500)
	}
	fmt.Println("Hello___")
	fmt.Println(er2)
})

//CreateSubTask func
/*
	&query: 'INSERT INTO tasks (...) VALUES (&json.data)
	&route: '/...'
*/
var CreateSubTask = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var task database.Task

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &task)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	/*var role database.Role*/

	/*InsertNewData(role, w, r)*/

	fmt.Println("inCreate", task.Name,
		task.StageID,
		task.User.UserLogin,
		task.Status.ID,
		task.SuperTaskID,
		task.Index)

	//fmt.Println(role)
	var er2 error
	if task.SuperTaskID == 0 {
		_, er2 = pg.Insert("tasks").
			Columns(
				"task_name",
				"task_stage_id",
				"task_developer_login",
				"task_status_id",
				"task_index",
				"start_date",
				"finish_date",
			).
			Values(
				task.Name,
				task.StageID,
				task.User.UserLogin,
				task.Status.ID,
				sqrl.Expr("(SELECT COUNT(*) FROM tasks where task_supertask_id is NULL and task_stage_id = ?) + 1", task.StageID),
				task.StartDate,
				task.FinishDate,
			).Exec()
	} else {
		_, er2 = pg.Insert("tasks").
			Columns(
				"task_name",
				"task_stage_id",
				"task_developer_login",
				"task_status_id",
				"task_supertask_id",
				"task_index",
				"start_date",
				"finish_date",
			).
			Values(
				task.Name,
				task.StageID,
				task.User.UserLogin,
				task.Status.ID,
				task.SuperTaskID,
				sqrl.Expr("(SELECT COUNT(*) FROM tasks where task_supertask_id = ?) + 1", task.SuperTaskID),
				task.StartDate,
				task.FinishDate,
			).Exec()
	}

	fmt.Println(sqrl.Expr("(SELECT COUNT(*) FROM tasks where task_supertask_id = ?) + 1", task.SuperTaskID))

	if er2 != nil {
		//http.Error(w, er.Error(), 500)
	}
	fmt.Println("Hello")
	fmt.Println(er2)
})

//CreateProjects func
/*
	&query: 'INSERT INTO projects (...) VALUES (&json.data)
	&route: '/...'
*/
var CreateProjects = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var project database.ProjectDB

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	fmt.Println(err)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &project)
	fmt.Println(err)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	var er2 error

	query, _ := url.ParseQuery(r.URL.RawQuery)
	if value, ok := query["mode"]; ok {
		switch value[0] {
		case "client":
			_, er2 = pg.Insert("projects").
				Columns(
					"project_name",
					"project_client_login",
					"project_manager_login",
					"project_workgroup_id",
					"editable",
					"client_activity",
					"project_info",
					"project_status_id",
					"start_date",
					"finish_date",
				).
				Values(
					project.Name,
					project.Client.User.UserLogin,
					"null",
					0,
					project.Editable,
					project.Activity,
					project.ProjectInfo,
					0,
					project.StartDate,
					project.FinishDate,
				).Exec()
		case "prepare":
			_, er2 = pg.Update("projects").
				Set("project_manager_login", project.Manager.User.UserLogin).
				Set("project_status_id", 1).Exec()
		}

	}

	//fmt.Println(role)

	//fmt.Println(sqrl.Expr("(SELECT COUNT(*) FROM tasks where task_supertask_id = ?) + 1", task.SuperTaskID))

	if er2 != nil {
		//http.Error(w, er.Error(), 500)
	}
	fmt.Println("Hello")
	fmt.Println(er2)
})

//UpdateProjects func
/*
	&query: 'INSERT INTO projects (...) VALUES (&json.data)
	&route: '/...'
*/
var UpdateProjects = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var project database.ProjectDB

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	fmt.Println(err)
	if err != nil {
		http.Error(w, err.Error(), 500)
		//return
	}

	err = json.Unmarshal(b, &project)
	fmt.Println(err)
	if err != nil {
		http.Error(w, err.Error(), 500)
		//return
	}

	params := mux.Vars(r)

	var er2 error

	query, _ := url.ParseQuery(r.URL.RawQuery)
	if value, ok := query["mode"]; ok {
		switch value[0] {
		case "client":
			_, er2 = pg.Insert("projects").
				Columns(
					"project_name",
					"project_client_login",
					"project_manager_login",
					"project_workgroup_id",
					"editable",
					"client_activity",
					"project_info",
					"project_status_id",
					"start_date",
					"finish_date",
				).
				Values(
					project.Name,
					project.Client.User.UserLogin,
					"null",
					0,
					project.Editable,
					project.Activity,
					project.ProjectInfo,
					0,
					project.StartDate,
					project.FinishDate,
				).Exec()
			break
		case "prepare":
			_, er2 = pg.Update("projects").
				Set("project_manager_login", project.Manager.User.UserLogin).
				Set("project_status_id", 1).Where(sqrl.Eq{"project_id": params["id"]}).Exec()
			break
		case "group":
			_, er2 = pg.Update("projects").
				Set("project_workgroup_id", project.WorkGroup.ID).
				Where(sqrl.Eq{"project_id": params["id"]}).Exec()
		case "indev":
			_, er2 = pg.Update("projects").
				Set("project_status_id", 2).
				Set("start_date_fact", time.Now()).
				Where(sqrl.Eq{"project_id": params["id"]}).Exec()
		case "debug":
			_, er2 = pg.Update("projects").
				Set("project_status_id", 3).
				Where(sqrl.Eq{"project_id": params["id"]}).Exec()
		case "success":
			_, er2 = pg.Update("projects").
				Set("project_status_id", 4).
				Set("finish_date_fact", time.Now()).
				Where(sqrl.Eq{"project_id": params["id"]}).Exec()
		case "stop":
			_, er2 = pg.Update("projects").
				Set("project_status_id", 5).
				Set("finish_date_fact", time.Now()).
				Where(sqrl.Eq{"project_id": params["id"]}).Exec()
		case "abort":
			_, er2 = pg.Update("projects").
				Set("project_status_id", 6).
				Where(sqrl.Eq{"project_id": params["id"]}).Exec()
		}

	}

	//fmt.Println(role)

	//fmt.Println(sqrl.Expr("(SELECT COUNT(*) FROM tasks where task_supertask_id = ?) + 1", task.SuperTaskID))

	if er2 != nil {
		//http.Error(w, er.Error(), 500)
	}
	fmt.Println("Hello")
	fmt.Println(er2)
})

//CreateUser func
/*
	&query: 'INSERT INTO users (...) VALUES (&json.data)
	&route: '/...'
*/
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

//CreateOrg func
/*
	&query: 'INSERT INTO organisations (...) VALUES (&json.data)
	&route: '/...'
*/
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

//CreateClient func
/*
	&query: 'INSERT INTO clients (...) VALUES (&json.data)
	&route: '/...'
*/
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

//CreateGroup func
/*
	&query: 'INSERT INTO workgroups (...) VALUES (&json.data)
	&route: '/...'
*/
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

//CreateDeveloper func
/*
	&query: 'INSERT INTO developers (...) VALUES (&json.data)
	&route: '/...'
*/
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

//CreateProject func
/*
	&query: 'INSERT INTO projects (...) VALUES (&json.data)
	&route: '/...'
*/
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

//CreateManager func
/*
	&query: 'INSERT INTO managers (...) VALUES (&json.data)
	&route: '/...'
*/
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

//UpdateRole func
/*
	&query: 'UPDATE roles SET (...) = (&json.data) WHERE role_id = &id
	&route: '/.../&id'
*/
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

//UpdateUser func
/*
	&query: 'UPDATE users SET (...) = (&json.data) WHERE user_login = &id
	&route: '/.../&id'
*/
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

//UpdateOrg func
/*
	&query: 'UPDATE organisations SET (...) = (&json.data) WHERE orgasnisation_id = &id
	&route: '/.../&id'
*/
var UpdateOrg = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

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

	//TODO

})

//UpdateClients func
/*
	&query: 'UPDATE clients SET (...) = (&json.data) WHERE client_login = &id
	&route: '/.../&id'
*/
var UpdateClients = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

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

	//TODO

})

//UpdateGroups func
/*
	&query: 'UPDATE workgroups SET (...) = (&json.data) WHERE workgroup_id = &id
	&route: '/.../&id'
*/
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

//UpdateDevelopers func
/*
	&query: 'UPDATE developers SET (...) = (&json.data) WHERE developer_id = &id
	&route: '/.../&id'
*/
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

	//TODO

})

//UpdateProjectsa func
/*
	&query: 'UPDATE projects SET (...) = (&json.data) WHERE project_id = &id
	&route: '/.../&id'
*/
var UpdateProjectsa = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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

	//TODO

})

//#--ALL_DELETES--#//

//DeleteRole func
/*
	&query: 'DELETE FROM roles WHERE role_id = &id
	&route: '/.../&id'
*/
var DeleteRole = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("roles").Where("role_id = ?", params["id"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

//DeleteTask func
/*
	&query: 'DELETE FROM roles WHERE role_id = &id
	&route: '/.../&id'
*/
var DeleteTask = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var task database.Task

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &task)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	if task.SuperTaskID == 0 {
		res, _ := pg.Update("tasks").Set("task_index", sqrl.Expr("task_index - 1")).
			Where(sqrl.GtOrEq{"task_index": task.Index}).
			Where(sqrl.Eq{"task_stage_id": task.StageID}).
			Where(sqrl.Eq{"task_supertask_id": nil}).
			Exec()
		res1, _ := pg.Delete("tasks").Where("task_id = ?", params["id"]).Exec()

		if err != nil {
			http.Error(w, err.Error(), 500)
		}

		fmt.Println(res, res1)
	} else {
		res, _ := pg.Update("tasks").Set("task_index", sqrl.Expr("task_index - 1")).
			Where(sqrl.GtOrEq{"task_index": task.Index}).
			Where(sqrl.Eq{"task_stage_id": task.StageID}).
			Where(sqrl.Eq{"task_supertask_id": task.SuperTaskID}).
			Exec()
		res1, _ := pg.Delete("tasks").Where("task_id = ?", params["id"]).Exec()

		if err != nil {
			http.Error(w, err.Error(), 500)
		}

		fmt.Println(res, res1)
	}

})

//DeleteStage func
/*
	&query: 'DELETE FROM stages WHERE stage_id = &id
	&route: '/.../&id'
*/
var DeleteStage = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var stage database.Stage

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &stage)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, _ := pg.Update("stages").Set("stage_index", sqrl.Expr("stage_index - 1")).
		Where(sqrl.GtOrEq{"stage_index": stage.Index}).
		Where(sqrl.Eq{"stage_module_id": stage.ModuleID}).
		Exec()
	res1, er := pg.Delete("stages").Where("stage_id = ?", params["id"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res, res1, er)

})

//DeleteModule func
/*
	&query: 'DELETE FROM modules WHERE module_id = &id
	&route: '/.../&id'
*/
var DeleteModule = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var module database.Module

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	err = json.Unmarshal(b, &module)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, _ := pg.Update("modules").Set("module_index", sqrl.Expr("module_index - 1")).
		Where(sqrl.GtOrEq{"module_index": module.Index}).
		Where(sqrl.Eq{"module_project_id": module.ProjectID}).
		Exec()
	res1, er := pg.Delete("modules").Where("module_id = ?", params["id"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res, res1, er)

})

//DeleteUser func
/*
	&query: 'DELETE FROM users WHERE user_login = &id
	&route: '/.../&id'
*/
var DeleteUser = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("users").Where("user_login = ?", params["login"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

//DeleteOrg func
/*
	&query: 'DELETE FROM organisations WHERE organisation_id = &id
	&route: '/.../&id'
*/
var DeleteOrg = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("organisations").Where("organisation_id = ?", params["id"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

//DeleteClient func
/*
	&query: 'DELETE FROM clients WHERE clien_login = &id
	&route: '/.../&id'
*/
var DeleteClient = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("clients").Where("client_user_login = ?", params["login"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

//DeleteGroup func
/*
	&query: 'DELETE FROM workgroups WHERE workgroup_id = &id
	&route: '/.../&id'
*/
var DeleteGroup = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("workgroups").Where("workgroup_id = ?", params["id"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

//DeleteDeveloper func
/*
	&query: 'DELETE FROM developers WHERE developer_login = &id
	&route: '/.../&id'
*/
var DeleteDeveloper = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("developers").Where("developer_user_login = ?", params["login"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

//DeleteProject func
/*
	&query: 'DELETE FROM projects WHERE project_id = &id
	&route: '/.../&id'
*/
var DeleteProject = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("projects").Where("project_id = ?", params["id"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})

//DeleteManager func
/*
	&query: 'DELETE FROM managers WHERE manager_login = &id
	&route: '/.../&id'
*/
var DeleteManager = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	res, err := pg.Delete("managers").Where("manager_user_login = ?", params["login"]).Exec()

	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println(res)

})
