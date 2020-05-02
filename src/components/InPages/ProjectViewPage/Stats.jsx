import React from "react"
import { TitlePanel } from './Panels'

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
                            <h1>Ожидается</h1>
                        </div>
                        : null
                }
            </div>
        )
    }
}