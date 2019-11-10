import React from "react"
import 'hover.css'
import { Link, Redirect } from "react-router-dom"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Helmet from "react-helmet"
import { getRole } from "../Functions/Funcs"


class MainMenuButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="MainMenuButton">
                <Link className="def" style={{ textDecoration: "none" }} to="/">
                    <div style={{ width: "5.6rem", height: "5.6rem" }}>
                        <img width="38" height="38" src="assets/img/users.png" />
                    </div>
                </Link>
            </div>
        );
    }
}


class NewPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        }
        this.change = this.change.bind(this)
        this.submit = this.submit.bind(this)
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
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
                    window.location.replace("/#/workspace")
                }
            })
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <div style={{ height: '20%' }}></div>
                <Container className="bg-white animated fadeIn mx-auto" style={styles.bodyStyle}>
                    <Helmet bodyAttributes={{ style: 'background-color : #2098D1' }} />
                    <Row style={{verticalAlign: 'middle'}}>
                        <Col style={{ verticalAlign: "middle" }}>
                            <h1 style={{ textAlign: "center" }}>ВХОД</h1>
                            <Form>
                                <Form.Group as={Col}>
                                    <Form.Label column sm={2}>Логин</Form.Label>
                                    <Col sm={4}>
                                        <Form.Control type="text" name="login" onChange={e => this.change(e)} value={this.state.login} placeholder="Введите логин" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>Пароль</Form.Label>
                                    <Col sm={4}>
                                        <Form.Control type="password" name="password" onChange={e => this.change(e)} value={this.state.password} placeholder="Введите пароль" />
                                    </Col>
                                </Form.Group>
                                <Link onClick={e => this.submit(e)} className="btn btn-outline-primary">Войти в систему</Link>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <div style={{ height: '20%' }}></div>
            </div>
        )
    }
}



class BackMenuButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container className="BackMenuButton" onMouseEnter={this.FindObject}>
                <Link className="def" style={{ textDecoration: "none" }} to={this.props.path} className="row">
                    <div style={{ width: "5.6rem", height: "5.6rem" }}>
                        <img width="38" height="38" src={this.props.src} />
                    </div>
                    <Col>
                        {this.props.text}
                    </Col>
                </Link>
            </Container>
        );
    }
}

const styles = {
    mainMenuStyle: {
        width: "4.7%",
        height: "4.7%"
    },
    bodyStyle: {
        width: '50%',
        verticalAlign: 'middle',
        height: '60%',
        padding: 30,
        boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: 3
    }
}

export {
    BackMenuButton,
    MainMenuButton,
    NewPage
}
