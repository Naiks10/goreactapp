import React from "react"

import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
    Dropdown,
    ButtonGroup,
    Spinner
} from "react-bootstrap"
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useLocation, useParams } from "react-router-dom"
import { getJWT } from "../Functions/Funcs"
import { SearchPanel, ButtonPanel, ProjectNavigation } from "../BodyElements/BodyPanel"
import axios from 'axios';
import "animate.css";
import { useState } from "react"

const ProjectContext = React.createContext(null);
const WorkGroupContext = React.createContext(null);

function GetDate(value) {
    var data = new Date(value)
    return data.toLocaleDateString("ru-RU")
}

export class ProjectViewPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            data: {},
            work_data: {}
        }
    }

    componentDidMount() {
        fetch(`/projects/${this.props.match.params.id}`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result.data,
                        isLoaded: true
                    })
                    axios.get(`/workers?workgroup=${result.data.workgroup.id}`, {
                        headers: {
                            'Authorization': `Bearer ${getJWT()}`
                        }
                    })
                        .then(res => {
                            const data = res.data;
                            this.setState({
                                work_data: data.items,
                            })
                        })
                },
                (error) => {
                    this.setState({
                        error
                    })
                }
            )
    }

    render() {
        return (
            <div>
                {
                    this.state.isLoaded
                        ? <Container fluid>
                            <ProjectNavigation title={this.state.data.name} />
                            <Col>
                                <Row>
                                    <Col><BasicInfo data={this.state.data} /></Col>
                                    <Col><OrgInfo data={this.state.data} /></Col>
                                </Row>
                                <Row>
                                    <Col><ProjectChartView /></Col>
                                </Row>
                                <Row>
                                    <Col><ProjectDocs /></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ProjectContext.Provider value={this.state.data}>
                                            <WorkGroupContext.Provider value={this.state.work_data}>
                                                <ProjectControlView />
                                            </WorkGroupContext.Provider>
                                        </ProjectContext.Provider>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col><ProjectStatsView /></Col>
                                </Row>
                            </Col>
                        </Container>
                        : null
                }
            </div>
        )
    }
}

class BasicInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }
    render() {
        return (
            <div>

                <TitlePanel
                    title="ОБЩАЯ"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    }
                />

                {
                    this.state.isExpanded
                        ? <div className="ProjectElement">
                            <Col>
                                <Row>
                                    <Col sm={4}>
                                        <Row
                                            style={
                                                { fontWeight: 'bold' }
                                            }
                                        >
                                            Ведущий менеджер
                                        </Row>
                                        <Row>
                                            {
                                                this.props.data.manager.user.surname
                                                + ' ' + this.props.data.manager.user.name[0]
                                                + '.' + this.props.data.manager.user.midname[0]
                                            }
                                        </Row>
                                    </Col>
                                    <Col
                                        sm={1}
                                        className="d-flex align-items-center">
                                        <img
                                            width="35"
                                            height="35"
                                            src={this.props.data.manager.user.src} />
                                    </Col>
                                    <Col sm={4}>
                                        <Row style={{ fontWeight: 'bold' }}><b>Контактные данные</b></Row>
                                        <Row>{this.props.data.manager.user.phone}</Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row><br /></Row>
                                        <Row>{this.props.data.manager.user.mail}</Row>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 10 }}>
                                    <Col sm={4}>
                                        <Row style={{ fontWeight: 'bold' }}><b>Руководитель группы</b></Row>
                                        <Row>{this.props.data.dev_init}</Row>
                                    </Col>
                                    <Col sm={1} className="d-flex align-items-center">
                                        <img width="35" height="35" src={this.props.data.dev_img} />
                                    </Col>
                                    <Col sm={4}>
                                        <Row style={{ fontWeight: 'bold' }}><b>Контактные данные</b></Row>
                                        <Row>{this.props.data.dev_phone}</Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row><br /></Row>
                                        <Row>{this.props.data.dev_email}</Row>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 10 }}>
                                    <Col>
                                        <Row style={{ fontWeight: 'bold' }}><b>Количество человек в группе</b></Row>
                                        <Row>{this.props.data.dev_count}</Row>
                                    </Col>
                                </Row>
                            </Col>
                        </div>
                        : null
                }
            </div>
        )
    }
}

class OrgInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }

    render() {
        return (
            <div>
                <TitlePanel
                    title="ОРГАНИЗАЦИЯ"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    } />
                {
                    this.state.isExpanded
                        ? <div
                            className="ProjectElement">
                            <Col>
                                <Row>
                                    <Col sm={8}>
                                        <Row style={{ fontWeight: 'bold' }}><b>Организация</b></Row>
                                        <Row>{this.props.data.client.organisation.short_name}</Row>
                                        <br />
                                        <Row style={{ fontWeight: 'bold' }}><b>Об организации</b></Row>
                                        <Row>"НЕИЗВЕТСНО"</Row>
                                    </Col>
                                    <Col sm={4} className="d-flex align-items-center justify-content-center">
                                        <img width="90" height="90" src={this.props.data.client.organisation.src} />
                                    </Col>
                                </Row>
                            </Col>
                        </div>
                        : null
                }
            </div>
        )
    }
}

class ProjectChartView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }

    render() {
        const options = {
            title: {
                text: '    '
            },
            series: [{
                name: 'Фактические данные ',
                data: [1, 2, 3],
                color: '#2098D1'
            },
            {
                name: 'Плановые данные ',
                data: [1, 3, 4, 6],
                color: 'rgb(27, 214, 74)'
            },
            ]
        }
        return (
            <div>
                <TitlePanel
                    isExpanded={this.state.isExpanded}
                    title="ПРОГРЕСС"
                    onClick={() => { this.setState({ isExpanded: !this.state.isExpanded }) }
                    } />
                {
                    this.state.isExpanded
                        ? <div className="ProjectElement">
                            <Col>
                                <Row style={{ fontWeight: 'bold' }}><b>Период проекта</b></Row>
                                <div>
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={options}
                                    />
                                </div>
                            </Col>
                        </div>
                        : null
                }
            </div>
        )
    }
}

