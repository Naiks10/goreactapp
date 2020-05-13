import React from "react";
import { Col, Row } from "react-bootstrap"


//InfoPanel for issues
export class InfoPanel extends React.Component {
    constructor(props) {
        super(props)
    }
    //rendering
    render() {
        return (

            <Row
                className="d-flex align-items-center InfoPanel"
                style={
                    {
                        backgroundColor: 'whitesmoke',
                        position: 'relative',
                        borderRadius: 4,
                        paddingLeft: 15,
                        paddingRight: 15,
                        height: 40,
                        minWidth: 120,
                        marginRight: 7
                    }
                }>
                {
                    <div
                        style={{ marginLeft: 15 }}
                        className="d-flex justify-content-center align-items-center">
                        <img
                            src="/assets/img/issue_warn.png"
                            width="20"
                            height="20" />
                    </div>}
                <div className="d-flex justify-content-center">
                    <p
                        className="d-flex align-items-center"
                        style={
                            {
                                fontSize: 12,
                                height: '100%',
                                color: '#6E6E6E',
                                fontWeight: 'bold',
                                marginBottom: 0,
                                marginLeft: 35,
                                marginRight: 35
                            }
                        }>{this.props.title}</p>
                </div>
            </Row >
        )
    }
}


//TitlePanle for Info statement
export class TitlePanel extends React.Component {
    constructor(props) {
        super(props)
    }
    //rendering
    render() {
        return (
            <Col>
                <Col>
                    <Row>
                        <Row
                            onClick={this.props.onClick}
                            className="d-flex align-items-center InfoPanel"
                            style={
                                {
                                    backgroundColor: 'whitesmoke',
                                    borderRadius: 4,
                                    marginBottom: 20,
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    height: 40,
                                    minWidth: 120
                                }
                            }>
                            <Row>
                                <div
                                    style={{ marginLeft: 15 }}
                                    className="d-flex justify-content-center align-items-center">
                                    <img
                                        src="/assets/img/info_1.png"
                                        width="20"
                                        height="20" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p
                                        className="d-flex align-items-center"
                                        style={
                                            {
                                                fontSize: 12,
                                                height: '100%',
                                                color: '#6E6E6E',
                                                fontWeight: 'bold',
                                                marginBottom: 0,
                                                marginLeft: 20,
                                                marginRight: 20
                                            }
                                        }>{this.props.title}</p>
                                </div>
                                <div
                                    style={{ marginRight: 15 }}
                                    className="d-flex justify-content-center align-items-center">
                                    <img
                                        className={`Expand_${this.props.isExpanded}`}
                                        src="/assets/img/expand.png"
                                        width="20"
                                        height="20" />
                                </div>
                            </Row>
                        </Row>
                    </Row>
                </Col>
            </Col>
        )
    }
}