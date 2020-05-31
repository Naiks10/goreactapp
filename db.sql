--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Ubuntu 12.2-4)
-- Dumped by pg_dump version 12.2 (Ubuntu 12.2-4)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: get_role(character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_role(character varying, character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $_$
BEGIN
	IF ((SELECT COUNT(*) FROM users WHERE user_login = $1 AND user_password = $2 ) = 0)
    	THEN RETURN 0;
    ELSEIF ((SELECT user_role FROM users where user_login = $1) = TRUE) 
    	THEN RETURN 1;
	ELSEIF ((SELECT COUNT(*) FROM managers where manager_login = $1) > 0) 
    	THEN RETURN 2;
    ELSEIF ((SELECT COUNT(*) from developers WHERE developer_login = $1 AND tester_spec = true) > 0)
    	THEN RETURN 5;
    ELSEIF ((SELECT COUNT(*) from working_developer_list WHERE developer_login = $1 AND head_status = true) > 0)
    	THEN RETURN 3;
    ELSEIF ((SELECT COUNT(*) from working_developer_list WHERE developer_login = $1 AND head_status = false) > 0)
    	THEN RETURN 4;
    ELSEIF ((SELECT COUNT(*) FROM clients where client_login = $1) > 0)
    	THEN RETURN 6;
    ELSE RETURN 0;
    END IF;
END
$_$;


ALTER FUNCTION public.get_role(character varying, character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    client_login character varying(50) NOT NULL,
    client_organisation_id integer NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: developers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.developers (
    developer_login character varying(50) NOT NULL,
    tester_spec boolean DEFAULT false,
    outsource_spec boolean DEFAULT false
);


ALTER TABLE public.developers OWNER TO postgres;

--
-- Name: files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.files (
    file_id integer NOT NULL,
    file_project_id integer NOT NULL,
    file_path text NOT NULL,
    upload_time date NOT NULL,
    file_ext character varying(10) NOT NULL,
    file_name character varying(50) NOT NULL
);


ALTER TABLE public.files OWNER TO postgres;

--
-- Name: files_file_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.files_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_file_id_seq OWNER TO postgres;

--
-- Name: files_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.files_file_id_seq OWNED BY public.files.file_id;


--
-- Name: issues; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.issues (
    issue_id integer NOT NULL,
    issue_name character varying(255) NOT NULL,
    issue_desc text NOT NULL,
    issue_date date NOT NULL,
    issue_task_id integer NOT NULL,
    issue_close_status boolean DEFAULT false NOT NULL
);


ALTER TABLE public.issues OWNER TO postgres;

--
-- Name: issues_issue_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.issues_issue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.issues_issue_id_seq OWNER TO postgres;

--
-- Name: issues_issue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.issues_issue_id_seq OWNED BY public.issues.issue_id;


--
-- Name: managers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.managers (
    manager_login character varying(50) NOT NULL,
    outsource_spec boolean DEFAULT false
);


ALTER TABLE public.managers OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    message_project_id integer NOT NULL,
    from_user character varying(50) NOT NULL,
    to_user character varying(50) NOT NULL,
    date_mes timestamp without time zone NOT NULL,
    is_read boolean DEFAULT false
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_message_id_seq OWNER TO postgres;

--
-- Name: messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;


--
-- Name: modules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modules (
    module_id integer NOT NULL,
    module_name character varying(50) NOT NULL,
    module_project_id integer NOT NULL,
    module_status integer DEFAULT 1 NOT NULL,
    module_index integer NOT NULL,
    start_date date DEFAULT CURRENT_DATE NOT NULL,
    finish_date date DEFAULT CURRENT_DATE NOT NULL,
    start_date_fact date DEFAULT '1991-01-01'::date NOT NULL,
    finish_date_fact date DEFAULT '1991-01-01'::date NOT NULL
);


ALTER TABLE public.modules OWNER TO postgres;

--
-- Name: modules_module_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modules_module_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modules_module_id_seq OWNER TO postgres;

--
-- Name: modules_module_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modules_module_id_seq OWNED BY public.modules.module_id;


--
-- Name: notes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notes (
    note_id integer NOT NULL,
    note_name character varying(255) NOT NULL,
    note_desc text NOT NULL,
    note_date date NOT NULL,
    note_client_login character varying(50) NOT NULL,
    note_task_id integer NOT NULL
);


ALTER TABLE public.notes OWNER TO postgres;

--
-- Name: notes_note_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notes_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notes_note_id_seq OWNER TO postgres;

--
-- Name: notes_note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notes_note_id_seq OWNED BY public.notes.note_id;


--
-- Name: organisations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organisations (
    organisation_id integer NOT NULL,
    full_name character varying(128) NOT NULL,
    short_name character varying(50),
    organisation_image_src character varying(255) DEFAULT '/data/img/orgs/non_org.png'::character varying,
    organisation_desc text DEFAULT 'Отсутствует'::text
);


ALTER TABLE public.organisations OWNER TO postgres;

--
-- Name: organisations_organisation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organisations_organisation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organisations_organisation_id_seq OWNER TO postgres;

--
-- Name: organisations_organisation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organisations_organisation_id_seq OWNED BY public.organisations.organisation_id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    project_id integer NOT NULL,
    project_name character varying(50),
    project_client_login character varying(50) NOT NULL,
    project_manager_login character varying(50) NOT NULL,
    project_workgroup_id integer NOT NULL,
    editable boolean DEFAULT true NOT NULL,
    client_activity boolean DEFAULT true NOT NULL,
    project_info text DEFAULT 'Данные отсутствуют'::text,
    project_status_id integer DEFAULT 1 NOT NULL,
    project_docs jsonb DEFAULT '{"data": []}'::jsonb NOT NULL,
    start_date date DEFAULT CURRENT_DATE NOT NULL,
    finish_date date DEFAULT CURRENT_DATE NOT NULL,
    start_date_fact date DEFAULT '1991-01-01'::date NOT NULL,
    finish_date_fact date DEFAULT '1991-01-01'::date NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_project_id_seq OWNER TO postgres;

--
-- Name: projects_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_project_id_seq OWNED BY public.projects.project_id;


--
-- Name: stages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stages (
    stage_id integer NOT NULL,
    stage_name character varying(50) NOT NULL,
    stage_module_id integer NOT NULL,
    stage_status_id integer NOT NULL,
    stage_index integer NOT NULL,
    start_date date DEFAULT CURRENT_DATE NOT NULL,
    finish_date date DEFAULT CURRENT_DATE NOT NULL,
    start_date_fact date DEFAULT '1991-01-01'::date NOT NULL,
    finish_date_fact date DEFAULT '1991-01-01'::date NOT NULL
);


ALTER TABLE public.stages OWNER TO postgres;

--
-- Name: stages_stage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stages_stage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stages_stage_id_seq OWNER TO postgres;

--
-- Name: stages_stage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stages_stage_id_seq OWNED BY public.stages.stage_id;


--
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    status_id integer NOT NULL,
    status_name character varying(50) NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- Name: status_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_status_id_seq OWNER TO postgres;

--
-- Name: status_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_status_id_seq OWNED BY public.status.status_id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    task_id integer NOT NULL,
    task_name character varying(255) NOT NULL,
    task_stage_id integer NOT NULL,
    task_developer_login character varying(50) NOT NULL,
    task_status_id integer NOT NULL,
    task_supertask_id integer,
    task_note text,
    task_index integer NOT NULL,
    start_date date DEFAULT CURRENT_DATE NOT NULL,
    finish_date date DEFAULT CURRENT_DATE NOT NULL,
    start_date_fact date DEFAULT '1991-01-01'::date NOT NULL,
    finish_date_fact date DEFAULT '1991-01-01'::date NOT NULL
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_task_id_seq OWNER TO postgres;

--
-- Name: tasks_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_task_id_seq OWNED BY public.tasks.task_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_login character varying(50) NOT NULL,
    user_password character varying(50) NOT NULL,
    first_name character varying(50) NOT NULL,
    middle_name character varying(50),
    sur_name character varying(50) NOT NULL,
    birth_date date NOT NULL,
    phone_num character varying(16) NOT NULL,
    email_addr character varying(50) NOT NULL,
    user_image_src character varying(255) DEFAULT '/data/img/users/non.png'::character varying,
    user_role boolean DEFAULT false NOT NULL,
    logical_delete_status boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: workgroups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workgroups (
    workgroup_id integer NOT NULL,
    workgroup_name character varying(50) NOT NULL
);


ALTER TABLE public.workgroups OWNER TO postgres;

--
-- Name: workgroups_workgroup_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workgroups_workgroup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workgroups_workgroup_id_seq OWNER TO postgres;

--
-- Name: workgroups_workgroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workgroups_workgroup_id_seq OWNED BY public.workgroups.workgroup_id;


--
-- Name: working_developer_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.working_developer_list (
    list_id integer NOT NULL,
    developer_login character varying(50) NOT NULL,
    workgroup_id integer NOT NULL,
    head_status boolean DEFAULT false NOT NULL
);


ALTER TABLE public.working_developer_list OWNER TO postgres;

--
-- Name: working_developer_list_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.working_developer_list_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.working_developer_list_list_id_seq OWNER TO postgres;

--
-- Name: working_developer_list_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.working_developer_list_list_id_seq OWNED BY public.working_developer_list.list_id;


--
-- Name: files file_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files ALTER COLUMN file_id SET DEFAULT nextval('public.files_file_id_seq'::regclass);


--
-- Name: issues issue_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues ALTER COLUMN issue_id SET DEFAULT nextval('public.issues_issue_id_seq'::regclass);


--
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);


--
-- Name: modules module_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules ALTER COLUMN module_id SET DEFAULT nextval('public.modules_module_id_seq'::regclass);


--
-- Name: notes note_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes ALTER COLUMN note_id SET DEFAULT nextval('public.notes_note_id_seq'::regclass);


--
-- Name: organisations organisation_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations ALTER COLUMN organisation_id SET DEFAULT nextval('public.organisations_organisation_id_seq'::regclass);


--
-- Name: projects project_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN project_id SET DEFAULT nextval('public.projects_project_id_seq'::regclass);


--
-- Name: stages stage_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stages ALTER COLUMN stage_id SET DEFAULT nextval('public.stages_stage_id_seq'::regclass);


--
-- Name: status status_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN status_id SET DEFAULT nextval('public.status_status_id_seq'::regclass);


--
-- Name: tasks task_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN task_id SET DEFAULT nextval('public.tasks_task_id_seq'::regclass);


--
-- Name: workgroups workgroup_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workgroups ALTER COLUMN workgroup_id SET DEFAULT nextval('public.workgroups_workgroup_id_seq'::regclass);


--
-- Name: working_developer_list list_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.working_developer_list ALTER COLUMN list_id SET DEFAULT nextval('public.working_developer_list_list_id_seq'::regclass);


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (client_login, client_organisation_id) FROM stdin;
client	1
client2	1
admin1	1
\.


--
-- Data for Name: developers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.developers (developer_login, tester_spec, outsource_spec) FROM stdin;
developer	f	f
testing	f	f
с.сусликов3.861	f	t
а.вивин4.890	f	t
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.files (file_id, file_project_id, file_path, upload_time, file_ext, file_name) FROM stdin;
1	1	/data/files/projects/1/41.docx	2020-05-17	.docx	41.docx
2	1	/data/files/projects/1/66.docx	2020-05-17	.docx	66.docx
3	2	/data/files/projects/2/52.docx	2020-05-17	.docx	52.docx
4	2	/data/files/projects/2/MainForm.cs	2020-05-17	.cs	MainForm.cs
5	1	/data/files/projects/1/go-fibonacci-master.zip	2020-05-17	.zip	go-fibonacci-master.zip
6	1	/data/files/projects/1/Учёт.xlsx	2020-05-17	.xlsx	Учёт.xlsx
7	1	/data/files/projects/1/UI UX.ai	2020-05-17	.ai	UI UX.ai
8	1	/data/files/projects/1/UI UX-1.pdf	2020-05-17	.pdf	UI UX-1.pdf
\.


--
-- Data for Name: issues; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.issues (issue_id, issue_name, issue_desc, issue_date, issue_task_id, issue_close_status) FROM stdin;
108	Сломалось	Я куда-то нажал и всё исчезло	2020-05-23	217	t
109	Я опять сломал что-то	ПОМОГИТЕ!!!	2020-05-23	217	t
110	Новая проблема	Хеллоу	2020-05-23	217	t
111	Проблема	У меня проблема	2020-05-23	217	t
112	Новая проблема	п	2020-05-24	223	t
113	Новая проблема	кее	2020-05-24	224	t
114	Новая проблема	п	2020-05-24	224	t
115	Проблема	Вот	2020-05-24	217	t
116	Код не прокомментирован	ИСПРАВЬТЕ ЖИВО	2020-05-24	225	t
117	Новая проблема	Проблема	2020-05-24	225	t
118	Проблема	а	2020-05-24	225	t
\.


--
-- Data for Name: managers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.managers (manager_login, outsource_spec) FROM stdin;
manager	f
null	f
manager2	t
testing	f
В.Рябов5.142	f
и.иванов9.136	t
с.исумисев2.178	t
а.эшуйэмембетов3.587	f
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (message_id, message_project_id, from_user, to_user, date_mes, is_read) FROM stdin;
\.


--
-- Data for Name: modules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modules (module_id, module_name, module_project_id, module_status, module_index, start_date, finish_date, start_date_fact, finish_date_fact) FROM stdin;
5	Новый модуль	1	1	1	2020-05-01	2020-05-31	1991-01-01	1991-01-01
6	Первый модуль	3	1	1	2020-05-01	2020-05-31	1991-01-01	1991-01-01
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notes (note_id, note_name, note_desc, note_date, note_client_login, note_task_id) FROM stdin;
1	слоамал	;f	2020-05-24	client	193
2	Новая правка	Правка, ЮХУ	2020-05-25	client	217
3	Правка	ЮХУ	2020-05-25	client	223
\.


--
-- Data for Name: organisations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organisations (organisation_id, full_name, short_name, organisation_image_src, organisation_desc) FROM stdin;
0	Без организации	Без организации	/data/img/orgs/non_org.png	Отсутствует
2	ООО "ВЛАДОС1"	ВЛАДОС1	/data/img/orgs/non_org.png	Отсутствует
1	ООО "ВЛАДОС"	ВЛАДОС	/data/img/orgs/1.png	Отсутствует
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (project_id, project_name, project_client_login, project_manager_login, project_workgroup_id, editable, client_activity, project_info, project_status_id, project_docs, start_date, finish_date, start_date_fact, finish_date_fact) FROM stdin;
2	Интересный проект	client	manager	1	f	t	Данные отсутствуют	6	{"data": []}	2020-05-17	2020-05-18	1991-01-01	1991-01-01
3	Тестовый проект	client	manager	1	t	t	Что-то	4	{"data": []}	2020-05-01	2020-05-31	2020-05-23	2020-05-23
1	Вавилон	client	manager	1	t	t	Данные отсутствуют	2	{"data": []}	2020-05-17	2020-05-18	2020-05-23	1991-01-01
\.


--
-- Data for Name: stages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stages (stage_id, stage_name, stage_module_id, stage_status_id, stage_index, start_date, finish_date, start_date_fact, finish_date_fact) FROM stdin;
7	Новый этап	5	1	1	2020-05-01	2020-05-31	1991-01-01	1991-01-01
8	Первый этап	6	1	1	2020-05-01	2020-05-31	1991-01-01	1991-01-01
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (status_id, status_name) FROM stdin;
0	Новый
1	Начат
2	В разработке
3	На отладке
4	Готов
5	Остановлен
6	Отменен
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (task_id, task_name, task_stage_id, task_developer_login, task_status_id, task_supertask_id, task_note, task_index, start_date, finish_date, start_date_fact, finish_date_fact) FROM stdin;
193	Первая задача	8	developer	4	\N	\N	1	2020-05-01	2020-05-03	2020-05-23	2020-05-23
194	Вторая задача	8	developer	4	\N	\N	2	2020-05-04	2020-05-06	2020-05-23	2020-05-23
195	Третью задачу	8	developer	4	\N	\N	3	2020-05-07	2020-05-07	2020-05-23	2020-05-23
213	проблема	7	developer	4	212	\N	1	2020-05-08	2020-05-15	2020-05-23	2020-05-23
219	Задача	7	developer	4	214	\N	1	2020-05-08	2020-05-15	2020-05-23	2020-05-23
217	Новая	7	developer	4	210	\N	1	2020-05-15	2020-05-15	2020-05-23	2020-05-23
218	авыа	7	developer	4	210	\N	2	2020-05-15	2020-05-15	2020-05-21	2020-05-21
220	f	7	developer	4	219	\N	1	2020-05-08	2020-05-15	2020-05-23	2020-05-23
208	fd	7	developer	1	\N	\N	1	2020-05-01	2020-05-31	1991-01-01	1991-01-01
209	dfd	7	developer	1	208	\N	1	2020-05-14	2020-05-15	1991-01-01	1991-01-01
221	1	7	developer	4	220	\N	1	2020-05-08	2020-05-14	2020-05-23	2020-05-23
222	Новая задача	7	developer	1	218	\N	1	2020-05-15	2020-05-15	1991-01-01	1991-01-01
210	fdf	7	developer	1	209	\N	1	2020-05-15	2020-05-15	1991-01-01	1991-01-01
212	ывавыав	7	developer	1	208	\N	2	2020-05-01	2020-05-16	1991-01-01	1991-01-01
223	Задача	7	developer	4	222	\N	1	2020-05-15	2020-05-15	2020-05-24	2020-05-24
224	Новая	7	developer	4	222	\N	2	2020-05-15	2020-05-15	2020-05-24	2020-05-24
214	проеблма	7	developer	4	212	\N	2	2020-05-08	2020-05-15	2020-05-21	2020-05-21
215	Задача	7	developer	1	208	\N	3	2020-05-01	2020-05-31	1991-01-01	1991-01-01
225	Еще одна	7	developer	4	222	\N	3	2020-05-15	2020-05-15	2020-05-24	2020-05-24
216	Задача	7	developer	4	215	\N	1	2020-05-01	2020-05-15	2020-05-21	2020-05-21
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_login, user_password, first_name, middle_name, sur_name, birth_date, phone_num, email_addr, user_image_src, user_role, logical_delete_status) FROM stdin;
admin	123	Иван	Иванович	Иванов	2020-10-10	+7(999)999-99-99	admin@mpt.ru	/data/img/users/non.png	t	f
null	null	null	null	null	2020-10-10	null	null@mpt.ru	/data/img/users/non.png	f	f
client	123	Иван	Сергеевич	Петров	2020-10-10	+7(999)999-99-96	client@mpt.ru	/data/img/users/client.png	f	f
manager	123	Сергей	Петрович	Иванов	2020-10-10	+7(999)999-99-97	manager@mpt.ru	/data/img/users/manager.png	f	f
client2	123	Иван	Сергеевич	Петров	2020-10-10	+7(999)999-99-91	client2@mpt.ru	/data/img/users/client2.png	f	f
admin1	123	Иван	Иванович	Иванов	2020-10-10	+7(998)999-99-99	adminNew@mpt.ru	/data/img/users/admin1.png	f	f
developer	123	Антон	Дмитриевич	Иванов	2020-10-10	+7(999)999-99-98	dev@mpt.ru	/data/img/users/developer.png	f	f
manager2	123	Владислав	Олегович	Рябов	2000-10-09	+79154834611	naiks10@yandex.ru	/data/img/users/non.png	f	f
testing	123	Иван	Ванкинович	Иванчук	2020-10-10	+7(999)999-99-90	manager0@mpt.ru	/data/img/users/non.png	f	f
В.Рябов5.142	nl5vvwjc	Владислав	Олегович	Рябов	2020-05-06	79154875542	vlados-mail.ru	/data/img/users/non.png	f	f
и.иванов9.136	xmiipl18	Иван	Иванович	Иванов	2020-05-07	+78897765122	vlvl@yan.ru	/data/img/users/non.png	f	f
с.исумисев2.178	axkfvyze	Сася	Антутович	Исумисев	2019-02-06	+77777777777	Yolandy@makurka.kz	/data/img/users/non.png	f	f
а.эшуйэмембетов3.587	llg3af9l	Альцхуль	Мурзалатович	Эшуйэмембетов	2020-05-05	+78779887321	Vavik@yama.konava	/data/img/users/non.png	f	f
с.сусликов3.861	vgrcklam	Суслик	Гоферович	Сусликов	2020-05-01	79156667180	sysli@gop.go	/data/img/users/non.png	f	f
а.вивин4.890	4tv30p7r	Ануанетт	Гарифивович	Вивин	2020-05-08	89156667799	isi@gm.ru	/data/img/users/non.png	f	f
\.


--
-- Data for Name: workgroups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.workgroups (workgroup_id, workgroup_name) FROM stdin;
0	Нет группы
1	Рабочая группа №1
2	Группа по отладке
\.


--
-- Data for Name: working_developer_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.working_developer_list (list_id, developer_login, workgroup_id, head_status) FROM stdin;
1	developer	1	t
\.


--
-- Name: files_file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.files_file_id_seq', 8, true);


--
-- Name: issues_issue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.issues_issue_id_seq', 118, true);


--
-- Name: messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_message_id_seq', 1, false);


--
-- Name: modules_module_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modules_module_id_seq', 6, true);


--
-- Name: notes_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notes_note_id_seq', 3, true);


--
-- Name: organisations_organisation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organisations_organisation_id_seq', 2, true);


--
-- Name: projects_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_project_id_seq', 3, true);


--
-- Name: stages_stage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stages_stage_id_seq', 8, true);


--
-- Name: status_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_status_id_seq', 6, true);


--
-- Name: tasks_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_task_id_seq', 225, true);


--
-- Name: workgroups_workgroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workgroups_workgroup_id_seq', 3, true);


--
-- Name: working_developer_list_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.working_developer_list_list_id_seq', 1, true);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (client_login);


--
-- Name: developers developers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.developers
    ADD CONSTRAINT developers_pkey PRIMARY KEY (developer_login);


--
-- Name: files files_file_path_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_file_path_key UNIQUE (file_path);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (file_id);


--
-- Name: issues issues_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_pkey PRIMARY KEY (issue_id);


--
-- Name: managers managers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT managers_pkey PRIMARY KEY (manager_login);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- Name: modules modules_module_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_module_name_key UNIQUE (module_name);


--
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (module_id);


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (note_id);


--
-- Name: organisations organisations_full_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations
    ADD CONSTRAINT organisations_full_name_key UNIQUE (full_name);


--
-- Name: organisations organisations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations
    ADD CONSTRAINT organisations_pkey PRIMARY KEY (organisation_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project_id);


--
-- Name: projects projects_project_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_project_name_key UNIQUE (project_name);


--
-- Name: stages stages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stages
    ADD CONSTRAINT stages_pkey PRIMARY KEY (stage_id);


--
-- Name: stages stages_stage_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stages
    ADD CONSTRAINT stages_stage_name_key UNIQUE (stage_name);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (status_id);


--
-- Name: status status_status_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_status_name_key UNIQUE (status_name);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (task_id);


--
-- Name: users users_email_addr_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_addr_key UNIQUE (email_addr);


--
-- Name: users users_phone_num_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_num_key UNIQUE (phone_num);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_login);