class ProjectDocs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }

    render() {
        return (
            <div>
                <TitlePanel
                    title="МАТЕРИАЛЫ"
                    isExpanded={this.state.isExpanded}
                    onClick={() => { this.setState({ isExpanded: !this.state.isExpanded }) }} />
                {
                    this.state.isExpanded
                        ? <div className="ProjectElement">
                            <Col>
                                {/*<Row style={{ fontWeight: 'bold' }}><b>Тут пока что ничего нет</b></Row>*/}
                                <Row>
                                    <ProjectDocsElement />
                                    <ProjectDocsElement />
                                    <ProjectDocsElement />
                                    <ProjectDocsElementNew />
                                </Row>
                            </Col>
                        </div>
                        : null
                }
            </div>
        )
    }
}


class ProjectDocsElement extends React.Component {
    render() {
        return (
            <div>
                <div className="ProjectElementFMT" >
                    <img
                        width="48"
                        height="48"
                        src="/assets/img/word_fmt.png" />
                </div>
                <div><p className="text-center">ТЗ.docx</p></div>
            </div>
        )
    }
}

class ProjectDocsElementNew extends React.Component {
    render() {
        return (
            <div>
                <div className="ProjectElementFMT" >
                    <img
                        width="48"
                        height="48"
                        src="/assets/img/upload.png" />
                </div>
                <div><p className="text-center">Загрузить</p></div>
            </div>
        )
    }
}

class ProjectControlView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }

    render() {
        return (
            <div>
                <TitlePanel
                    title="ЗАДАЧИ"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    } />
                {
                    this.state.isExpanded
                        ? <div className="ProjectElement">
                            <Col>
                                <Col>
                                    <Row>
                                        <Row>
                                            <SearchPanel />
                                            <ButtonPanel src="/assets/img/filter.png" />
                                        </Row>
                                    </Row>
                                    <div>
                                        <ProjectContext.Consumer>
                                            {data => <ProjectContainer data={data} />}
                                        </ProjectContext.Consumer>
                                    </div>
                                </Col>
                            </Col>
                        </div>
                        : null
                }
            </div>
        )
    }
}

class ProjectStatsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }

    render() {
        return (
            <div>
                <TitlePanel
                    title="СТАТИСТИКА"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    } />
                {
                    this.state.isExpanded
                        ? <div className="ProjectElement">
                            <h1>Ожидается</h1>
                        </div>
                        : null
                }
            </div>
        )
    }
}


class ProjectContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            length: 0,
            isLoaded: false,
            error: null,
            intervalId: null,
            isOvered: false,
            isShowedSub: false
        }
    }

    componentDidMount() {
        //console.log(this.props.data.id)
        this.GetData()
    }

    GetData() {
        this.setState({ isLoaded: false })
        axios.get(`/modules?project=${this.props.data.id}&asc.orderby=module_index`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({
                    data: data.items,
                    isLoaded: true
                })
            })
    }

    render() {
        const { isLoaded, data, error, isOvered, isShowedSub } = this.state;
        return (
            <div
                style={
                    {
                        marginTop: 15,
                        marginBottom: 15
                    }
                }>
                <Col
                    onMouseEnter={
                        () => {
                            this.setState({ isOvered: true })
                        }
                    }
                    onMouseLeave={
                        () => {
                            this.setState({ isOvered: false })
                        }
                    }>
                    <Row style={{ position: "relative" }}>
                        <div
                            className="d-flex align-items-center"
                            style={
                                {
                                    zIndex: 1,
                                    paddingTop: 4,
                                    paddingBottom: 4
                                }
                            }>
                            Проект "{this.props.data.name}"
                        </div>
                        {
                            isOvered
                                ? <Row style={{ marginLeft: 10 }}>
                                    <SubButton onClick={() => this.setState({ isShowedSub: true })} />
                                </Row>
                                : null
                        }
                        <div
                            className="d-flex align-items-center"
                            style={
                                {
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    position: "absolute",
                                    zIndex: 2,
                                    color: 'white',
                                    paddingLeft: 6,
                                    paddingRight: 6,
                                    borderRadius: 5,
                                    fontSize: 14,
                                    backgroundColor: GetStatus(this.props.data.status.id)
                                }
                            }><a>{GetDate(this.props.data.start)}-{GetDate(this.props.data.finish)}</a>
                        </div>
                    </Row>
                </Col>
                {
                    isLoaded && data != null
                        ? data.map(item => (
                            <Modulecontext.Provider value={() => this.GetData()}>
                                <ModuleContainer data={item} />
                            </Modulecontext.Provider>
                        ))
                        : null
                }
                {
                    isShowedSub
                        ? <CreateSubModuleModal
                            task_data={this.props.data}
                            update={() => this.GetData()}
                            show={this.state.isShowedSub}
                            onHide={() => this.setState({ isShowedSub: false })} />
                        : null
                }
            </div>
        )
    }
}

function GetStatus(value) {
    var val = null
    switch (value) {
        case 1:
            val = '#2098D1'
            break;
        case 2:
            val = 'rgb(27, 214, 74)'
            break;
        case 3:
            val = 'rgb(255, 196, 0)'
            break;
        case 4:
            val = 'red'
            break;

    }
    return val
}

class ModuleContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            isOvered: false,
            isShowedCreate: false,
            isShowedSub: false,
            isShowedDelete: false
        }
    }

    componentDidMount() {
        this.GetAll()
    }

    GetAll() {
        this.setState(
            {
                isLoaded: false
            }
        )
        console.log('fisrt' + this.props.data.id)
        axios.get(`/stages?module=${this.props.data.id}&asc.orderby=stage_index`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({
                    data: data.items,
                    isLoaded: true
                })
            })
    }

    render() {
        const { isLoaded, data, error, isOvered, isShowedCreate, isShowedSub, isShowedDelete } = this.state;
        console.log(data)
        return (
            <div className={`Item_task${this.props.data.status.id}`} style={{ borderLeft: `3px solid ${GetStatus(this.props.data.status.id)}` }}>
                <Col onMouseEnter={() => { this.setState({ isOvered: true }) }} onMouseLeave={() => { this.setState({ isOvered: false }) }}><Row style={{ position: "relative" }}>
                    <div className="d-flex align-items-center" style={{ zIndex: 1, paddingTop: 4, paddingBottom: 4 }}>Модуль "{this.props.data.name}"</div>
                    {
                        isOvered
                            ? <Row style={{ marginLeft: 10 }}>
                                <AddButton onClick={() => this.setState({ isShowedCreate: true })} />
                                <EditButton />
                                <DeleteButton onClick={() => this.setState({ isShowedDelete: true })} />
                                <SubButton onClick={() => this.setState({ isShowedSub: true })} />
                            </Row>
                            : null
                    }
                    <div className="d-flex align-items-center" style={{ right: 0, top: 0, bottom: 0, position: "absolute", zIndex: 2, color: 'white', paddingLeft: 6, paddingRight: 6, borderRadius: 5, fontSize: 14, backgroundColor: GetStatus(this.props.data.status.id) }}><a>{GetDate(this.props.data.start)}-{GetDate(this.props.data.finish)}</a></div></Row></Col>
                {
                    isLoaded && data != null
                        ? data.map(item => (
                            <Stagecontext.Provider value={() => { this.GetAll() }}>
                                <StageContainer data={item} />
                            </Stagecontext.Provider>
                        ))
                        : null
                }
                <React.Fragment>
                    {
                        isShowedCreate
                            ? <CreateModuleModal
                                task_data={this.props.data}
                                data={data}
                                show={this.state.isShowedCreate}
                                onHide={() => this.setState({ isShowedCreate: false })} />
                            : null
                    }
                    {
                        isShowedSub
                            ? <CreateSubStageModal
                                task_data={this.props.data}
                                update={() => this.GetAll()}
                                show={this.state.isShowedSub}
                                onHide={() => this.setState({ isShowedSub: false })} />
                            : null
                    }
                    {
                        isShowedDelete
                            ? <DeleteModuleModal
                                task_data={this.props.data}
                                data={data}
                                show={this.state.isShowedDelete}
                                onHide={() => this.setState({ isShowedDelete: false })} />
                            : null
                    }
                </React.Fragment>
            </div>
        )
    }
}

const SuperTaskcontext = React.createContext(null)
const Taskcontext = React.createContext(null)
const Stagecontext = React.createContext(null)
const Modulecontext = React.createContext(null)

class StageContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            isOvered: false,
            isShowedCreate: false,
            isShowedDelete: false,
            isShowedSub: false
        }
    }

    componentDidMount() {
        this.updateAndGetMethod()
    }

    updateAndGetMethod() {
        this.setState(
            {
                isLoaded: false
            }
        )
        axios.get(`/tasks?stage=${this.props.data.id}&asc.orderby=task_index`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({
                    data: data.items,
                    isLoaded: true
                })
            })
    }


    render() {
        const { isLoaded, data, error, isOvered, isShowedCreate, isShowedSub, isShowedDelete } = this.state;
        console.log(data)
        return (
            <div className={`Item_task${this.props.data.status.id}`} style={{ borderLeft: `3px solid ${GetStatus(this.props.data.status.id)}` }}>
                <Col onMouseEnter={() => { this.setState({ isOvered: true }) }} onMouseLeave={() => { this.setState({ isOvered: false }) }}><Row style={{ position: "relative" }}>
                    <div className="d-flex align-items-center" style={{ zIndex: 1, paddingTop: 4, paddingBottom: 4 }}>Этап "{this.props.data.name}"</div>
                    {
                        isOvered
                            ? <Row style={{ marginLeft: 10 }}>
                                <AddButton onClick={() => this.setState({ isShowedCreate: true })} />
                                <EditButton />
                                <DeleteButton onClick={() => this.setState({ isShowedDelete: true })} />
                                <SubButton onClick={() => this.setState({ isShowedSub: true })} />
                            </Row>
                            : null
                    }
                    <div className="d-flex align-items-center" style={{ right: 0, top: 0, bottom: 0, position: "absolute", zIndex: 2, color: 'white', paddingLeft: 6, paddingRight: 6, borderRadius: 5, fontSize: 14, backgroundColor: GetStatus(this.props.data.status.id) }}><a>{GetDate(this.props.data.start)}-{GetDate(this.props.data.finish)}</a></div></Row></Col>
                {
                    isLoaded && data != null
                        ? data.map(item => (
                            <SuperTaskcontext.Provider value={() => { this.updateAndGetMethod() }}>
                                <SuperTaskContainer data={item} />
                            </SuperTaskcontext.Provider>
                        ))
                        : null
                }
                <WorkGroupContext.Consumer>
                    {data => (
                        <React.Fragment>
                            {
                                isShowedCreate
                                    ? <CreateStageModal
                                        task_data={this.props.data}
                                        data={data}
                                        show={this.state.isShowedCreate}
                                        onHide={() => this.setState({ isShowedCreate: false })} />
                                    : null
                            }
                            {
                                isShowedSub
                                    ? <CreateStageSubTaskModal
                                        task_data={this.props.data}
                                        data={data}
                                        update={() => this.updateAndGetMethod()}
                                        show={this.state.isShowedSub}
                                        onHide={() => this.setState({ isShowedSub: false })} />
                                    : null
                            }
                            {
                                isShowedDelete
                                    ? <DeleteStageModal
                                        task_data={this.props.data}
                                        data={data}
                                        show={this.state.isShowedDelete}
                                        onHide={() => this.setState({ isShowedDelete: false })} />
                                    : null
                            }
                        </React.Fragment>
                    )}
                </WorkGroupContext.Consumer>
            </div>
        )
    }
}

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
      &#x25bc;
    </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Поиск сотрудника..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value.toLowerCase() || child.props.children.toLowerCase().startsWith(value.toLowerCase()),
                    )}
                </ul>
            </div>
        );
    },
);

class CreateSuperTaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }
    static contextType = Taskcontext;

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Создать новую задачу после задачи "{this.props.task_data.name}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control placeholder="Введите название задачи" onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Исполнитель</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {this.state.text}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    this.props.data.map(item => (
                                        <Dropdown.Item eventKey={item.developer_login} onSelect={(e, f) => { this.setState({ index: e, text: item.dev_name }) }}><Row style={{ position: 'relative' }}><img style={{ position: 'absolute', right: 0 }} width="20" height="20" src={item.user_image_src} />{item.dev_name}</Row></Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата начала" onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата конца" onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.onHide(); this.setState({ text: 'Выбрать исполнителя' }) }} variant="outline-primary">Отмена</Button>
                    <SuperTaskcontext.Consumer>
                        {user =>
                            <Button onClick={() => {
                                fetch('/tasks', {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${getJWT()}`,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        name: this.state.formTask,
                                        stage: this.props.task_data.stage,
                                        developer: { login: this.state.index },
                                        status: { id: 1 },
                                        supertask: null,
                                        index: this.props.task_data.index + 1,
                                        start: new Date(this.state.formTaskStart),
                                        finish: new Date(this.state.formTaskFin)
                                    })
                                })
                                    .then(
                                        () => {
                                            this.props.onHide()
                                            user()
                                        }
                                    )
                            }} variant="outline-success">Создать</Button>
                        }
                    </SuperTaskcontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateTaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }
    static contextType = Taskcontext;

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Создать новую задачу после задачи "{this.props.task_data.name}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control placeholder="Введите название задачи" onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Исполнитель</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {this.state.text}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    this.props.data.map(item => (
                                        <Dropdown.Item
                                            eventKey={item.developer_login}
                                            onSelect={
                                                (e, f) => {
                                                    this.setState(
                                                        {
                                                            index: e,
                                                            text: item.dev_name
                                                        }
                                                    )
                                                }}>
                                            <Row style={{ position: 'relative' }}>
                                                <img style={{ position: 'absolute', right: 0 }}
                                                    width="20"
                                                    height="20"
                                                    src={item.user_image_src} />
                                                {item.dev_name}
                                            </Row>
                                        </Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата начала" onChange={(e) => {
                                this.setState({ formTaskStart: e.target.value })
                                alert(e.target.value)
                            }} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата конца" onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.onHide(); this.setState({ text: 'Выбрать исполнителя' }) }} variant="outline-primary">Отмена</Button>
                    <Taskcontext.Consumer>
                        {user =>
                            <Button onClick={() => {
                                fetch('/tasks', {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${getJWT()}`,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        name: this.state.formTask,
                                        stage: this.props.task_data.stage,
                                        developer: { login: this.state.index },
                                        status: { id: 1 },
                                        supertask: this.props.task_data.supertask,
                                        index: this.props.task_data.index + 1,
                                        start: new Date(this.state.formTaskStart),
                                        finish: new Date(this.state.formTaskFin)
                                    })
                                })
                                    .then(
                                        () => {
                                            this.props.onHide()
                                            user()
                                        }
                                    )
                            }} variant="outline-success">Создать</Button>
                        }
                    </Taskcontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateStageModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }
    static contextType = Taskcontext;

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Создать новый этап разработки после этапа "{this.props.task_data.name}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название этапа</Form.Label>
                        <Form.Control placeholder="Введите название этапа" onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата начала" onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата конца" onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        this.props.onHide();
                        this.setState({ text: 'Выбрать исполнителя' })
                    }}
                        variant="outline-primary">Отмена</Button>
                    <Stagecontext.Consumer>
                        {method =>
                            <Button onClick={() => {
                                fetch('/stages', {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${getJWT()}`,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        name: this.state.formTask,
                                        module: this.props.task_data.module,
                                        status: { id: 1 },
                                        index: this.props.task_data.index + 1,
                                        start: new Date(this.state.formTaskStart),
                                        finish: new Date(this.state.formTaskFin)
                                    })
                                })
                                    .then(
                                        () => {
                                            this.props.onHide()
                                            method()
                                        }
                                    )
                            }} variant="outline-success">Создать</Button>
                        }
                    </Stagecontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateModuleModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: null,
            formTaskFin: null,
            index: ''
        }
    }
    static contextType = Taskcontext;

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Создать новый модуль после модуля "{this.props.task_data.name}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название модуля</Form.Label>
                        <Form.Control placeholder="Введите название модуля" onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата начала" onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата конца" onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.onHide(); this.setState({ text: 'Выбрать исполнителя' }) }} variant="outline-primary">Отмена</Button>
                    <Modulecontext.Consumer>
                        {method =>
                            <Button onClick={() => {
                                fetch('/modules', {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${getJWT()}`,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        name: this.state.formTask,
                                        project: this.props.task_data.project,
                                        status: { id: 1 },
                                        index: this.props.task_data.index + 1,
                                        start: new Date(this.state.formTaskStart),
                                        finish: new Date(this.state.formTaskFin)
                                    })
                                })
                                    .then(
                                        () => {
                                            this.props.onHide()
                                            method()
                                        }
                                    )
                            }} variant="outline-success">Создать</Button>
                        }
                    </Modulecontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateIssueModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formDesc: '',
            formTaskStart: null,
            formTaskFin: null,
            index: ''
        }
    }
    static contextType = Taskcontext;

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Описать новую проблему
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название проблемы</Form.Label>
                        <Form.Control placeholder="Введите название проблемы" onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Описание проблемы</Form.Label>
                        <Form.Control as="textarea" rows="5" placeholder="Опишите свою проблему" onChange={(e) => { this.setState({ formDesc: e.target.value }) }} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.onHide(); this.setState({ text: 'Выбрать исполнителя' }) }} variant="outline-primary">Отмена</Button>
                    <Button onClick={() => {
                        fetch('/issues', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${getJWT()}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: this.state.formTask,
                                desc: this.state.formDesc,
                                issue_task: this.props.task_data.id
                            })
                        })
                            .then(
                                () => {
                                    this.props.onHide()
                                    this.props.update()
                                }
                            )
                    }} variant="outline-success">Создать</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateSubModuleModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: null,
            formTaskFin: null,
            index: ''
        }
    }
    static contextType = Taskcontext;

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Создать новый модуль в проекте
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название модуля</Form.Label>
                        <Form.Control placeholder="Введите название модуля" onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата начала" onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата конца" onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.onHide(); this.setState({ text: 'Выбрать исполнителя' }) }} variant="outline-primary">Отмена</Button>
                    <Button onClick={() => {
                        fetch('/submodules', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${getJWT()}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: this.state.formTask,
                                project: this.props.task_data.id,
                                status: { id: 1 },
                                start: new Date(this.state.formTaskStart),
                                finish: new Date(this.state.formTaskFin)
                            })
                        })
                            .then(
                                () => {
                                    this.props.onHide()
                                    this.props.update()
                                }
                            )
                    }} variant="outline-success">Создать</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateSubStageModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }
    static contextType = Taskcontext;

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Создать новый этап в модуле "{this.props.task_data.name}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название этапа</Form.Label>
                        <Form.Control placeholder="Введите название этапа" onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата начала" onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата конца" onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.onHide(); this.setState({ text: 'Выбрать исполнителя' }) }} variant="outline-primary">Отмена</Button>
                    <Button onClick={() => {
                        fetch('/substages', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${getJWT()}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: this.state.formTask,
                                module: this.props.task_data.id,
                                status: { id: 1 },
                                start: new Date(this.state.formTaskStart),
                                finish: new Date(this.state.formTaskFin)
                            })
                        })
                            .then(
                                () => {
                                    this.props.onHide()
                                    this.props.update()
                                }
                            )
                    }} variant="outline-success">Создать</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateStageSubTaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }
    static contextType = Taskcontext;

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Создать новую задачу в этапе "{this.props.task_data.name}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control placeholder="Введите название задачи" onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Исполнитель</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {this.state.text}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    this.props.data.map(item => (
                                        <Dropdown.Item
                                            eventKey={item.developer_login}
                                            onSelect={
                                                (e, f) => {
                                                    this.setState(
                                                        {
                                                            index: e,
                                                            text: item.dev_name
                                                        }
                                                    )
                                                }}>
                                            <Row style={{ position: 'relative' }}>
                                                <img style={{ position: 'absolute', right: 0 }}
                                                    width="20"
                                                    height="20"
                                                    src={item.user_image_src} />
                                                {item.dev_name}
                                            </Row>
                                        </Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата начала" onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата конца" onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.onHide(); this.setState({ text: 'Выбрать исполнителя' }) }} variant="outline-primary">Отмена</Button>
                    <Button onClick={() => {
                        fetch('/subtasks', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${getJWT()}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: this.state.formTask,
                                stage: this.props.task_data.id,
                                developer: { login: this.state.index },
                                status: { id: 1 },
                                supertask: null,
                                start: new Date(this.state.formTaskStart),
                                finish: new Date(this.state.formTaskFin)
                            })
                        })
                            .then(
                                () => {
                                    this.props.onHide()
                                    this.props.update()
                                }
                            )
                    }} variant="outline-success">Создать</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateSuperSubTaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }
    static contextType = Taskcontext;

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Создать новую подзадачу в задаче "{this.props.task_data.name}" </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control placeholder="Введите название задачи" onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Исполнитель</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {this.state.text}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    this.props.data.map(item => (
                                        <Dropdown.Item
                                            eventKey={item.developer_login}
                                            onSelect={
                                                (e, f) => {
                                                    this.setState(
                                                        {
                                                            index: e,
                                                            text: item.dev_name
                                                        }
                                                    )
                                                }}>
                                            <Row style={{ position: 'relative' }}>
                                                <img style={{ position: 'absolute', right: 0 }}
                                                    width="20"
                                                    height="20"
                                                    src={item.user_image_src} />
                                                {item.dev_name}
                                            </Row>
                                        </Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата начала" onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата конца" onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.onHide(); this.setState({ text: 'Выбрать исполнителя' }) }} variant="outline-primary">Отмена</Button>
                    <Button onClick={() => {
                        fetch('/subtasks', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${getJWT()}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: this.state.formTask,
                                stage: this.props.task_data.stage,
                                developer: { login: this.state.index },
                                status: { id: 1 },
                                supertask: this.props.task_data.id,
                                start: new Date(this.state.formTaskStart),
                                finish: new Date(this.state.formTaskFin)
                            })
                        })
                            .then(
                                () => {
                                    this.props.onHide()
                                    this.props.update()
                                }
                            )
                    }} variant="outline-success">Создать</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateSubTaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }
    static contextType = Taskcontext;

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Создать новую подзадачу в задача "{this.props.task_data.name}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control placeholder="Введите название задачи" onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Исполнитель</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {this.state.text}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    this.props.data.map(item => (
                                        <Dropdown.Item
                                            eventKey={item.developer_login}
                                            onSelect={
                                                (e, f) => {
                                                    this.setState(
                                                        {
                                                            index: e,
                                                            text: item.dev_name
                                                        }
                                                    )
                                                }}>
                                            <Row style={{ position: 'relative' }}>
                                                <img style={{ position: 'absolute', right: 0 }}
                                                    width="20"
                                                    height="20"
                                                    src={item.user_image_src} />
                                                {item.dev_name}
                                            </Row>
                                        </Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата начала" onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата конца" onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.onHide(); this.setState({ text: 'Выбрать исполнителя' }) }} variant="outline-primary">Отмена</Button>
                    <Button onClick={() => {
                        fetch('/subtasks', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${getJWT()}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: this.state.formTask,
                                stage: this.props.task_data.stage,
                                developer: { login: this.state.index },
                                status: { id: 1 },
                                supertask: this.props.task_data.id,
                                start: new Date(this.state.formTaskStart),
                                finish: new Date(this.state.formTaskFin)
                            })
                        })
                            .then(
                                () => {
                                    this.props.onHide()
                                    this.props.update()
                                }
                            )
                    }} variant="outline-success">Создать</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class EditTaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Создать новую задачу
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control placeholder="Введите название задачи" onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Исполнитель</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {this.state.text}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    this.props.data.map(item => (
                                        <Dropdown.Item eventKey={item.developer_login} onSelect={(e, f) => { this.setState({ index: e, text: item.dev_name }) }}><Row style={{ position: 'relative' }}><img style={{ position: 'absolute', right: 0 }} width="20" height="20" src={`/${item.user_image_src}`} />{item.dev_name}</Row></Dropdown.Item>
                                    ))
                                }
                                {/*<Dropdown.Item eventKey={1} onSelect={(e, f) => { this.setState({ index: e, text: 'Red' }) }}>Red</Dropdown.Item>
                                <Dropdown.Item eventKey={2} onSelect={(e, f) => { this.setState({ index: e, text: 'Blue' }) }}>Blue</Dropdown.Item>
                                <Dropdown.Item>
                                    Orange
                                </Dropdown.Item>
                                <Dropdown.Item>Red-Orange</Dropdown.Item>*/}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата начала" onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control type="date" placeholder="Дата конца" onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer style={{ position: 'relative' }}>
                    <Dropdown style={{ position: 'absolute', left: 15 }}>
                        <Dropdown.Toggle id="dropdown-custom-components">
                            Статус
                            </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>Red-Orange</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button onClick={() => { this.props.onHide(); this.setState({ text: 'Выбрать исполнителя' }) }} variant="outline-primary">Отмена</Button>
                    <Button onClick={() => { alert(this.state.index) }} variant="outline-warning">Изменить</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class DeleteSuperTaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Удалить задачу "{this.props.task_data.name}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы точно хотите удалить данную задачу?
                </Modal.Body>
                <Modal.Footer style={{ position: 'relative' }}>
                    <Button onClick={() => { this.props.onHide() }} variant="outline-primary">Отмена</Button>
                    <SuperTaskcontext.Consumer>
                        {method =>
                            <Button onClick={() => {
                                fetch(`/tasks/${this.props.task_data.id}`,
                                    {
                                        method: 'DELETE',
                                        headers: {
                                            'Authorization': `Bearer ${getJWT()}`,
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            index: this.props.task_data.index,
                                            stage: this.props.task_data.stage,
                                            supertask: this.props.task_data.supertask,
                                        })
                                    }
                                ).then(
                                    () => {
                                        this.props.onHide()
                                        method()
                                    }
                                )
                            }} variant="outline-danger">Удалить</Button>
                        }
                    </SuperTaskcontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}

class DeleteTaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Удалить задачу "{this.props.task_data.name}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы точно хотите удалить данную задачу?
                </Modal.Body>
                <Modal.Footer style={{ position: 'relative' }}>
                    <Button onClick={() => { this.props.onHide() }} variant="outline-primary">Отмена</Button>
                    <Taskcontext.Consumer>
                        {method =>
                            <Button onClick={() => {
                                fetch(`/tasks/${this.props.task_data.id}`,
                                    {
                                        method: 'DELETE',
                                        headers: {
                                            'Authorization': `Bearer ${getJWT()}`,
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            index: this.props.task_data.index,
                                            stage: this.props.task_data.stage,
                                            supertask: this.props.task_data.supertask
                                        })
                                    }
                                ).then(
                                    () => {
                                        this.props.onHide()
                                        method()
                                    }
                                )
                            }} variant="outline-danger">Удалить</Button>
                        }
                    </Taskcontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}


class DeleteStageModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Удалить этап "{this.props.task_data.name}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы точно хотите удалить данную задачу?
                </Modal.Body>
                <Modal.Footer style={{ position: 'relative' }}>
                    <Button onClick={() => { this.props.onHide() }} variant="outline-primary">Отмена</Button>
                    <Stagecontext.Consumer>
                        {method =>
                            <Button onClick={() => {
                                fetch(`/stages/${this.props.task_data.id}`,
                                    {
                                        method: 'DELETE',
                                        headers: {
                                            'Authorization': `Bearer ${getJWT()}`,
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            index: this.props.task_data.index,
                                            module: this.props.task_data.module,
                                        })
                                    }
                                ).then(
                                    () => {
                                        this.props.onHide()
                                        method()
                                    }
                                )
                            }} variant="outline-danger">Удалить</Button>
                        }
                    </Stagecontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}

class DeleteModuleModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            text: 'Выбрать исполнителя',
            formTask: '',
            formTaskStart: '',
            formTaskFin: '',
            index: ''
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Удалить модуль "{this.props.task_data.name}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы точно хотите удалить данную задачу?
                </Modal.Body>
                <Modal.Footer style={{ position: 'relative' }}>
                    <Button onClick={() => { this.props.onHide() }} variant="outline-primary">Отмена</Button>
                    <Modulecontext.Consumer>
                        {method =>
                            <Button onClick={() => {
                                fetch(`/modules/${this.props.task_data.id}`,
                                    {
                                        method: 'DELETE',
                                        headers: {
                                            'Authorization': `Bearer ${getJWT()}`,
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            index: this.props.task_data.index,
                                            project: this.props.task_data.project,
                                        })
                                    }
                                ).then(
                                    () => {
                                        this.props.onHide()
                                        method()
                                    }
                                )
                            }} variant="outline-danger">Удалить</Button>
                        }
                    </Modulecontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}

class Loading extends React.Component {
    render() {
        return (
            <>
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Загрузка...</span>
                </Button>{' '}
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />Загрузка...</Button>
            </>
        )
    }
}

class SuperTaskContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            data_iss: [],
            isLoaded: false,
            error: null,
            isOvered: false,
            isShowedCreate: false,
            isShowedEdit: false,
            isShowedDelete: false,
            isShowedSub: false,
            isShowedIssue: false
        }
    }

    componentDidMount() {
        this.GetAll()
    }

    GetAll() {
        this.setState({ isLoaded: false })
        axios.get(`/issueslst?task=${this.props.data.id}`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({
                    data_iss: data.items,
                    isLoaded: true
                })
            })
        axios.get(`/subtasks?task=${this.props.data.id}&asc.orderby=task_index`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({
                    data: data.items,
                    isLoaded: true
                })
            })
    }

    render() {
        const { isLoaded, data, error, data_iss, isOvered, isShowedCreate, isShowedEdit, isShowedDelete, isShowedSub, isShowedIssue } = this.state;
        console.log(data)
        return (
            <div className={`Item_task${this.props.data.status.id}`} style={{ borderLeft: `3px solid ${GetStatus(this.props.data.status.id)}` }}>
                <Col onMouseEnter={() => { this.setState({ isOvered: true }) }} onMouseLeave={() => { this.setState({ isOvered: false }) }}><Row style={{ position: "relative" }}>
                    <div className="d-flex align-items-center" style={{ zIndex: 1, paddingTop: 4, paddingBottom: 4 }}>Задача "{this.props.data.name}"</div>
                    {
                        isOvered
                            ? <Row style={{ marginLeft: 10 }}>
                                <AddButton onClick={() => this.setState({ isShowedCreate: true })} />
                                <EditButton onClick={() => this.setState({ isShowedEdit: true })} />
                                <DeleteButton onClick={() => this.setState({ isShowedDelete: true })} />
                                <SubButton onClick={() => this.setState({ isShowedSub: true })} />
                                <IssueButton onClick={() => this.setState({ isShowedIssue: true })} />
                            </Row>
                            : null
                    }
                    <div className="d-flex justify-content-start align-items-center" style={{ right: 0, top: 0, bottom: 0, position: "absolute" }}><div className="d-flex align-items-center" style={{ transition: 'all 300ms linear 0s', height: '100%', color: 'white', paddingLeft: 6, paddingRight: 6, borderRadius: 5, fontSize: 14, backgroundColor: GetStatus(this.props.data.status.id) }}><a>{GetDate(this.props.data.start)}-{GetDate(this.props.data.finish)}</a></div>
                        {
                            isOvered && data == null
                                ? <CalendButton status={this.props.data.status.id} />
                                : null
                        }
                    </div></Row></Col>
                {
                    isLoaded && data_iss != null
                        ? <IssueContainer> {data_iss.map(item => (
                            <InfoPanel title={item.name} date={item.date} />
                        ))} </IssueContainer>
                        : null
                }
                {
                    isLoaded && data != null
                        ? data.map(item => (
                            <Taskcontext.Provider value={() => { this.GetAll() }}>
                                <TaskContainer data={item} />
                            </Taskcontext.Provider>
                        ))
                        : !isLoaded ? <Loading /> : null
                }
                <WorkGroupContext.Consumer>
                    {data => (
                        <React.Fragment>
                            {
                                isShowedCreate
                                    ? <CreateSuperTaskModal
                                        task_data={this.props.data}
                                        data={data}
                                        show={this.state.isShowedCreate}
                                        onHide={() => this.setState({ isShowedCreate: false })} />
                                    : null
                            }
                            {
                                isShowedEdit
                                    ? <EditTaskModal
                                        data={data}
                                        show={this.state.isShowedEdit}
                                        onHide={() => this.setState({ isShowedEdit: false })} />
                                    : null
                            }
                            {
                                isShowedDelete
                                    ? <DeleteSuperTaskModal
                                        task_data={this.props.data}
                                        data={data}
                                        show={this.state.isShowedDelete}
                                        onHide={() => this.setState({ isShowedDelete: false })} />
                                    : null
                            }
                            {
                                isShowedSub
                                    ? <CreateSuperSubTaskModal
                                        task_data={this.props.data}
                                        data={data}
                                        update={() => this.GetAll()}
                                        show={this.state.isShowedSub}
                                        onHide={() => this.setState({ isShowedSub: false })} />
                                    : null
                            }
                            {
                                isShowedIssue
                                    ? <CreateIssueModal
                                        task_data={this.props.data}
                                        update={() => this.GetAll()}
                                        show={this.state.isShowedIssue}
                                        onHide={() => this.setState({ isShowedIssue: false })} />
                                    : null
                            }
                        </React.Fragment>
                    )}
                </WorkGroupContext.Consumer>
            </div>
        )
    }
}

class TaskContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            data_iss: [],
            isLoaded: false,
            error: null,
            isOvered: false,
            isShowedCreate: false,
            isShowedEdit: false,
            isShowedDelete: false,
            isShowedSub: false,
            isShowedIssue: false
        }
    }

    componentDidMount() {
        this.GetAll()
    }

    GetAll() {
        this.setState({ isLoaded: false })
        axios.get(`/issueslst?task=${this.props.data.id}`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({
                    data_iss: data.items,
                    isLoaded: true
                })
            })
        axios.get(`/subtasks?task=${this.props.data.id}&asc.orderby=task_index`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({
                    data: data.items,
                    isLoaded: true
                })
            })
    }

    render() {
        const { isLoaded, data, error, data_iss, isOvered, isShowedCreate, isShowedEdit, isShowedDelete, isShowedSub, isShowedIssue } = this.state;
        console.log(data)
        return (
            <div className={`Item_task${this.props.data.status.id}`} style={{ borderLeft: `3px solid ${GetStatus(this.props.data.status.id)}` }}>
                <Col onMouseEnter={() => { this.setState({ isOvered: true }) }} onMouseLeave={() => { this.setState({ isOvered: false }) }}><Row style={{ position: "relative" }}>
                    <div className="d-flex align-items-center" style={{ zIndex: 1, paddingTop: 4, paddingBottom: 4 }}>Задача "{this.props.data.name}"</div>
                    {
                        isOvered
                            ? <Row style={{ marginLeft: 10 }}>
                                <AddButton onClick={() => this.setState({ isShowedCreate: true })} />
                                <EditButton onClick={() => this.setState({ isShowedEdit: true })} />
                                <DeleteButton onClick={() => this.setState({ isShowedDelete: true })} />
                                <SubButton onClick={() => this.setState({ isShowedSub: true })} />
                                <IssueButton onClick={() => this.setState({ isShowedIssue: true })} />
                            </Row>
                            : null
                    }
                    <div className="d-flex justify-content-start align-items-center" style={{ right: 0, top: 0, bottom: 0, position: "absolute" }}>
                        <div className="d-flex align-items-center" style={{ transition: 'all 300ms linear 0s', height: '100%', color: 'white', paddingLeft: 6, paddingRight: 6, borderRadius: 5, fontSize: 14, backgroundColor: GetStatus(this.props.data.status.id) }}>
                            <a>{GetDate(this.props.data.start)}-{GetDate(this.props.data.finish)}</a>
                        </div>
                        {
                            isOvered && data == null
                                ? <CalendButton status={this.props.data.status.id} />
                                : null
                        }
                    </div></Row></Col>
                {
                    isLoaded && data_iss != null
                        ? <IssueContainer> {data_iss.map(item => (
                            <InfoPanel title={item.name} date={item.date} />
                        ))} </IssueContainer>
                        : null
                }
                {
                    isLoaded && data != null
                        ? data.map(item => (
                            <Taskcontext.Provider value={() => { this.GetAll() }}>
                                <TaskContainer data={item} />
                            </Taskcontext.Provider>
                        ))
                        : !isLoaded ? <Loading /> : null
                }
                <WorkGroupContext.Consumer>
                    {data => (
                        <React.Fragment>
                            {
                                isShowedCreate
                                    ? <CreateTaskModal
                                        task_data={this.props.data}
                                        data={data}
                                        show={this.state.isShowedCreate}
                                        onHide={() => this.setState({ isShowedCreate: false })} />
                                    : null
                            }
                            {
                                isShowedEdit
                                    ? <EditTaskModal
                                        data={data}
                                        show={this.state.isShowedEdit}
                                        onHide={() => this.setState({ isShowedEdit: false })} />
                                    : null
                            }
                            {
                                isShowedDelete
                                    ? <DeleteTaskModal
                                        task_data={this.props.data}
                                        data={data}
                                        show={this.state.isShowedDelete}
                                        onHide={() => this.setState({ isShowedDelete: false })} />
                                    : null
                            }
                            {
                                isShowedSub
                                    ? <CreateSubTaskModal
                                        task_data={this.props.data}
                                        data={data}
                                        update={() => this.GetAll()}
                                        show={this.state.isShowedSub}
                                        onHide={() => this.setState({ isShowedSub: false })} />
                                    : null
                            }
                            {
                                isShowedIssue
                                    ? <CreateIssueModal
                                        task_data={this.props.data}
                                        update={() => this.GetAll()}
                                        show={this.state.isShowedIssue}
                                        onHide={() => this.setState({ isShowedIssue: false })} />
                                    : null
                            }
                        </React.Fragment>
                    )}
                </WorkGroupContext.Consumer>
            </div>
        )
    }
}

