import React from "react"
import { Col, Row, Container, Button } from "react-bootstrap"
import Highcharts from "highcharts"
import HighchartsReact from 'highcharts-react-official'
import { throws } from "assert"
import { getJWT } from "../Functions/Funcs"
import "animate.css"


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
        var jwt = getJWT()

        fetch("/projectsview", {
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

    render() {
        const { isLoaded, error, Items } = this.state;
        if (isLoaded) {
            return (
                <Container fluid style={{ marginTop: 20 }} className="d-flex justify-content-center">
                    <Row className="d-flex justify-content-start" style={{ marginLeft: '5%', width : '90%'}}>
                        <StartPageMenuElementNew />
                        {
                            Items.map(item => (
                                <StartPageMenuElement data={
                                    {
                                        id: item.id,
                                        name: item.name,
                                        issues: item.project_issues,
                                        exist: item.tasks_finished,
                                        fact: item.tasks_all,
                                        org_id: item.org_id,
                                        src: item.src,
                                        status_id: item.status_id,
                                        status_name: item.status_name,
                                        pdatestart: item.start,
                                        pdatefinish: item.finish,
                                        fdatestart: item.start_fact,
                                        fdatefinish: item.finish_fact
                                    }
                                }
                                />
                            ))
                        }
                        {
                            Items.map(item => (
                                <StartPageMenuElement data={
                                    {
                                        id: item.id,
                                        name: item.name,
                                        issues: item.project_issues,
                                        exist: item.tasks_finished,
                                        fact: item.tasks_all,
                                        org_id: item.org_id,
                                        src: item.src,
                                        status_id: item.status_id,
                                        status_name: item.status_name,
                                        pdatestart: item.start,
                                        pdatefinish: item.finish,
                                        fdatestart: item.start_fact,
                                        fdatefinish: item.finish_fact
                                    }
                                }
                                />
                            ))
                        }
                        {
                            Items.map(item => (
                                <StartPageMenuElement data={
                                    {
                                        id: item.id,
                                        name: item.name,
                                        issues: item.project_issues,
                                        exist: item.tasks_finished,
                                        fact: item.tasks_all,
                                        org_id: item.org_id,
                                        src: item.src,
                                        status_id: item.status_id,
                                        status_name: item.status_name,
                                        pdatestart: item.start,
                                        pdatefinish: item.finish,
                                        fdatestart: item.start_fact,
                                        fdatefinish: item.finish_fact
                                    }
                                }
                                />
                            ))
                        }
                        {
                            Items.map(item => (
                                <StartPageMenuElement data={
                                    {
                                        id: item.id,
                                        name: item.name,
                                        issues: item.project_issues,
                                        exist: item.tasks_finished,
                                        fact: item.tasks_all,
                                        org_id: item.org_id,
                                        src: item.src,
                                        status_id: item.status_id,
                                        status_name: item.status_name,
                                        pdatestart: item.start,
                                        pdatefinish: item.finish,
                                        fdatestart: item.start_fact,
                                        fdatefinish: item.finish_fact
                                    }
                                }
                                />
                            ))
                        }
                        {
                            Items.map(item => (
                                <StartPageMenuElement data={
                                    {
                                        id: item.id,
                                        name: item.name,
                                        issues: item.project_issues,
                                        exist: item.tasks_finished,
                                        fact: item.tasks_all,
                                        org_id: item.org_id,
                                        src: item.src,
                                        status_id: item.status_id,
                                        status_name: item.status_name,
                                        pdatestart: item.start,
                                        pdatefinish: item.finish,
                                        fdatestart: item.start_fact,
                                        fdatefinish: item.finish_fact
                                    }
                                }
                                />
                            ))
                        }
                    </Row>
                </Container>
            )
        } else {
            return (
                <p>Loading...</p>
            )
        }
    }
}


export class StartPageMenuElement extends React.Component {
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
            <div
                className="StartMenuElement hvr-grow"
                onMouseLeave={() => {
                    this.setState({
                        LoadedState : 'start'
                    })
                }}
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
                                <img
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
                                    onClick={() => {
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
                                    src={(() => {
                                        return `assets/img/status/${this.props.data.status_id}.png`
                                    })()}
                                />
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
                                                    <p style={{ marginBottom: 1 }}> <a style={{ color: 'rgb(32, 153, 209)' }}>&#8226;</a> Начат</p>
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
                                            src="assets/img/warning.png"
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
                                            src="assets/img/ok.png"
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
            >
                <div className="d-flex align-items-center"><img className="hvr-icon" /*style={{marginTop: '50%', transform: 'translate(0%, -15%)'}}*/ width="100" height="100" src="assets/img/add.png" /></div>
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