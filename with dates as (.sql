with dates as (
	select min(date_trunc('day', finish_date)) as startw,
		   max(date_trunc('day', finish_date)) as endw
	from tasks WHERE task_stage_id IN (
	  SELECT stage_id FROM stages WHERE stage_module_id IN (
		SELECT module_id from modules WHERE module_project_id IN (
		  SELECT project_id from projects WHERE project_id = 1
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
				  WHERE module_project_id = 1)
		)), 1)::numeric * 100)::int4) (round(count(*)::decimal/(
		  SELECT count(*) from tasks where task_stage_id IN (
			SELECT stage_id FROM stages 
			WHERE stage_module_id IN (
				SELECT module_id FROM modules
				WHERE module_project_id = 1)
	  )), 1)::numeric * 100)::int4 as prog, (w.weekstart + INTERVAL '1 day') as time
	  FROM weeks w left outer join
		tasks i on date_trunc('day', finish_date) < (w.weekstart + INTERVAL '1 day')
		--AND i.task_supertask_id is NULL 
		AND i.task_stage_id IN (
			SELECT stage_id FROM stages 
			WHERE stage_module_id IN (
				SELECT module_id FROM modules
				WHERE module_project_id = 1
			)
	  )
		group by w.weekstart
		order by prog, w.weekstart desc ;




		with dates as (
		select min(date_trunc('day', finish_date)) as startw,
			   max(date_trunc('day', finish_date)) as endw
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
			  SELECT count(*) from tasks where task_stage_id IN (
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
			group by w.weekstart
			order by prog, w.weekstart desc;



			with dates as (
		select min(date_trunc('day', finish_date)) as startw,
			   max(date_trunc('day', finish_date)) + INTERVAL '1 day' as endw
		from tasks t WHERE task_stage_id IN (
		  SELECT stage_id FROM stages WHERE stage_module_id IN (
			SELECT module_id from modules WHERE module_project_id IN (
			  SELECT project_id from projects WHERE project_id = 1
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
					  WHERE module_project_id = 1)
			)), 1)::numeric * 100)::int4) (round(count(*)::decimal/(
			  SELECT count(*) from tasks where
			   task_stage_id IN (
				SELECT stage_id FROM stages 
				WHERE stage_module_id IN (
					SELECT module_id FROM modules
					WHERE module_project_id = 1)
		  )), 1)::numeric * 100)::int4 as prog, (w.weekstart + INTERVAL '1 day') as time
		  FROM weeks w left outer join
			tasks i on date_trunc('day', finish_date) < (w.weekstart + INTERVAL '1 day')
			--AND i.task_supertask_id is NOT NULL 
			AND i.task_stage_id IN (
				SELECT stage_id FROM stages 
				WHERE stage_module_id IN (
					SELECT module_id FROM modules
					WHERE module_project_id = 1
				) 
		  )
				--AND (SELECT COUNT(*) FROM tasks where task_supertask_id = i.task_id) = 0
			group by w.weekstart
			order by prog, w.weekstart;


SELECT * from tasks where task_stage_id IN (
				SELECT stage_id FROM stages 
				WHERE stage_module_id IN (
					SELECT module_id FROM modules
					WHERE module_project_id = 1)) AND finish_date_fact > '1999-01-08'



with dates as (
		select min(date_trunc('day', finish_date_fact)) as startw,
			   max(date_trunc('day', finish_date_fact))  as endw
		from tasks t WHERE task_stage_id IN (
		  SELECT stage_id FROM stages WHERE stage_module_id IN (
			SELECT module_id from modules WHERE module_project_id IN (
			  SELECT project_id from projects WHERE project_id = 1
			)
		  )
		) --AND t.task_status_id = 4 AND t.finish_date_fact > '1999-01-08'
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
					  WHERE module_project_id = 1)
			)), 1)::numeric * 100)::int4) (round(count(*)::decimal/(
			  SELECT count(*) from tasks where task_stage_id IN (
				SELECT stage_id FROM stages 
				WHERE stage_module_id IN (
					SELECT module_id FROM modules
					WHERE module_project_id = 1)
		  )), 1)::numeric * 100)::int4 as prog, (w.weekstart + INTERVAL '1 day') as time
		  FROM weeks w left outer join
			tasks i on date_trunc('day', finish_date_fact) < (w.weekstart + INTERVAL '1 DAY')
			--AND i.task_supertask_id is NOT NULL 
			AND i.task_stage_id IN (
				SELECT stage_id FROM stages 
				WHERE stage_module_id IN (
					SELECT module_id FROM modules
					WHERE module_project_id = 1
				) 
		  )
		  AND i.task_status_id = 4 AND i.finish_date_fact > '1999-01-08'
				--AND (SELECT COUNT(*) FROM tasks where task_supertask_id = i.task_id) = 0
			group by w.weekstart
			order by prog, w.weekstart desc;