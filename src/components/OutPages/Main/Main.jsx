import React from "react"

import MainPageElement from "./MainPageElement"

import { Link } from "react-router-dom"

import Helmet from "react-helmet"

import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap"

//#--extended-main-class--#//

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            back: 'background: linear-gradient(-90deg, rgba(219,219,219,1) 0%, rgba(255,255,255,1) 100%);'
        }
    }

    render() {

        var link = '/login'

        if (localStorage.getItem('jwt') !== null) {
            link = '/workspace'
        }

        return (                                                                                                                                                                                     
            <Container style={styles.containerStyle}>
                <Helmet bodyAttributes={{ style: this.state.back }} />
                <Row>
                    <Col>
                        <div
                            onMouseEnter={() => {
                                this.setState({ back: 'background-color: #ffc107' })
                            }}
                            onMouseLeave={() => {
                                this.setState({ back: 'background-color: whitesmoke' })
                            }} className="bg-white" style={styles.containerStyle._mainPageStyle}>
                            <Jumbotron className="bg-white">
                                <div className="hvr-icon-wobble-vertical">
                                    <div className="justify-content-md-center">
                                        <img className="hvr-icon" style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src="/assets/img/idea.png" width="150" height="150" />
                                    </div>
                                    <h2 style={{ marginTop: 45 }}>Пора осуществлять проекты!</h2>
                                    <p>Войдите или зарегистрируйтесь в системе, чтобы организовать свою мечту в мире реекламы и приложений.</p>
                                    <p>
                                        <Link to={link}>
                                            <Button variant="warning">Начать работы</Button>
                                        </Link>
                                    </p>
                                </div>
                            </Jumbotron>
                        </div>
                    </Col>
                    <Col>
                        <div className="bg-white" style={styles.containerStyle._mainPageStyle}
                            onMouseEnter={() => {
                                this.setState({ back: 'background-color: #7c20d1' })
                            }}
                            onMouseLeave={() => {
                                this.setState({ back: 'background-color: whitesmoke' })
                            }}>
                            <Jumbotron className="bg-white">
                                <div className="hvr-icon-pulse">
                                    <div className="justify-content-md-center">
                                        <img className="hvr-icon" style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src="/assets/img/new.png" width="150" height="150" />
                                    </div>
                                    <h2 style={{ marginTop: 45 }}>Нужно узнать что-то новое?</h2>
                                    <p>Узнайте о последних нововведениях в проекте в отдельном разделе новостей</p>
                                    <p>
                                        <Link to="/p/news">
                                            <Button variant="purples">Узнать что-то новое</Button>
                                        </Link>
                                    </p>
                                </div>
                            </Jumbotron>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="bg-white" style={styles.containerStyle._mainPageStyle}
                            onMouseEnter={() => {
                                this.setState({ back: 'background-color: #28a745' })
                            }}
                            onMouseLeave={() => {
                                this.setState({ back: 'background-color: whitesmoke' })
                            }}>
                            <Jumbotron className="bg-white">
                                <div className="hvr-icon-bounce">
                                    <div className="justify-content-md-center">
                                        <img className="hvr-icon" style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src="/assets/img/faq.png" width="150" height="150" />
                                    </div>
                                    <h2 style={{ marginTop: 45 }}>А что это вообще и куда я попал?</h2>
                                    <p>Узнайте больше о данном проекте перейдя в одноимённый раздел</p>
                                    <p>
                                        <Link to="/p/about">
                                            <Button variant="success">О проекте</Button>
                                        </Link>
                                    </p>
                                </div>
                            </Jumbotron>
                        </div>
                    </Col>
                    <Col>
                        <div className="bg-white" style={styles.containerStyle._mainPageStyle}
                            onMouseEnter={() => {
                                this.setState({ back: 'background-color: #2c6da1' })
                            }}
                            onMouseLeave={() => {
                                this.setState({ back: 'background-color: whitesmoke' })
                            }}>
                            <Jumbotron className="bg-white">
                                <div className="hvr-icon-shrink">
                                    <div className="justify-content-md-center">
                                        <img className="hvr-icon" style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src="/assets/img/code.png" width="150" height="150" />
                                    </div>
                                    <h2 style={{ marginTop: 45 }}>Мне понравилось! Хочу больше</h2>
                                    <p>Перейдите в раздел разработки и посмотрите как работает проект и какие технологии были использованы в проекте.</p>
                                    <p>
                                        <Link to="/p/development">
                                            <Button variant="primary">Разработка</Button>
                                        </Link>
                                    </p>
                                </div>
                            </Jumbotron>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

//#--styles--#//

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

export default Main;