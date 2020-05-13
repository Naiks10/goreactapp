package database

import (
	"database/sql"
	"reflect"
	"time"
)

//Init Structures

type Time struct {
	time.Time
}

func (m *Time) UnmarshalJSON(data []byte) error {
	// Ignore null, like in the main JSON package.
	if string(data) == "null" || string(data) == `""` {
		return nil
	}
	tt, err := time.Parse("2006-01-02", "")
	*m = Time{tt}
	return err
}

//Role structure
type Role struct {
	ID   int    `json:"id" db:"role_id"`
	Name string `json:"name" db:"role_name"`
}

//User structure
type User struct {
	UserLogin     string    `json:"login" db:"user_login"`
	UserPassword  string    `json:"password,omitempty" db:"user_password"`
	UserSurname   string    `json:"surname" db:"sur_name"`
	UserName      string    `json:"name" db:"first_name"`
	UserMidname   string    `json:"midname" db:"middle_name"`
	UserBirthdate time.Time `json:"birthdate" db:"birth_date"`
	UserPhone     string    `json:"phone" db:"phone_num"`
	UserMail      string    `json:"mail" db:"email_addr"`
	UserImgSrc    string    `json:"src" db:"user_image_src"`
	Role          `json:"role"`
}

//UserForProjectView structure
type UserForProjectView struct {
	UserLogin     string    `json:"login" db:"user_login1"`
	UserPassword  string    `json:"password,omitempty" db:"user_password"`
	UserSurname   string    `json:"surname" db:"sur_name1"`
	UserName      string    `json:"name" db:"first_name1"`
	UserMidname   string    `json:"midname" db:"middle_name1"`
	UserBirthdate time.Time `json:"birthdate" db:"birth_date1"`
	UserPhone     string    `json:"phone" db:"phone_num1"`
	UserMail      string    `json:"mail" db:"email_addr1"`
	UserImgSrc    string    `json:"src" db:"user_image_src1"`
	Role          `json:"role,omitempty"`
}

//Organisation structure
type Organisation struct {
	OrganizationID   int    `json:"id" db:"organisation_id"`
	FullName         string `json:"full_name" db:"full_name"`
	ShortName        string `json:"short_name" db:"short_name"`
	OrganizationDesc string `json:"desc" db:"organisation_desc"`
	OrganisationImg  string `json:"src" db:"organisation_image_src"`
}

//Client structure
type Client struct {
	User         `json:"user"`
	Organisation `json:"organisation"`
}

//ClientForProjectView structure
type ClientForProjectView struct {
	UserForProjectView `json:"user"`
	Organisation       `json:"organisation"`
}

//WorkGroup structure
type WorkGroup struct {
	ID            int    `json:"id" db:"workgroup_id"`
	WorkGroupName string `json:"name" db:"workgroup_name"`
}

//Developer structure
type Developer struct {
	User    `json:"user"`
	OSScpec bool `json:"is_outsource" db:"outsource_spec"`
}

//WorkGroupList structure
type WorkGroupList struct {
	ListID     int `json:"id" db:"list_id"`
	Developer  `json:"developer"`
	WorkGroup  `json:"workgroups"`
	HeadStatus bool `json:"status" db:"head_status"`
}

//Manager structure
type Manager struct {
	User `json:"user"`
}

//Status structure
type Status struct {
	ID   int    `json:"id" db:"status_id"`
	Name string `json:"name" db:"status_name"`
}

//Project structure
type ProjectDB struct {
	ID             int    `json:"id" db:"project_id"`
	Name           string `json:"name" db:"project_name"`
	Manager        `json:"manager"`
	Client         `json:"client"`
	WorkGroup      `json:"workgroup"`
	ProjectInfo    string `json:"info" db:"project_info"`
	Status         `json:"status"`
	Editable       bool      `json:"editable" db:"editable"`
	Activity       bool      `json:"activity" db:"client_activity"`
	StartDate      time.Time `json:"start" db:"start_date"`
	FinishDate     time.Time `json:"finish" db:"finish_date"`
	StartDateFact  time.Time `json:"start_fact" db:"start_date_fact"`
	FinishDateFact time.Time `json:"finish_fact" db:"finish_date_fact"`
}

