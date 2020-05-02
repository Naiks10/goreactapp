import React from "react";
import {Row, Col, Modal, Form, Button} from "react-bootstrap";
import { getJWT } from "../../../Functions/Funcs"

export class IssueContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Col style={{ marginTop: 5 }}>
                <Col><Row>
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
                    }}
                        variant="outline-success">Создать</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}