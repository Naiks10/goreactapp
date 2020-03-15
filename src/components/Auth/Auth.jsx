import React from 'react'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { getJWT } from '../Functions/Funcs'

//#--Auth-page-class--#//

export class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            isOpened: false,
            Orgs: [],
            SelectValue: ''
        }
        this.change = this.change.bind(this)
        this.submit = this.submit.bind(this)
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    changeList(e) {
        this.setState({
            SelectValue: e.target.value
        });
    }

    submit(e) {
        e.preventDefault()

        var isError = false

        axios
            .post("/get-token", {
                login: this.state.login,
                password: this.state.password
            })
            .then(res => localStorage.setItem('jwt', res.data))
            .catch(error => {
                alert(error)
                isError = true
                localStorage.removeItem('jwt')
            })
            .then(() => {
                if (!isError) {
                    window.location.replace("/workspace/start")
                }
            })
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
                method: "post",
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
        var login = React.createRef();
        var password = React.createRef();
        var password_check = React.createRef();
        var fstname = React.createRef();
        var midname = React.createRef();
        var lstname = React.createRef();
        var phone = React.createRef();
        var email = React.createRef();
        var birthdate = React.createRef();

        return (
            <div style={{ height: '100%' }}>
                <div style={{ height: '30%' }}></div>
                <Container className="bg-white animated fadeIn mx-auto" style={styles.bodyStyle}>
                    <Helmet title="Авторизация" bodyAttributes={{ style: 'background-color : #2098D1' }} />
                    <Row style={{ verticalAlign: 'middle', height: "100%" }}>
                        <Col style={{ verticalAlign: "middle" }}>
                            <h1 style={{ textAlign: "center" }}>ВХОД</h1>
                            <Form style={{ verticalAlign: "middle", height: "100%" }}>
                                <div>
                                    <Form.Group as={Col} style={{ width: "50%" }}>
                                        <Form.Label column sm={2}>Логин</Form.Label>
                                        <Col>
                                            <Form.Control type="text" name="login" onChange={e => this.change(e)} value={this.state.login} placeholder="Введите логин" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col} style={{ width: "50%" }} controlId="formHorizontalPassword">
                                        <Form.Label column sm={2}>Пароль</Form.Label>
                                        <Col>
                                            <Form.Control type="password" name="password" onChange={e => this.change(e)} value={this.state.password} placeholder="Введите пароль" />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <div className="d-flex align-items-center" style={{ position: "absolute", bottom: 0 }}>
                                    <Link onClick={e => this.submit(e)} className="btn btn-outline-primary">Войти в систему</Link>
                                    <Button variant="primary" style={{ marginLeft: 10 }} onClick={() => { this.setState({ isOpened: true }) }}>Зарегистрироваться</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <Modal
                    onHide={() => { this.setState({ isOpened: false }) }}
                    show={this.state.isOpened}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Создание учётной записи клиента
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Персональные данные</h5>
                        <Form.Group as={Col}>
                            <Form.Label column sm="2">Фамилия</Form.Label>
                            <Col sm="7">
                                <Form.Control ref={lstname} placeholder="Ваша фамилия" />
                            </Col>
                            <Form.Label column sm="2">Имя</Form.Label>
                            <Col sm="7">
                                <Form.Control ref={fstname} placeholder="Ваше имя" />
                            </Col>
                            <Form.Label column sm="2">Отчество</Form.Label>
                            <Col sm="7">
                                <Form.Control ref={midname} placeholder="Ваше отчество" />
                            </Col>
                            <Form.Label column sm="2">Дата рождения</Form.Label>
                            <Col sm="7">
                                <Form.Control ref={birthdate} placeholder="Ваша дата рождения" />
                            </Col>
                            <Form.Label column sm="2">Телефон</Form.Label>
                            <Col sm="7">
                                <Form.Control ref={phone} placeholder="Ваш телефон" />
                            </Col>
                            <Form.Label column sm="2">E-mail</Form.Label>
                            <Col sm="7">
                                <Form.Control ref={email} type="email" placeholder="Email" />
                            </Col>
                        </Form.Group>
                        <h5>Информация об организации</h5>
                        <Form.Group as={Col}>
                            <Form.Label column sm="3">Организация</Form.Label>
                            <Col sm="7">
                                <Form.Control as="select" onChange={e => this.changeList(e)}>
                                    {Orgs.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <h5>Данные аккаунта</h5>
                        <Form.Group>
                            <Form.Label column sm="3">Логин</Form.Label>
                            <Col sm="7">
                                <Form.Control ref={login} placeholder="Логин" />
                            </Col>
                            <Form.Label column sm="3">Пароль</Form.Label>
                            <Col sm="7">
                                <Form.Control ref={password} type="password" placeholder="Придумайте пароль" />
                            </Col>
                            <Form.Label column sm="3">Пароль</Form.Label>
                            <Col sm="7">
                                <Form.Control ref={password_check} type="password" placeholder="Повторите пароль" />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={() => {
                            var jwt = getJWT()
                            fetch("/users",
                                {
                                    method: "post",
                                    headers: {
                                        'Authorization': `Bearer ${jwt}`,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        login: login.current.value,
                                        password: password.current.value,
                                        name: fstname.current.value,
                                        midname: midname.current.value,
                                        surname: lstname.current.value,
                                        phone: phone.current.value,
                                        mail: email.current.value,
                                        birthdate: birthdate.current.value,
                                        role: {
                                            id: "4"
                                        }
                                    })
                                })
                                .then((resp) => resp.text()).then((text) => { console.log(text) })
                                .then(fetch("/clients", {
                                        method: "post",
                                        headers: {
                                            'Authorization': `Bearer ${jwt}`,
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            user: {
                                                login: login.current.value
                                            },
                                            organisation: {
                                                id: this.state.SelectValue
                                            }
                                        })
                                    })
                                    .then((resp) => resp.text()).then((text) => { console.log(text) })
                                )
                                .then(this.setState({ isOpened: false }))

                        }}>Сохранить изменения</Button>
                    </Modal.Footer>
                </Modal>
                <div style={{ height: '30%' }}></div>
            </div >
        )
    }
}

//#--styles--#//

const styles = {
    mainMenuStyle: {
        width: "4.7%",
        height: "4.7%"
    },
    bodyStyle: {
        width: '40%',
        verticalAlign: 'middle',
        height: '40%',
        padding: 30,
        boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: 9
    }
}