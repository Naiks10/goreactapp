package functions

var (
	SelectRoles   = `SELECT * from roles`
	SelectUsers   = `SELECT user_login, user_password, user_surname, user_name, user_midname, user_birthdate, user_phone, user_email, role_id, role_name FROM users INNER JOIN roles ON user_role = role_id`
	SelectOrgs    = `SELECT * FROM organisations`
	SelectClients = `SELECT 
		user_login, 
		user_surname, 
		user_name, 
		user_midname, 
		user_birthdate, 
		user_phone, 
		user_email, 
		role_id, 
		role_name, 
		organisations.organisation_id,
		organisations.organisation_name,
		organisation_data
	FROM clients
	INNER JOIN users on user_login = client_user_login
	INNER JOIN roles on user_role = role_id
	INNER JOIN organisations on clients.organisation_id = organisations.organisation_id`
	SelectWorkGroups = `SELECT * FROM workgroups`
	SelectDevs       = `SELECT 
		user_login, 
		user_surname, 
		user_name, 
		user_midname, 
		user_birthdate, 
		user_phone, 
		user_email, 
		role_id, 
		role_name, 
		workgroups.workgroup_id,
		workgroup_name,
		is_general
	FROM developers
	INNER JOIN workgroups ON workgroups.workgroup_id = developers.workgroup_id
	INNER JOIN users ON users.user_login = developers.developer_user_login
	INNER JOIN roles ON users.user_role = role_id`
	SelectStatus   = `SELECT * FROM project_statuses`
	SelectProjects = `SELECT 
		project_id, 
		cost, 
		project_info, 
		workgroup_id, 
		workgroup_name, 
		project_statuses.project_status_id, 
		project_statuses.project_status_name, 
		project_data, 
		mn.user_login, 
		mn.user_surname, 
		mn.user_name, 
		mn.user_midname, 
		mn.user_birthdate, 
		mn.user_phone, 
		mn.user_email, 
		ms.user_login as user_login1, 
		ms.user_surname as user_surname1, 
		ms.user_name as user_name1, 
		ms.user_midname as user_midname1, 
		ms.user_birthdate as user_birthdate1, 
		ms.user_phone as user_phone1, 
		ms.user_email as user_email1, 
		organisations.organisation_id,
		organisations.organisation_name,
		organisation_data
	FROM projects
	INNER JOIN workgroups ON workgroups.workgroup_id = projects.project_workgroup_id
	INNER JOIN clients ON clients.client_user_login = projects.client_user_login
	INNER JOIN managers ON managers.manager_user_login = projects.manager_user_login
	INNER JOIN users mn on projects.manager_user_login = mn.user_login
	INNER JOIN users ms on projects.client_user_login = ms.user_login
	INNER JOIN organisations on clients.organisation_id = organisations.organisation_id
	INNER JOIN project_statuses ON project_statuses.project_status_id = projects.project_status_id`
	SelectManagers = `SELECT 
		user_login, 
		user_surname, 
		user_name, 
		user_midname, 
		user_birthdate, 
		user_phone, 
		user_email, 
		role_id, 
		role_name
	from managers
	INNER JOIN users ON users.user_login = managers.manager_user_login
	INNER JOIN roles ON users.user_role = role_id`
)
