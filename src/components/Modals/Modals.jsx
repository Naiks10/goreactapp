import React from "react"
import { Button, Row, Col, Modal, Form, Popover, OverlayTrigger, FormCheck } from "react-bootstrap"
import Tass from "./Chart"
import { getJWT } from "../Functions/Funcs"

import "animate.css"

export function ClientsTableModalView(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Просмотр учётной записи <b>{props.items.user.login}</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Персональные данные</h5>
                <Form.Group as={Col}>
                    <Row>
                        <Form.Label column sm="2">Фамилия:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.surname} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Имя:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.name} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Отчество:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.midname} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Телефон:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.phone} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">E-mail:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.mail} />
                        </Col>
                    </Row>
                </Form.Group>
                <h5>Информация об организации</h5>
                <Form.Group as={Col}>
                    <Row>
                        <Form.Label column sm="3">Код организации (ID):</Form.Label>
                        <Col sm="7">
                            <Form.Control plaintext readOnly defaultValue={props.items.organisation.id} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="3">Организация:</Form.Label>
                        <Col sm="7">
                            <Form.Control plaintext readOnly defaultValue={props.items.organisation.name} />
                        </Col>
                    </Row>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Закрыть окно</Button>
            </Modal.Footer>
        </Modal>
    );
}

export function DevelopersTableModalView(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Просмотр учётной записи <b>{props.items.login}</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Персональные данные</h5>
                <Form.Group as={Col}>
                    <Row>
                        <Form.Label column sm="2">Фамилия:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.surname} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Имя:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.name} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Отчество:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.midname} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Телефон:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.phone} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">E-mail:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.mail} />
                        </Col>
                    </Row>
                </Form.Group>
                <h5>Информация о бригаде</h5>
                <Form.Group as={Col}>
                    <Row>
                        <Form.Label column sm="3">Код организации (ID):</Form.Label>
                        <Col sm="7">
                            <Form.Control plaintext readOnly defaultValue={props.items.workgroup.id} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="3">Организация:</Form.Label>
                        <Col sm="7">
                            <Form.Control plaintext readOnly defaultValue={props.items.workgroup.name} />
                        </Col>
                    </Row>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Закрыть окно</Button>
            </Modal.Footer>
        </Modal>
    );
}

export function ProjectsTableModalView(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Просмотр состояние проекта - код <b>{props.items.id}</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Основные данные</h5>
                <Form.Group as={Col}>
                    <Row>
                        <Form.Label column sm="2">Клиент:</Form.Label>
                        <Col sm="4">
                            <OverlayTrigger
                                delay={{ show: 250, hide: 400 }}
                                placement="bottom"
                                overlay={
                                    <Popover>
                                        <Popover.Title as="h3">{`Информация`}</Popover.Title>
                                        <Popover.Content>
                                            <ul>
                                                <li><strong>Телефон :</strong> {props.items.client.user.phone}</li>
                                                <li><strong>E-mail :</strong> {props.items.client.user.mail}</li>
                                                <li><strong>Организация :</strong> {props.items.client.organisation.name}</li>
                                            </ul>
                                        </Popover.Content>
                                    </Popover>
                                }
                            >
                                <Form.Control plaintext readOnly defaultValue={props.items.client.user.surname + ' ' + props.items.client.user.name + ' ' + props.items.client.user.midname + ' [?]'} />
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Менеджер:</Form.Label>
                        <Col sm="4">
                            <OverlayTrigger
                                delay={{ show: 250, hide: 400 }}
                                placement="bottom"
                                overlay={
                                    <Popover>
                                        <Popover.Title as="h3">{`Информация`}</Popover.Title>
                                        <Popover.Content>
                                            <ul>
                                                <li><strong>Телефон :</strong> {props.items.manager.user.phone}</li>
                                                <li><strong>E-mail :</strong> {props.items.manager.user.mail}</li>
                                            </ul>
                                        </Popover.Content>
                                    </Popover>
                                }
                            >
                                <Form.Control plaintext readOnly defaultValue={props.items.manager.user.surname + ' ' + props.items.manager.user.name + ' ' + props.items.manager.user.midname + ' [?]'} />
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Стоимость:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.cost + '₽'} />
                        </Col>
                    </Row>
                </Form.Group>
                <h5>Движение проекта</h5>
                <Form.Group as={Col}>
                    <Row>
                        <Form.Label column sm="3">Статус:</Form.Label>
                        <Col sm="7">
                            <Form.Control plaintext readOnly defaultValue={props.items.status.name} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="3">Информация:</Form.Label>
                        <Col sm="7">
                            <Form.Control plaintext readOnly defaultValue={props.items.info} />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Tass />
                    </Row>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Закрыть окно</Button>
            </Modal.Footer>
        </Modal>
    );
}

