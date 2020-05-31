import React from "react"
import { Col, Row, Container, Button, Spinner, Tabs, Tab, Badge, Modal, Form } from "react-bootstrap"
import Highcharts from "highcharts"
import HighchartsReact from 'highcharts-react-official'
import { throws } from "assert"
import { getJWT } from "../Functions/Funcs"
import { Link, Redirect, withRouter, useHistory, useLocation } from "react-router-dom"
import { br } from "react-router-dom"
import "animate.css"
import "hover.css"
import history from '../Functions/history'
import { MainNavigation } from "../BodyElements/BodyPanel"

//Basic WorkerPage class
export class WorkersPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Items: [],
            Orgs: [],
            Groups: [],
            isLoaded_I: false,
            isLoaded_II: false,
            error: null,
            CurrentElement: 'start'
        }
    }

    //---------|prepare-data-for-component|------------------------------------------
    componentDidMount() {
      this.upd()
    }

    upd() {
          // get JWT
          var jwt = getJWT()

          //? RESTapi method
          fetch("/managerslst", {
              headers: {
                  'Authorization': `Bearer ${jwt}`
              }
          })
              .then(res => res.json())
              .then(
                  (result) => {
                      this.setState({
                          isLoaded_I: true,
                          Items: result.items
                      });
                  },
                  (error) => {
                      this.setState({
                          isLoaded_II: true,
                          error
                      });
                  }
              )
  
          //? RESTapi method
          fetch("/developerslst", {
              headers: {
                  'Authorization': `Bearer ${jwt}`
              }
          })
              .then(res => res.json())
              .then(
                  (result) => {
                      this.setState({
                          isLoaded_II: true,
                          Orgs: result.items
                      });
                  },
                  (error) => {
                      this.setState({
                          isLoaded_II: true,
                          error
                      });
                  }
              )
          //? RESTapi method
          fetch("/groups?offset=1", {
              headers: {
                  'Authorization': `Bearer ${jwt}`
              }
          })
              .then(res => res.json())
              .then(
                  (result) => {
                      this.setState({
                          isLoaded_II: true,
                          Groups: result.items
                      });
                  },
                  (error) => {
                      this.setState({
                          isLoaded_II: true,
                          error
                      });
                  }
              )
    }
    //---------------------------------------------------------------------

    // rendering
    render() {
        // * consts from state
        const { isLoaded_I, isLoaded_II, Items, Orgs, Groups } = this.state;

        // * IF ALL DATA LOADED
        if (isLoaded_I && isLoaded_II) {
            return (
                <div>
                    <MainNavigation />
                    <Container
                        fluid
                        style={{ marginTop: 20 }}
                        className="d-flex justify-content-center">
                        <Col
                            style={{ marginLeft: '2%', margin: '2%', width: '90%' }}>
                            <Tabs
                                variant="pills"
                                defaultActiveKey="man"
                                id="uncontrolled-tab-example">
                                <Tab
                                    eventKey="man"
                                    title="Менеджеры">
                                    <div className="box_xs">
                                        <ManagersElementNew upd={() => {this.upd()}}/>
                                        {// * mapping Managers to ElementGrid
                                            Items.map(item => (
                                                <ManagersElement data={item}
                                                />
                                            ))
                                        }
                                    </div>
                                </Tab>
                                <Tab
                                    eventKey="work"
                                    title="Разработчики">
                                    <div className="box_xs">
                                        <DevElementNew />
                                        {// * mapping Workers to ElementGrid
                                            Orgs.map(item => (
                                                <WorkerElement data={item} />
                                            ))
                                        }
                                    </div>
                                </Tab>
                                <Tab
                                    eventKey="group"
                                    title="Рабочие группы">
                                    <div className="box_xs">
                                        <GroupElementNew />
                                        {// * mapping Groups to ElementGrid
                                            Groups.map(item => (
                                                <GroupElement data={item} />
                                            ))
                                        }
                                    </div>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Container>
                </div>
            )
        } else { //* IF NOT
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

// Bacis ClientsElement class
class ClientsElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isContext: false,
            isImgOver: false,
            isStatusOver: false,
            isErrorOver: false,
            isTasksOver: false,
            LoadedState: 'start'
        }
    }

    // rendering
    render() {
        return (
            <div style={{ margin: '20px 0px' }}>
                <div
                    className="ListElement"
                    onMouseLeave={() => {
                        this.setState({
                            LoadedState: 'start'
                        })
                    }}
                    onClick={() => {
                        history.push({ pathname: `/workspace/projects/${this.props.data.id}` })
                    }}
                >
                    <Col>
                        <Row>
                            <Col>{this.props.data.fio}   (<b>@{this.props.data.manager_login}</b>)</Col>
                            <Col>
                                <div className="d-flex justify-content-end">
                                    {this.props.data.phone_num}    {this.props.data.email_addr}
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col>
                                <img
                                    width="75"
                                    height="75"
                                    src={this.props.data.user_image_src} />
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                <div>
                                    <p
                                        style={{ marginBottom: 0 }}
                                        className="d-flex justify-content-end">
                                        Всего проектов : {this.props.data.count}
                                    </p>
                                    <p
                                        style={{ marginBottom: 0 }}
                                        className="d-flex justify-content-end">
                                        Выполненнных : {this.props.data.count_fin}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }
}


