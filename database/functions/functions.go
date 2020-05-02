package functions

import (
	"github.com/elgris/sqrl"
)

var postgres = sqrl.StatementBuilder.PlaceholderFormat(sqrl.Dollar)

var (
	//#--ROLES--#//
	SelectRoles = postgres.Select("*").From("roles") //+
	//#--USERS--#//
	SelectUsers = postgres.Select( //+
		"user_login",
		"first_name",
		"middle_name",
		"sur_name",
		"birth_date",
		"phone_num",
		"email_addr",
		"user_image_src",
		"role_id",
		"role_name").
		From("users").
		Join("roles ON user_role = role_id").
		Where("logical_delete_status = false")
	//#--ORGANISATIONS--#//
	SelectOrgs = postgres.Select("*").From("organisations") //+
	//#--CLIENTS--#//
	SelectClients = postgres.Select(
		"user_login",
		"sur_name",
		"first_name",
		"middle_name",
		"birth_date",
		"phone_num",
		"email_addr",
		"user_image_src",
		"role_id",
		"role_name",
		"organisation_id",
		"full_name",
		"short_name",
		"organisation_desc",
		"organisation_image_src").
		From("clients").
		Join("users ON user_login = client_login").
		Join("roles on user_role = role_id").
		Join("organisations on client_organisation_id = organisation_id")
	//#--GROUPS--#//
	SelectWorkGroups = postgres.Select("*").From("workgroups") //+
	//#--DEVELOPERS--#//
	SelectDevs = postgres.Select(
		"user_login",
		"sur_name",
		"first_name",
		"middle_name",
		"birth_date",
		"phone_num",
		"email_addr",
		"user_image_src",
		"outsource_spec",
		"role_id",
		"role_name").
		From("developers").
		Join("users ON user_login = developer_login").
		Join("roles ON user_role = role_id")
	/*SelectDevGroups, _, _ = postgres.Select(
		"list_id",
		"developer_login"
	)*/
	//#--STATUS--#//
	SelectStatus = postgres.Select("*").From("status") //+
	//#--PROJECTS--#//
	SelectProjects = postgres.Select(
		`project_id, 				project_name,				project_info,
        workgroups.workgroup_id,	workgroups.workgroup_name,
		status.status_id, 			status.status_name,
		fio_dev, 					res.phone_num as pn,					res.email_addr as ad,	res.user_image_src as dev_img,
		mn.user_login, mn.sur_name, mn.first_name, mn.middle_name, mn.birth_date, 
		mn.phone_num, mn.email_addr, mn.user_image_src,
		ms.user_login as user_login1, ms.sur_name as sur_name1, ms.first_name as first_name1, ms.middle_name as middle_name1, ms.birth_date as birth_date1, ms.phone_num as phone_num1, ms.email_addr as email_addr1, ms.user_image_src as user_image_src1,
		organisations.organisation_id, organisations.short_name, organisations.organisation_image_src,
		start_date,
		finish_date,
		start_date_fact,
		finish_date_fact,
    (
      SELECT COUNT(*) FROM working_developer_list where working_developer_list.workgroup_id = project_workgroup_id
    ) AS workers_count
  FROM  projects
  LEFT  JOIN (
             SELECT  (sur_name || ' ' || LEFT(first_name, 1) || '.' || LEFT(middle_name, 1)) AS fio_dev,
                     phone_num,
                     email_addr,
					 workgroup_id,
					 user_image_src,
                     head_status
               FROM  working_developer_list 
	  		       JOIN  users 
	  			       ON  user_login = developer_login
         ) AS res 
	  ON  res.workgroup_id = projects.project_workgroup_id AND res.head_status = true 
  LEFT  JOIN workgroups 
    ON	project_workgroup_id = workgroups.workgroup_id
  LEFT  JOIN status
    ON	project_status_id = status_id
  LEFT  JOIN managers
  	ON	managers.manager_login = projects.project_manager_login
  LEFT  JOIN clients 
    ON  clients.client_login = projects.project_client_login
  LEFT  JOIN users mn 
    ON  projects.project_manager_login = mn.user_login
  LEFT  JOIN users ms 
    ON  projects.project_client_login = ms.user_login
  LEFT  JOIN organisations 
    ON  clients.client_organisation_id = organisations.organisation_id`,
	)

	SelectProjectsPreview = postgres.Select(
		"project_id",
		"project_name",
		"organisation_id",
		"project_status_id",
		"status_name",
		"organisation_image_src",
		`(
            SELECT  COUNT(*)
              FROM  (
                  SELECT *FROM tasks
                   WHERE  task_stage_id IN (
                       SELECT  stage_id 
                         FROM  stages 
                        WHERE  stage_module_id IN (
                            SELECT  module_id 
                              FROM  modules
                             WHERE  module_project_id = project_id
                        )
                       )
              ) AS tasks_2
		) AS tasks_all`,
		`(
            SELECT  COUNT(*)
              FROM  (
                  SELECT *FROM tasks
                   WHERE  task_stage_id IN (
                       SELECT  stage_id 
                         FROM  stages 
                        WHERE  stage_module_id IN (
                            SELECT  module_id 
                              FROM  modules
                             WHERE  module_project_id = project_id
                        )
                       ) AND task_status_id = 4
              ) AS tasks_2
		) AS tasks_finished`,
		`(
            SELECT  COUNT(*)
              FROM  (
                  SELECT *FROM issues
                   WHERE  issue_task_id IN (
                       SELECT  task_id 
                         FROM  tasks
                        WHERE  task_stage_id IN (
                            SELECT  stage_id 
                              FROM  stages 
                             WHERE  stage_module_id IN (
                                SELECT  module_id 
                                  FROM  modules
                                 WHERE  module_project_id = project_id
                        )
                       )
                   )
              ) AS issues_2
		) AS project_issues`,
		"start_date",
		"finish_date",
		"start_date_fact",
		"finish_date_fact").
		From("projects").
		Join("clients ON project_client_login = client_login").
		Join("organisations ON organisation_id = client_organisation_id").
		Join("status ON status_id = project_status_id")
	//#--MANAGERS--#//
	SelectManagers = postgres.
			Select("user_login", "user_surname", "user_name", "user_midname", "user_birthdate", "user_phone", "user_email", "role_id", "role_name").
			From("managers").
			Join("users ON users.user_login = managers.manager_user_login").
			Join("roles ON users.user_role = role_id")

	SelectModules = postgres.
			Select(`
				   module_id,
				   module_name,
				   module_project_id,
				   status_id,
				   status_name,
				   module_index,
				   start_date,
		finish_date,
		start_date_fact,
		finish_date_fact
			 FROM  modules
			 LEFT  JOIN status
			   ON  module_status = status_id  
				   `)
	SelectStages = postgres.
			Select(`
			stage_id,
			stage_name,
			stage_module_id,
			status_id,
			status_name,
			stage_index,
			start_date,
		finish_date,
		start_date_fact,
		finish_date_fact
	  FROM  stages
	  LEFT  JOIN status
		ON  stage_status_id = status_id 
						  `)
	SelectTasks = postgres.
			Select(`
			task_id,
						  task_name, 
					  task_stage_id, 
					  user_login,
					  user_image_src, 
					  status_id, 
					  status_name,
					  task_index,
					  start_date,
		finish_date,
		start_date_fact,
		finish_date_fact
				FROM  tasks
				LEFT  JOIN users
				  ON  user_login = task_developer_login
				LEFT  JOIN status
				  ON  task_status_id = status_id
				  `)
	SelectSubTasks = postgres.
			Select(`
			task_id,
			task_name, 
        task_supertask_id, 
        task_stage_id, 
        user_login,
        user_image_src, 
        status_id, 
        status_name,
		task_index,
		start_date,
		finish_date,
		start_date_fact,
		finish_date_fact
  FROM  tasks
  LEFT  JOIN users
    ON  user_login = task_developer_login
  LEFT  JOIN status
    ON  task_status_id = status_id
	`)
	SelectIssues = postgres.
			Select(`issue_id,
			issue_name, issue_desc, issue_date, issue_task_id, issue_close_status
FROM  issues`)
	SelectWorkers = postgres.
			Select(`developer_login,
				   user_image_src,
				   (sur_name || ' ' || LEFT(first_name, 1) || '.' || LEFT(middle_name, 1) || '.') AS dev_name
			 FROM  working_developer_list
			 LEFT  JOIN users
			   ON  user_login = developer_login`)
)
