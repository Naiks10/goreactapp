import React from "react"
import { TitlePanel } from './Panels'
import {Row, Col} from "react-bootstrap"

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
                                    <Col sm={4}>
                                        <Row
                                            style={
                                                { fontWeight: 'bold' }
                                            }
                                        >
                                            Ведущий менеджер
                                        </Row>
                                        <Row>
                                            {
                                                this.props.data.manager.user.surname
                                                + ' ' + this.props.data.manager.user.name[0]
                                                + '.' + this.props.data.manager.user.midname[0]
                                            }
                                        </Row>
                                    </Col>
                                    <Col
                                        sm={1}
                                        className="d-flex align-items-center">
                                        <img
                                            width="35"
                                            height="35"
                                            src={this.props.data.manager.user.src} />
                                    </Col>
                                    <Col sm={4}>
                                        <Row style={{ fontWeight: 'bold' }}><b>Контактные данные</b></Row>
                                        <Row>{this.props.data.manager.user.phone}</Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row><br /></Row>
                                        <Row>{this.props.data.manager.user.mail}</Row>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 10 }}>
                                    <Col sm={4}>
                                        <Row style={{ fontWeight: 'bold' }}><b>Руководитель группы</b></Row>
                                        <Row>{this.props.data.dev_init}</Row>
                                    </Col>
                                    <Col sm={1} className="d-flex align-items-center">
                                        <img width="35" height="35" src={this.props.data.dev_img} />
                                    </Col>
                                    <Col sm={4}>
                                        <Row style={{ fontWeight: 'bold' }}><b>Контактные данные</b></Row>
                                        <Row>{this.props.data.dev_phone}</Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row><br /></Row>
                                        <Row>{this.props.data.dev_email}</Row>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 10 }}>
                                    <Col>
                                        <Row style={{ fontWeight: 'bold' }}><b>Количество человек в группе</b></Row>
                                        <Row>{this.props.data.dev_count}</Row>
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