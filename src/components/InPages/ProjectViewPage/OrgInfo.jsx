import React from "react"
import { TitlePanel } from './Panels'
import {Row, Col} from "react-bootstrap"

export class OrgInfo extends React.Component {
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
                    title="ОРГАНИЗАЦИЯ"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    } />
                {
                    this.state.isExpanded
                        ? <div
                            className="ProjectElement">
                            <Col>
                                <Row>
                                    <Col sm={8}>
                                        <Row style={{ fontWeight: 'bold' }}><b>Организация</b></Row>
                                        <Row>{this.props.data.client.organisation.short_name}</Row>
                                        <br />
                                        <Row style={{ fontWeight: 'bold' }}><b>Об организации</b></Row>
                                        <Row>"НЕИЗВЕТСНО"</Row>
                                    </Col>
                                    <Col sm={4} className="d-flex align-items-center justify-content-center">
                                        <img width="90" height="90" src={this.props.data.client.organisation.src} />
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