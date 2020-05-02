import React from "react"
import { Link } from "react-router-dom"
import { ClientsTable, ProjetcsTable, ManagersTable, DevelopersTable, GroupsTable, OrgsTable } from "../Data/Tables"
import { Button, Form, Col, Row, Container, Tab, Tabs } from "react-bootstrap"
import { BodyContainer, SearchContainer } from "./BodyContainer"
import { isMobile, getLogin } from '../Functions/Funcs'
import history from '../Functions/history';
import "hover.css"
import "../../fa/css/all.css"

//#--MainNavigation-class--#//

class MainNavigation extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container fluid="true" className="animated slideInDown" style={
                {
                    //boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    backgroundColor: 'transparent',
                    height: 90
                }
            }>
                <div className="d-flex align-items-center" style={{ verticalAlign: "middle", height: "100%" }}>
                    <Row style={{ width: "100%" }}>
                        <Col className="d-flex align-items-center">
                            <Row>
                                <div>
                                <Button variant="outline-primary" onClick={() => { history.goBack() }} style={{ marginLeft: 20, marginRight: 60 }} className="hvr-icon-back d-flex align-items-center"><i style={{marginRight : 5}} class="far fa-angle-left hvr-icon d-flex align-items-center"></i> {(() => { if (isMobile() !== true) return <a className="d-flex align-items-center" style={{fontSize : 15 ,fontWeight : 'normal'}}>НАЗАД</a> })()} </Button>
                                </div>
                                <SearchPanel />
                                <ButtonPanel src="/assets/img/filter.png" />
                                <ButtonPanel src="/assets/img/sort.png" />
                            </Row>
                        </Col>
                        <Col>
                            <div className="d-flex flex-row-reverse">
                                <div className="d-flex align-items-center">
                                <Button variant="outline-primary" onClick={() => { history.goBack() }} style={{ marginLeft: 20, marginRight: 20 }} className="d-flex align-items-center"> {(() => { if (isMobile() !== true) return <a className="d-flex align-items-center" style={{fontSize : 15 ,fontWeight : 'normal'}}>ВЫЙТИ</a> })()} </Button>
                                </div>
                                <div className="hvr-icon-fade d-flex align-items-center"><a><b>@{getLogin()}</b> <i className="far fa-user hvr-icon"></i></a></div>
                            </div>
                        </Col>
                    </Row>
                </div>
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
            <Container fluid="true" className="animated slideInDown" style={
                {
                    //boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    backgroundColor: 'transparent',
                    height: 90
                }
            }>
                <div className="d-flex align-items-center" style={{ verticalAlign: "middle", height: "100%" }}>
                    <Row style={{ width: "100%" }}>
                        <Col className="d-flex align-items-center">
                            <Row>
                                <div>
                                <Button variant="outline-primary" onClick={() => { history.goBack() }} style={{ marginLeft: 20, marginRight: 60 }} className="hvr-icon-back d-flex align-items-center"><i style={{marginRight : 5}} class="far fa-angle-left hvr-icon d-flex align-items-center"></i> {(() => { if (isMobile() !== true) return <a className="d-flex align-items-center" style={{fontSize : 15 ,fontWeight : 'normal'}}>НАЗАД</a> })()} </Button>
                                </div>
                                <div className="d-flex align-items-center"><h5 style={{padding : 0, margin: 0}}>Проект "{this.props.title}"</h5></div>
                            </Row>
                        </Col>
                        <Col>
                            <div className="d-flex flex-row-reverse">
                                <div className="d-flex align-items-center">
                                <Button variant="outline-primary" onClick={() => { history.goBack() }} style={{ marginLeft: 20, marginRight: 0 }} className="d-flex align-items-center">{(() => { if (isMobile() !== true) return <a className="d-flex align-items-center" style={{fontSize : 15 ,fontWeight : 'normal'}}>ВЫЙТИ</a> })()} </Button>
                                </div>
                                <div className="hvr-icon-fade d-flex align-items-center"><a><b>@{getLogin()}</b> <i className="far fa-user hvr-icon"></i></a></div>
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
                        <i style={{ marginLeft: 200 }} className="far fa-search hvr-icon"></i>
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
                <img width="20" height="20" src={this.props.src} />
            </div>
        )
    }
}