--
-- Name: workgroups workgroups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workgroups
    ADD CONSTRAINT workgroups_pkey PRIMARY KEY (workgroup_id);


--
-- Name: workgroups workgroups_workgroup_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workgroups
    ADD CONSTRAINT workgroups_workgroup_name_key UNIQUE (workgroup_name);


--
-- Name: working_developer_list working_developer_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.working_developer_list
    ADD CONSTRAINT working_developer_list_pkey PRIMARY KEY (list_id);


--
-- Name: clients clients_client_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_client_login_fkey FOREIGN KEY (client_login) REFERENCES public.users(user_login);


--
-- Name: clients clients_client_organisation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_client_organisation_id_fkey FOREIGN KEY (client_organisation_id) REFERENCES public.organisations(organisation_id);


--
-- Name: developers developers_developer_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.developers
    ADD CONSTRAINT developers_developer_login_fkey FOREIGN KEY (developer_login) REFERENCES public.users(user_login);


--
-- Name: files files_file_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_file_project_id_fkey FOREIGN KEY (file_project_id) REFERENCES public.projects(project_id) ON DELETE CASCADE;


--
-- Name: issues issues_issue_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_issue_task_id_fkey FOREIGN KEY (issue_task_id) REFERENCES public.tasks(task_id) ON DELETE CASCADE;


