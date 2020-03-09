import React from "react"
import { Container, Jumbotron, Nav, Card, Accordion, Row, Col, Tab, Button } from "react-bootstrap"

//#--devpage-class--#//

class DevelopmnetPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        window.scrollTo(0, 0)
        return (
            <Container style={styles.containerStyle}>
                {/* methods? */}
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
                {/* FAQ */}
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
                            <li>Ветка релиза : <a href="https://github.com/Naiks10/goreactapp/tree/master">master</a></li>
                            <li>Ветка с отладкой и подробным тестированием : <a href="https://github.com/Naiks10/goreactapp/tree/debug">debug</a></li>
                        </ul>
                        <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Есть вопросы?
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Tab.Container id="left-tabs-example" defaultActiveKey="master">
                                            <Row>
                                                <Col sm={3}>
                                                    <Nav variant="pills" className="flex-column">
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="master">Чем отличается master от debug?</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="build">Что требуется, чтобы собрать проект?</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="time">Сколько уходит времени на компиляцию go-кода?</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="gobuild">Делаю go-build страница не меняется :(</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="and">Как одномерменнно запустить сборку golang и react?</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="tests">Тесты... Какие тесты вы испоьзуете для отладки?</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="crypt">В вашем продукте есть шифрование? Как отдельный модуль?</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="db">Вижу в проекте всё, кроме базы - Где она?</Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                </Col>
                                                <Col sm={9}>
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="master">
                                                            <p>Всё очень просто :</p>
                                                            <ul>
                                                                <li>Ветка <code>master</code> включает в себя уже отработанную версию продукта, которая прошла все тесты по новым функциям и модулям</li>
                                                                <li>Ветка <code>debug</code> соответственно включает в себя все тесты, возможно баги, которые заметны невооруженным взглядом, возможно отключены какие-нибудь модули</li>
                                                            </ul>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="build">
                                                            <p>И так, вам потребуется :</p>
                                                            <ul>
                                                                <li><b>GO 1.12+</b>
                                                                    <ol>
                                                                        <li>С помощью модуля godep проверьте требуемые зависимости :</li>
                                                                        <ul>
                                                                            <li>Команда : <code>godep restore</code></li>
                                                                        </ul>
                                                                        <li>После успешного восстановления пакетов можете начинать сборку :</li>
                                                                        <ul>
                                                                            <li>Команда : <code>go build</code> и после <code>go run .</code></li>
                                                                        </ul>
                                                                    </ol>
                                                                </li>
                                                                <li><b>React</b>
                                                                    <ol>
                                                                        <li>С помощью пакетного менеджера npm установите все зависимости</li>
                                                                        <li>После установки можете собрать проект :</li>
                                                                        <ul>
                                                                            <li>Команда : <code>npm run build</code></li>
                                                                        </ul>
                                                                    </ol>
                                                                </li>
                                                            </ul>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="time">
                                                            <p>Golang достаточно быстр в компиляции, даже на слабом пк с устаревшим процессором go закомпилится не более чем за 5 секунд</p>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="gobuild">
                                                            <p>Плохо читаете предыдущие пункты :) Для сборки интерфейса требуется <code>npm run build</code></p>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="and">
                                                            <p>Все очень просто :</p>
                                                            <ul>
                                                                <li>Запустите две команды через два амперсанда : <code>go build &amp;&amp; npm run build</code></li>
                                                                <li>Однако не рекомендуем так делать, можно спутать ошибки</li>
                                                            </ul>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="tests">
                                                            <p>Мы используем встроенный пакет по тестированию <code>testing</code></p>
                                                            <p>Все тесты в нашем продукте делятся на юнит-тесты и интеграционные.</p>
                                                            <p>Их можно найти в ветке <b>debug</b> - все файлы с постфиксом <code>_test</code></p>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="crypt">
                                                            <ul>
                                                                <li>Да, есть - мы используем AES256</li>
                                                                <li>Нет, пока что нет...</li>
                                                            </ul>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="db">
                                                            <p>SQL-скрипт мы выложим позже, ожидайте</p>
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
                {/* RELEASES */}
                <div className="bg-white" style={styles.containerStyle._mainPageStyle}>
                    <Jumbotron className="bg-white">
                        <div className="justify-content-md-center">
                            <img style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src="/assets/img/build.png" width="200" height="200" />
                        </div>
                        <h1>Хотите потестировать сами?</h1>
                        <p>Мы рады предоставить все исполняемые файлы на странице разработки</p>
                        <p>У нас есть два вида сборок : </p>
                        <ul>
                            <li>Версия после первичной отладки, в которой есть недочёты - <b>Sirin</b></li>
                            <li>Версия "кандидат в релиз" - <b>Ghamamyun</b></li>
                            <br/>
                            <li>Скачайте архив с приложением <a href="https://github.com/Naiks10/goreactapp/releases">"просто открой *.exe"</a></li>
                        </ul>
                    </Jumbotron>
                </div>
            </Container>
        )
    }
}

//#--STYLES--#//

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