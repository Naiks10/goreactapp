CREATE DATABASE PLANB_FINAL;


/* ROLES table */

CREATE TABLE roles (
    role_id     SERIAL PRIMARY KEY,
    role_name   VARCHAR(50) UNIQUE
);

--INSERT-ROLES--

INSERT INTO roles (role_name) 
VALUES ('Администратор'),('Менеджер'),('Разработчик'),('Клиент');

--USERS--

CREATE TABLE users (
    user_login      VARCHAR(50) UNIQUE PRIMARY KEY,
    user_password   VARCHAR(50) NOT NULL,
    user_surname    VARCHAR(50) NOT NULL,
    user_name       VARCHAR(50) NOT NULL,
    user_midname    VARCHAR(50) DEFAULT '<Отсутствует>',
    user_birthdate  VARCHAR(10) NOT NULL,
    user_phone      VARCHAR(11) NOT NULL,
    user_email      VARCHAR(50) NOT NULL, 
    user_role       INTEGER REFERENCES roles(role_id),   
    user_logical_delete BOOLEAN DEFAULT FALSE
);

--INSERT-USERS--

INSERT INTO users (
        user_login, 
        user_password,
        user_surname,
        user_name,
        user_midname,
        user_birthdate,
        user_phone,
        user_email,
        user_role
    ) VALUES (
        'admin',
        '123',
        'Иванов',
        'Иван',
        'Иванович',
        '01.12.1993',
        '89154834611',
        'admin@mail.com',
        1
), (
        'manager',
        '123',
        'Петров',
        'Петр',
        'Петрович',
        '09.07.2000',
        '89157434622',
        'manager@mail.com',
        2
), (
        'developer',
        '123',
        'Иванов',
        'Пётр',
        'Семёнович',
        '04.11.1997',
        '89172224634',
        'developer@mail.com',
        3
), (
        'client',
        '123',
        'Виктин',
        'Виктор',
        'Иванович',
        '09.09.1996',
        '89154684123',
        'client@mail.com',
        4
);

--ORGANISATIONS--

CREATE TABLE organisations (
    organisation_id SERIAL PRIMARY KEY,
    organisation_name VARCHAR(50) NOt NULL UNIQUE,
    organisation_data JSONB DEFAULT '{}'
);

--INSERT-ORGANISATIONS--

INSERT INTO organisations (organisation_name, organisation_data) 
VALUES ('Тестовая организация', DEFAULT), ('Тестовая организация 2', DEFAULT), ('Тестовая организация 3', DEFAULT);

--CLIENTS--

CREATE TABLE clients (
    client_user_login VARCHAR(50) REFERENCES users (user_login) PRIMARY KEY UNIQUE,
    organisation_id INTEGER REFERENCES organisations (organisation_id)
);

--INSERT-CLIENTS--

INSERT INTO clients VALUES ('client', 1);

--GROUPS--

CREATE TABLE workgroups (
    workgroup_id SERIAL PRIMARY KEY,
    workgroup_name VARCHAR(50) UNIQUE
);

--INSERT-GROUPS--

INSERT INTO workgroups (workgroup_name) VALUES ('Тестовая группа'), ('Тестовая группа 2');

--DEVELOPERS--

CREATE TABLE developers (
    developer_user_login VARCHAR(50) REFERENCES users (user_login) PRIMARY KEY UNIQUE,
    workgroup_id INTEGER REFERENCES workgroups(workgroup_id),
    is_general BOOLEAN DEFAULT FALSE
);

--INSERT-DEVELOPERS--

INSERT INTO developers (developer_user_login, workgroup_id, is_general) VALUES ('developer', 1, TRUE);

--STATUSES--

CREATE TABLE project_statuses (
    project_status_id SERIAL PRIMARY KEY,
    project_status_name VARCHAR(50) UNIQUE
);

--INSERT-STATUSES--

INSERT INTO project_statuses (project_status_name) 
VALUES ('Не начат'),('Подготовливается'),('В разработке'),('Подтверждение работы'),('Выполнен');

--MANAGERS--

CREATE TABLE managers (
    manager_user_login VARCHAR(50) REFERENCES users (user_login) PRIMARY KEY
);

--INSERT-MANAGERS--

INSERT INTO managers (manager_user_login) VALUES ('manager');

--PROJECTS--

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    cost varchar(50),
    project_info TEXT,
    project_workgroup_id INTEGER REFERENCES workgroups (workgroup_id),
    project_status_id INTEGER REFERENCES project_statuses (project_status_id),
    project_data JSONB DEFAULT '{"data" : [{"name" : 5, desc : "Инициализация проекта"}, {"name" : 10, "desc" : "Продвижение проекта"}]}',
    client_user_login VARCHAR(50) REFERENCES clients(client_user_login),
    manager_user_login VARCHAR(50) REFERENCES managers(manager_user_login)
);

--INSERT-PROJECTS--

INSERT INTO projects (cost, project_info, project_workgroup_id, project_status_id, project_data, client_user_login, manager_user_login) 
    VALUES ('10000', 'Данных нет', 1, 1, DEFAULT, 'client', 'manager');
