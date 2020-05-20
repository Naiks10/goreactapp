import React from "react"
import { Link } from "react-router-dom"
import { Button, Form, Col, Row, Container, Tab, Tabs, Modal } from "react-bootstrap"
import { isMobile, getLogin, getJWT } from '../Functions/Funcs'
import history from '../Functions/history';
import "hover.css"
import "../../fa/css/all.css"
import bsCustomFileInput from "bs-custom-file-input";

//#--MainNavigation-class--#//

class MainNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModal: false,
            src: null
        }
    }

    render() {
        bsCustomFileInput.init()
        return (
            <Container
                fluid="true"
                className="animated slideInDown"
                style={
                    {
                        backgroundColor: 'transparent',
                        height: 90
                    }
                }>
                <div
                    className="d-flex align-items-center"
                    style={{ verticalAlign: "middle", height: "100%" }}>
                    <Row style={{ width: "100%" }}>
                        <Col className="d-flex align-items-center">
                            <Row>
                                <div>
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => { history.goBack() }}
                                        style={{ marginLeft: 40, marginRight: 60 }}
                                        className="hvr-icon-back d-flex align-items-center">
                                        <i
                                            style={{ marginRight: 5 }}
                                            class="far fa-angle-left hvr-icon d-flex align-items-center">
                                        </i>
                                        {(() => {
                                            if (isMobile() !== true)
                                                return <a
                                                    className="d-flex align-items-center"
                                                    style={{ fontSize: 15, fontWeight: 'normal' }}>
                                                    НАЗАД
                                                </a>
                                        })()}
                                    </Button>
                                </div>
                                <SearchPanel />
                                <ButtonPanel src="/assets/img/filter.png" />
                                <ButtonPanel src="/assets/img/sort.png" />
                            </Row>
                        </Col>
                        <Col>
                            <div className="d-flex flex-row-reverse">
                                <div className="d-flex align-items-center">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => { history.push('/login') }}
                                        style={{ marginLeft: 20, marginRight: 20 }}
                                        className="d-flex align-items-center">
                                        {(() => {
                                            if (isMobile() !== true)
                                                return <a
                                                    className="d-flex align-items-center"
                                                    style={{ fontSize: 15, fontWeight: 'normal' }}>
                                                    ВЫЙТИ
                                                </a>
                                        })()}
                                    </Button>
                                </div>
                                <div
                                    className="hvr-icon-fade d-flex align-items-center">
                                    <a>
                                        <b onClick={() => this.setState({ isModal: true })}>@{getLogin()}</b>
                                        <i className="far fa-user hvr-icon"></i>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Modal show={this.state.isModal} onHide={() => this.setState({ isModal: false })}>
                    <Modal.Header>
                        <Modal.Title>@{getLogin()} - Личный Кабинет</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="d-flex justify-content-center">
                                <img 
                                    width="150" 
                                    height="150" 
                                    src={this.state.src} 
                                    style={{ margin: 30, borderRadius: '50%' }} />
                            </div>
                            <Form>
                                <Form.File onChange={(event) => {
                                    var reader = new FileReader();
                                    var vex
                                    reader.onloadend = function () {
                                        this.setState({ src: [reader.result] })
                                    }.bind(this)
                                    vex = reader.readAsDataURL(event.target.files[0]);
                                }
                                } id="custom-file"
                                    label="Custom file input" custom></Form.File>
                            </Form>
                        </div >
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {
                            const fileInput = document.querySelector('#custom-file');
                            const formData = new FormData();
                            console.log(fileInput.files[0])
                            formData.append('file', fileInput.files[0]);
                            formData.append('login', getLogin());
                            fetch('/uploaduser', {
                                headers: {
                                    'Authorization': `Bearer ${getJWT()}`
                                },
                                method: 'POST',
                                body: formData
                            })
                        }}>Сохранить</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}


