import React from "react"
import { TitlePanel } from './Panels'
import { Row, Col, Table, Tabs, Tab, Badge, Button } from "react-bootstrap"
import history from "../Functions/history"
import { GetDate } from "../Functions/Funcs"

export class BasicInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }
    render() {
        return (
            <div>

                <TitlePanel
                    title="ОБЩАЯ"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    }
                />

                {
                    this.state.isExpanded
                        ? <div className="ProjectElement">
                            <Col>
                                <Row>
                                    <Col>
                                        <Row style={styles.row}>Почта : {this.props.data.mail}</Row>
                                        <Row style={styles.row}>Телефон : {this.props.data.phone}</Row>
                                        <Row style={styles.row}>Дата рождения : {(() => {
                                            var date = new Date(this.props.data.birthdate)
                                            return date.toLocaleDateString("ru-Ru")
                                        })()}</Row>
                                    </Col>
                                    <Col>
                                        <div className="d-flex justify-content-end">
                                            <img width="90" height="90" src={this.props.data.src} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </div>
                        : null
                }
            </div>
        )
    }
}

export class BasicInfoOrg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }
    render() {
        return (
            <div>

                <TitlePanel
                    title="ОБЩАЯ"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    }
                />

                {
                    this.state.isExpanded
                        ? <div className="ProjectElement">
                            <Col>
                                <Row>
                                    <Col>
                                        <Row style={styles.row}>Почта : {this.props.data.mail}</Row>
                                        <Row style={styles.row}>Телефон : {this.props.data.phone}</Row>
                                        <Row style={styles.row}>Дата рождения : {(() => {
                                            var date = new Date(this.props.data.birthdate)
                                            return date.toLocaleDateString("ru-Ru")
                                        })()}</Row>
                                    </Col>
                                    <Col>
                                        <div className="d-flex justify-content-end">
                                            <img width="90" height="90" src={this.props.data.src} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </div>
                        : null
                }
            </div>
        )
    }
}

export class ProjectInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }

    render() {
        return (
            <div>

                <TitlePanel
                    title="Проекты"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    }
                />

                {
                    this.state.isExpanded && this.props.data != null
                        ? <div className="ProjectElement">
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Название проекта</th>
                                        <th>Состояние проекта</th>
                                        <th>Даты (плановые)</th>
                                        <th>Даты (фактические)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.data.map(
                                            item => (
                                                <tr style={{ color: item.status.id === 0 ? '#9e9e9e' : 'black' }} onClick={item.status.id !== 0 ? () => { history.push(`/workspace/projects/${item.id}`) } : null}>
                                                    <th>{item.name}</th>
                                                    <th>{item.status.name}</th>
                                                    <th>{`${(() => {
                                                        var date = new Date(item.start)
                                                        return date.toLocaleDateString('ru-Ru')
                                                    })()}
                                                        -
                                                        ${(() => {
                                                            var date = new Date(item.finish)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}`}</th>
                                                    <th>{GetDate(item.start_fact)
                                                        ? `${(() => {
                                                            var date = new Date(item.start_fact)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}
                                                        -
                                                        ${(() => {
                                                            var date = new Date(item.finish_fact)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}`
                                                        : 'Н/Д'}</th>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                        : <div style={{ height: 300 }} className="d-flex justify-content-center align-items-center">
                            <h2 style={{ color: '#6E6E6E' }}>{'Кто-то зарегистриррвался и сидит без проектов :( Исправим?'}</h2>
                        </div>
                }
            </div>
        )
    }
}