//#--Projects-frame--#//

class ProjectsView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <SearchContainer>
                    <Link to="/workspace/create_project">
                        <Button variant="success" className="hvr-icon-wobble-vertical">{(() => { if (isMobile() !== true) return 'Создать проект' })()} <i className="fal fa-plus hvr-icon"></i></Button>
                    </Link>
                    <Button variant="primary" className="hvr-icon-spin">{(() => { if (isMobile() !== true) return 'Обновить' })()} <i className="fal fa-redo hvr-icon"></i></Button>
                </SearchContainer>

                <BodyContainer>
                    <ProjetcsTable />
                </BodyContainer>
            </div>
        )
    }
}

//#--Settings-frame--#//

class SettingsView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <SearchContainer />

                <BodyContainer>
                    <div>
                        <h2>Настройки</h2>
                        <div>
                            <Button variant="primary" onClick={() => {
                                if (localStorage.getItem("type") === "bottom") {
                                    localStorage.setItem("type", "standart")
                                } else {
                                    localStorage.setItem("type", "bottom")
                                }
                            }}>Сменить положение</Button>
                        </div>
                    </div>
                </BodyContainer>
            </div>
        )
    }
}

//#--Messages-frame--#//

class MessagesView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <SearchContainer>
                    <Button style={{ marginRight: 50 }} variant="primary" className="hvr-icon-wobble-vertical">{(() => { if (isMobile() !== true) return 'Написать новое сообщение' })()} <i className="fal fa-plus hvr-icon"></i></Button>
                </SearchContainer>

                <BodyContainer>
                    <div>
                        <h2>Сообщения</h2>
                        <p>А их нет, извините :)</p>
                    </div>
                </BodyContainer>
            </div>
        )
    }
}

//#--Workers-frame--#//

class WorkersView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <SearchContainer>
                    <Button variant="success" className="hvr-icon-wobble-vertical">{(() => { if (isMobile() !== true) return 'Добавить сотрудника' })()} <i className="fal fa-plus hvr-icon"></i></Button>
                    <Button variant="primary" className="hvr-icon-spin">{(() => { if (isMobile() !== true) return 'Обновить' })()} <i className="fal fa-redo hvr-icon"></i></Button>
                </SearchContainer>

                <BodyContainer>
                    <Tabs variant="pills" defaultActiveKey="managers" id="uncontrolled-tab-example">
                        <Tab eventKey="managers" title={<a>Менеджеры <i class="fas fa-user-tie"></i></a>}>
                            <ManagersTable />
                        </Tab>
                        <Tab eventKey="devs" title={<a>Разработчики <i class="far fa-user-hard-hat"></i></a>}>
                            <DevelopersTable />
                        </Tab>
                        <Tab eventKey="groups" title={<a>Группы <i class="fas fa-user-friends"></i></a>}>
                            <GroupsTable />
                        </Tab>
                    </Tabs>
                </BodyContainer>
            </div>
        )
    }
}

//#--Clients-frame--#//

class ClientsView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <SearchContainer>
                    <Button variant="success" className="hvr-icon-wobble-vertical">{(() => { if (isMobile() !== true) return 'Добавить клиента' })()} <i className="fal fa-plus hvr-icon"></i></Button>
                    <Button variant="primary" className="hvr-icon-spin">{(() => { if (isMobile() !== true) return 'Обновить' })()} <i className="fal fa-redo hvr-icon"></i></Button>
                </SearchContainer>

                <BodyContainer>
                    <Tabs variant="pills" defaultActiveKey="clients" id="uncontrolled-tab-example">
                        <Tab eventKey="clients" title={<a>Клиенты <i class="fas fa-user-friends"></i></a>}>
                            <ClientsTable />
                        </Tab>
                        <Tab eventKey="orgs" title={<a>Организации <i class="fas fa-building"></i></a>}>
                            <OrgsTable />
                        </Tab>
                    </Tabs>
                </BodyContainer>
            </div>
        )
    }
}

export {
    ProjectsView,
    ClientsView,
    WorkersView,
    SettingsView,
    MessagesView,
    MainNavigation,
}