export function ManagersTableModalView(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Просмотр учётной записи <b>{props.items.user.login}</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Персональные данные</h5>
                <Form.Group as={Col}>
                    <Row>
                        <Form.Label column sm="2">Фамилия:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.surname} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Имя:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.name} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Отчество:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.midname} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Телефон:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.phone} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">E-mail:</Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={props.items.user.mail} />
                        </Col>
                    </Row>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Закрыть окно</Button>
            </Modal.Footer>
        </Modal>
    );
}

export class ClientsTableModalEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            Orgs: [],
            SelectValue: '',
        }
    }
    componentDidMount() {

        var jwt = getJWT()

        fetch("/orgs", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        Orgs: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    callThis = (e) => {
        var jwt = getJWT()
        var s = ''
        this.setState({ selectValue: e.target.value }, () => {
            s = this.state.selectValue;
            fetch("/clients/" + this.props.items.user.login, {
                method: "put",
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    organisation: { id: s }
                })
            })
        })
    }

    render() {
        const { isLoaded, Orgs, error } = this.state
        var fstname = React.createRef();
        var midname = React.createRef();
        var lstname = React.createRef();
        var phone = React.createRef();
        var email = React.createRef();
        var birthdate = React.createRef();

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Редактирование учётной записи <b>{this.props.items.user.login}</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Персональные данные</h5>
                    <Form.Group as={Col}>
                        <Form.Label column sm="2">Фамилия</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={lstname} defaultValue={this.props.items.user.surname} />
                        </Col>
                        <Form.Label column sm="2">Имя</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={fstname} defaultValue={this.props.items.user.name} />
                        </Col>
                        <Form.Label column sm="2">Отчество</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={midname} defaultValue={this.props.items.user.midname} />
                        </Col>
                        <Form.Label column sm="2">Дата рождения</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={birthdate} defaultValue={this.props.items.user.birthdate} />
                        </Col>
                        <Form.Label column sm="2">Телефон</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={phone} defaultValue={this.props.items.user.phone} />
                        </Col>
                        <Form.Label column sm="2">E-mail</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={email} type="email" placeholder="Email" defaultValue={this.props.items.user.mail} />
                        </Col>
                    </Form.Group>
                    <h5>Информация об организации</h5>
                    <Form.Group as={Col}>
                        <Form.Label column sm="3">Организация</Form.Label>
                        <Col sm="7">
                            <Form.Control as="select" defaultValue={this.props.items.organisation.id} onChange={this.callThis}>
                                {Orgs.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={() => {
                        var jwt = getJWT()
                        fetch("/users/" + this.props.items.user.login,
                            {
                                method: "put",
                                headers: {
                                    'Authorization': `Bearer ${jwt}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    name: fstname.current.value,
                                    midname: midname.current.value,
                                    surname: lstname.current.value,
                                    phone: phone.current.value,
                                    birthdate: birthdate.current.value,
                                })
                            })
                            .then(this.props.velt())
                            .then(this.props.onHide())
                    }}>Сохранить изменения</Button>
                    <Button variant="primary" onClick={() => { this.props.velt(); this.props.onHide() }}>Сохранить как копию</Button>
                    <Button variant="danger" onClick={this.props.onHide}>Отменить и закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export class DevelopersTableModalEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            Groups: [],
            SelectValue: '',
        }
    }
    componentDidMount() {

        var jwt = getJWT()

        fetch("/groups", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        Groups: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    callThis = (e) => {
        var jwt = getJWT()
        var s = ''
        this.setState({ selectValue: e.target.value }, () => {
            s = this.state.selectValue;
            fetch("/devs/" + this.props.items.user.login, {
                method: "put",
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    project: this.state.SelectValue
                })
            })
        })
    }


    render() {
        const { isLoaded, Groups, error } = this.state
        var fstname = React.createRef();
        var midname = React.createRef();
        var lstname = React.createRef();
        var phone = React.createRef();
        var id = React.createRef();
        var email = React.createRef();
        var birthdate = React.createRef();

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Редактирование учётной записи <b>{this.props.items.user.login}</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Персональные данные</h5>
                    <Form.Group as={Col}>
                        <Form.Label column sm="2">Фамилия</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={lstname} defaultValue={this.props.items.user.surname} />
                        </Col>
                        <Form.Label column sm="2">Имя</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={fstname} defaultValue={this.props.items.user.name} />
                        </Col>
                        <Form.Label column sm="2">Отчество</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={midname} defaultValue={this.props.items.user.midname} />
                        </Col>
                        <Form.Label column sm="2">Дата рождения</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={birthdate} defaultValue={this.props.items.user.birthdate} />
                        </Col>
                        <Form.Label column sm="2">Телефон</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={phone} defaultValue={this.props.items.user.phone} />
                        </Col>
                        <Form.Label column sm="2">E-mail</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={email} type="email" placeholder="Email" defaultValue={this.props.items.user.mail} />
                        </Col>
                    </Form.Group>
                    <h5>Информация об бригаде</h5>
                    <Form.Group as={Col}>
                        <Col sm="7">
                            <Form.Check as="input" id="1" variant="primary" custom inline label="Руководитель группы" type="checkbox" />
                        </Col>
                        <Form.Label column sm="3">Группа</Form.Label>
                        <Col sm="7">
                            <Form.Control as="select" defaultValue={this.props.items.workgroup.id} onChange={this.callThis}>
                                {Groups.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={() => {
                        var jwt = getJWT()
                        fetch("/users/" + this.props.items.user.login,
                            {
                                method: "put",
                                headers: {
                                    'Authorization': `Bearer ${jwt}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    name: fstname.current.value,
                                    midname: midname.current.value,
                                    surname: lstname.current.value,
                                    phone: phone.current.value,
                                    birthdate: birthdate.current.value,
                                })
                            })
                            .then(this.props.velt())
                            .then(this.props.onHide())
                    }}>Сохранить изменения</Button>
                    <Button variant="primary" onClick={this.props.onHide}>Сохранить как копию</Button>
                    <Button variant="danger" onClick={this.props.onHide}>Отменить и закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export class ManagersTableModalEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            Prs: [],
            SelectValue: '',
        }
    }
    componentDidMount() {

        var jwt = getJWT()

        fetch("/projects", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        Prs: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const { isLoaded, Prs, error } = this.state
        var fstname = React.createRef();
        var midname = React.createRef();
        var lstname = React.createRef();
        var phone = React.createRef();
        var id = React.createRef();
        var email = React.createRef();
        var birthdate = React.createRef();

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Редактирование учётной записи <b>{this.props.items.user.login}</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Персональные данные</h5>
                    <Form.Group as={Col}>
                        <Form.Label column sm="2">Фамилия</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={lstname} defaultValue={this.props.items.user.surname} />
                        </Col>
                        <Form.Label column sm="2">Имя</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={fstname} defaultValue={this.props.items.user.name} />
                        </Col>
                        <Form.Label column sm="2">Отчество</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={midname} defaultValue={this.props.items.user.midname} />
                        </Col>
                        <Form.Label column sm="2">Дата рождения</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={birthdate} defaultValue={this.props.items.user.birthdate} />
                        </Col>
                        <Form.Label column sm="2">Телефон</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={phone} defaultValue={this.props.items.user.phone} />
                        </Col>
                        <Form.Label column sm="2">E-mail</Form.Label>
                        <Col sm="7">
                            <Form.Control ref={email} type="email" placeholder="Email" defaultValue={this.props.items.user.mail} />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={() => {
                        var jwt = getJWT()
                        fetch("/users/" + this.props.items.user.login,
                            {
                                method: "put",
                                headers: {
                                    'Authorization': `Bearer ${jwt}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    name: fstname.current.value,
                                    midname: midname.current.value,
                                    surname: lstname.current.value,
                                    phone: phone.current.value,
                                    birthdate: birthdate.current.value,
                                })
                            })
                            .then(this.props.velt())
                            .then(this.props.onHide())
                    }}>Сохранить изменения</Button>
                    <Button variant="primary" onClick={this.props.onHide}>Сохранить как копию</Button>
                    <Button variant="danger" onClick={this.props.onHide}>Отменить и закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export function ClientsTableModalDelete(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление учётной записи
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Удалить учётную запись <i>"{props.items.user.login}"</i>?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Удалить</Button>
                <Button variant="primary" onClick={props.onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export function ManagersTableModalDelete(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление учётной записи
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Удалить учётную запись <i>"{props.items.login}"</i>?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Удалить</Button>
                <Button variant="primary" onClick={props.onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export function DevelopersTableModalDelete(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление учётной записи
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Удалить учётную запись <i>"{props.items.login}"</i>?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Удалить</Button>
                <Button variant="primary" onClick={props.onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}