import React from "react"

import {
    Container,
    Row,
    Col
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
import { WorkGroupContext, ProjectContext, ProjectValueContext } from './Consts'
import { TitlePanel } from './Panels'
import axios from 'axios';


export class ProjectViewPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            data: {},
            work_data: {},
            globalProjectData : {
                projects_chart_data: {
                    current: null,
                    plan: null,
                },
                count_all: 0,
                count: 0,
                issues: 0,
                updateValue: this.updateValue,
            },
        }
    }

    updateValue() {
        axios.get(`projectvalues/${this.props.match.params.id}`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
        .then(res => {
            const data = res.data
            this.setState({
                globalProjectData : data
            })
        })
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
                        data: result.data,
                        isLoaded: true
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
            )

            this.updateValue()
    }

    render() {
        return (
            <div>
                {
                    this.state.isLoaded
                        ? <Container fluid>
                            <ProjectNavigation title={this.state.data.name} />
                            <Col>
                                <Row>
                                    <Col><BasicInfo data={this.state.data} /></Col>
                                    <Col><OrgInfo data={this.state.data} /></Col>
                                </Row>
                                <Row>
                                    <ProjectValueContext.Provider value={this.state.globalProjectData}>
                                        <Col><ProjectChartView /></Col>
                                    </ProjectValueContext.Provider>
                                </Row>
                                <Row>
                                    <Col><ProjectDocs /></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ProjectContext.Provider value={this.state.data}>
                                            <WorkGroupContext.Provider value={this.state.work_data}>
                                                <ProjectValueContext.Provider value={this.state.globalProjectData}>
                                                    <ProjectControlView />
                                                </ProjectValueContext.Provider>
                                            </WorkGroupContext.Provider>
                                        </ProjectContext.Provider>
                                    </Col>
                                </Row>
                                <Row>
                                    <ProjectValueContext.Provider value={this.state.globalProjectData}>
                                        <Col><ProjectStatsView /></Col>
                                    </ProjectValueContext.Provider>
                                </Row>
                            </Col>
                        </Container>
                        : null
                }
            </div>
        )
    }
}

class ProjectControlView extends React.Component {
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


