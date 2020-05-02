import React from "react"
import axios from 'axios';
import { StageContainer, CreateSubStageModal } from './Stage'
import {Row, Col, Modal, Form, Button} from "react-bootstrap";
import { AddButton, EditButton, DeleteButton, SubButton } from "../Buttons"
import { Modulecontext, Stagecontext, Taskcontext, GetDate, GetStatus } from '../Consts'
import { getJWT } from "../../../Functions/Funcs"

export class ModuleContainer extends React.Component {
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
        this.setState({ isLoaded: false })
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
        return (
            <div
                className={`Item_task${this.props.data.status.id}`}
                style={{ borderLeft: `3px solid ${GetStatus(this.props.data.status.id)}` }}>
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
                            }>Модуль "{this.props.data.name}"</div>
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
                                }}>
                            <a>{GetDate(this.props.data.start)}-{GetDate(this.props.data.finish)}</a>
                        </div>
                    </Row>
                </Col>
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
                    <Modal.Title>Создать новый модуль после модуля "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название модуля</Form.Label>
                        <Form.Control
                            placeholder="Введите название модуля"
                            onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
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
                            }}
                                variant="outline-success">Создать</Button>
                        }
                    </Modulecontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}

export class CreateSubModuleModal extends React.Component {
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
                    <Modal.Title>Создать новый модуль в проекте</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название модуля</Form.Label>
                        <Form.Control
                            placeholder="Введите название модуля"
                            onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
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
                    }}
                        variant="outline-success">Создать</Button>
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
                    <Modal.Title>Удалить модуль "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы точно хотите удалить данную задачу?</Modal.Body>
                <Modal.Footer style={{ position: 'relative' }}>
                    <Button
                        onClick={() => { this.props.onHide() }}
                        variant="outline-primary">Отмена</Button>
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
                            }} 
                            variant="outline-danger">Удалить</Button>
                        }
                    </Modulecontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}