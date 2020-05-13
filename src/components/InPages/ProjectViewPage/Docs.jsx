import React from "react"
import { TitlePanel } from './Panels'
import { Row, Col } from "react-bootstrap"

//ProjectDocs component
export class ProjectDocs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }

    //rendering
    render() {
        return (
            <div>
                <TitlePanel
                    title="МАТЕРИАЛЫ"
                    isExpanded={this.state.isExpanded}
                    onClick={() => { this.setState({ isExpanded: !this.state.isExpanded }) }} />
                {
                    this.state.isExpanded //if expanded
                        ? <div className="ProjectElement">
                            <Col>
                                <Row>
                                    <ProjectDocsElement />
                                    <ProjectDocsElement />
                                    <ProjectDocsElement />
                                    <ProjectDocsElementNew />
                                </Row>
                            </Col>
                        </div>
                        : null //else
                }
            </div>
        )
    }
}


class ProjectDocsElement extends React.Component {
    render() {
        return (
            <div>
                <div className="ProjectElementFMT" >
                    <img
                        width="48"
                        height="48"
                        src="/assets/img/word_fmt.png" />
                </div>
                <div><p className="text-center">ТЗ.docx</p></div>
            </div>
        )
    }
}

class ProjectDocsElementNew extends React.Component {
    render() {
        return (
            <div>
                <div className="ProjectElementFMT" >
                    <img
                        width="48"
                        height="48"
                        src="/assets/img/upload.png" />
                </div>
                <div><p className="text-center">Загрузить</p></div>
            </div>
        )
    }
}