//Project structure
type Project struct {
	ID                   int    `json:"id" db:"project_id"`
	Name                 string `json:"name" db:"project_name"`
	Manager              `json:"manager"`
	ClientForProjectView `json:"client"`
	WorkGroup            `json:"workgroup"`
	ProjectInfo          string `json:"info" db:"project_info"`
	Status               `json:"status"`
	DevInitials          sql.NullString `json:"dev_init" db:"fio_dev"`
	DevPhone             sql.NullString `json:"dev_phone" db:"pn"`
	DevEmail             sql.NullString `json:"dev_email" db:"ad"`
	DevImage             sql.NullString `json:"dev_img" db:"dev_img"`
	SpecCount            sql.NullString `json:"dev_count" db:"workers_count"`
	StartDate            time.Time      `json:"start" db:"start_date"`
	FinishDate           time.Time      `json:"finish" db:"finish_date"`
	StartDateFact        time.Time      `json:"start_fact" db:"start_date_fact"`
	FinishDateFact       time.Time      `json:"finish_fact" db:"finish_date_fact"`
}

//ProjectPreview structure
type ProjectPreview struct {
	ID             int       `json:"id" db:"project_id"`
	Name           string    `json:"name" db:"project_name"`
	OrganisationID int       `json:"org_id" db:"organisation_id"`
	Src            string    `json:"src" db:"organisation_image_src"`
	WorkGrp        int       `json:"group_id" db:"project_workgroup_id"`
	StatusID       int       `json:"status_id" db:"project_status_id"`
	StatusName     string    `json:"status_name" db:"status_name"`
	TasksAll       int       `json:"tasks_all" db:"tasks_all"`
	TasksFinished  int       `json:"tasks_finished" db:"tasks_finished"`
	ProjectIssues  int       `json:"project_issues" db:"project_issues"`
	StartDate      time.Time `json:"start" db:"start_date"`
	FinishDate     time.Time `json:"finish" db:"finish_date"`
	StartDateFact  time.Time `json:"start_fact" db:"start_date_fact"`
	FinishDateFact time.Time `json:"finish_fact" db:"finish_date_fact"`
}

//Module structure
type Module struct {
	ID             int    `json:"id" db:"module_id"`
	Name           string `json:"name" db:"module_name"`
	ProjectID      int    `json:"project" db:"module_project_id"`
	Status         `json:"status"`
	Index          int       `json:"index" db:"module_index"`
	StartDate      time.Time `json:"start" db:"start_date"`
	FinishDate     time.Time `json:"finish" db:"finish_date"`
	StartDateFact  time.Time `json:"start_fact" db:"start_date_fact"`
	FinishDateFact time.Time `json:"finish_fact" db:"finish_date_fact"`
}

//Stage structure
type Stage struct {
	ID             int    `json:"id" db:"stage_id"`
	Name           string `json:"name" db:"stage_name"`
	ModuleID       int    `json:"module" db:"stage_module_id"`
	Status         `json:"status"`
	Index          int       `json:"index" db:"stage_index"`
	StartDate      time.Time `json:"start" db:"start_date"`
	FinishDate     time.Time `json:"finish" db:"finish_date"`
	StartDateFact  time.Time `json:"start_fact" db:"start_date_fact"`
	FinishDateFact time.Time `json:"finish_fact" db:"finish_date_fact"`
}

//Task structure
type Task struct {
	ID             int    `json:"id" db:"task_id"`
	Name           string `json:"name" db:"task_name"`
	StageID        int    `json:"stage" db:"task_stage_id"`
	User           `json:"developer"`
	Status         `json:"status"`
	SuperTaskID    int       `json:"supertask" db:"task_supertask_id"`
	Index          int       `json:"index" db:"task_index"`
	StartDate      time.Time `json:"start" db:"start_date"`
	FinishDate     time.Time `json:"finish" db:"finish_date"`
	StartDateFact  time.Time `json:"start_fact" db:"start_date_fact"`
	FinishDateFact time.Time `json:"finish_fact" db:"finish_date_fact"`
}

//Issue structure
type Issue struct {
	IssuesID    int       `json:"id" db:"issue_id"`
	IssuesName  string    `json:"name" db:"issue_name"`
	IssuesDesc  string    `json:"desc" db:"issue_desc"`
	IssuesDate  time.Time `json:"date" db:"issue_date"`
	TaskID      int       `json:"issue_task" db:"issue_task_id"`
	CloseStatus bool      `json:"status" db:"issue_close_status"`
}

//GlobalValueModel structure
type GlobalValueModel struct {
	PK          int   `json:"id" db:"project_id"`
	CountAll    int   `json:"count_all" db:"count_all"`
	Count       int   `json:"count" db:"count"`
	Issues      int   `json:"issues" db:"issues"`
	CurrentData []int `json:"current" db:"current"`
	PlanData    []int `json:"plan" db:"plan"`
}

