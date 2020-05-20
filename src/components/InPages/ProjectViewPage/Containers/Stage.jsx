import React from "react";
import axios from 'axios';
import { SuperTaskContainer, CreateStageSubTaskModal } from './Task'
import {Row, Col, Modal, Form, Button} from "react-bootstrap";
import { AddButton, EditButton, DeleteButton, SubButton } from "../Buttons"
import { WorkGroupContext, Taskcontext, SuperTaskcontext, Stagecontext, GetDate, GetStatus } from '../Consts'
import { getJWT } from "../../../Functions/Funcs"

//StageContainer 
//Module => Stage => SuperTaskContainer => ...
export class StageContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            isOvered: false,
            isShowedCreate: false,
            isShowedDelete: false,
            isShowedSub: false,
            task_status : 2,
            task_array : [],
            mode_new : true,
            up : false,
        }
    }

    componentDidMount() {
        this.updateAndGetMethod()
        this.props.upd()
    }

    FORCE_UPDATE() {
        this.setState({task_array: []})
        this.props.forceUPD()
    }

    func() {
        this.setState({ up: true }, () => {
            this.setState({ up: false })
        })
        this.setState({ mode_new: true })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.data != this.state.data) {
            this.props.upd()
            this.setState({ mode_new: true })
        }
    }

    SetStatus = (value) => {
     if (this.state.mode_new) {
            this.setState({ task_array: [] }, () => {
                var tasks = this.state.task_array
                tasks.push(value)
                var max = Math.max(...tasks)
                this.setState({ task_status: max, task_array: tasks })
                this.props.SetStatus(max)
            })
        } else {
            var tasks = this.state.task_array
            tasks.push(value)
            var max = Math.max(...tasks)
            this.setState({ task_status: max, task_array: tasks })
            this.props.SetStatus(max) 
        }
        this.setState({mode_new : false})
    }

    updateAndGetMethod() {
        this.setState({ isLoaded: false })
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
        return (
            <div
                className={`Item_task${this.state.task_status}`}
                style={{ borderLeft: `3px solid ${GetStatus(this.state.task_status)}` }}>
                <Col onMouseEnter={() => { this.setState({ isOvered: true }) }}
                    onMouseLeave={() => { this.setState({ isOvered: false }) }}>
                    <Row style={{ position: "relative" }}>
                        <div
                            className="d-flex align-items-center"
                            style={
                                {
                                    zIndex: 1,
                                    paddingTop: 4,
                                    paddingBottom: 4,
                                    color : this.state.task_status <= 1  ? '#6e6e6e' : 'black',
                                    textDecoration : this.state.task_status <= 1  ? 'line-through' : null

                                }
                            }
                        >Этап "{this.props.data.name}"</div>
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
                                    color: this.state.task_status !== 3  ? 'white' : 'black',
                                    paddingLeft: 6,
                                    paddingRight: 6,
                                    borderRadius: 5,
                                    fontSize: 14,
                                    backgroundColor: GetStatus(this.state.task_status)
                                }}>
                            <a>{GetDate(this.props.data.start)}-{GetDate(this.props.data.finish)}</a>
                        </div>
                    </Row>
                </Col>
                {
                    isLoaded && data != null
                        ? data.map(item => (
                            <SuperTaskcontext.Provider value={() => { this.updateAndGetMethod() }}>
                                <SuperTaskContainer forceUPD={() => this.FORCE_UPDATE()} up={this.props.up} upd={() => this.props.upd()} SetStatus={this.SetStatus} data={item} />
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
                    <Modal.Title>Создать новый этап разработки после этапа "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название этапа</Form.Label>
                        <Form.Control
                            placeholder="Введите название этапа"
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
                            }}
                                variant="outline-success">Создать</Button>
                        }
                    </Stagecontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}

export class CreateSubStageModal extends React.Component {
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
                    <Modal.Title>Создать новый этап в модуле "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название этапа</Form.Label>
                        <Form.Control
                            placeholder="Введите название этапа"
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
                    <Button onClick={() => {
                        this.props.onHide();
                        this.setState({ text: 'Выбрать исполнителя' })
                    }}
                        variant="outline-primary">Отмена</Button>
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
                    }}
                        variant="outline-success">Создать</Button>
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
                    <Modal.Title>Удалить этап "{this.props.task_data.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы точно хотите удалить данную задачу?</Modal.Body>
                <Modal.Footer style={{ position: 'relative' }}>
                    <Button
                        onClick={() => { this.props.onHide() }}
                        variant="outline-primary">Отмена</Button>
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
                            }}
                                variant="outline-danger">Удалить</Button>
                        }
                    </Stagecontext.Consumer>
                </Modal.Footer>
            </Modal>
        )
    }
}