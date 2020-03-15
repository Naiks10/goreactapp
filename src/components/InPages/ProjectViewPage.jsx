import React from "react"

import {
    Container,
    Row,
    Col,
    Button
} from "react-bootstrap"
import { useLocation, useParams } from "react-router-dom"
import { getJWT } from "../Functions/Funcs"

export class ProjectViewPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            data: {}
        }
    }

    componentDidMount() {
        fetch(`/projects/${this.props.match.params.id}`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result.data
                    })
                },
                (error) => {
                    this.setState({
                        error
                    })
                }
            )
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Col>
                        <Row>
                            <h5>Проект "{this.state.data.name}"</h5>
                        </Row>
                        <Row>
                            <Col>
                                <BasicInfo />
                            </Col>
                            <Col>
                                <OrgInfo />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ProjectChartView />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ProjectControlView />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ProjectStatsView />
                            </Col>
                        </Row>
                    </Col>
                </Container>
            </div>
        )
    }
}

class BasicInfo extends React.Component {
    render() {
        return (
            <div>

                <InfoPanel title="ОБЩАЯ" />

                <div className="ProjectElement">
                    <Col>
                        <Row>
                            <Col sm={4}>
                                <Row style={{fontWeight : 'bold'}}>Ведущий менеджер</Row>
                                <Row>9999999999999</Row>
                            </Col>
                            <Col sm={1} className="d-flex align-items-center">
                                <img width="35" height="35" src="/assets/img/info.png" />
                            </Col>
                            <Col sm={4}>
                                <Row style={{fontWeight : 'bold'}}><b>Контактные данные</b></Row>
                                <Row>
                                    00000000000000
                                </Row>
                            </Col>
                            <Col sm={3}>
                                <Row>
                                    <br/>
                                </Row>
                                <Row>00000000000000</Row>
                            </Col>
                        </Row>
                        <Row style={{marginTop : 10}}>
                        <Col sm={4}>
                                <Row style={{fontWeight : 'bold'}}><b>Руководитель группы</b></Row>
                                <Row>****************</Row>
                            </Col>
                            <Col sm={1} className="d-flex align-items-center">
                                <img width="35" height="35" src="/assets/img/info.png" />
                            </Col>
                            <Col sm={4}>
                                <Row style={{fontWeight : 'bold'}}><b>Контактные данные</b></Row>
                                <Row>
                                    *******************
                                </Row>
                            </Col>
                            <Col sm={3}>
                                <Row>
                                    <br/>
                                </Row>
                                <Row>*******************</Row>
                            </Col>
                        </Row>
                        <Row style={{marginTop : 10}}>
                            <Col>
                                <Row style={{fontWeight : 'bold'}}><b>Количество человек в группе</b></Row>
                                <Row>256</Row>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }
}

class OrgInfo extends React.Component {

    render() {
        return (
            <div>
                <InfoPanel title="ОРГАНИЗАЦИЯ"/>
                <div 
                    className="ProjectElement">
                    <Col>
                        <Row>
                            <Col sm={8}>
                                <Row style={{fontWeight : 'bold'}}><b>Организация</b></Row>
                                <Row>"НЕИЗВЕТСНО"</Row>
                                <br/>
                                <Row style={{fontWeight : 'bold'}}><b>Об организации</b></Row>
                                <Row>"НЕИЗВЕТСНО"</Row>
                            </Col>
                            <Col sm={4} className="d-flex align-items-center justify-content-center">
                                <img width="90" height="90" src="/data/img/orgs/cadillac.png"/>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }
}

class ProjectChartView extends React.Component {
    render() {
        return (
            <div>
                <InfoPanel title="ПРОГРЕСС" />
                <div className="ProjectElement">
                    <h1>Заебал</h1>
                </div>
            </div>
        )
    }
}

class ProjectControlView extends React.Component {
    render() {
        return (
            <div>
                <InfoPanel title="ЗАДАЧИ" />
                <div className="ProjectElement">
                    <h1>Просто</h1>
                </div>
            </div>
        )
    }
}

class ProjectStatsView extends React.Component {
    render() {
        return (
            <div>
                <InfoPanel title="СТАТИСТИКА" />
                <div className="ProjectElement">
                    <h1>Пиздец</h1>
                </div>
            </div>
        )
    }
}

class InfoPanel extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Col>
                <Col>
                    <Row>
                        <Row className="d-flex align-items-center"  style={{ backgroundColor: 'whitesmoke', borderRadius: 4, paddingLeft: 15, paddingRight: 15, height: 40, minWidth: 120 }}>
                            <Row>
                                <div style={{ marginLeft: 15 }} className="d-flex justify-content-center align-items-center">
                                    <img src="/assets/img/info_1.png" width="20" height="20" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p className="d-flex align-items-center" style={{ fontSize: 12, height: '100%', color: '#6E6E6E', fontWeight: 'bold', marginBottom: 0, marginLeft: 20, marginRight: 35 }}>{this.props.title}</p>
                                </div>
                            </Row>
                        </Row>
                    </Row>
                </Col>
            </Col>
        )
    }
}