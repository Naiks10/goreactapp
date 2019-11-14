package functions

import (
	"github.com/elgris/sqrl"
)

var postgres = sqrl.StatementBuilder.PlaceholderFormat(sqrl.Dollar)

var (
	SelectRoles, _, _ = postgres.Select("*").From("roles").ToSql()
	SelectUsers, _, _ = postgres.Select(
		"user_login", "user_password", "user_surname", "user_name", "user_midname", "user_birthdate", "user_phone", "user_email", "role_id", "role_name").
		From("users").
		Join("roles ON user_role = role_id").
		ToSql()
	SelectOrgs, _, _    = postgres.Select("*").From("organisations").ToSql()
	SelectClients, _, _ = postgres.Select(
		"user_login", "user_surname", "user_name", "user_midname", "user_birthdate", "user_phone", "user_email",
		"role_id", "role_name", "organisations.organisation_id", "organisations.organisation_name", "organisation_data").
		From("clients").
		Join("users ON user_login = client_user_login").
		Join("roles on user_role = role_id").
		Join("organisations on clients.organisation_id = organisations.organisation_id").
		ToSql()
	SelectWorkGroups, _, _ = postgres.Select("*").From("workgroups").ToSql()
	SelectDevs, _, _       = postgres.
				Select("user_login", "user_surname", "user_name", "user_midname", "user_birthdate", "user_phone", "user_email", "role_id", "role_name", "workgroups.workgroup_id", "workgroup_name", "is_general").
				From("developers").
				Join("workgroups ON workgroups.workgroup_id = developers.workgroup_id").
				Join("users ON users.user_login = developers.developer_user_login").
				Join("roles ON users.user_role = role_id").
				ToSql()
	SelectStatus, _, _   = postgres.Select("*").From("project_statuses").ToSql()
	SelectProjects, _, _ = postgres.Select(
		"project_id", "cost", "project_info",
		"workgroup_id", "workgroup_name",
		"project_statuses.project_status_id", "project_statuses.project_status_name",
		"project_data",
		"mn.user_login", "mn.user_surname", "mn.user_name", "mn.user_midname", "mn.user_birthdate", "mn.user_phone", "mn.user_email",
		"ms.user_login as user_login1", "ms.user_surname as user_surname1", "ms.user_name as user_name1", "ms.user_midname as user_midname1", "ms.user_birthdate as user_birthdate1", "ms.user_phone as user_phone1", "ms.user_email as user_email1",
		"organisations.organisation_id", "organisations.organisation_name", "organisation_data").
		From("projects").
		Join("workgroups ON workgroups.workgroup_id = projects.project_workgroup_id").
		Join("clients ON clients.client_user_login = projects.client_user_login").
		Join("managers ON managers.manager_user_login = projects.manager_user_login").
		Join("users mn on projects.manager_user_login = mn.user_login").
		Join("users ms on projects.client_user_login = ms.user_login").
		Join("organisations on clients.organisation_id = organisations.organisation_id").
		Join("project_statuses ON project_statuses.project_status_id = projects.project_status_id").
		ToSql()
	SelectManagers, _, _ = postgres.
				Select("user_login", "user_surname", "user_name", "user_midname", "user_birthdate", "user_phone", "user_email", "role_id", "role_name").
				From("managers").
				Join("users ON users.user_login = managers.manager_user_login").
				Join("roles ON users.user_role = role_id").
				ToSql()
)
