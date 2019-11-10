CREATE DATABASE goreactbase;

CREATE TABLE accounts (
    login_acc TEXT PRIMARY KEY UNIQUE,
    password_acc TEXT,
    account_class INT
);

CREATE TABLE developers (
    login_acc TEXT REFERENCES accounts (login_acc) PRIMARY KEY UNIQUE,
    fst_name TEXT,
    mid_name TEXT,
    lst_name TEXT,
    phone_number TEXT LIKE "+_(___)___-__-__"
);

CREATE TABLE organizations (
    organizations_id SERIAL PRIMARY KEY UNIQUE,
    organizations_name TEXT UNIQUE
);

CREATE TABLE clients (
    login_acc TEXT REFERENCES accounts (login_acc) PRIMARY KEY UNIQUE,
    fst_name TEXT,
    mid_name TEXT,
    lst_name TEXT,
    phone_number TEXT LIKE "+_(___)___-__-__",
    organizations INT REFERENCES organizations (organizations_id)
);

CREATE TABLE managers (
    login_acc TEXT REFERENCES accounts (login_acc) PRIMARY KEY UNIQUE,
    fst_name TEXT,
    mid_name TEXT,
    lst_name TEXT,
    phone_number TEXT LIKE "+_(___)___-__-__"
);

CREATE TABLE project_states (
    project_states_id SERIAL UNIQUE,
    project_states_name TEXT UNIQUE
);

CREATE TABLE working_groups (
    working_groups_id SERIAL PRIMARY KEY UNIQUE,
    working_groups_leader REFERENCES developers (login_acc)
);

CREATE TABLE projects (
    projects_code SERIAL PRIMARY KEY UNIQUE,
    working_groups_id REFERENCES working_groups (working_groups_id),
    cost FLOAT,
    project_info TEXT,
    project_states_id REFERENCES project_states (project_states_id),
    manager REFERENCES managers (login_acc),
    client REFERENCES clients (login_acc)
);