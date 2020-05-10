import React from "react"
import { Col, Row, Container, Button, Spinner, Badge, Modal } from "react-bootstrap"
import Highcharts from "highcharts"
import HighchartsReact from 'highcharts-react-official'
import { throws } from "assert"
import { getJWT, getRole, getLogin } from "../Functions/Funcs"
import { Link, Redirect, withRouter, useHistory, useLocation } from "react-router-dom"
import { br } from "react-router-dom"
import "animate.css"
import "hover.css"
import history from '../Functions/history'
import { MainNavigation } from "../BodyElements/BodyPanel"

const jwt = getJWT()


export class StartPageMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Items: [],
            isLoaded: false,
            error: null,
            CurrentElement: 'start'
        }
    }

    componentDidMount() {
        this.UpdateFunc()
    }

    UpdateFunc() {
        switch (true) {
            case getRole() === '1':
                fetch(`/projectsview`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                Items: result.items
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
                break;
            case getRole() === '2':
                fetch(`/projectsview?manager=${getLogin()}`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                Items: result.items
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
                break;
            case getRole() === '6':
                fetch(`/projectsview?client=${getLogin()}`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                Items: result.items
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
        }
    }

    render() {
        const { isLoaded, error, Items } = this.state;
        if (isLoaded) {
            return (
                <div>
                    <MainNavigation />
                    <Container fluid style={{ marginTop: 20 }} className="d-flex justify-content-center">
                        <Col style={{ marginLeft: '4%', marginRight: '4%' }}>
                            <div className="box_xss">
                                {
                                    this.state.Items ? Items.map(item => (
                                        item.status_id === 0 || (item.status_id === 1 && item.group_id === 0) ? <StartPageMenuElement Upd={() => { this.UpdateFunc() }} data={
                                            {
                                                id: item.id,
                                                name: item.name,
                                                issues: item.project_issues,
                                                exist: item.tasks_finished,
                                                fact: item.tasks_all,
                                                org_id: item.org_id,
                                                group_id : item.group_id,
                                                src: item.src,
                                                status_id: item.status_id,
                                                status_name: item.status_name,
                                                pdatestart: item.start,
                                                pdatefinish: item.finish,
                                                fdatestart: item.start_fact,
                                                fdatefinish: item.finish_fact
                                            }
                                        }
                                        /> : null
                                    )) : null
                                }
                            </div>
                            <div style={{ width: '100%', marginTop: 5, marginBottom: 5, height: 2, borderRadius: 10, opacity: '20%', backgroundColor: '#2098D1' }}></div>
                            <div className="box_xss">
                                <StartPageMenuElementNew />
                                {
                                    this.state.Items ? Items.map(item => (
                                        item.status_id !== 0 && item.group_id !== 0 ? <StartPageMenuElement data={
                                            {
                                                id: item.id,
                                                name: item.name,
                                                issues: item.project_issues,
                                                exist: item.tasks_finished,
                                                fact: item.tasks_all,
                                                org_id: item.org_id,
                                                group_id : item.group_id,
                                                src: item.src,
                                                status_id: item.status_id,
                                                status_name: item.status_name,
                                                pdatestart: item.start,
                                                pdatefinish: item.finish,
                                                fdatestart: item.start_fact,
                                                fdatefinish: item.finish_fact
                                            }
                                        }
                                        /> : null
                                    )) : null
                                }
                            </div>
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


class StartPageMenuElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isContext: false,
            isImgOver: false,
            isStatusOver: false,
            isErrorOver: false,
            isTasksOver: false,
            LoadedState: 'start',
            isModal: false,
        }
        //this.RedirectToProject = this.RedirectToProject.bind(this)
    }

    /*RedirectToProject() {
        history.push({ pathname: '/workspace/client_s' })
        alert('Hello')
    }*/

    render() {
        const { isModal } = this.state
        //const { match, location, history } = this.props
        if (getRole() === '6' && (this.props.data.status_id === 0 || (this.props.data.status_id === 1 && this.props.data.group_id === 0))) {
            return (
                <div
                    className="StartMenuElementNewNow hvr-grow"
                    onClick={() => {

                    }}>
                    <Col>
                        <Row>
                            <Col
                                style={styles.colStyle}
                                md="auto"
                            >
                                <p
                                    style={{ fontSize: 22, color: 'white' }}
                                >
                                    Проект <b>"{this.props.data.name}"</b>
                                </p>
                            </Col>
                            <Col style={styles.colStyle}>
                                <div className="d-flex justify-content-end">
                                    {(() => {
                                        switch (true) {
                                            case (this.props.data.status_id === 0):
                                                return <h3><Badge variant="primary">{'new'}</Badge></h3>
                                            case (this.props.data.status_id === 1):
                                                return <h3><Badge variant="warning">{'new'}</Badge></h3>
                                        }
                                    })()}
                                </div>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center align-items-center">
                            <div>
                                {(() => {
                                    switch (true) {
                                        case (this.props.data.status_id === 0):
                                            return <React.Fragment>
                                                <div className="d-flex justify-content-center"><img src="/assets/img/sad.png" width="96" height="96" /></div>
                                                <p style={{ color: 'white', marginTop: 25 }}>Ваш проект еще не рассмотрен, наверно.</p>
                                            </React.Fragment>
                                        case (this.props.data.status_id === 1):
                                            return <React.Fragment>
                                                <div className="d-flex justify-content-center"><img src="/assets/img/happy.png" width="96" height="96" /></div>
                                                <p className="d-flex justify-content-center" style={{ color: 'white', marginTop: 25 }}>Прекрансый проект. Мы пытаемся успокоить менеджера и собираем группу экспертов</p>
                                            </React.Fragment>
                                    }
                                })()}
                            </div>
                        </div>
                    </Col>
                </div>
            )
        } else
            return (
                <React.Fragment>
                    <div
                        className="StartMenuElement hvr-grow"
                        onMouseLeave={() => {
                            this.setState({
                                LoadedState: 'start'
                            })
                        }}
                        onClick={() => {
                            switch (true) {
                                case (this.props.data.status_id === 0):
                                    this.setState({ isModal: true })
                                    break;
                                case (this.props.data.status_id !== 0):
                                    history.push({ pathname: `/workspace/projects/${this.props.data.id}` })
                                    break;
                            }
                        }
                        }
                    >
                        <Col>
                            <Row>
                                <Col
                                    style={styles.colStyle}
                                    md="auto"
                                >
                                    <p
                                        style={{ fontSize: 22 }}
                                    >
                                        Проект <b>"{this.props.data.name}"</b>
                                    </p>
                                </Col>
                                <Col style={styles.colStyle}>
                                    <div className="d-flex justify-content-end">
                                        {(() => {
                                            switch (true) {
                                                case (this.props.data.status_id === 0):
                                                    return <h3><Badge variant="primary">{'new'}</Badge></h3>
                                                case (this.props.data.status_id !== 0):
                                                    return <img
                                                        onMouseEnter={() => {
                                                            this.setState({
                                                                isStatusOver: true
                                                            })
                                                        }}
                                                        onMouseLeave={() => {
                                                            this.setState({
                                                                isStatusOver: false
                                                            })
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            if (this.state.LoadedState != 'status') {
                                                                this.setState({
                                                                    LoadedState: 'status'
                                                                })
                                                            } else {
                                                                this.setState({
                                                                    LoadedState: 'start'
                                                                })
                                                            }
                                                        }}
                                                        className={'align-middle ' + this.state.isStatusOver ? 'hvr-grow_1' : null}
                                                        height="29"
                                                        width="29"
                                                        src={`/assets/img/status/${this.props.data.status_id}.png`}
                                                    />
                                            }
                                        })()}
                                    </div>
                                </Col>
                            </Row>
                            <Row className="align-middle">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {(() => {
                                        switch (this.state.LoadedState) {
                                            case 'start':
                                                return (
                                                    <Col style={{ minHeight: 126 }} className="animated fadeIn">
                                                        <p style={{ fontSize: '17px', marginBottom: 0 }}>Плановый период</p>
                                                        <p style={{ fontSize: '15px' }}>{
                                                            (() => {
                                                                var data = new Date(this.props.data.pdatestart)
                                                                return data.toLocaleDateString("ru-RU")
                                                            })()
                                                        }-{
                                                                (() => {
                                                                    var data = new Date(this.props.data.pdatefinish)
                                                                    return data.toLocaleDateString("ru-RU")
                                                                })()
                                                            }</p>
                                                        <p style={{ fontSize: '17px', marginBottom: 0 }}>Фактический период</p>
                                                        <p style={{ fontSize: '15px' }}>{
                                                            (() => {
                                                                var data = new Date(this.props.data.fdatestart)
                                                                return data.toLocaleDateString("ru-RU")
                                                            })()
                                                        }-{
                                                                (() => {
                                                                    var data = new Date(this.props.data.fdatefinish)
                                                                    return data.toLocaleDateString("ru-RU")
                                                                })()
                                                            }</p>
                                                    </Col>
                                                )
                                            case 'status':
                                                return (
                                                    <Col className="animated fadeInRight" style={{ alignItems: 'center' }} >
                                                        <Col style={{ borderLeft: '2px solid rgb(32, 153, 209)', borderColor: 'rgb(32, 153, 209)', minHeight: 126 }}>
                                                            <Link to="/workspace/client_s"><p style={{ marginBottom: 1 }}> <a style={{ color: 'rgb(32, 153, 209)' }}>&#8226;</a> Начат</p></Link>
                                                            <p style={{ marginBottom: 1 }}>В разработке</p>
                                                            <p style={{ marginBottom: 1 }}>На отладке</p>
                                                            <p style={{ marginBottom: 1 }}>Готов</p>
                                                            <p style={{ marginBottom: 1 }}>Отменён</p>
                                                        </Col>
                                                    </Col>
                                                )
                                        }
                                    })()}

                                </div>
                                <Col>
                                    <div className="d-flex justify-content-end" style={{ height: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                onMouseEnter={() => {
                                                    this.setState({
                                                        isImgOver: true
                                                    })
                                                }}
                                                onMouseLeave={() => {
                                                    this.setState({
                                                        isImgOver: false
                                                    })
                                                }}
                                                className={'align-middle ' + this.state.isImgOver ? 'hvr-grow_1' : null} width="75" height="75" src={this.props.data.src} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '1rem' }}>
                                <Col style={styles.colStyle}>
                                    <Row>
                                        <Col md="auto">
                                            <Row
                                                onMouseEnter={() => {
                                                    this.setState({
                                                        isErrorOver: true
                                                    })
                                                }}
                                                onMouseLeave={() => {
                                                    this.setState({
                                                        isErrorOver: false
                                                    })
                                                }}
                                                onClick={() => {

                                                }}
                                                className={'d-flex align-items-center ' + this.state.isErrorOver ? 'hvr-grow_1' : null}
                                            >
                                                <img
                                                    height="29"
                                                    width="29"
                                                    src="/assets/img/warning.png"
                                                />
                                                <a className="d-flex align-items-center" style={{ marginBottom: 0, fontSize: 17 }}><b>{this.props.data.issues}</b></a>
                                            </Row>
                                        </Col>
                                        <Col md="auto" style={{ marginLeft: 5 }}>
                                            <Row
                                                onMouseEnter={() => {
                                                    this.setState({
                                                        isTasksOver: true
                                                    })
                                                }}
                                                onMouseLeave={() => {
                                                    this.setState({
                                                        isTasksOver: false
                                                    })
                                                }}
                                                className={'d-flex align-items-center ' + this.state.isTasksOver ? 'hvr-grow_1' : null}
                                            >
                                                <img
                                                    height="29"
                                                    width="29"
                                                    src="/assets/img/ok.png"
                                                />
                                                <a className="d-flex align-items-center" style={{ marginBottom: 0, fontSize: 17 }}><b>{this.props.data.exist}/{this.props.data.fact}</b></a>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col style={styles.colStyle}></Col>
                            </Row>
                        </Col>
                    </div>
                    {
                        isModal
                            ? <Modal show={isModal} onHide={() => { this.setState({ isModal: false }) }}>
                                <Modal.Header>
                                    <Modal.Title>Принять проект {isModal}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Вы готовы принять проект?</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={() => {
                                        this.setState({ isModal: false })
                                    }} variant="secondary">Отмена</Button>
                                    <Button onClick={() => {
                                        fetch(`/projects/${this.props.data.id}?mode=prepare`, {
                                            method: "PUT",
                                            headers: {
                                                'Authorization': `Bearer ${jwt}`
                                            },
                                            body: JSON.stringify({
                                                manager: {
                                                    user: {
                                                        login: getLogin()
                                                    }
                                                }
                                            })
                                        })
                                            .then(() => {
                                                this.props.Upd()
                                                this.setState({ isModal: false })
                                            }
                                            )
                                        this.setState({ isModal: false })
                                    }} variant="primary">Принять</Button>
                                </Modal.Footer>
                            </Modal>
                            : null
                    }
                </React.Fragment>
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
                <div className="d-flex align-items-center"><img className="hvr-icon" /*style={{marginTop: '50%', transform: 'translate(0%, -15%)'}}*/ width="100" height="100" src="/assets/img/add.png" /></div>
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

export default withRouter(StartPageMenuElement);