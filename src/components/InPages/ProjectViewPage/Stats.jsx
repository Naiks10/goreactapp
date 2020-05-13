import React from "react"
import { TitlePanel } from './Panels'
import { Row } from "react-bootstrap";
import { ProjectValueContext } from "./Consts";

//ProjectStatsView component
export class ProjectStatsView extends React.Component {
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
                    title="СТАТИСТИКА"
                    isExpanded={this.state.isExpanded}
                    onClick={
                        () => {
                            this.setState({ isExpanded: !this.state.isExpanded })
                        }
                    } />
                {
                    this.state.isExpanded
                        ? <div className="ProjectElement">
                            <Row style={{ margin: 15 }}>
                                <ProjectValueContext.Consumer>
                                    {value =>
                                        <React.Fragment>
                                            <a style={styles.forA}>
                                                <b style={styles.forB}>
                                                    Всего задач
                                                </b>
                                                {value.count_all}
                                            </a>
                                            <a style={styles.forA}>
                                                <b style={styles.forB}>
                                                    Выполнено задач
                                                </b>
                                                {value.count}
                                            </a>
                                            <a style={styles.forA}>
                                                <b style={styles.forB}>
                                                    Проблем
                                                </b>
                                                {value.issues}
                                            </a>
                                        </React.Fragment>
                                    }
                                </ProjectValueContext.Consumer>
                            </Row>
                        </div>
                        : null
                }
            </div>
        )
    }
}


//Styles
const styles = {
    forA: { marginRight: 30 },
    forB: { marginRight: 7 }
}