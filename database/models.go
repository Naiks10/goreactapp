package database

import (
	"reflect"
	"time"
)

//Init Structures

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
type Project struct {
	ID                   int    `json:"id" db:"project_id"`
	Name                 string `json:"name" db:"project_name"`
	Manager              `json:"manager"`
	ClientForProjectView `json:"client"`
	WorkGroup            `json:"workgroup"`
	ProjectInfo          string `json:"info" db:"project_info"`
	Status               `json:"status"`
	StartDate            time.Time `json:"start" db:"start_date"`
	FinishDate           time.Time `json:"finish" db:"finish_date"`
}

//ProjectPreview structure
type ProjectPreview struct {
	ID             int       `json:"id" db:"project_id"`
	Name           string    `json:"name" db:"project_name"`
	OrganisationID int       `json:"org_id" db:"organisation_id"`
	Src            string    `json:"src" db:"organisation_image_src"`
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
	ID        int    `json:"id" db:"module_id"`
	Name      string `json:"name" db:"module_name"`
	ProjectID int    `json:"project" db:"module_project_id"`
	Status    `json:"status"`
	Index     string `json:"index" db:"module_index"`
}

//Stage structure
type Stage struct {
	ID       int    `json:"id" db:"stage_id"`
	Name     string `json:"name" db:"stage_name"`
	ModuleID int    `json:"module" db:"stage_module_id"`
	Status   `json:"status"`
	Index    string `json:"index" db:"stage_index"`
}

//Task structure
type Task struct {
	ID          int    `json:"id" db:"task_id"`
	Name        string `json:"name" db:"task_name"`
	StageID     int    `json:"stage" db:"task_stage_id"`
	Status      `json:"status"`
	SuperTaskID int `json:"supertask" db:"task_supertask_id"`
	Index       int `json:"index" db:"stage_index"`
}

//Issue structure
type Issue struct {
	IssuesID   int       `json:"id" db:"issue_id"`
	IssuesName string    `json:"name" db:"issue_name"`
	IssuesDesc string    `json:"desc" db:"issue_desc"`
	IssuesDate time.Time `json:"date db:"issue_date"`
}

//IssuesList structure
type IssuesList struct {
	ListID      int `json:"id"`
	Issue       `json:"issue"`
	Task        `json:"task"`
	CloseStatus bool `json:"status" db:"issue_close_status"`
}

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

func (t *Roles) GetItems() interface{} {
	return &t.Items
}

func (t *Roles) Clear() {
	t.Items = nil
}

type Users struct {
	Items []User `json:"items"`
}

func (t *Users) GetItems() interface{} {
	return &t.Items
}

func (t *Users) GetItem() interface{} {
	return &t.Items[0]
}

func (t *Projects) GetItem() interface{} {
	return &t.Items[0]
}

func (t *Users) Clear() {
	t.Items = nil
}

func (t *Roles) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *Managers) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *Projects) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *ProjectsPreview) GetPrimaryKey() string {
	return GetTag(t.Items)
}
func (t *Stages) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *Statuses) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *Tasks) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *WorkGroups) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *WorkGroupLists) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *Organisations) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *Modules) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *Issues) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *IssuesLists) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *Users) GetPrimaryKey() string {
	return GetTag(t.Items)
}
func (t *Clients) GetPrimaryKey() string {
	return GetTag(t.Items[0])
}
func (t *Developers) GetPrimaryKey() string {
	return GetTag(t.Items[0])
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

type IssuesLists struct {
	Items []IssuesList `json:"items"`
}

func (t *IssuesLists) GetItems() interface{} {
	return &t.Items
}

func (t *IssuesLists) Clear() {
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
	ExIssueList      = IssuesLists{}
	ExManager        = Managers{}
)
