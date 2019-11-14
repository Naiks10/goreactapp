import React from "react"
import { Link } from "react-router-dom"
import { ClientsTable, ProjetcsTable, ManagersTable, DevelopersTable } from "../Data/Tables"
import { Button, Form, Col, Row, Container, Tab, Tabs } from "react-bootstrap"
import { BodyContainer, SearchContainer } from "./BodyContainer"

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
                                <Link to="../" style={{ textDecoration: "none" }} className="btn btn-outline-primary"><b>НАЗАД</b></Link>
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
                    <Button variant="success">Создать проект</Button>
                    <Button variant="primary">Обновить</Button>
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
                    <Button style={{ marginRight: 50 }} variant="primary">Написать новое сообщение</Button>
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
                    <Button variant="success">Добавить сотрудника</Button>
                    <Button variant="primary">Обновить</Button>
                </SearchContainer>

                <BodyContainer>
                    <Tabs variant="pills" defaultActiveKey="managers" id="uncontrolled-tab-example">
                        <Tab eventKey="managers" title="Менеджеры">
                            <ManagersTable />
                        </Tab>
                        <Tab eventKey="devs" title="Разработчики">
                            <DevelopersTable />
                        </Tab>
                        <Tab eventKey="groups" title="Группы">
                            
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
                    <Button variant="success">Добавить клиента</Button>
                    <Button variant="primary">Обновить</Button>
                </SearchContainer>

                <BodyContainer>
                    <ClientsTable />
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