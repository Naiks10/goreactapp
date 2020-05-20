/*create table incidents (
  occured_on date
  );

insert into incidents
    select cast('2009-09-28 00:00:00' as date) union all
    select cast('2010-10-15 00:00:00' as date)*/

    with dates as (
      select min(finish_date) as startw,
             max(finish_date) as endw
      from tasks WHERE task_stage_id IN (
        SELECT stage_id FROM stages WHERE stage_module_id IN (
          SELECT module_id from modules WHERE module_project_id IN (
            SELECT project_id from projects WHERE project_id = 3
          )
        )
      )
     ),

     weeks as (
      select generate_series(startw, endw, '7 days') as weekstart
      from dates
     )

        
          SELECT (round(count(*)::decimal/(
            SELECT count(*) from tasks where task_stage_id IN (
              SELECT stage_id FROM stages 
              WHERE stage_module_id IN (
                  SELECT module_id FROM modules
                  WHERE module_project_id = 3)
        )), 1)::numeric * 100)::int4, w.weekstart
        FROM weeks w left outer join
          tasks i on date_trunc('week', finish_date) < w.weekstart
          AND i.task_supertask_id is NULL 
          AND i.task_stage_id IN (
              SELECT stage_id FROM stages 
              WHERE stage_module_id IN (
                  SELECT module_id FROM modules
                  WHERE module_project_id = 3
              )
        )
          group by w.weekstart 
          order by w.weekstart;




/*SELECT ARRAY(select /*w.weekstart, count(i.occured_on)
from weeks w left outer join
     projects i
     on date_trunc('week', i.occured_on) = w.weekstart
group by w.weekstart) as q,
ARRAY(select w.weekstart /*count(i.occured_on)
from weeks w left outer join
     incidents i
     on date_trunc('week', i.occured_on) = w.weekstart
group by w.weekstart) as q1
*/