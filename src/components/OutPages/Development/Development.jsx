import React from "react"
import { Container, Jumbotron, Nav, Card, Accordion, Row, Col, Tab, Button } from "react-bootstrap"

class DevelopmnetPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container style={styles.containerStyle}>
                <div className="bg-white" style={styles.containerStyle._mainPageStyle}>
                    <Jumbotron className="bg-white">
                        <div className="justify-content-md-center">
                            <img style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src="/assets/img/gopher_1.png" width="200" height="200" />
                        </div>
                        <h1>Хотите разработать свой проект?</h1>
                        <p>
                            Мы предоставляем весь исходный код нашего программного продукта под лицензией GPL 3.0. <br />
                            Желаете помочь нам? Мы всегда рады этому. Вся документация описана ниже.
                        </p>
                        <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Документация
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                            <Row>
                                                <Col sm={3}>
                                                    <Nav variant="pills" className="flex-column">
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="first">Иcпользуемые технологии</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="api">Методы RESTapi</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="godep">Зависимости GoLang</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="reactdep">Зависимости React.js</Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                </Col>
                                                <Col sm={9}>
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="first">
                                                            <ul>
                                                                <li>React - технология описание веб-интерфейса (фронтэнд) - <a href="http://reactjs.org">http://reactjs.org</a></li>
                                                                <li>GoLang - основной язык приложения (бэкенд) - <a href="http://golang.org">http://golang.org</a></li>
                                                                <li>PostgreSQL - СУБД - <a href="http://postgresql.org">http://postgresql.org</a></li>
                                                            </ul>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="api">
                                                            <p>Все реализованные RestAPI запросы описаны в модуле <code>routes.go</code></p>
                                                            <ul>
                                                                <li>GET
                                                                    <ul>
                                                                        <li>/clients</li>
                                                                        <li>/users</li>
                                                                        <li>/managers</li>
                                                                        <li>/devs</li>
                                                                        <li>/roles</li>
                                                                        <li>/groups</li>
                                                                        <li>/projects</li>
                                                                        <li>/clients/<code>-id-</code></li>
                                                                        <li>/users/<code>-id-</code></li>
                                                                        <li>/managers/<code>-id-</code></li>
                                                                        <li>/devs/<code>-id-</code></li>
                                                                        <li>/roles/<code>-id-</code></li>
                                                                        <li>/groups/<code>-id-</code></li>
                                                                        <li>/projects/<code>-id-</code></li>
                                                                    </ul>
                                                                </li>
                                                                <li>POST
                                                                    <ul>
                                                                        <li>/clients/<code>-id-</code></li>
                                                                        <li>/users/<code>-id-</code></li>
                                                                        <li>/managers/<code>-id-</code></li>
                                                                        <li>/devs/<code>-id-</code></li>
                                                                        <li>/roles/<code>-id-</code></li>
                                                                        <li>/groups/<code>-id-</code></li>
                                                                        <li>/projects/<code>-id-</code></li>
                                                                    </ul>
                                                                </li>
                                                                <li>PUT
                                                                    <ul>
                                                                        <li>/clients/<code>-id-</code></li>
                                                                        <li>/users/<code>-id-</code></li>
                                                                        <li>/managers/<code>-id-</code></li>
                                                                        <li>/devs/<code>-id-</code></li>
                                                                        <li>/roles/<code>-id-</code></li>
                                                                        <li>/groups/<code>-id-</code></li>
                                                                        <li>/projects/<code>-id-</code></li>
                                                                    </ul>
                                                                </li>
                                                                <li>DELETE
                                                                    <ul>
                                                                        <li>/clients/<code>-id-</code></li>
                                                                        <li>/users/<code>-id-</code></li>
                                                                        <li>/managers/<code>-id-</code></li>
                                                                        <li>/devs/<code>-id-</code></li>
                                                                        <li>/roles/<code>-id-</code></li>
                                                                        <li>/groups/<code>-id-</code></li>
                                                                        <li>/projects/<code>-id-</code></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="godep">
                                                            <ul>
                                                                <li>github.com/gorilla/mux</li>
                                                                <li>github.com/zhexuany/wordGenerator</li>
                                                                <li>github.com/jmoiron/sqlx</li>
                                                                <li>github.com/jackc/pgx</li>
                                                                <li>github.com/dgrijalva/jwt-go</li>
                                                                <li>github.com/auth0/go-jwt-middleware</li>
                                                            </ul>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="reactdep">
                                                            <ul>
                                                                <li>react-bootstrap</li>
                                                                <li>react-helmet</li>
                                                                <li>react-router</li>
                                                                <li>jsonwebtokens</li>
                                                                <li>axios</li>
                                                                <li>hover.css</li>
                                                            </ul>
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Col>
                                            </Row>
                                        </Tab.Container>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Jumbotron>
                </div>
                <div className="bg-white" style={styles.containerStyle._mainPageStyle}>
                    <Jumbotron className="bg-white">
                        <div className="justify-content-md-center">
                            <img style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src="/assets/img/git.png" width="200" height="200" />
                        </div>
                        <h1>Исходный код</h1>
                        <p>Получить код</p>
                        <ul>
                            <li>GoPkg : go get github.com/naiks10/goreactapp</li>
                            <li>GIT : git clone github.com/naiks10/goreactapp</li>
                            <li>Скачать <a href="https://github.com/Naiks10/goreactapp">напрямую</a></li>
                        </ul>
                    </Jumbotron>
                </div>
            </Container>
        )
    }
}

const styles = {
    containerStyle: {
        marginTop: 20,
        _mainPageStyle: {
            boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: 5,
            marginBottom: 5,
        }
    }
}

export default DevelopmnetPage;