/*//IssuesList structure
type IssuesList struct {
	ListID      int `json:"id" db:"list_id"`
	Issue       `json:"issue"`
	Task        `json:"task"`
	CloseStatus bool `json:"status" db:"issue_close_status"`
}*/

//----------------------------------------------------

//----------------------------------------------------

//GetTag needed for parsing struct "db" tag to identify database name
func GetTag(e interface{}) string {
	tag := reflect.TypeOf(e).Elem().Field(0).Tag
	return tag.Get("db")
}

//Table is an universal interface for table structs
type Table interface {
	GetItems() interface{}
	GetItem() interface{}
	Clear()
	GetPrimaryKey() string
}

type Roles struct {
	Items []Role `json:"items"`
}

type Values struct {
	Items []GlobalValueModel `json:"items"`
}

func (t *Roles) GetItems() interface{} {
	return &t.Items
}

func (t *Roles) Clear() {
	t.Items = nil
}

func (t *Values) GetItems() interface{} {
	return &t.Items
}

func (t *Values) Clear() {
	t.Items = nil
}

type Users struct {
	Items []User `json:"items"`
}

func (t *Users) Clear() {
	t.Items = nil
}

type Organisations struct {
	Items []Organisation `json:"items"`
}

func (t *Organisations) GetItems() interface{} {
	return &t.Items
}

func (t *Organisations) Clear() {
	t.Items = nil
}

type Clients struct {
	Items []Client `json:"items"`
}

func (t *Clients) GetItems() interface{} {
	return &t.Items
}

func (t *Clients) Clear() {
	t.Items = nil
}

type WorkGroups struct {
	Items []WorkGroup `json:"items"`
}

func (t *WorkGroups) GetItems() interface{} {
	return &t.Items
}

func (t *WorkGroups) Clear() {
	t.Items = nil
}

type Developers struct {
	Items []Developer `json:"items"`
}

func (t *Developers) GetItems() interface{} {
	return &t.Items
}

func (t *Developers) Clear() {
	t.Items = nil
}

type WorkGroupLists struct {
	Items []WorkGroupList `json:"items"`
}

func (t *WorkGroupLists) GetItems() interface{} {
	return &t.Items
}

func (t *WorkGroupLists) Clear() {
	t.Items = nil
}

type Statuses struct {
	Items []Status `json:"items"`
}

func (t *Statuses) GetItems() interface{} {
	return &t.Items
}

func (t *Statuses) Clear() {
	t.Items = nil
}

type Projects struct {
	Items []Project `json:"items"`
}

func (t *Projects) GetItems() interface{} {
	return &t.Items
}

func (t *Projects) Clear() {
	t.Items = nil
}

type ProjectsPreview struct {
	Items []ProjectPreview `json:"items"`
}

func (t *ProjectsPreview) GetItems() interface{} {
	return &t.Items
}

func (t *ProjectsPreview) GetItem() interface{} {
	return &t.Items[0]
}

func (t *ProjectsPreview) Clear() {
	t.Items = nil
}

type Modules struct {
	Items []Module `json:"items"`
}

func (t *Modules) GetItems() interface{} {
	return &t.Items
}

func (t *Modules) Clear() {
	t.Items = nil
}

type Stages struct {
	Items []Stage `json:"items"`
}

func (t *Stages) GetItems() interface{} {
	return &t.Items
}

func (t *Stages) Clear() {
	t.Items = nil
}

type Tasks struct {
	Items []Task `json:"items"`
}

func (t *Tasks) GetItems() interface{} {
	return &t.Items
}

func (t *Tasks) Clear() {
	t.Items = nil
}

type Issues struct {
	Items []Issue `json:"items"`
}

func (t *Issues) GetItems() interface{} {
	return &t.Items
}

func (t *Issues) Clear() {
	t.Items = nil
}

type Managers struct {
	Items []Manager `json:"items"`
}

func (t *Managers) GetItems() interface{} {
	return &t.Items
}

func (t *Managers) Clear() {
	t.Items = nil
}

//Init Struct Slices

var (
	ExRole           = Roles{}
	ExUser           = Users{}
	ExOrganisation   = Organisations{}
	ExClient         = Clients{}
	ExWorkGroup      = WorkGroups{}
	ExWorkGroupList  = WorkGroupLists{}
	ExDeveloper      = Developers{}
	ExProjectStatus  = Statuses{}
	ExProject        = Projects{}
	ExProjectPreview = ProjectsPreview{}
	ExModule         = Modules{}
	ExStage          = Stages{}
	ExTask           = Tasks{}
	ExIssue          = Issues{}
	//ExIssueList      = IssuesLists{}
	ExManager = Managers{}
	ExValue   = Values{}
)
