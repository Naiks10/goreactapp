import React from "react"
import { Col, Row, Container, Button, Spinner, Badge, Modal, Form, Dropdown, Pagination } from "react-bootstrap"
import Highcharts from "highcharts"
import HighchartsReact from 'highcharts-react-official'
import { throws } from "assert"
import { getJWT, getRole, getLogin, GetDate } from "../Functions/Funcs"
import { Link, Redirect, withRouter, useHistory, useLocation } from "react-router-dom"
import "animate.css"
import "hover.css"
import history from '../Functions/history'
import { GroupContext } from '../InPages/ProjectViewPage/Consts'
import { MainNavigation } from "../BodyElements/BodyPanel"
import { CustomToggle, CustomMenu } from "../InPages/ProjectViewPage/Containers/CustomControl"

const jwt = getJWT()

//StatrPageMenu basic component
export class StartPageMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Items: [],
            isLoaded: false,
            error: null,
            CurrentElement: 'start',
            Group: [],
            vis: false,
            keyWord: ''
        }
    }
    //prepare function
    componentDidMount() {
        this.UpdateFunc()
        fetch('/groups?offset=1', {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ Group: result.items })
                }
            )
            }

    //UpdateFunc for prepare and callback
    UpdateFunc() {
        //GetRole?
        switch (true) {
            case getRole() === '1': //admin
                fetch(`/projectsview${this.state.keyWord === '' ? '' : `?search=${this.state.keyWord}`}`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                Items: result.items
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
                break;
            case getRole() === '2': //manager
                fetch(`/projectsview?manager=${getLogin()}${this.state.keyWord === '' ? '' : `&search=${this.state.keyWord}`}`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                Items: result.items
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
                break;
            case getRole() === '3': case getRole() === '4': //developer
                fetch(`/projectsview?developer=${getLogin()}${this.state.keyWord === '' ? '' : `&search=${this.state.keyWord}`}`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                Items: result.items
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
                break;
            case getRole() === '6': //Client
                fetch(`/projectsview?client=${getLogin()}${this.state.keyWord === '' ? '' : `&search=${this.state.keyWord}`}`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                Items: result.items
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
        }
        this.setState({ vis: false })
    }

    search = (value) => {
        this.setState({ keyWord: value })
        this.UpdateFunc()
    }

    //rendering
    render() {
        //state values
        const { isLoaded, error, Items, Group } = this.state;
        //if async Prepare finished
        if (isLoaded) {
            return (
                <div>
                    <MainNavigation search={this.search} />
                    <Container
                        fluid
                        style={{ marginTop: 20 }}
                        className="d-flex justify-content-center">
                        <Col style={{ marginLeft: '4%', marginRight: '4%' }}>
                            <div className="box_xss">
                                { //rendering by mapping non-started projects
                                    this.state.Items //if items isn't null
                                        ? Items.map(item => (
                                            item.status_id === 0
                                                || (item.status_id === 1 && item.group_id === 0)
                                                ? (!this.state.vis ? this.setState({ vis: true }) : null,
                                                    <StartPageMenuElement
                                                        Upd={() => { this.UpdateFunc() }}
                                                        data={
                                                            {
                                                                id: item.id,
                                                                name: item.name,
                                                                issues: item.project_issues,
                                                                exist: item.tasks_finished,
                                                                fact: item.tasks_all,
                                                                org_id: item.org_id,
                                                                group_id: item.group_id,
                                                                src: item.src,
                                                                status_id: item.status_id,
                                                                status_name: item.status_name,
                                                                pdatestart: item.start,
                                                                pdatefinish: item.finish,
                                                                fdatestart: item.start_fact,
                                                                fdatefinish: item.finish_fact,
                                                                group_data: Group
                                                            }
                                                        }
                                                    />)
                                                : null //else
                                        ))
                                        : null //else
                                }
                            </div>
                            {this.state.vis ? <div
                                style={
                                    {
                                        width: '100%',
                                        marginTop: 5,
                                        marginBottom: 5,
                                        height: 2,
                                        borderRadius: 10,
                                        opacity: '20%',
                                        backgroundColor: '#2098D1'
                                    }
                                }>
                            </div> : null}
                            <div className="box_xss">
                                {getRole() === '3' || getRole() === '4' ? null : <StartPageMenuElementNew />}
                                {//rendering by mapping
                                    this.state.Items //if items isn't null
                                        ? Items.map(item => (
                                            item.status_id !== 0 && item.group_id !== 0
                                                ? <StartPageMenuElement data={
                                                    {
                                                        id: item.id,
                                                        name: item.name,
                                                        issues: item.project_issues,
                                                        exist: item.tasks_finished,
                                                        fact: item.tasks_all,
                                                        org_id: item.org_id,
                                                        group_id: item.group_id,
                                                        src: item.src,
                                                        status_id: item.status_id,
                                                        status_name: item.status_name,
                                                        pdatestart: item.start,
                                                        pdatefinish: item.finish,
                                                        fdatestart: item.start_fact,
                                                        fdatefinish: item.finish_fact,
                                                        group_data: Group
                                                    }
                                                }
                                                />
                                                : null //else
                                        ))
                                        : null //else
                                }
                            </div>
                        </Col>
                    </Container>
                </div>
            )
        } else {
            return (
                <Row style={{ position: 'absolute', left: '50%', top: '50%' }}>
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="primary" />
                </Row>
            )
        }
    }
}

//StartPageMenuElement basic component
class StartPageMenuElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isContext: false,
            isImgOver: false,
            isStatusOver: false,
            isErrorOver: false,
            isTasksOver: false,
            LoadedState: 'start',
            isModal: false,
            isModal1: false,
            index: null,
            text: 'Нет группы'
        }
    }

    //rendering
    render() {
        //state values
        const { isModal, isModal1 } = this.state
        if (getRole() === '6' //view for client
            && (this.props.data.status_id === 0 //if status "НАЧАТ" or project wo group
                || (this.props.data.status_id === 1 && this.props.data.group_id === 0))) {
            return (
                <div
                    className="StartMenuElementNewNow hvr-grow"
                    onClick={() => {

                    }}>
                    <Col>
                        <Row>
                            <Col
                                style={styles.colStyle}
                                md="auto"
                            >
                                <p
                                    style={{ fontSize: 22, color: 'white' }}
                                >
                                    Проект <b>"{this.props.data.name}"</b>
                                </p>
                            </Col>
                            <Col style={styles.colStyle}>
                                <div className="d-flex justify-content-end">
                                    {(() => {
                                        //switch statuses
                                        switch (true) {
                                            case (this.props.data.status_id === 0):
                                                return <h3><Badge variant="primary">{'new'}</Badge></h3>
                                            case (this.props.data.status_id === 1):
                                                return <h3><Badge variant="warning">{'new'}</Badge></h3>
                                        }
                                    })()}
                                </div>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center align-items-center">
                            <div>
                                {(() => {
                                    //switch statuses
                                    switch (true) {
                                        case (this.props.data.status_id === 0): //НОВЫЙ
                                            return <React.Fragment>
                                                <div
                                                    className="d-flex justify-content-center">
                                                    <img
                                                        src="/assets/img/sad.png"
                                                        width="96"
                                                        height="96" />
                                                </div>
                                                <p style={{ color: 'white', marginTop: 25 }}>
                                                    Ваш проект еще не рассмотрен, наверно.
                                                </p>
                                            </React.Fragment>
                                        case (this.props.data.status_id === 1): //НАЧАТ
                                            return <React.Fragment>
                                                <div
                                                    className="d-flex justify-content-center">
                                                    <img
                                                        src="/assets/img/happy.png"
                                                        width="96"
                                                        height="96" />
                                                </div>
                                                <p
                                                    className="d-flex justify-content-center"
                                                    style={{ color: 'white', marginTop: 25 }}>
                                                    Прекрансый проект.
                                                    Мы пытаемся успокоить менеджера и собираем группу экспертов
                                                </p>
                                            </React.Fragment>
                                    }
                                })()}
                            </div>
                        </div>
                    </Col>
                </div>
            )
        } else
            return (
                <React.Fragment>
                    <div
                        className="StartMenuElement hvr-grow"
                        onMouseLeave={() => {
                            this.setState({
                                LoadedState: 'start'
                            })
                        }}
                        onClick={() => {
                            switch (true) {
                                case (this.props.data.status_id === 0):
                                    this.setState({ isModal: true })
                                    break;
                                case (this.props.data.status_id === 1 && getRole() !== '6' && this.props.data.group_id === 0):
                                    this.setState({ isModal1: true })
                                    break;
                                case (this.props.data.status_id !== 0 && this.props.data.group_id !== 0):
                                    history.push(`/workspace/projects/${this.props.data.id}`)
                                    break;
                            }
                        }
                        }
                    >
                        <Col>
                            <Row>
                                <Col
                                    style={styles.colStyle}
                                    md="auto"
                                >
                                    <p
                                        style={{ fontSize: 22 }}
                                    >
                                        Проект <b>"{this.props.data.name}"</b>
                                    </p>
                                </Col>
                                <Col style={styles.colStyle}>
                                    <div className="d-flex justify-content-end">
                                        {(() => {
                                            switch (true) { //switch statuses
                                                case (this.props.data.status_id === 0):
                                                    return <h3><Badge variant="primary">{'new'}</Badge></h3>
                                                case (this.props.data.status_id !== 0):
                                                    return <img
                                                        onMouseEnter={() => {
                                                            this.setState({
                                                                isStatusOver: true
                                                            })
                                                        }}
                                                        onMouseLeave={() => {
                                                            this.setState({
                                                                isStatusOver: false
                                                            })
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            if (this.state.LoadedState != 'status') {
                                                                this.setState({
                                                                    LoadedState: 'status'
                                                                })
                                                            } else {
                                                                this.setState({
                                                                    LoadedState: 'start'
                                                                })
                                                            }
                                                        }}
                                                        className={
                                                            'align-middle '
                                                                + this.state.isStatusOver
                                                                ? 'hvr-grow_1'
                                                                : null
                                                        }
                                                        height="29"
                                                        width="29"
                                                        src={`/assets/img/status/${this.props.data.status_id}.png`}
                                                    />
                                            }
                                        })()}
                                    </div>
                                </Col>
                            </Row>
                            <Row className="align-middle">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {(() => {
                                        switch (this.state.LoadedState) {
                                            case 'start':
                                                return (
                                                    <Col
                                                        style={{ minHeight: 126 }}
                                                        className="animated fadeIn">
                                                        <p style={{ fontSize: '17px', marginBottom: 0 }}>
                                                            Плановый период
                                                        </p>
                                                        <p style={{ fontSize: '15px' }}>{
                                                            (() => {
                                                                var data = new Date(this.props.data.pdatestart)
                                                                return data.toLocaleDateString("ru-RU")
                                                            })()
                                                        }-{
                                                                (() => {
                                                                    var data = new Date(this.props.data.pdatefinish)
                                                                    return data.toLocaleDateString("ru-RU")
                                                                })()
                                                            }</p>
                                                        <p style={{ fontSize: '17px', marginBottom: 0 }}>Фактический период</p>
                                                        <p style={{ fontSize: '15px' }}>{
                                                            GetDate(this.props.data.fdatestart)
                                                                ? <React.Fragment>{
                                                                    (() => {
                                                                        var data = new Date(this.props.data.fdatestart)
                                                                        return data.toLocaleDateString("ru-RU")
                                                                    })()
                                                                }-{
                                                                        (() => {
                                                                            var data = new Date(this.props.data.fdatefinish)
                                                                            return data.toLocaleDateString("ru-RU")
                                                                        })()
                                                                    }
                                                                </React.Fragment>
                                                                : 'Нет Данных'
                                                        }
                                                        </p>
                                                    </Col>
                                                )
                                            case 'status':
                                                return (
                                                    <Col
                                                        className="animated fadeInRight"
                                                        style={{ alignItems: 'center' }} >
                                                        <Col
                                                            style={
                                                                {
                                                                    borderLeft: '2px solid rgb(32, 153, 209)',
                                                                    borderColor: 'rgb(32, 153, 209)',
                                                                    minHeight: 126
                                                                }
                                                            }>
                                                                <p style={{ marginBottom: 1 }}>
                                                                   { this.props.data.status_id == 1
                                                                   ? <a style={{marginRight : 5,color: 'rgb(32, 153, 209)' }}>
                                                                        &#8226;
                                                                        </a>
                                                                    : null }
                                                                        Начат
                                                                    </p>
                                                            <p style={{ marginBottom: 1 }}>
                                                            { this.props.data.status_id == 2
                                                                   ? <a style={{ marginRight : 5, color: 'rgb(32, 153, 209)' }}>
                                                                        &#8226;
                                                                        </a>
                                                                    : null }
                                                                В разработке</p>
                                                            <p style={{ marginBottom: 1 }}>
                                                            { this.props.data.status_id == 3
                                                                   ? <a style={{ marginRight : 5, color: 'rgb(32, 153, 209)' }}>
                                                                        &#8226;
                                                                        </a>
                                                                    : null }
                                                                На отладке</p>
                                                            <p style={{ marginBottom: 1 }}>
                                                            { this.props.data.status_id == 4
                                                                   ? <a style={{ marginRight : 5, color: 'rgb(32, 153, 209)' }}>
                                                                        &#8226;
                                                                        </a>
                                                                    : null }
                                                                Готов</p>
                                                            <p style={{ marginBottom: 1 }}>
                                                            { this.props.data.status_id == 6
                                                                   ? <a style={{ marginRight : 5, color: 'rgb(32, 153, 209)' }}>
                                                                        &#8226;
                                                                        </a>
                                                                    : null }
                                                                Отменён</p>
                                                        </Col>
                                                    </Col>
                                                )
                                        }
                                    })()}

                                </div>
                                <Col>
                                    <div
                                        className="d-flex justify-content-end"
                                        style={{ height: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                onMouseEnter={() => {
                                                    this.setState({
                                                        isImgOver: true
                                                    })
                                                }}
                                                onMouseLeave={() => {
                                                    this.setState({
                                                        isImgOver: false
                                                    })
                                                }}
                                                className={
                                                    'align-middle '
                                                        + this.state.isImgOver
                                                        ? 'hvr-grow_1'
                                                        : null
                                                }
                                                width="75"
                                                height="75"
                                                src={this.props.data.src} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '1rem' }}>
                                <Col style={styles.colStyle}>
                                    <Row>
                                        <Col md="auto">
                                            <Row
                                                onMouseEnter={() => {
                                                    this.setState({
                                                        isErrorOver: true
                                                    })
                                                }}
                                                onMouseLeave={() => {
                                                    this.setState({
                                                        isErrorOver: false
                                                    })
                                                }}
                                                onClick={() => {

                                                }}
                                                className={
                                                    'd-flex align-items-center '
                                                        + this.state.isErrorOver
                                                        ? 'hvr-grow_1'
                                                        : null
                                                }
                                            >
                                                <img
                                                    height="29"
                                                    width="29"
                                                    src="/assets/img/warning.png"
                                                />
                                                <a
                                                    className="d-flex align-items-center"
                                                    style={{ marginBottom: 0, fontSize: 17 }}>
                                                    <b>{this.props.data.issues}</b>
                                                </a>
                                            </Row>
                                        </Col>
                                        <Col md="auto" style={{ marginLeft: 5 }}>
                                            <Row
                                                onMouseEnter={() => {
                                                    this.setState({
                                                        isTasksOver: true
                                                    })
                                                }}
                                                onMouseLeave={() => {
                                                    this.setState({
                                                        isTasksOver: false
                                                    })
                                                }}
                                                className={
                                                    'd-flex align-items-center '
                                                        + this.state.isTasksOver
                                                        ? 'hvr-grow_1'
                                                        : null
                                                }
                                            >
                                                <img
                                                    height="29"
                                                    width="29"
                                                    src="/assets/img/ok.png"
                                                />
                                                <a
                                                    className="d-flex align-items-center"
                                                    style={{ marginBottom: 0, fontSize: 17 }}>
                                                    <b>{this.props.data.exist}/{this.props.data.fact}</b>
                                                </a>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col style={styles.colStyle}></Col>
                            </Row>
                        </Col>
                    </div>
                    {
                        isModal
                            ? <Modal
                                show={isModal}
                                onHide={() => { this.setState({ isModal: false }) }}>
                                <Modal.Header>
                                    <Modal.Title>Принять проект {this.props.data.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Вы готовы принять проект?</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={() => {
                                        this.setState({ isModal: false })
                                    }} variant="secondary">Отмена</Button>
                                    <Button onClick={() => {
                                        fetch(`/projects/${this.props.data.id}?mode=prepare`, {
                                            method: "PUT",
                                            headers: {
                                                'Authorization': `Bearer ${jwt}`
                                            },
                                            body: JSON.stringify({
                                                manager: {
                                                    user: {
                                                        login: getLogin()
                                                    }
                                                }
                                            })
                                        })
                                            .then(() => {
                                                this.props.Upd()
                                                this.setState({ isModal: false })
                                            }
                                            )
                                        this.setState({ isModal: false })
                                    }}
                                        variant="primary">
                                        Принять
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            : null
                    }
                    {
                        isModal1
                            ? <Modal
                                show={isModal1}
                                onHide={() => { this.setState({ isModal: false }) }}>
                                <Modal.Header>
                                    <Modal.Title>Выбрать группу {this.props.data.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                            <Form.Label>Группа</Form.Label>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    as={CustomToggle}
                                                    id="dropdown-custom-components">
                                                    {this.state.text}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu as={CustomMenu}>
                                                    {
                                                        this.props.data.group_data.map(item => (
                                                            <Dropdown.Item
                                                                eventKey={item.id}
                                                                onSelect={
                                                                    (e) => {
                                                                        this.setState(
                                                                            {
                                                                                index: e,
                                                                                text: item.name
                                                                            }
                                                                        )
                                                                    }}>
                                                                <Row style={{ position: 'relative' }}>
                                                                    {item.name}
                                                                </Row>
                                                            </Dropdown.Item>
                                                        ))
                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={() => {
                                        this.setState({ isModal1: false })
                                    }} variant="secondary">Отмена</Button>
                                    <Button onClick={() => {
                                        fetch(`/projects/${this.props.data.id}?mode=group`, {
                                            method: "PUT",
                                            headers: {
                                                'Authorization': `Bearer ${jwt}`
                                            },
                                            body: JSON.stringify({
                                                workgroup: {
                                                    id: Number(this.state.index)
                                                }
                                            })
                                        })
                                            .then(() => {
                                                this.props.Upd()
                                                this.setState({ isModal1: false })
                                            }
                                            )
                                        this.setState({ isModal1: false })
                                    }}
                                        variant="primary">
                                        Принять
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            : null
                    }
                </React.Fragment>
            )
    }


}

//StartPageMenuNewElement component
export class StartPageMenuElementNew extends React.Component {
    constructor(props) {
        super(props)
    }

    //rendering
    render() {
        return (
            <div
                className="StartMenuElementNew d-flex justify-content-center hvr-icon-shrink"
                onClick={() => {
                    history.push({ pathname: `/workspace/create_project` })
                }}
            >
                <div
                    className="d-flex align-items-center">
                    <img
                        className="hvr-icon"
                        width="100"
                        height="100"
                        src="/assets/img/add.png" />
                </div>
            </div>
        )
    }
}

//styles
const styles = {
    colStyle: {
        paddingLeft: 0,
        paddingRight: 0
    }
}

export default withRouter(StartPageMenuElement);