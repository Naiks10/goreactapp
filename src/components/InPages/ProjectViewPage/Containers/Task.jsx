import React from "react";
import axios from 'axios';
import { IssueContainer, CreateIssueModal } from "./Issue"
import { Row, Col, Modal, Form, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { Loading } from './LoadingContainer'
import { AddButton, EditButton, DeleteButton, SubButton, IssueButton, CalendButton, StatusButton } from "../Buttons"
import { InfoPanel } from '../Panels'
import { WorkGroupContext, Taskcontext, SuperTaskcontext, GetDate, GetStatus, ProjectValueContext } from '../Consts'
import { getJWT } from "../../../Functions/Funcs"
import { CustomMenu, CustomToggle } from "./CustomControl";

//SuperTaskContainer 
//... => Stage => SuperTaskContainer => TaskContainer => ... => IssueContainer
export class SuperTaskContainer extends React.Component {
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
            isShowedIssue: false,
            isShowedStatus : false
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
        const { isLoaded, data, error, data_iss, isOvered, isShowedCreate, isShowedEdit, isShowedDelete, isShowedSub, isShowedIssue, isShowedStatus } = this.state;
        return (
            <div
                className={`Item_task${this.props.data.status.id}`}
                style={
                    {
                        borderLeft: `3px solid ${GetStatus(this.props.data.status.id)}`
                    }
                }
            >
                <Col
                    onMouseEnter={() => { this.setState({ isOvered: true }) }}
                    onMouseLeave={() => { this.setState({ isOvered: false }) }}>
                    <Row style={{ position: "relative" }}>
                        <div
                            className="d-flex align-items-center"
                            style={
                                {
                                    zIndex: 1,
                                    paddingTop: 4,
                                    paddingBottom: 4
                                }
                            }>Задача "{this.props.data.name}"</div>
                        {
                            isOvered
                                ? <Row style={{ marginLeft: 10 }}>
                                    <AddButton onClick={() => this.setState({ isShowedCreate: true })} />
                                    <EditButton onClick={() => this.setState({ isShowedEdit: true })} />
                                    <DeleteButton onClick={() => this.setState({ isShowedDelete: true })} />
                                    <StatusButton onClick={() => this.setState({ isShowedStatus: true })} />
                                    <SubButton onClick={() => this.setState({ isShowedSub: true })} />
                                    <IssueButton onClick={() => this.setState({ isShowedIssue: true })} />
                                </Row>
                                : null
                        }
                        <div
                            className="d-flex justify-content-start align-items-center"
                            style={
                                {
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    position: "absolute"
                                }
                            }>
                            <div className="d-flex align-items-center"
                                style={
                                    {
                                        transition: 'all 300ms linear 0s',
                                        height: '100%',
                                        color: 'white',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        borderRadius: 5,
                                        fontSize: 14,
                                        backgroundColor: GetStatus(this.props.data.status.id)
                                    }}>
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
                            {
                                isShowedStatus
                                    ? <StatusTaskModal
                                        task_data={this.props.data}
                                        update={() => this.GetAll()}
                                        show={this.state.isShowedStatus}
                                        onHide={() => this.setState({ isShowedStatus: false })} />
                                    : null
                            }
                        </React.Fragment>
                    )}
                </WorkGroupContext.Consumer>
            </div>
        )
    }
}

