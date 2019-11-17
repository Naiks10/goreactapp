import React from "react"
import { Link } from "react-router-dom"
import { ClientsTable, ProjetcsTable, ManagersTable, DevelopersTable, GroupsTable, OrgsTable } from "../Data/Tables"
import { Button, Form, Col, Row, Container, Tab, Tabs } from "react-bootstrap"
import { BodyContainer, SearchContainer } from "./BodyContainer"
import "hover.css"
import "../../fa/css/all.css"

class MainNavigation extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container fluid="true" className="bg-white animated slideInDown" style={
                {
                    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    height: 90
                }
            }>
                <div className="d-flex align-items-center" style={{ verticalAlign: "middle", height: "100%" }}>
                    <Row style={{ width: "100%" }}>
                        <Col className="d-flex align-items-center">
                            <div>
                                <Link to="../" style={{ textDecoration: "none" }} className="btn btn-outline-primary hvr-icon-back"><i class="far fa-angle-left hvr-icon"></i> <b>НАЗАД</b></Link>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex flex-row-reverse">
                                <div className="d-flex align-items-center">
                                    <Link className="btn btn-outline-primary" style={{ textDecoration: "none", marginLeft: 20 }} to="/login"><b>ВЫЙТИ</b></Link>
                                </div>
                                <img width="50" height="50" src="assets/img/face.png" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}

class ProjectsView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <SearchContainer>
                    <Button variant="success" className="hvr-icon-wobble-vertical">Создать проект <i className="fal fa-plus hvr-icon"></i></Button>
                    <Button variant="primary" className="hvr-icon-spin">Обновить <i className="fal fa-redo hvr-icon"></i></Button>
                </SearchContainer>

                <BodyContainer>
                    <ProjetcsTable />
                </BodyContainer>
            </div>
        )
    }
}

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
                        <p>Настроек пока нет, извините :)</p>
                    </div>
                </BodyContainer>
            </div>
        )
    }
}

class MessagesView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <SearchContainer>
                    <Button style={{ marginRight: 50 }} variant="primary" className="hvr-icon-wobble-vertical">Написать новое сообщение <i className="fal fa-plus hvr-icon"></i></Button>
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

class WorkersView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <SearchContainer>
                    <Button variant="success" className="hvr-icon-wobble-vertical">Добавить сотрудника <i className="fal fa-plus hvr-icon"></i></Button>
                    <Button variant="primary" className="hvr-icon-spin">Обновить <i className="fal fa-redo hvr-icon"></i></Button>
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

class ClientsView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <SearchContainer>
                    <Button variant="success" className="hvr-icon-wobble-vertical">Добавить клиента <i className="fal fa-plus hvr-icon"></i></Button>
                    <Button variant="primary" className="hvr-icon-spin">Обновить <i className="fal fa-redo hvr-icon"></i></Button>
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