--
-- Name: managers managers_manager_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT managers_manager_login_fkey FOREIGN KEY (manager_login) REFERENCES public.users(user_login);


--
-- Name: messages messages_from_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_from_user_fkey FOREIGN KEY (from_user) REFERENCES public.users(user_login);


--
-- Name: messages messages_message_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_message_project_id_fkey FOREIGN KEY (message_project_id) REFERENCES public.projects(project_id) ON DELETE CASCADE;


--
-- Name: messages messages_to_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_to_user_fkey FOREIGN KEY (to_user) REFERENCES public.users(user_login);


--
-- Name: modules modules_module_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_module_project_id_fkey FOREIGN KEY (module_project_id) REFERENCES public.projects(project_id) ON DELETE CASCADE;


--
-- Name: modules modules_module_status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_module_status_fkey FOREIGN KEY (module_status) REFERENCES public.status(status_id);


--
-- Name: notes notes_note_client_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_note_client_login_fkey FOREIGN KEY (note_client_login) REFERENCES public.clients(client_login);


--
-- Name: notes notes_note_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_note_task_id_fkey FOREIGN KEY (note_task_id) REFERENCES public.tasks(task_id) ON DELETE CASCADE;


--
-- Name: projects projects_project_client_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_project_client_login_fkey FOREIGN KEY (project_client_login) REFERENCES public.users(user_login);


