import React from "react"

import {
    Container,
    Row,
    Col
} from "react-bootstrap"
import { useLocation, useParams } from "react-router-dom"
import { getJWT } from "../Functions/Funcs"
import { SearchPanel, ButtonPanel, ProjectNavigation, ContactNavigation } from "../BodyElements/BodyPanel"
import "animate.css";
import { BasicInfo, ProjectInfo } from './BasicInfo'
import { TitlePanel } from './Panels'
import axios from 'axios';


export class ClientViewPage extends React.Component {
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
            id : this.props.match.params.id,
            updateValue: this.updateValue,
        }
    }

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

    componentDidMount() {
        fetch(`/users/${this.props.match.params.id}`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result.data,
                    })
                    axios.get(`/projects?client=${result.data.login}`, {
                        headers: {
                            'Authorization': `Bearer ${getJWT()}`
                        }
                    })
                        .then(res => {
                            const data = res.data;
                            this.setState({
                                work_data: data.items,
                                isLoaded: true
                            })
                        })
                },
                (error) => { this.setState({ error }) }
            )

        this.updateValue(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                {
                    this.state.isLoaded
                        ? <Container fluid>
                            <ContactNavigation 
                                title={`${this.state.data.surname} ${this.state.data.name} ${this.state.data.midname}`} />
                            <Col>
                                <Row>
                                    <Col><BasicInfo data={this.state.data} /></Col>
                                </Row>
                                <Row>
                                    <Col><ProjectInfo data={this.state.work_data} /></Col>
                                </Row>
                            </Col>
                        </Container>
                        : null
                }
            </div>
        )
    }
}


