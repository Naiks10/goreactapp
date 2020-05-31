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
import { ClientInfo, BasicInfoOrg, WorkerInfo, GroupInfo } from './BasicInfo'
import { TitlePanel } from './Panels'
import axios from 'axios';


export class GroupViewPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            data: null,
            p_data: null,
            work_data: null,
            current: null,
            plan: null,
            count_all: 0,
            count: 0,
            issues: 0,
            id : this.props.match.params.id,
            updateValue: this.updateValue,
        }
    }

    componentDidMount() {
        fetch(`/groups/${this.props.match.params.id}`, {
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
                    axios.get(`/devs?group=${this.props.match.params.id}`, {
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
                        .then(()=> {
                            axios.get(`/projects?group=${this.props.match.params.id}`, {
                                headers: {
                                    'Authorization': `Bearer ${getJWT()}`
                                }
                            })
                                .then(res => {
                                    const data = res.data;
                                    this.setState({
                                        p_data: data.items,
                                    })
                                })
                        })
                        .then(() => {
                            this.setState({isLoaded : true})
                        })
                },
                (error) => { this.setState({ error }) }
            )
    }

    render() {
        return (
            <div>
                {
                    this.state.isLoaded
                        ? <Container fluid>
                            <ContactNavigation 
                            title={`${this.state.data.name}`} />
                            <Col>
                                <Row>
                                    <Col><GroupInfo data={this.state.work_data} p_data={this.state.p_data} /></Col>
                                </Row>
                            </Col>
                        </Container>
                        : null
                }
            </div>
        )
    }
}


