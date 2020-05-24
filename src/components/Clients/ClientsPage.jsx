import React from "react"
import { Col, Row, Container, Button, Spinner, Tabs, Tab } from "react-bootstrap"
import Highcharts from "highcharts"
import HighchartsReact from 'highcharts-react-official'
import { throws } from "assert"
import { getJWT } from "../Functions/Funcs"
import { Link, Redirect, withRouter, useHistory, useLocation } from "react-router-dom"
import { br } from "react-router-dom"
import "animate.css"
import "hover.css"
import history from '../Functions/history'
import { MainNavigation } from "../BodyElements/BodyPanel"


export class ClientsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Items: [],
            Orgs: [],
            isLoaded_I: false,
            isLoaded_II: false,
            error: null,
            CurrentElement: 'start'
        }
    }

    componentDidMount() {
        var jwt = getJWT()

        fetch("/clientslst", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded_I: true,
                        Items: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded_II: true,
                        error
                    });
                }
            )

        fetch("/orgs?offset=1", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded_II: true,
                        Orgs: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded_II: true,
                        error
                    });
                }
            )
    }

    render() {
        const { isLoaded_I, isLoaded_II, error, Items, Orgs } = this.state;
        if (isLoaded_I && isLoaded_II) {
            return (
                <div>
                    <MainNavigation />
                    <Container
                        fluid
                        style={{ marginTop: 20 }}
                        className="d-flex justify-content-center">
                        <Col
                            style={{ marginLeft: '2%', margin: '2%', width: '90%' }}>
                            <Tabs
                                variant="pills"
                                defaultActiveKey="home"
                                id="uncontrolled-tab-example">
                                <Tab
                                    eventKey="home"
                                    title="Клиенты">
                                    {
                                        Items.map(item => (
                                            <ClientsElement data={item}
                                            />
                                        ))
                                    }
                                </Tab>
                                <Tab
                                    eventKey="profile"
                                    title="Организации">
                                    <div className="box_x">
                                        {
                                            Orgs.map(item => (
                                                <OrgsElement data={item} />
                                            ))
                                        }
                                    </div>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Container>
                </div>
            )
        } else {
            return (
                <Row style={{ position: 'absolute', left: '50%', top: '50%' }}>
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="primary" />
                </Row>
            )
        }
    }
}


class ClientsElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isContext: false,
            isImgOver: false,
            isStatusOver: false,
            isErrorOver: false,
            isTasksOver: false,
            LoadedState: 'start'
        }
        //this.RedirectToProject = this.RedirectToProject.bind(this)
    }

    /*RedirectToProject() {
        history.push({ pathname: '/workspace/client_s' })
        alert('Hello')
    }*/

    render() {
        //const { match, location, history } = this.props
        return (
            <div style={{ margin: '20px 0px' }}>
                <div
                    className="ListElement"
                    onMouseLeave={() => {
                        this.setState({
                            LoadedState: 'start'
                        })
                    }}
                    onClick={() => {
                        history.push({ pathname: `/workspace/clients/${this.props.data.client_login}` })
                    }}
                >
                    <Col>
                        <Row>
                            <Col>{this.props.data.fio}   (<b>@{this.props.data.client_login}</b>)</Col>
                            <Col>
                                <div
                                    className="d-flex justify-content-end">
                                    {this.props.data.phone_num}    {this.props.data.email_addr}
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col>
                                <img
                                    width="75"
                                    height="75"
                                    style={{borderRadius : '50%'}}
                                    src={this.props.data.user_image_src} />
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                <div>
                                    <p
                                        style={{ marginBottom: 0 }}
                                        className="d-flex justify-content-end">
                                        Всего проектов : {this.props.data.count}
                                    </p>
                                    <p
                                        style={{ marginBottom: 0 }}
                                        className="d-flex justify-content-end">
                                        Выполненнных : {this.props.data.count_fin}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                className="d-flex justify-content-end">
                                Организация : {this.props.data.short_name}
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }


}

class OrgsElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isContext: false,
            isImgOver: false,
            isStatusOver: false,
            isErrorOver: false,
            isTasksOver: false,
            LoadedState: 'start'
        }
        //this.RedirectToProject = this.RedirectToProject.bind(this)
    }

    /*RedirectToProject() {
        history.push({ pathname: '/workspace/client_s' })
        alert('Hello')
    }*/

    render() {
        //const { match, location, history } = this.props
        return (
            <div style={{ padding: '20px 10px 20px 10px' }}>
                <div
                    className="ListElement col-xs-auto col-lg-auto"
                    onMouseLeave={() => {
                        this.setState({
                            LoadedState: 'start'
                        })
                    }}
                    onClick={() => {
                        history.push({ pathname: `/workspace/orgs/${this.props.data.id}` })
                    }}
                >
                    <Col>
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col>
                                <img
                                    width="75"
                                    height="75"
                                    src={this.props.data.src}
                                    style={{borderRadius : '50%'}}
                                />
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                <div>
                                    <p
                                        style={{ marginBottom: 0 }}
                                        className="d-flex justify-content-end">
                                        {this.props.data.full_name}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }


}


export class StartPageMenuElementNew extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                className="StartMenuElementNew d-flex justify-content-center hvr-icon-shrink"
                onClick={() => {
                    history.push({ pathname: `/workspace/create_project` })
                }}
            >
                <div
                    className="d-flex align-items-center">
                    <img
                        className="hvr-icon"
                        width="100"
                        height="100"
                        src="/assets/img/add.png" />
                </div>
            </div>
        )
    }
}

const styles = {
    colStyle: {
        paddingLeft: 0,
        paddingRight: 0
    }
}

export default withRouter(ClientsElement);