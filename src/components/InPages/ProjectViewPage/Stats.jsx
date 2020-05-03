import React from "react"
import { TitlePanel } from './Panels'
import { Row } from "react-bootstrap";

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
                            <Row>
                                <a><b>Всего задач</b>{this.props.all_count}</a>
                                <a><b>Выполнено задач</b>{this.props.count}</a>
                                <a><b>Проблем</b>{this.props.issues_count}</a>
                            </Row>
                        </div>
                        : null
                }
            </div>
        )
    }
}