SELECT  project_id, 				project_name,				project_info,
        workgroups.workgroup_id,	workgroups.workgroup_name,
		status.status_id, 			status.status_name,
		fio_dev, 					res.phone_num as pn,					res.email_addr as ad, res.user_image_src as dev_img,	
		mn.user_login, mn.sur_name, mn.first_name, mn.middle_name, mn.birth_date, 
		mn.phone_num, mn.email_addr, mn.user_image_src,
		ms.user_login as user_login1, ms.sur_name as sur_name1, ms.first_name as first_name1, ms.middle_name as middle_name1, ms.birth_date as birth_date1, ms.phone_num as phone_num1, ms.email_addr as email_addr1, ms.user_image_src as user_image_src1,
		organisations.organisation_id, organisations.short_name, organisations.organisation_image_src,
    (
      SELECT COUNT(*) FROM working_developer_list where working_developer_list.workgroup_id = project_workgroup_id
    ) AS workers_count
  FROM  projects
  LEFT  JOIN (
             SELECT  (sur_name || ' ' || LEFT(first_name, 1) || '.' || LEFT(middle_name, 1)) AS fio_dev,
                     phone_num,
                     email_addr,
                     user_image_src,
                     workgroup_id,
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
    ON  clients.client_organisation_id = organisations.organisation_id




SELECT  project_name 
  FROM  projects
 WHERE  project_id = 1;


SELECT  module_name
  FROM  modules
 WHERE  module_project_id = 1;

SELECT  stage_name
  FROM  stages
 WHERE  stage_module_id = 1 OR stage_module_id = 2;

SELECT  task_name, 
        task_supertask_id, 
        task_stage_id, 
        user_login,
        user_image_src, 
        status_id, 
        status_name,
        task_index
  FROM  tasks
  LEFT  JOIN users
    ON  user_login = task_developer_login
  LEFT  JOIN status
    ON  task_status_id = status_id
 WHERE  task_stage_id = 1 AND task_supertask_id IS NULL;

SELECT  task_name, task_supertask_id
  FROM  tasks
WHERE  task_stage_id = 1 AND task_supertask_id = 3



SELECT  module_id,
        module_name,
        module_project_id,
        module_status,
        status_name,
        module_index
  FROM  modules
  LEFT  JOIN status
    ON  module_status = status_id

SELECT  stage_id,
        stage_name,
        stage_module_id,
        status_id,
        status_name,
        stage_index
  FROM  stages
  LEFT  JOIN status
    ON  stage_status_id = status_id

SELECT  list_id,
        issues.issue_id,
        issue_name,
        issue_close_status,
        task_id
  FROM  issues_list
  LEFT  JOIN issues 
    ON  issues_list.issue_id = issues.issue_id


SELECT  developer_login,
        user_image_src,
        (sur_name || ' ' || LEFT(first_name, 1) || '.' || LEFT(middle_name, 1) || '.') AS dev_name
  FROM  working_developer_list
  LEFT  JOIN users
    ON  user_login = developer_login
 WHERE  workgroup_id = 1


 UPDATE tasks SET task_index = task_index + 1
 WHERE task_index >= 5 AND task_stage_id = 1;

 INSERT INTO tasks (task_name, task_stage_id, task_developer_login, task_status_id, task_supertask_id, task_index)
 VALUES	('suslik2.5', 1, 'developer', 1, 1, 5);