export class ClientInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }
    render() {
        return (
            <div>

                <TitlePanel
                    title="Проекты"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    }
                />

                {
                    this.state.isExpanded && this.props.data != null
                        ? 
                            <Tabs
                                id="tab-1"
                                defaultActiveKey="client"
                                variant="pills"
                            >
                                <Tab eventKey="client" title="Состав">
                                <div style={{marginTop : 12}} className="ProjectElement">
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>ФИО</th>
                                                <th>Телефон</th>
                                                <th>E-mail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.data.map(
                                                    item => (
                                                        <tr onClick={() => {history.push(`/workspace/clients/${item.user.login}`)}}>
                                                            <th>{`${item.user.surname} ${item.user.name} ${item.user.midname}`}</th>
                                                            <th>{item.user.phone}</th>
                                                            <th>{item.user.mail}</th>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                    </div>
                                </Tab>
                                <Tab eventKey="project" title="Проекты организации">
                                <div style={{marginTop : 12}} className="ProjectElement">
                                <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Название проекта</th>
                                        <th>Состояние проекта</th>
                                        <th>Даты (плановые)</th>
                                        <th>Даты (фактические)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.p_data.map(
                                            item => (
                                                <tr style={{ color: item.status.id === 0 ? '#9e9e9e' : 'black' }} onClick={item.status.id !== 0 ? () => { history.push(`/workspace/projects/${item.id}`) } : null}>
                                                    <th>{item.name}</th>
                                                    <th>{item.status.name}</th>
                                                    <th>{`${(() => {
                                                        var date = new Date(item.start)
                                                        return date.toLocaleDateString('ru-Ru')
                                                    })()}
                                                        -
                                                        ${(() => {
                                                            var date = new Date(item.finish)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}`}</th>
                                                    <th>{GetDate(item.start_fact)
                                                        ? `${(() => {
                                                            var date = new Date(item.start_fact)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}
                                                        -
                                                        ${(() => {
                                                            var date = new Date(item.finish_fact)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}`
                                                        : 'Н/Д'}</th>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </Table>
                                    </div>
                                </Tab>
                            </Tabs>
                        
                        : <div style={{ height: 300 }} className="d-flex justify-content-center align-items-center">
                            <h2 style={{ color: '#6E6E6E' }}>Организация есть, а клиентов нет ¯\_(ツ)_/¯`</h2>
                        </div>
                }
            </div>
        )
    }
}


export class WorkerInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }
    render() {
        return (
            <div>

                <TitlePanel
                    title="Проекты"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    }
                />

                {
                    this.state.isExpanded && this.props.data !== null && this.props.p_data !== null
                        ? 
                            <Tabs
                                id="tab-1"
                                defaultActiveKey="client"
                                variant="pills"
                            >
                                <Tab eventKey="client" title="Рабочие группы">
                                <div style={{marginTop : 12}} className="ProjectElement">
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>Группа</th>
                                                <th>Является руководителем</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.data.map(
                                                    item => (
                                                        <tr onClick={() => {history.push(`/workspace/clients/${item.user.login}`)}}>
                                                            <th>{item.workgroup_name}</th>
                                                            <th>{item.head_status ? <Badge variant="primary">Да</Badge> : null}</th>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                    </div>
                                </Tab>
                                <Tab eventKey="project" title="Проекты">
                                <div style={{marginTop : 12}} className="ProjectElement">
                                <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Название проекта</th>
                                        <th>Состояние проекта</th>
                                        <th>Даты (плановые)</th>
                                        <th>Даты (фактические)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.p_data.map(
                                            item => (
                                                <tr style={{ color: item.status.id === 0 ? '#9e9e9e' : 'black' }} onClick={item.status.id !== 0 ? () => { history.push(`/workspace/projects/${item.id}`) } : null}>
                                                    <th>{item.name}</th>
                                                    <th>{item.status.name}</th>
                                                    <th>{`${(() => {
                                                        var date = new Date(item.start)
                                                        return date.toLocaleDateString('ru-Ru')
                                                    })()}
                                                        -
                                                        ${(() => {
                                                            var date = new Date(item.finish)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}`}</th>
                                                    <th>{GetDate(item.start_fact)
                                                        ? `${(() => {
                                                            var date = new Date(item.start_fact)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}
                                                        -
                                                        ${(() => {
                                                            var date = new Date(item.finish_fact)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}`
                                                        : 'Н/Д'}</th>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </Table>
                                    </div>
                                </Tab>
                            </Tabs>
                        
                        : <div style={{ height: 300 }} className="d-flex justify-content-center align-items-center">
                            <h2 style={{ color: '#6E6E6E' }}>Организация есть, а клиентов нет ¯\_(ツ)_/¯`</h2>
                        </div>
                }
            </div>
        )
    }
}

export class GroupInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }
    render() {
        return (
            <div>

                <TitlePanel
                    title="Проекты"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    }
                />

                {
                    this.state.isExpanded && this.props.data !== null && this.props.p_data !== null
                        ? 
                            <Tabs
                                id="tab-1"
                                defaultActiveKey="client"
                                variant="pills"
                            >
                                <Tab eventKey="client" title="Состав группы">
                                <div className="d-flex flex-row-reverse"><Button variant="success">Добавить участника</Button> </div>   
                                 <div style={{marginTop : 12}} className="ProjectElement">
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>ФИО</th>
                                                <th>Аут-соурс</th>
                                                <th>Тестер</th>
                                                <th>Действие</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.data.map(
                                                    item => (
                                                        <tr onClick={() => {history.push(`/workspace/devs/${item.user.login}`)}}>
                                                            <th>{item.user.surname} {item.user.name} {item.user.midname}</th>
                                                            <th>{item.is_outsource ? <Badge variant="primary">Да</Badge> : null}</th>
                                                            <th>{item.is_tester ? <Badge variant="primary">Да</Badge> : null}</th>
                                                            <th><Button onClick={(e) => {
                                                                e.stopPropagation()
                                                            }} variant="danger">Удалить</Button></th>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                    </div>
                                </Tab>
                                <Tab eventKey="project" title="Проекты">
                                <div style={{marginTop : 12}} className="ProjectElement">
                                <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Название проекта</th>
                                        <th>Состояние проекта</th>
                                        <th>Даты (плановые)</th>
                                        <th>Даты (фактические)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.p_data.map(
                                            item => (
                                                <tr style={{ color: item.status.id === 0 ? '#9e9e9e' : 'black' }} onClick={item.status.id !== 0 ? () => { history.push(`/workspace/projects/${item.id}`) } : null}>
                                                    <th>{item.name}</th>
                                                    <th>{item.status.name}</th>
                                                    <th>{`${(() => {
                                                        var date = new Date(item.start)
                                                        return date.toLocaleDateString('ru-Ru')
                                                    })()}
                                                        -
                                                        ${(() => {
                                                            var date = new Date(item.finish)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}`}</th>
                                                    <th>{GetDate(item.start_fact)
                                                        ? `${(() => {
                                                            var date = new Date(item.start_fact)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}
                                                        -
                                                        ${(() => {
                                                            var date = new Date(item.finish_fact)
                                                            return date.toLocaleDateString('ru-Ru')
                                                        })()}`
                                                        : 'Н/Д'}</th>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </Table>
                                    </div>
                                </Tab>                         
                            </Tabs>
                        
                        : <div style={{ height: 300 }} className="d-flex justify-content-center align-items-center">
                            <h2 style={{ color: '#6E6E6E' }}>Организация есть, а клиентов нет ¯\_(ツ)_/¯`</h2>
                        </div>
                }
            </div>
        )
    }
}

const styles = {
    row: {
        marginBottom: 5,
        marginTop: 5
    }
}