--
-- Name: projects projects_project_manager_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_project_manager_login_fkey FOREIGN KEY (project_manager_login) REFERENCES public.users(user_login);


--
-- Name: projects projects_project_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_project_status_id_fkey FOREIGN KEY (project_status_id) REFERENCES public.status(status_id);


--
-- Name: projects projects_project_workgroup_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_project_workgroup_id_fkey FOREIGN KEY (project_workgroup_id) REFERENCES public.workgroups(workgroup_id);


--
-- Name: stages stages_stage_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stages
    ADD CONSTRAINT stages_stage_module_id_fkey FOREIGN KEY (stage_module_id) REFERENCES public.modules(module_id) ON DELETE CASCADE;


--
-- Name: stages stages_stage_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stages
    ADD CONSTRAINT stages_stage_status_id_fkey FOREIGN KEY (stage_status_id) REFERENCES public.status(status_id);


--
-- Name: tasks tasks_task_developer_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_task_developer_login_fkey FOREIGN KEY (task_developer_login) REFERENCES public.developers(developer_login);


--
-- Name: tasks tasks_task_stage_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_task_stage_id_fkey FOREIGN KEY (task_stage_id) REFERENCES public.stages(stage_id) ON DELETE CASCADE;


--
-- Name: tasks tasks_task_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_task_status_id_fkey FOREIGN KEY (task_status_id) REFERENCES public.status(status_id);


--
-- Name: tasks tasks_task_supertask_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_task_supertask_id_fkey FOREIGN KEY (task_supertask_id) REFERENCES public.tasks(task_id) ON DELETE CASCADE;


--
-- Name: working_developer_list working_developer_list_developer_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.working_developer_list
    ADD CONSTRAINT working_developer_list_developer_login_fkey FOREIGN KEY (developer_login) REFERENCES public.developers(developer_login);


--
-- Name: working_developer_list working_developer_list_workgroup_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.working_developer_list
    ADD CONSTRAINT working_developer_list_workgroup_id_fkey FOREIGN KEY (workgroup_id) REFERENCES public.workgroups(workgroup_id);


--
-- PostgreSQL database dump complete
--

