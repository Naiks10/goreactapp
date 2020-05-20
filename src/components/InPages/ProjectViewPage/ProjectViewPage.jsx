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
                    isLoaded: true
                })
            })
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
            ).then(() => this.updateValue(this.props.match.params.id))
            .then(() => this.updateGraph(this.props.match.params.id))



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
                            </Col>
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


