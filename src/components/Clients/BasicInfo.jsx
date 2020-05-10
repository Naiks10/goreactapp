import React from "react"
import { TitlePanel } from './Panels'
import { Row, Col, Table } from "react-bootstrap"

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
                            <Row>
                                <Col>
                                    <Row>Почта : {this.props.data.mail}</Row>
                                    <Row>Телефон : {this.props.data.phone}</Row>
                                    <Row>Дата рождения : {this.props.data.birthdate}</Row>
                                </Col>
                                <Col>
                                    <div className="d-flex justify-content-end">
                                        <img width="90" height="90" src={this.props.data.src} />
                                    </div>
                                </Col>
                            </Row>
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
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Название проекта</th>
                                        <th>Состояние проекта</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.data.map(
                                            item => (
                                                <tr>
                                                    <th>{item.name}</th>
                                                    <th>{item.status.name}</th>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                        : null
                }
            </div>
        )
    }
}