export class ProjectNavigation extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container
                fluid="true"
                className="animated slideInDown"
                style={
                    {
                        backgroundColor: 'transparent',
                        height: 90
                    }
                }>
                <div
                    className="d-flex align-items-center"
                    style={{ verticalAlign: "middle", height: "100%" }}>
                    <Row
                        style={{ width: "100%" }}>
                        <Col className="d-flex align-items-center">
                            <Row>
                                <div>
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => { history.goBack() }}
                                        style={{ marginLeft: 20, marginRight: 60 }}
                                        className="hvr-icon-back d-flex align-items-center">
                                        <i
                                            style={{ marginRight: 5 }}
                                            class="far fa-angle-left hvr-icon d-flex align-items-center">
                                        </i>
                                        {(() => {
                                            if (isMobile() !== true)
                                                return <a
                                                    className="d-flex align-items-center"
                                                    style={{ fontSize: 15, fontWeight: 'normal' }}>
                                                    НАЗАД
                                                </a>
                                        })()}
                                    </Button>
                                </div>
                                <div
                                    className="d-flex align-items-center">
                                    <h5
                                        style={{ padding: 0, margin: 0 }}>
                                        Проект "{this.props.title}"
                                    </h5>
                                </div>
                            </Row>
                        </Col>
                        <Col>
                            <div className="d-flex flex-row-reverse">
                                <div className="d-flex align-items-center">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => { history.goBack() }}
                                        style={{ marginLeft: 20, marginRight: 0 }}
                                        className="d-flex align-items-center">
                                        {(() => {
                                            if (isMobile() !== true)
                                                return <a
                                                    className="d-flex align-items-center"
                                                    style={{ fontSize: 15, fontWeight: 'normal' }}>
                                                    ВЫЙТИ
                                                </a>
                                        })()}
                                    </Button>
                                </div>
                                <div
                                    className="hvr-icon-fade d-flex align-items-center">
                                    <a>
                                        <b>@{getLogin()}</b>
                                        <i className="far fa-user hvr-icon"></i>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}

export class ContactNavigation extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container
                fluid="true"
                className="animated slideInDown"
                style={
                    {
                        backgroundColor: 'transparent',
                        height: 90
                    }
                }>
                <div
                    className="d-flex align-items-center"
                    style={{ verticalAlign: "middle", height: "100%" }}>
                    <Row
                        style={{ width: "100%" }}>
                        <Col className="d-flex align-items-center">
                            <Row>
                                <div>
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => { history.goBack() }}
                                        style={{ marginLeft: 20, marginRight: 60 }}
                                        className="hvr-icon-back d-flex align-items-center">
                                        <i
                                            style={{ marginRight: 5 }}
                                            class="far fa-angle-left hvr-icon d-flex align-items-center">
                                        </i> {
                                            (() => {
                                                if (isMobile() !== true)
                                                    return <a
                                                        className="d-flex align-items-center"
                                                        style={{ fontSize: 15, fontWeight: 'normal' }}>
                                                        НАЗАД
                                                    </a>
                                            })()}
                                    </Button>
                                </div>
                                <div className="d-flex align-items-center">
                                    <h5 style={{ padding: 0, margin: 0 }}>{this.props.title}</h5></div>
                            </Row>
                        </Col>
                        <Col>
                            <div className="d-flex flex-row-reverse">
                                <div className="d-flex align-items-center">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => { history.goBack() }}
                                        style={{ marginLeft: 20, marginRight: 0 }}
                                        className="d-flex align-items-center">
                                        {(() => {
                                            if (isMobile() !== true)
                                                return <a
                                                    className="d-flex align-items-center"
                                                    style={{ fontSize: 15, fontWeight: 'normal' }}>
                                                    ВЫЙТИ
                                                </a>
                                        })()}
                                    </Button>
                                </div>
                                <div
                                    className="hvr-icon-fade d-flex align-items-center">
                                    <a>
                                        <b>@{getLogin()}</b>
                                        <i className="far fa-user hvr-icon"></i>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}

export class SearchPanel extends React.Component {
    render() {
        return (
            <Col>
                <Row>
                    <div
                        style={
                            {
                                backgroundColor: 'whitesmoke',
                                borderRadius: 4,
                                paddingLeft: 15,
                                paddingRight: 15,
                                height: 40
                            }
                        }
                        className="hvr-icon-fade hvr-underline-from-left d-flex align-items-center">
                        <a>Поиск
                            <i
                                style={{ marginLeft: 200 }}
                                className="far fa-search hvr-icon">
                            </i>
                        </a>
                    </div>
                </Row>
            </Col>
        )
    }
}

export class ButtonPanel extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div
                style={
                    {
                        backgroundColor: 'whitesmoke',
                        borderRadius: 4,
                        marginLeft: 5,
                        height: 40,
                        width: 40
                    }
                }
                className="d-flex align-items-center justify-content-center">
                <img
                    width="20"
                    height="20"
                    src={this.props.src} />
            </div>
        )
    }
}

//#--Projects-frame--#//

export {
    MainNavigation,
}