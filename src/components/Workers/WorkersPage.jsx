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

//Basic WorkerPage class
export class WorkersPage extends React.Component {
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

    //---------|prepare-data-for-component|------------------------------------------
    componentDidMount() {
        // get JWT
        var jwt = getJWT()

        //? RESTapi method
        fetch("/managerslst", {
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

        //? RESTapi method
        fetch("/developerslst", {
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
    //---------------------------------------------------------------------

    // rendering
    render() {
        // * consts from state
        const { isLoaded_I, isLoaded_II, Items, Orgs } = this.state;

        // * IF ALL DATA LOADED
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
                                defaultActiveKey="man"
                                id="uncontrolled-tab-example">
                                <Tab
                                    eventKey="man"
                                    title="Менеджеры">
                                    <div className="box_xs">
                                        {// * mapping Managers to ElementGrid
                                            Items.map(item => (
                                                <ManagersElement data={item}
                                                />
                                            ))
                                        }
                                    </div>
                                </Tab>
                                <Tab
                                    eventKey="work"
                                    title="Разработчики">
                                    <div className="box_xs">
                                        {// * mapping Workers to ElementGrid
                                            Orgs.map(item => (
                                                <WorkerElement data={item} />
                                            ))
                                        }
                                    </div>
                                </Tab>
                                <Tab
                                    eventKey="group"
                                    title="Рабочие группы">
                                    <div className="box_xs">
                                        {// * mapping Groups to ElementGrid
                                            Orgs.map(item => (
                                                <GroupElement data={item} />
                                            ))
                                        }
                                    </div>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Container>
                </div>
            )
        } else { //* IF NOT
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

// Bacis ClientsElement class
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
    }

    // rendering
    render() {
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
                        history.push({ pathname: `/workspace/projects/${this.props.data.id}` })
                    }}
                >
                    <Col>
                        <Row>
                            <Col>{this.props.data.fio}   (<b>@{this.props.data.manager_login}</b>)</Col>
                            <Col>
                                <div className="d-flex justify-content-end">
                                    {this.props.data.phone_num}    {this.props.data.email_addr}
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col>
                                <img
                                    width="75"
                                    height="75"
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
                    </Col>
                </div>
            </div>
        )
    }
}


// ManagersElement class
class ManagersElement extends React.Component {
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
    }

    render() {
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
                        history.push({ pathname: `/workspace/projects/${this.props.data.id}` })
                    }}
                >
                    <Col>
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col>
                                <img
                                    style={{ borderRadius: '50%' }}
                                    width="75"
                                    height="75"
                                    src={this.props.data.user_image_src} />
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                <div>
                                    <p style={{ marginBottom: 0 }}>{this.props.data.fio}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }


}

// WorkersElemet class
class WorkerElement extends React.Component {
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
    }

    render() {
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
                        history.push({ pathname: `/workspace/projects/${this.props.data.id}` })
                    }}
                >
                    <Col>
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col>
                                <img
                                    style={{ borderRadius: '50%' }}
                                    width="75"
                                    height="75"
                                    src={this.props.data.user_image_src} />
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                <div>
                                    <p
                                        style={{ marginBottom: 0 }}
                                        className="d-flex justify-content-end">
                                        {this.props.data.fio}
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

// GroupElement
class GroupElement extends React.Component {
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
    }


    render() {
        return (
            <div style={{ padding: '20px 10px 20px 10px' }}>
                <div
                    className="ListElement col-xs-auto col-lg-auto d-flex align-items-center"
                    onMouseLeave={() => {
                        this.setState({
                            LoadedState: "start"
                        })
                    }}
                    onClick={() => {
                        history.push({ pathname: `/workspace/projects/${this.props.data.id}` })
                    }}
                >
                    <Col>
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col className="d-flex align-items-center justify-content-center">
                                <div className="d-flex align-items-center justify-content-center">
                                    <img
                                        style={{ borderRadius: '50%', position: 'relative', borderColor: 'red', borderWidth: 3, borderStyle: 'solid' }}
                                        width="40"
                                        height="40"
                                        src={this.props.data.user_image_src} />
                                    <img
                                        style={{ borderRadius: '50%', position: 'relative', borderColor: 'red', zIndex: 2, borderWidth: 3, left: '-14px', borderStyle: 'solid' }}
                                        width="40"
                                        height="40"
                                        src={this.props.data.user_image_src} />
                                    <img
                                        style={{ borderRadius: '50%', position: 'relative', borderColor: 'red', zIndex: 5, borderWidth: 3, left: '-28px', borderStyle: 'solid' }}
                                        width="40"
                                        height="40"
                                        src={this.props.data.user_image_src} />
                                </div>
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                <div>
                                    <p style={{ marginBottom: 0 }} className="d-flex justify-content-end">{this.props.data.fio}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }


}

//* New Element
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
                <div className="d-flex align-items-center">
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
    },
    
}

export default withRouter(ClientsElement);