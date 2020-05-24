import React from "react"

import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
    Toast
} from "react-bootstrap"
import { useLocation, useParams } from "react-router-dom"
import { ProjectContainer } from "./Containers/Project"
import { getJWT } from "../../Functions/Funcs"
import { SearchPanel, ButtonPanel, ProjectNavigation } from "../../BodyElements/BodyPanel"
import "animate.css";
import { BasicInfo } from './BasicInfo'
import { OrgInfo } from "./OrgInfo";
import { ProjectChartView } from './Chart'
import { ProjectDocs } from "./Docs";
import { ProjectStatsView } from './Stats'
import { WorkGroupContext, ProjectContext, ProjectValueContext, ProjectGraphContext } from './Consts'
import { TitlePanel } from './Panels'
import axios from 'axios';


//ProjectViewPage
export class ProjectViewPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            data: {},
            work_data: {},
            current: null,
            plan: null,
            count_all: 0,
            count: 0,
            issues: 0,
            id: this.props.match.params.id,
            updateValue: this.updateValue,
            updateGraph: this.updateGraph,
            ItemsFact: [],
            Items: [],
            isLoaded: false,
            abort: '',
            isModalAbort: false,
            isModalAction: false,
            status: 0,
            toasty : false
        }
    }

    //UniversalUpdatingFunc
    updateValue = (value) => {
        axios.get(`/projectvalues/${value}`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => {
                const data = res.data
                this.setState({
                    current: data.data.current,
                    plan: data.data.plan,
                    count_all: data.data.count_all,
                    count: data.data.count,
                    issues: data.data.issues,
                })
            })
    }

    updateGraph = (value) => {
        axios.get(`/stat/${value}`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => {
                const data = res.data
                this.setState({
                    Items: data.items,
                })
            }).then(() =>
                axios.get(`/stat_fact/${value}`, {
                    headers: {
                        'Authorization': `Bearer ${getJWT()}`
                    }
                })
                    .then(res => {
                        const data = res.data
                        this.setState({
                            ItemsFact: data.items,
                            isLoaded: true
                        })
                    })
            )

    }

    //prepare
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
                        data: result.data,
                        isLoaded: true,
                        status: result.data.status.id
                    })
                    axios.get(`/workers?workgroup=${result.data.workgroup.id}`, {
                        headers: {
                            'Authorization': `Bearer ${getJWT()}`
                        }
                    })
                        .then(res => {
                            const data = res.data;
                            this.setState({
                                work_data: data.items,
                            })
                        })
                },
                (error) => { this.setState({ error }) }
            ).then(() => this.updateValue(this.props.match.params.id))
            .then(() => this.updateGraph(this.props.match.params.id))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.count_all != this.state.count_all 
            || prevState.count != this.state.count) {
                if (this.state.count_all == this.state.count) {
                    this.setState({toasty : true})
                }
            }
    }

    //rendering
    render() {
        return (
            <div>
                {
                    this.state.isLoaded //if
                        ? <Container fluid>
                            <ProjectNavigation title={this.state.data.name} />
                            <Col>
                                <Row>
                                    <Col><BasicInfo data={this.state.data} /></Col>
                                    <Col><OrgInfo data={this.state.data} /></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ProjectGraphContext.Provider value={{
                                            ID: this.state.id,
                                            Items: this.state.Items,
                                            Items_fact: this.state.ItemsFact,
                                            updateValue: this.state.updateGraph,
                                            isLoaded: this.state.isLoaded
                                        }}>
                                            <ProjectChartView />
                                        </ProjectGraphContext.Provider>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col><ProjectDocs project={this.props.match.params.id} /></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ProjectContext.Provider value={this.state.data}>
                                            <WorkGroupContext.Provider value={this.state.work_data}>
                                                <ProjectValueContext.Provider value={{
                                                    id: this.state.id,
                                                    current: this.state.current,
                                                    plan: this.state.plan,
                                                    count_all: this.state.count_all,
                                                    count: this.state.count,
                                                    issues: this.state.issues,
                                                    updateValue: this.state.updateValue
                                                }}>
                                                    <ProjectGraphContext.Provider value={{
                                                        ID: this.state.id,
                                                        Items: this.state.Items,
                                                        Items_fact: this.state.ItemsFact,
                                                        updateValue: this.state.updateGraph,
                                                        isLoaded: this.state.isLoaded
                                                    }}>
                                                        <ProjectControlView />
                                                    </ProjectGraphContext.Provider>
                                                </ProjectValueContext.Provider>
                                            </WorkGroupContext.Provider>
                                        </ProjectContext.Provider>
                                    </Col>
                                </Row>
                                <Row>
                                    <ProjectValueContext.Provider value={{
                                        current: this.state.current,
                                        plan: this.state.plan,
                                        count_all: this.state.count_all,
                                        count: this.state.count,
                                        issues: this.state.issues,
                                        updateValue: this.state.updateValue
                                    }}>
                                        <Col><ProjectStatsView /></Col>
                                    </ProjectValueContext.Provider>
                                </Row>
                                <Row style={{ marginTop: 20, marginBottom: 30 }}>
                                    <Col>
                                        <div className="d-flex flex-row-reverse">
                                            {
                                                (() => {
                                                    switch (this.state.status) {
                                                        case 1:
                                                            return <Button onClick={() => this.setState({ isModalAction: true })} variant="primary">Начать выполнение проект</Button>
                                                        case 2:
                                                            return <Button disabled={this.state.count_all == 0 || this.state.count_all != this.state.count} onClick={() => this.setState({ isModalAction: true })} variant="warning">Перевести в режим итогового тестирования</Button>
                                                        case 3:
                                                            return <Button disabled={this.state.count_all == 0 || this.state.issues != 0 || this.state.count_all != this.state.count} onClick={() => this.setState({ isModalAction: true })} variant="success">Завершить проект</Button>
                                                        default:
                                                            return null
                                                    }
                                                })()
                                            }
                                            <Button onClick={() => this.setState({ isModalAbort: true })} style={{ marginRight: 20 }} variant="outline-danger">Отменить выполнение</Button>
                                            <Modal show={this.state.isModalAbort} onHide={() => this.setState({ isModalAbort: false })}>
                                                <Modal.Header>
                                                    <Modal.Title>Вы готовы отменить проект?</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form.Group>
                                                        <Form.Label>Введите слово "ОТМЕНИТЬ" для подтвеждения</Form.Label>
                                                        <Form.Control onChange={(e) => this.setState({ abort: e.target.value.toUpperCase() })} placeholder="ОТМЕНИТЬ" />
                                                    </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button disabled={this.state.abort != 'ОТМЕНИТЬ'} onClick={() => {
                                                        fetch(`/projects/${this.props.match.params.id}?mode=abort`, {
                                                            headers: {
                                                                'Authorization': `Bearer ${getJWT()}`
                                                            },
                                                            method: "PUT"
                                                        })
                                                            .then(() => this.setState({ isModalAbort: false }))
                                                    }} variant="danger">Отменить выполнение</Button>
                                                    <Button onClick={() => this.setState({ isModalAbort: false })} variant="danger">Закрыть</Button>
                                                </Modal.Footer>
                                            </Modal>
                                            <Modal show={this.state.isModalAction} onHide={() => this.setState({ isModalAction: false })}>
                                                <Modal.Header>
                                                    <Modal.Title>Вы готовы
                                                        {(() => {
                                                            switch (this.state.status) {
                                                                case 1:
                                                                    return ' начать разработку '
                                                                case 2:
                                                                    return ' перейти к тестированию '
                                                                case 3:
                                                                    return ' закончить проект '
                                                                default:
                                                                    return null
                                                            }
                                                        })()}?</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form.Group>
                                                        <Form.Label>Введите слово
                                                        {(() => {
                                                                switch (this.state.status) {
                                                                    case 1:
                                                                        return ' "НАЧАТЬ" '
                                                                    case 2:
                                                                        return ' "ТЕСТИРОВАТЬ" '
                                                                    case 3:
                                                                        return ' "ЗАВЕРШИТЬ" '
                                                                    default:
                                                                        return null
                                                                }
                                                            })()}
                                                             для подтвеждения</Form.Label>
                                                        <Form.Control onChange={(e) => this.setState({ abort: e.target.value.toUpperCase() })}
                                                            placeholder={(() => {
                                                                switch (this.state.status) {
                                                                    case 1:
                                                                        return 'НАЧАТЬ'
                                                                    case 2:
                                                                        return 'ТЕСТИРОВАТЬ'
                                                                    case 3:
                                                                        return 'ЗАВЕРШИТЬ'
                                                                    default:
                                                                        return null
                                                                }
                                                            })()} />
                                                    </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button disabled={this.state.abort != (() => {
                                                        switch (this.state.status) {
                                                            case 1:
                                                                return 'НАЧАТЬ'
                                                            case 2:
                                                                return 'ТЕСТИРОВАТЬ'
                                                            case 3:
                                                                return 'ЗАВЕРШИТЬ'
                                                            default:
                                                                return null
                                                        }
                                                    })()} onClick={() => {
                                                        fetch(`/projects/${this.props.match.params.id}?mode=${
                                                            (() => {
                                                                switch (this.state.status) {
                                                                    case 1:
                                                                        return 'indev'
                                                                    case 2:
                                                                        return 'debug'
                                                                    case 3:
                                                                        return 'success'
                                                                    default:
                                                                        return null
                                                                }
                                                            })()
                                                            }`, {
                                                            headers: {
                                                                'Authorization': `Bearer ${getJWT()}`
                                                            },
                                                            method: "PUT"
                                                        })
                                                            .then(() => this.setState({ isModalAction: false }))
                                                            .then(() => this.setState({ status: this.state.status + 1 }))
                                                    }} variant="danger">Подтвердить</Button>
                                                    <Button onClick={() => this.setState({ isModalAction: false })} variant="danger">Закрыть</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <div style={
                                {
                                    position : 'fixed',
                                    bottom : 10,
                                    right : 10
                                }
                            }>
                            <Toast show={this.state.toasty} onClose={() => this.setState({toasty : false})} delay={5000} autohide>
                                <Toast.Header>
                                    <img src={`/assets/img/status/${this.state.status + 1}.png`} alt="" />
                                    <strong className="mr-auto">Ура - этот этап закончен (наверно)</strong>
                                </Toast.Header>
                                <Toast.Body>Если всё успешно, пора начинать новый этап в нашем проекте</Toast.Body>
                            </Toast>
                            </div>
                        </Container>
                        : null //else
                }
            </div>
        )
    }
}

//ProjectControlView component
class ProjectControlView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }

    //rendeing
    render() {
        return (
            <div>
                <TitlePanel
                    title="ЗАДАЧИ"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    } />
                {
                    this.state.isExpanded
                        ? <div className="ProjectElement">
                            <Col>
                                <Col>
                                    <Row>
                                        <Row>
                                            <SearchPanel />
                                            <ButtonPanel src="/assets/img/filter.png" />
                                        </Row>
                                    </Row>
                                    <div>
                                        <ProjectContext.Consumer>
                                            {data => <ProjectContainer data={data} />}
                                        </ProjectContext.Consumer>
                                    </div>
                                </Col>
                            </Col>
                        </div>
                        : null
                }
            </div>
        )
    }
}