// ManagersElementNew class
class ManagersElementNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isContext: false,
            isImgOver: false,
            isStatusOver: false,
            isErrorOver: false,
            isTasksOver: false,
            LoadedState: 'start',
            Showed: false,
            FormMiddleName: '',
            FormName: '',
            FormSurName: '',
            FormPhone: '',
            FormMail: '',
            FormDate: '',
            FormOS: false,
        }
    }

    render() {
        return (
            <div style={{ padding: '20px 10px 20px 10px' }}>
                <div
                    className="ListElementNew col-xs-auto col-lg-auto"
                    onMouseLeave={() => {
                        this.setState({
                            LoadedState: 'start'
                        })
                    }}
                    onClick={() => {
                        this.setState({ Showed: true })
                    }}
                >
                    <Col className="hvr-icon-shrink">
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col className="d-flex align-items-center justify-content-center">
                                <img
                                    style={{ borderRadius: '50%' }}
                                    className="hvr-icon"
                                    width="75"
                                    height="75"
                                    src="/assets/img/add.png" />
                            </Col>
                        </Row>
                    </Col>
                </div>
                <Modal show={this.state.Showed} onHide={() => { this.setState({ Showed: false }) }}>
                    <Modal.Header>
                        <Modal.Title>Добавить менеджера</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Введите фамилию менеджера</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Фамилия"
                                onChange={(e) => {
                                    this.setState({ FormSurName: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите имя менеджера</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Имя"
                                onChange={(e) => {
                                    this.setState({ FormName: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите отчество менеджера</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Отчество"
                                onChange={(e) => {
                                    this.setState({ FormMiddleName: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите дату рождения менеджера</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата"
                                onChange={(e) => {
                                    this.setState({ FormDate: e.target.valueAsDate })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите телефон менеджера</Form.Label>
                            <Form.Control
                                as="input"
                                type="tel"
                                pattern="8[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                                placeholder="Телефон"
                                onChange={(e) => {
                                    this.setState({ FormPhone: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите почту менеджера</Form.Label>
                            <Form.Control
                                as="input"
                                type="email"
                                
                                placeholder="Почта"
                                onChange={(e) => {
                                    this.setState({ FormMail: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Аут-соурс</Form.Label>
                            <Form.Check
                                id="swth"
                                type="switch"
                                label="Аут-соурс"
                                onChange={(e) => {
                                    this.setState({ FormOS: e.target.value == "on" ? true : false })
                                }} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {
                            var password = Math.random().toString(36).slice(-8);
                            fetch('/managers', {
                                method : 'POST',
                                headers : {
                                    'Authorization' : `Bearer ${getJWT()}`
                                },
                                body : JSON.stringify({
                                    user : {
                                        login : this.state.FormName.charAt(0).toLowerCase()
                                                + '.' + this.state.FormSurName.toLowerCase() + parseFloat(Math.random() * 10).toFixed(3),
                                        password : password,
                                        surname : this.state.FormSurName,
                                        name : this.state.FormName,
                                        midname : this.state.FormMiddleName,
                                        birthdate : this.state.FormDate,
                                        phone : this.state.FormPhone,
                                        mail : this.state.FormMail
                                    },
                                    is_outsource : this.state.FormOS == true
                                })
                            }).then(
                                () => {
                                    
                                    this.setState({ Showed: false })
                                    this.props.upd()
                                    alert('Пароль для аккуанта : ' + password)
                                }
                            )
                            
                        }} variant="outline-success">Создать</Button>
                        <Button onClick={() => {
                            this.setState({ Showed: false })
                        }} variant="primary">Отмена</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


// DevElementNew class
class DevElementNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isContext: false,
            isImgOver: false,
            isStatusOver: false,
            isErrorOver: false,
            isTasksOver: false,
            LoadedState: 'start',
            Showed: false,
            FormMiddleName: '',
            FormName: '',
            FormSurName: '',
            FormPhone: '',
            FormMail: '',
            FormDate: '',
            FormOS: false,
            FormTest : false
        }
    }

    render() {
        return (
            <div style={{ padding: '20px 10px 20px 10px' }}>
                <div
                    className="ListElementNew col-xs-auto col-lg-auto"
                    onMouseLeave={() => {
                        this.setState({
                            LoadedState: 'start'
                        })
                    }}
                    onClick={() => {
                        this.setState({ Showed: true })
                    }}
                >
                    <Col className="hvr-icon-shrink">
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col className="d-flex align-items-center justify-content-center">
                                <img
                                    style={{ borderRadius: '50%' }}
                                    className="hvr-icon"
                                    width="75"
                                    height="75"
                                    src="/assets/img/add.png" />
                            </Col>
                        </Row>
                    </Col>
                </div>
                <Modal show={this.state.Showed} onHide={() => { this.setState({ Showed: false }) }}>
                    <Modal.Header>
                        <Modal.Title>Добавить разработчика</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Введите фамилию разработчика</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Фамилия"
                                onChange={(e) => {
                                    this.setState({ FormSurName: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите имя разработчика</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Имя"
                                onChange={(e) => {
                                    this.setState({ FormName: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите отчество разработчика</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Отчество"
                                onChange={(e) => {
                                    this.setState({ FormMiddleName: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите дату рождения разработчика</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Дата"
                                onChange={(e) => {
                                    this.setState({ FormDate: e.target.valueAsDate })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите телефон разработчика</Form.Label>
                            <Form.Control
                                as="input"
                                type="tel"
                                pattern="8[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                                placeholder="Телефон"
                                onChange={(e) => {
                                    this.setState({ FormPhone: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Введите почту разработчика</Form.Label>
                            <Form.Control
                                as="input"
                                type="email"
                                
                                placeholder="Почта"
                                onChange={(e) => {
                                    this.setState({ FormMail: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Аут-соурс</Form.Label>
                            <Form.Check
                                id="swth"
                                type="switch"
                                label="Аут-соурс"
                                onChange={(e) => {
                                    this.setState({ FormOS: e.target.value == "on" ? true : false })
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Тестировщик</Form.Label>
                            <Form.Check
                                id="test"
                                type="switch"
                                label="Тестировщик"
                                onChange={(e) => {
                                    this.setState({ FormTest: e.target.value == "on" ? true : false })
                                }} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {
                            var password = Math.random().toString(36).slice(-8);
                            fetch('/devs', {
                                method : 'POST',
                                headers : {
                                    'Authorization' : `Bearer ${getJWT()}`
                                },
                                body : JSON.stringify({
                                    user : {
                                        login : this.state.FormName.charAt(0).toLowerCase()
                                                + '.' + this.state.FormSurName.toLowerCase() + parseFloat(Math.random() * 10).toFixed(3),
                                        password : password,
                                        surname : this.state.FormSurName,
                                        name : this.state.FormName,
                                        midname : this.state.FormMiddleName,
                                        birthdate : this.state.FormDate,
                                        phone : this.state.FormPhone,
                                        mail : this.state.FormMail
                                    },
                                    is_outsource : this.state.FormOS == true,
                                    is_tester : this.state.FormTest == true
                                })
                            }).then(
                                () => {
                                    alert('Пароль для аккуанта : ' + password)
                                    this.setState({ Showed: false })
                                }
                            )
                            
                        }} variant="outline-success">Создать</Button>
                        <Button onClick={() => {
                            this.setState({ Showed: false })
                        }} variant="primary">Отмена</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

// GroupElementNew class
class GroupElementNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isContext: false,
            isImgOver: false,
            isStatusOver: false,
            isErrorOver: false,
            isTasksOver: false,
            LoadedState: 'start'
        }
    }

    render() {
        return (
            <div style={{ padding: '20px 10px 20px 10px' }}>
                <div
                    className="ListElementNew col-xs-auto col-lg-auto"
                    onMouseLeave={() => {
                        this.setState({
                            LoadedState: 'start'
                        })
                    }}
                    onClick={() => {

                    }}
                >
                    <Col className="hvr-icon-shrink">
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col className="d-flex align-items-center justify-content-center">
                                <img
                                    style={{ borderRadius: '50%' }}
                                    className="hvr-icon"
                                    width="40"
                                    height="40"
                                    src="/assets/img/add.png" />
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }
}

// ManagersElement class
class ManagersElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isContext: false,
            isImgOver: false,
            isStatusOver: false,
            isErrorOver: false,
            isTasksOver: false,
            LoadedState: 'start'
        }
    }

    render() {
        return (
            <div style={{ padding: '20px 10px 20px 10px' }}>
                <div
                    className="ListElement col-xs-auto col-lg-auto"
                    onMouseLeave={() => {
                        this.setState({
                            LoadedState: 'start'
                        })
                    }}
                    onClick={() => {
                        history.push({ pathname: `/workspace/managers/${this.props.data.manager_login}` })
                    }}
                >
                    <Col>
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col>
                                <img
                                    style={{ borderRadius: '50%' }}
                                    width="75"
                                    height="75"
                                    src={this.props.data.user_image_src} />
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                <div>
                                    <p style={{ marginBottom: 0 }}>{this.props.data.fio}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }
}

// WorkersElemet class
class WorkerElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isContext: false,
            isImgOver: false,
            isStatusOver: false,
            isErrorOver: false,
            isTasksOver: false,
            LoadedState: 'start'
        }
    }

    render() {
        return (
            <div style={{ padding: '20px 10px 20px 10px' }}>
                <div
                    className="ListElement col-xs-auto col-lg-auto"
                    onMouseLeave={() => {
                        this.setState({
                            LoadedState: 'start'
                        })
                    }}
                    style={{ position: 'relative' }}
                    onClick={() => {
                        history.push({ pathname: `/workspace/devs/${this.props.data.developer_login}` })
                    }}
                >
                    <Row style={{ position: 'absolute', right: 20, top: 7 }}>
                        <h5> { this.props.data.tester_spec == 'true' ? <Badge style={{ marginRight: 5 }} variant="warning">QA</Badge> : null}</h5>
                        <h5>{ this.props.data.outsource_spec == 'true' ? <Badge style={{ marginRight: 5 }} variant="primary">ITO</Badge> : null}</h5>
                    </Row>
                    <Col>
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col>
                                <img
                                    style={{ borderRadius: '50%' }}
                                    width="75"
                                    height="75"
                                    src={this.props.data.user_image_src} />
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                <div>
                                    <p
                                        style={{ marginBottom: 0 }}
                                        className="d-flex justify-content-end">
                                        {this.props.data.fio}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }


}

// GroupElement
class GroupElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isContext: false,
            isLoaded: false,
            isImgOver: false,
            isStatusOver: false,
            isErrorOver: false,
            isTasksOver: false,
            LoadedState: 'start',
            srcs: []
        }
    }

    componentDidMount() {
        fetch(`/workersprev?group=${this.props.data.id}`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({ srcs: result.items, isLoaded: true })
            })
    }


    render() {
        return (
            <div style={{ padding: '20px 10px 20px 10px' }}>
                <div
                    className="ListElement col-xs-auto col-lg-auto d-flex align-items-center"
                    onMouseLeave={() => {
                        this.setState({
                            LoadedState: "start"
                        })
                    }}
                    onClick={() => {
                        history.push({ pathname: `/workspace/groups/${this.props.data.id}` })
                    }}
                >
                    <Col>
                        <Row style={{ marginTop: 7, marginBottom: 7 }}>
                            <Col className="d-flex align-items-center justify-content-center">
                                <div className="d-flex align-items-center justify-content-center">
                                    {
                                        this.state.isLoaded && this.state.srcs != null
                                            ? this.state.srcs.map(
                                                (value, index) => (
                                                    <img
                                                        style={{ borderRadius: '50%', position: 'relative', left: (14 - 14 * index), borderColor: 'white', borderWidth: 3, borderStyle: 'solid' }}
                                                        width="40"
                                                        height="40"
                                                        src={value.src} />
                                                )
                                            )
                                            : null
                                    }
                                </div>
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                <div>
                                    <p style={{ marginBottom: 0 }} className="d-flex justify-content-end">{this.props.data.name}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }


}

//* New Element
export class StartPageMenuElementNew extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                className="StartMenuElementNew d-flex justify-content-center hvr-icon-shrink"
                onClick={() => {
                    history.push({ pathname: `/workspace/create_project` })
                }}
            >
                <div className="d-flex align-items-center">
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

const styles = {
    colStyle: {
        paddingLeft: 0,
        paddingRight: 0
    },

}

export default withRouter(ClientsElement);