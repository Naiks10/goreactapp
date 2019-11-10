package database

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
)

//Init Structures

type Roles struct {
	ID   string `json:"id" db:"role_id"`
	Name string `json:"name" db:"role_name"`
}

type Users struct {
	UserLogin     string `json:"login" db:"user_login"`
	UserPassword  string `json:"password" db:"user_password"`
	UserSurname   string `json:"surname" db:"user_surname"`
	UserName      string `json:"name" db:"user_name"`
	UserMidname   string `json:"midname" db:"user_midname"`
	UserBirthdate string `json:"birthdate" db:"user_birthdate"`
	UserPhone     string `json:"phone" db:"user_phone"`
	UserMail      string `json:"mail" db:"user_email"`
	Roles         `json:"role"`
}

type Users_dop struct {
	UserLogin     string `json:"login" db:"user_login1"`
	UserPassword  string `json:"password" db:"user_password1"`
	UserSurname   string `json:"surname" db:"user_surname1"`
	UserName      string `json:"name" db:"user_name1"`
	UserMidname   string `json:"midname" db:"user_midname1"`
	UserBirthdate string `json:"birthdate" db:"user_birthdate1"`
	UserPhone     string `json:"phone" db:"user_phone1"`
	UserMail      string `json:"mail" db:"user_email1"`
	Roles         `json:"role"`
}

type Organisations struct {
	OrganizationId   string           `json:"id" db:"organisation_id"`
	OrganizationName string           `json:"name" db:"organisation_name"`
	OrganizationData OrganisationData `json:"data" db:"organisation_data"`
}

type OrganisationData map[string]interface{}

func (a OrganisationData) Value() (driver.Value, error) {
	return json.Marshal(a)
}

func (a *OrganisationData) Scan(value interface{}) error {
	b, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}

	return json.Unmarshal(b, &a)
}

type Clients_dop struct {
	Users_dop     `json:"user"`
	Organisations `json:"organisation"`
}

type Clients struct {
	Users         `json:"user"`
	Organisations `json:"organisation"`
}

type WorkGroups struct {
	ID            string `json:"id" db:"workgroup_id"`
	WorkGroupName string `json:"name" db:"workgroup_name"`
}

type Developers struct {
	Users      `json:"user"`
	WorkGroups `json:"workgroup"`
	IsGeneral  bool `json:"isgeneral" db:"is_general"`
}

type ProjectStatuses struct {
	ID   string `json:"id" db:"project_status_id"`
	Name string `json:"name" db:"project_status_name"`
}

type Managers struct {
	Users `json:"user"`
}

type Projects struct {
	ID              string `json:"id" db:"project_id"`
	Cost            string `json:"cost" db:"cost"`
	ProjectInfo     string `json:"info" db:"project_info"`
	WorkGroups      `json:"workgroup"`
	ProjectStatuses `json:"status"`
	ProjectData     ProjectData `json:"data" db:"project_data"`
	Clients_dop     `json:"client"`
	Managers        `json:"manager"`
}

type ProjectData map[string]interface{}

func (a ProjectData) Value() (driver.Value, error) {
	return json.Marshal(a)
}

func (a *ProjectData) Scan(value interface{}) error {
	b, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}

	return json.Unmarshal(b, &a)
}

//----------------------------------------------------

//----------------------------------------------------

type Role struct {
	Items []Roles `json:"items"`
}

type User struct {
	Items []Users `json:"items"`
}

type Organisation struct {
	Items []Organisations `json:"items"`
}

type Client struct {
	Items []Clients `json:"items"`
}

type WorkGroup struct {
	Items []WorkGroups `json:"items"`
}

type Developer struct {
	Items []Developers `json:"items"`
}

type ProjectStatus struct {
	Items []ProjectStatuses `json:"items"`
}

type Project struct {
	Items []Projects `json:"items"`
}

type Manager struct {
	Items []Managers `json:"items"`
}

//Init Struct Slices

var (
	ExRole          = Role{}
	ExUser          = User{}
	ExOrganisation  = Organisation{}
	ExClient        = Client{}
	ExWorkGroup     = WorkGroup{}
	ExDeveloper     = Developer{}
	ExProjectStatus = ProjectStatus{}
	ExProject       = Project{}
	ExManager       = Manager{}
)
