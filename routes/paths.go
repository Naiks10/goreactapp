package routes

import "goreactapp/database/functions"

var (
	//CreateData slice to append current data to model
	CreateData = []route{
		{path: "/roles", function: functions.CreateRole},
		{path: "/users", function: functions.CreateUser},
		{path: "/orgs", function: functions.CreateOrg},
		{path: "/clients", function: functions.CreateClient},
		{path: "/groups", function: functions.CreateGroup},
		{path: "/devs", function: functions.CreateDeveloperOne},
		{path: "/projects", function: functions.CreateProjects},
		{path: "/managers", function: functions.CreateManagerOne},
		{path: "/tasks", function: functions.CreateTask},
		{path: "/subtasks", function: functions.CreateSubTask},
		{path: "/stages", function: functions.CreateStage},
		{path: "/substages", function: functions.CreateSubStage},
		{path: "/modules", function: functions.CreateModule},
		{path: "/submodules", function: functions.CreateSubModule},
		{path: "/issues", function: functions.CreateIssue},
		{path: "/uploaduser", function: functions.UploadUser},
		{path: "/uploaddoc", function: functions.UploadDoc},
		{path: "/uploadorg", function: functions.UploadOrg},
		{path: "/notes", function: functions.CreateNote},
	}

	//ReadAllData slice to get all data from model
	ReadAllData = []route{
		{path: "/roles", function: functions.Roles},
		{path: "/users", function: functions.Users},
		{path: "/orgs", function: functions.Organizations},
		{path: "/clients", function: functions.Clients},
		{path: "/groups", function: functions.WorkGroups},
		{path: "/devs", function: functions.Developers},
		{path: "/status", function: functions.ProjectStatuses},
		{path: "/projects", function: functions.Projects},
		{path: "/projectsview", function: functions.ProjectsPreview},
		{path: "/managers", function: functions.Managers},
		{path: "/modules", function: functions.Modules},
		{path: "/stages", function: functions.Stages},
		{path: "/tasks", function: functions.Tasks},
		{path: "/subtasks", function: functions.SubTasks},
		{path: "/issueslst", function: functions.Issues},
		{path: "/workers", function: functions.Workers},
		{path: "/workerslst", function: functions.WorkGroupsLst},
		{path: "/clientslst", function: functions.ClientsView},
		{path: "/managerslst", function: functions.ManagersView},
		{path: "/developerslst", function: functions.DevsView},
		{path: "/stat/{id}", function: functions.Graph},
		{path: "/stat_fact/{id}", function: functions.GraphFact},
		{path: "/files/{id}", function: functions.FileList},
		{path: "/workersprev", function: functions.WorkersList},
		{path: "/notes", function: functions.Notes},
	}

	//ReadOne slice to get current data from model
	ReadOne = []route{
		{path: "/users/{id}", function: functions.User},
		{path: "/orgs/{id}", function: functions.Organization},
		{path: "/clients/{id}", function: functions.Client},
		{path: "/groups/{id}", function: functions.Group},
		{path: "/devs/{id}", function: functions.Developer},
		{path: "/projects/{id}", function: functions.Project},
		{path: "/managers/{id}", function: functions.Manager},
		{path: "/projectvalues/{id}", function: functions.Value},
		{path: "/tasks/{id}", function: functions.Task},
	}

	//UpdateOne slice to update current data from model
	UpdateOne = []route{
		{path: "/users/{id}", function: functions.UpdateUser},
		{path: "/orgs/{id}", function: functions.UpdateOrg},
		{path: "/clients/{id}", function: functions.UpdateClients},
		{path: "/groups/{id}", function: functions.UpdateGroups},
		{path: "/devs/{id}", function: functions.UpdateDevelopers},
		{path: "/projects/{id}", function: functions.UpdateProjects},
		{path: "/managers/{id}", function: functions.UpdateClients},
		{path: "/task/{id}", function: functions.EditTaskStatus},
		{path: "/issueslst/{id}", function: functions.EditIssue},
	}

	//DeleteOne slice to delete current data from model
	DeleteOne = []route{
		{path: "/users/{id}", function: functions.DeleteUser},
		{path: "/tasks/{id}", function: functions.DeleteTask},
		{path: "/stages/{id}", function: functions.DeleteStage},
		{path: "/orgs/{id}", function: functions.DeleteOrg},
		{path: "/clients/{id}", function: functions.DeleteClient},
		{path: "/groups/{id}", function: functions.DeleteGroup},
		{path: "/devs/{id}", function: functions.DeleteDeveloper},
		{path: "/projects/{id}", function: functions.DeleteProject},
		{path: "/managers/{id}", function: functions.DeleteManager},
		{path: "/modules/{id}", function: functions.DeleteModule},
	}
)