//TaskContainer 
//... => Stage => SuperTaskContainer => TaskContainer => ... => IssueContainer
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
                                <StatusButton onClick={() => this.setState({ isShowedDelete: true })} />
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
                    <Modal.Title>Создать новую задачу после задачи "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control
                            placeholder="Введите название задачи"
                            onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Исполнитель</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-custom-components">
                                {this.state.text}
                            </Dropdown.Toggle>
                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    this.props.data.map(item => (
                                        <Dropdown.Item
                                            eventKey={item.developer_login}
                                            onSelect={(e) => {
                                                this.setState(
                                                    {
                                                        index: e,
                                                        text: item.dev_name
                                                    }
                                                )
                                            }}>
                                            <Row style={{ position: 'relative' }}>
                                                <img
                                                    style={
                                                        {
                                                            position: 'absolute',
                                                            right: 0
                                                        }
                                                    }
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
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата начала"
                                onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата конца"
                                onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            this.props.onHide();
                            this.setState({ text: 'Выбрать исполнителя' })
                        }
                        }
                        variant="outline-primary">Отмена</Button>
                    <SuperTaskcontext.Consumer>
                        {user =>
                            <ProjectValueContext.Consumer>
                                {value =>
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
                                                    value.updateValue(value.id)
                                                }
                                            )
                                    }}
                                        variant="outline-success">Создать</Button>
                                }
                            </ProjectValueContext.Consumer>
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
                    <Modal.Title>Создать новую задачу после задачи "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control
                            placeholder="Введите название задачи"
                            onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Исполнитель</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-custom-components">
                                {this.state.text}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    this.props.data.map(item => (
                                        <Dropdown.Item
                                            eventKey={item.developer_login}
                                            onSelect={
                                                (e) => {
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
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата начала"
                                onChange={(e) => {
                                    this.setState({ formTaskStart: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата конца"
                                onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            this.props.onHide();
                            this.setState({ text: 'Выбрать исполнителя' })
                        }}
                        variant="outline-primary">Отмена</Button>
                    <Taskcontext.Consumer>
                        {user =>
                            <ProjectValueContext.Consumer>
                                {value =>
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
                                                    value.updateValue(value.id)
                                                }
                                            )
                                    }}
                                        variant="outline-success">Создать</Button>
                                }
                            </ProjectValueContext.Consumer>
                        }
                    </Taskcontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}

export class CreateStageSubTaskModal extends React.Component {
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
                    <Modal.Title>Создать новую задачу в этапе "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control
                            placeholder="Введите название задачи"
                            onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Исполнитель</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-custom-components">
                                {this.state.text}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    this.props.data.map(item => (
                                        <Dropdown.Item
                                            eventKey={item.developer_login}
                                            onSelect={
                                                (e) => {
                                                    this.setState(
                                                        {
                                                            index: e,
                                                            text: item.dev_name
                                                        }
                                                    )
                                                }}>
                                            <Row style={{ position: 'relative' }}>
                                                <img
                                                    style={{ position: 'absolute', right: 0 }}
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
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата начала"
                                onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата конца"
                                onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            this.props.onHide();
                            this.setState({ text: 'Выбрать исполнителя' })
                        }}
                        variant="outline-primary">Отмена</Button>
                    <ProjectValueContext.Consumer>
                        {value =>
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
                                            value.updateValue(value.id)
                                        }
                                    )
                            }}
                                variant="outline-success">Создать</Button>
                        }
                    </ProjectValueContext.Consumer>
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
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата начала"
                                onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата конца"
                                onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            this.props.onHide();
                            this.setState({ text: 'Выбрать исполнителя' })
                        }}
                        variant="outline-primary">Отмена</Button>
                    <ProjectValueContext.Consumer>
                        {value =>
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
                                            value.updateValue(value.id)
                                        }
                                    )
                            }}
                                variant="outline-success">Создать</Button>
                        }
                    </ProjectValueContext.Consumer>
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
                    <Modal.Title>Создать новую подзадачу в задача "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control
                            placeholder="Введите название задачи"
                            onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Исполнитель</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-custom-components">
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
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата начала"
                                onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата конца"
                                onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            this.props.onHide();
                            this.setState({ text: 'Выбрать исполнителя' })
                        }}
                        variant="outline-primary">Отмена</Button>
                    <ProjectValueContext.Consumer>
                        {value =>
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
                                            value.updateValue(value.id)
                                        }
                                    )
                            }}
                                variant="outline-success">Создать</Button>
                        }
                    </ProjectValueContext.Consumer>
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
                    <Modal.Title>Создать новую задачу</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control
                            placeholder="Введите название задачи"
                            onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Исполнитель</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-custom-components">
                                {this.state.text}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    this.props.data.map(item => (
                                        <Dropdown.Item
                                            eventKey={item.developer_login}
                                            onSelect={(e) => {
                                                this.setState(
                                                    {
                                                        index: e,
                                                        text: item.dev_name
                                                    }
                                                )
                                            }}>
                                            <Row
                                                style={{ position: 'relative' }}>
                                                <img
                                                    style={
                                                        {
                                                            position: 'absolute',
                                                            right: 0
                                                        }
                                                    }
                                                    width="20"
                                                    height="20"
                                                    src={`/${item.user_image_src}`} />
                                                {item.dev_name}
                                            </Row>
                                        </Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateStart">
                            <Form.Label>Дата начала (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата начала"
                                onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            controlId="formBasicDateFinish">
                            <Form.Label>Дата окончания (плановавая)</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата конца"
                                onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer style={{ position: 'relative' }}>
                    <Dropdown style={
                        {
                            position: 'absolute',
                            left: 15
                        }
                    }>
                        <Dropdown.Toggle id="dropdown-custom-components">Статус</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Red-Orange</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button
                        onClick={() => {
                            this.props.onHide();
                            this.setState({ text: 'Выбрать исполнителя' })
                        }}
                        variant="outline-primary">Отмена</Button>
                    <Button
                        onClick={() => { alert(this.state.index) }}
                        variant="outline-warning">Изменить</Button>
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
                    <Modal.Title>Удалить задачу "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы точно хотите удалить данную задачу?</Modal.Body>
                <Modal.Footer style={{ position: 'relative' }}>
                    <Button onClick={() => { this.props.onHide() }} variant="outline-primary">Отмена</Button>
                    <SuperTaskcontext.Consumer>
                        {method =>
                            <ProjectValueContext.Consumer>
                                {value =>
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
                                                value.updateValue(value.id)
                                            }
                                        )
                                    }}
                                        variant="outline-danger">Удалить</Button>
                                }
                            </ProjectValueContext.Consumer>
                        }
                    </SuperTaskcontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}

class StatusTaskModal extends React.Component {
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
                <Modal.Header closeButton>
                    <Modal.Title>Статус задачи "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ButtonGroup vertical style={{width : '100%'}}>
                        <Button variant="light">Не начат</Button>
                        <Button variant="primary">В разработке</Button>
                        <Button variant="warning">На отладке</Button>
                        <Button variant="danger">В тестирование</Button>
                        <Button variant="dark">Готов</Button>
                        <Button variant="success">Отменён</Button>
                    </ButtonGroup>
                </Modal.Body>
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
                    <Modal.Title>Удалить задачу "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы точно хотите удалить данную задачу?</Modal.Body>
                <Modal.Footer style={{ position: 'relative' }}>
                    <Button
                        onClick={() => { this.props.onHide() }}
                        variant="outline-primary">Отмена</Button>
                    <Taskcontext.Consumer>
                        {method =>
                            <ProjectValueContext.Consumer>
                                {value =>
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
                                                value.updateValue(value.id)
                                            }
                                        )
                                    }}
                                        variant="outline-danger">Удалить</Button>
                                }
                            </ProjectValueContext.Consumer>
                        }
                    </Taskcontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}