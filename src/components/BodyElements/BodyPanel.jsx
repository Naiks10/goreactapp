import React from "react"
import { Link } from "react-router-dom"
import { ClientsTable, ProjetcsTable, ManagersTable, DevelopersTable, GroupsTable, OrgsTable } from "../Data/Tables"
import { Button, Form, Col, Row, Container, Tab, Tabs } from "react-bootstrap"
import { BodyContainer, SearchContainer } from "./BodyContainer"
import { isMobile, getLogin } from '../Functions/Funcs'
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
                    backgroundColor : 'transparent',
                    height: 90
                }
            }>
                <div className="d-flex align-items-center" style={{ verticalAlign: "middle", height: "100%" }}>
                    <Row style={{ width: "100%" }}>
                        <Col className="d-flex align-items-center">
                            <Row>
                                <div>
                                    <Link to="../" style={{ textDecoration: "none", marginLeft: 20, marginRight: 60 }} className="btn btn-outline-primary hvr-icon-back"><i class="far fa-angle-left hvr-icon"></i> {(() => { if (isMobile() !== true) return <b>НАЗАД</b> })()} </Link>
                                </div>
                                <div style={{backgroundColor : 'whitesmoke', borderRadius : 4, paddingLeft : 15, paddingRight: 15}} className="hvr-icon-fade hvr-underline-from-left d-flex align-items-center"><a>Поиск<i style={{marginLeft : 200}} className="far fa-search hvr-icon"></i></a></div>
                            </Row>
                        </Col>
                        <Col>
                            <div className="d-flex flex-row-reverse">
                                <div className="d-flex align-items-center">
                                    <Link className="btn btn-outline-primary" style={{ textDecoration: "none", marginLeft: 20 }} to="/login"><b>ВЫЙТИ</b></Link>
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
                            <Button variant="primary" onClick={()=> {
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