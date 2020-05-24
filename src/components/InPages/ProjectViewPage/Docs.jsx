import React from "react"
import { TitlePanel } from './Panels'
import { Row, Col, Modal, Form, Button } from "react-bootstrap"
import { getJWT } from "../../Functions/Funcs"
import bsCustomFileInput from "bs-custom-file-input"

//ProjectDocs component
export class ProjectDocs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true,
            fileData : [],
            isLoaded : false
        }
    }

    componentDidMount() {
        this.UpdateValues()
    }

    UpdateValues() {
        this.setState({isLoaded : false})
        fetch(`/files/${this.props.project}`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded : true,
                fileData : result.items
            })
        })
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
                                    <ProjectDocsElementNew upd={() => this.UpdateValues()} project={this.props.project} />
                                    {
                                        this.state.fileData.map(item => (
                                            <ProjectDocsElement upd={() => this.UpdateValues()} project={this.props.project} data={item}/>
                                        ))
                                    }
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
    constructor(props) {
        super(props)
        this.state = {
            isModal : false
        }
    }
    render() {
        var value = 'others'
        switch(this.props.data.file_ext) {
            case '.doc': case '.docx':
                value = 'word'
                break
            case '.ai':
                value = 'ai'
                break
            case '.pdf':
                value = 'pdf'
                break
            case '.xls': case '.xlsx':
                value = 'xls'
                break
            case '.ppt': case '.pptx':
                value = 'ppt'
                break
            case '.psd':
                value = 'psd'
                break
            case '.rar': case '.zip': case '.7z':
                value = 'archive'
                break
            default:
                value = 'others'
                break
        }
        return (
            <div>
                <div className="ProjectElementFMT" 
                onClick={() => this.setState({isModal : true})}>
                    <img
                        width="48"
                        height="48"
                        src={`/assets/img/docs/${value}.png`} />
                </div>
                <div><p style={{fontSize : 14}} className="text-center">{String(this.props.data.file_name).length > 10 ? String(this.props.data.file_name).substring(0, 2) + '...' + this.props.data.file_ext : this.props.data.file_name}</p></div>
                <ProjectDocsElementOpen show={this.state.isModal} onHide={() => this.setState({isModal : false})} upd={() => this.props.upd()} project={this.props.project} data={this.props.data} />
            </div>
        )
    }
}

class ProjectDocsElementOpen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModal: false
        }
    }
    render() {
        bsCustomFileInput.init()
        return (
                <Modal {...this.props}>
                    <Modal.Header>
                        <Modal.Title>
                            Документ "{this.props.data.file_name}"
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {
                            const formData = new FormData();
                            formData.append('project', this.props.project);
                            fetch('/deletedoc', {
                                headers: {
                                    'Authorization': `Bearer ${getJWT()}`
                                },
                                method: 'DELETE',
                                body: formData
                            })
                            .then(() => {
                                this.props.upd()
                                this.props.onHide()
                            })
                        }}>Удалить</Button>
                        <Button onClick={() => {
                             window.open(this.props.data.file_path, '_blank')
                             this.props.onHide()
                        }}>Открыть</Button>
                    </Modal.Footer>
                </Modal>
        )
    }
}

class ProjectDocsElementNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModal: false
        }
    }
    render() {
        bsCustomFileInput.init()
        return (
            <div>
                <div className="ProjectElementFMT" onClick={() => this.setState({ isModal: true })}>
                    <img
                        width="48"
                        height="48"
                        src="/assets/img/add.png" />
                </div>
                <div><p className="text-center">Новый</p></div>
                <Modal show={this.state.isModal} onHide={() => this.setState({ isModal: false })}>
                    <Modal.Header>
                        <Modal.Title>
                            Загрузить новый документ
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Form>
                                <Form.File id="custom-file"
                                    label="Custom file input" custom></Form.File>
                            </Form>
                        </div >
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {
                            const fileInput = document.querySelector('#custom-file');
                            const formData = new FormData();
                            console.log(fileInput.files[0])
                            formData.append('file', fileInput.files[0]);
                            formData.append('project', this.props.project);
                            fetch('/uploaddoc', {
                                headers: {
                                    'Authorization': `Bearer ${getJWT()}`
                                },
                                method: 'POST',
                                body: formData
                            })
                            .then(() => {
                                this.setState({ isModal: false })
                                this.props.upd()
                            })
                        }}>Загрузить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