class TitlePanel extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Col>
                <Col>
                    <Row>
                        <Row onClick={this.props.onClick} className="d-flex align-items-center InfoPanel" style={{ backgroundColor: 'whitesmoke', borderRadius: 4, marginBottom: 20, paddingLeft: 15, paddingRight: 15, height: 40, minWidth: 120 }}>
                            <Row>
                                <div style={{ marginLeft: 15 }} className="d-flex justify-content-center align-items-center">
                                    <img src="/assets/img/info_1.png" width="20" height="20" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p className="d-flex align-items-center" style={{ fontSize: 12, height: '100%', color: '#6E6E6E', fontWeight: 'bold', marginBottom: 0, marginLeft: 20, marginRight: 20 }}>{this.props.title}</p>
                                </div>
                                <div style={{ marginRight: 15 }} className="d-flex justify-content-center align-items-center">
                                    <img className={`Expand_${this.props.isExpanded}`} src="/assets/img/expand.png" width="20" height="20" />
                                </div>
                            </Row>
                        </Row>
                    </Row>
                </Col>
            </Col>
        )
    }
}

class IssueContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Col style={{ marginTop: 5 }}>
                <Col>
                    <Row>
                        {
                            React.Children.map(this.props.children, (child, i) => {
                                return (
                                    <React.Fragment>
                                        {
                                            i === 1
                                                ? child
                                                : null
                                        }
                                    </React.Fragment>
                                )
                            })
                        }
                        {
                            (React.Children.count(this.props.children) - 3) !== 0
                                ? <div className="d-flex align-items-center justify-content-center InButton" style={{ borderRadius: 4, padding: 6, marginLeft: 0, height: 40, minWidth: 40, }}>
                                    <a className="d-flex justify-content-center align-items-center" style={{ fontSize: 12, height: '100%', color: '#6E6E6E', fontWeight: 'bold' }}> +{React.Children.count(this.props.children) - 3}</a>
                                </div>
                                : null
                        }
                    </Row>
                </Col>
            </Col>
        )
    }
}

class InfoPanel extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <Row className="d-flex align-items-center InfoPanel" style={{ backgroundColor: 'whitesmoke', position: 'relative', borderRadius: 4, paddingLeft: 15, paddingRight: 15, height: 40, minWidth: 120, marginRight: 7 }}>
                {
                    <div style={{ marginLeft: 15 }} className="d-flex justify-content-center align-items-center">
                        <img src="/assets/img/issue_warn.png" width="20" height="20" />
                    </div>}
                <div className="d-flex justify-content-center">
                    <p className="d-flex align-items-center" style={{ fontSize: 12, height: '100%', color: '#6E6E6E', fontWeight: 'bold', marginBottom: 0, marginLeft: 35, marginRight: 35 }}>{this.props.title}</p>
                </div>
            </Row >
        )
    }
}

class AddButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div onClick={this.props.onClick} className="d-flex align-items-center InButton" style={{ borderRadius: 4, padding: 6, marginLeft: 10 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/assets/img/icon_add.png" width="20" height="20" />
                </div>
            </div>
        )
    }
}

class EditButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div onClick={this.props.onClick} className="d-flex align-items-center InButton" style={{ borderRadius: 4, padding: 6, marginLeft: 10 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/assets/img/icon_edit.png" width="20" height="20" />
                </div>
            </div>
        )
    }
}

class DeleteButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div onClick={this.props.onClick} className="d-flex align-items-center InButton" style={{ borderRadius: 4, padding: 6, marginLeft: 10 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/assets/img/icon_delete.png" width="20" height="20" />
                </div>
            </div>
        )
    }
}

class IssueButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div
                onClick={this.props.onClick}
                className="d-flex align-items-center InButton"
                style={
                    {
                        borderRadius: 4,
                        padding: 6,
                        marginLeft: 10
                    }
                }>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/assets/img/icon_issue.png"
                         width="20"
                         height="20" />
                </div>
            </div>
        )
    }
}

class CalendButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div
                onClick={this.props.onClick}
                className="d-flex align-items-center"
                style={
                    {
                        borderRadius: 4,
                        padding: 6,
                        marginLeft: 10,
                        backgroundColor: GetStatus(this.props.status)
                    }
                }>
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="/assets/img/icon_calend.png"
                        width="20"
                        height="20" />
                </div>
            </div>
        )
    }
}

class SubButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div
                onClick={this.props.onClick}
                className="d-flex align-items-center InButton"
                style={
                    {
                        borderRadius: 4,
                        padding: 6,
                        marginLeft: 10
                    }
                }>
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="/assets/img/icon_sub.png"
                        width="20"
                        height="20" />
                </div>
            </div>
        )
    }
}

const styles = {
    itemStyle: {
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
}
