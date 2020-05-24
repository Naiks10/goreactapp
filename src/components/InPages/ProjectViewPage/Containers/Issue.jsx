import React from "react";
import { Row, Col, Modal, Form, Button, Accordion, Card } from "react-bootstrap";
import { getJWT } from "../../../Functions/Funcs"
import { ProjectValueContext } from "../Consts";

export class IssueContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false
        }
    }


    componentDidMount() {
        console.log(this.props.children)
        if (this.props.children !== null) {

        }
    }

    render() {
        return (
            <Col style={{ marginTop: 5 }}>
                <Col><Row onClick={() => this.setState({ isShow: true })}>
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
                            ? <div
                                className="d-flex align-items-center justify-content-center InButton"
                                style={
                                    {
                                        borderRadius: 4,
                                        padding: 6,
                                        marginLeft: 0,
                                        height: 40,
                                        minWidth: 40
                                    }
                                }>
                                <a
                                    className="d-flex justify-content-center align-items-center"
                                    style={
                                        {
                                            fontSize: 12,
                                            height: '100%',
                                            color: '#6E6E6E',
                                            fontWeight: 'bold'
                                        }
                                    }>
                                    +{React.Children.count(this.props.children) - 3}
                                </a>
                            </div>
                            : null
                    }
                </Row></Col>
                {this.state.isShow ?
                    <Modal centered size="lg" show={this.state.isShow} onHide={() => this.setState({ isShow: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title>Список проблем <Button onClick={() => this.props.onCreate()} style={{ marginLeft: 20 }} variant="primary">Создать</Button></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Accordion>
                                {this.props.data.map((child, i) => {
                                    return (
                                        <Card>
                                            <Card.Header>
                                                <Row>
                                                    <Col xs={6}>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey={i}>
                                                            {child.name} ({(() => {
                                                                var dt = new Date(child.date)
                                                                return dt.toLocaleDateString("ru-RU")
                                                            })()})
                                                    </Accordion.Toggle>
                                                    </Col>
                                                    <Col style={{ position: 'relative' }}>
                                                        {child.status
                                                            ? <Button style={{ position: 'absolute', right: 20 }} disabled={true} variant="success">Закрыто</Button>
                                                            : <ProjectValueContext.Consumer>
                                                                {value =>
                                                                    <Button onClick={() => {
                                                                        fetch(`/issueslst/${child.id}`, {
                                                                            headers: {
                                                                                'Authorization': `Bearer ${getJWT()}`
                                                                            },
                                                                            method: "PUT"
                                                                        }).then(
                                                                            () => { 
                                                                                this.props.update() 
                                                                                value.updateValue(value.id)
                                                                            }
                                                                        )
                                                                    }} style={{ position: 'absolute', right: 20 }} variant="danger">Закрыть проблему</Button>
                                                                }
                                                            </ProjectValueContext.Consumer>
                                                        }

                                                    </Col>
                                                </Row>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={i}>
                                                <Card.Body>{child.desc}</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    )
                                })}
                            </Accordion>
                        </Modal.Body>
                    </Modal>
                    : null}
            </Col>
        )
    }
}

export class CreateIssueModal extends React.Component {
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

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Описать новую проблему</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название проблемы</Form.Label>
                        <Form.Control
                            placeholder="Введите название проблемы"
                            onChange={(e) => { this.setState({ formTask: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Описание проблемы</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="5"
                            placeholder="Опишите свою проблему"
                            onChange={(e) => { this.setState({ formDesc: e.target.value }) }} />
                    </Form.Group>
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