import React from "react"
import { Table, Container, Row, Spinner, Form } from "react-bootstrap"
import TableButton from "./TableButton"
import { getJWT } from "../Functions/Funcs"

import _ from 'lodash'

class ClientsTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            modalShow: false,
            setModalShow: false,
            Items: [],
        }
        this.updateMethod = this.updateMethod.bind(this)
    }

    updateMethod() {
        var jwt = getJWT()

        fetch("/clients", {
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

    componentDidUpdate(prevProps, prevState) {
        if ( !_.isEqual(prevState.Items, this.state.Items) ) {
            this.updateMethod()
        }
    }

    componentDidMount() {
        this.updateMethod()
    }

    render() {
        const { error, isLoaded, Items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Spinner animation="border" variant="primary" /></div>;
        } else {
            return (
                <div style={{ marginRight: "20px" }}>
                    <Table striped hover responsive>
                        <thead style={{ borderRadius: 30 }} className="text-white bg-primary">
                            <tr>
                                <th style={styles.colStyle} scope="col">Логин</th>
                                <th style={styles.colStyle} scope="col">Имя</th>
                                <th style={styles.colStyle} scope="col">Фамилия</th>
                                <th style={styles.colStyle} scope="col">Отчество</th>
                                <th style={styles.colStyle} scope="col">Телефон</th>
                                <th style={styles.colStyle} scope="col">E-mail</th>
                                <th style={styles.colStyle} scope="col">Организация</th>
                                <th style={styles.colStyle} scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Items.map(item => (
                                <tr>
                                    <th style={styles.rowStyle} scope="row">{item.user.login}</th>
                                    <td style={styles.rowStyle}>{item.user.name}</td>
                                    <td style={styles.rowStyle}>{item.user.surname}</td>
                                    <td style={styles.rowStyle}>{item.user.midname}</td>
                                    <td style={styles.rowStyle}>{item.user.phone}</td>
                                    <td style={styles.rowStyle}>{item.user.mail}</td>
                                    <td style={styles.rowStyle}>{item.organisation.name}</td>
                                    <td style={styles.actionsStyle}>
                                        <Container fluid style={{ minWidth: 350 }}>
                                            <Row className="justify-content-md-center">
                                                <TableButton text="Просмотр" group="clients" type="info" variant="primary" items={item} />
                                                <TableButton velt={() => { this.setState({ isLoaded: false }); this.updateMethod() }} text="Редактировать" group="clients" type="edit" variant="warning" items={item} />
                                                <TableButton text="Удалить" group="clients" type="delete" variant="danger" items={item} />
                                            </Row>
                                        </Container>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

class ProjetcsTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            modalShow: false,
            setModalShow: false,
            Items: [],
        }
        this.updateMethod = this.updateMethod.bind(this)
    }

    updateMethod() {
        var jwt = getJWT()

        fetch("/projects", {
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

    componentDidUpdate(prevProps, prevState) {
        if ( !_.isEqual(prevState.Items, this.state.Items) ) {
            this.updateMethod()
        }
    }

    componentDidMount() {
        this.updateMethod()
    }

    render() {
        const { error, isLoaded, Items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div style={{ marginRight: "20px" }}>
                    <Table striped hover responsive>
                        <thead style={{ borderRadius: 30 }} className="text-white bg-primary">
                            <tr>
                                <th style={styles.colStyle} scope="col">Код</th>
                                <th style={styles.colStyle} scope="col">Стоимость</th>
                                <th style={styles.colStyle} scope="col">Информация</th>
                                <th style={styles.colStyle} scope="col">Клиент</th>
                                <th style={styles.colStyle} scope="col">Менеджер</th>
                                <th style={styles.colStyle} scope="col">Бригада</th>
                                <th style={styles.colStyle} scope="col">Статус</th>
                                <th style={styles.colStyle} scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Items.map(item => (
                                <tr>
                                    <th style={styles.rowStyle} scope="row">{item.id}</th>
                                    <td style={styles.rowStyle}>{item.cost}₽</td>
                                    <td style={styles.rowStyle}>{item.info}</td>
                                    <td style={styles.rowStyle}>{item.client.user.surname} {item.client.user.name.charAt(0) + '.'} {item.client.user.midname.charAt(0) + '.'}</td>
                                    <td style={styles.rowStyle}>{item.manager.user.surname} {item.manager.user.name.charAt(0) + '.'} {item.manager.user.midname.charAt(0) + '.'}</td>
                                    <td style={styles.rowStyle}>{item.workgroup.name}</td>
                                    <td style={styles.rowStyle}>{item.status.name}</td>
                                    <td style={styles.actionsStyle}>
                                        <Container fluid style={{ minWidth: 350 }}>
                                            <Row className="justify-content-md-center">
                                                <TableButton text="Просмотр состояния проекта" group="projects" type="info" variant="primary" items={item} />
                                            </Row>
                                        </Container>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

class ManagersTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            modalShow: false,
            setModalShow: false,
            Items: [],
        }
        this.updateMethod = this.updateMethod.bind(this)
    }

    updateMethod() {
        var jwt = getJWT()

        fetch("/managers", {
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

    componentDidUpdate(prevProps, prevState) {
        if ( !_.isEqual(prevState.Items, this.state.Items) ) {
            this.updateMethod()
        }
    }

    componentDidMount() {
        this.updateMethod()
    }

    render() {
        const { error, isLoaded, Items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div style={{ marginRight: "20px" }}>
                    <Table striped hover responsive>
                        <thead style={{ borderRadius: 30 }} className="text-white bg-primary">
                            <tr>
                                <th style={styles.colStyle} scope="col">Логин</th>
                                <th style={styles.colStyle} scope="col">Имя</th>
                                <th style={styles.colStyle} scope="col">Фамилия</th>
                                <th style={styles.colStyle} scope="col">Отчество</th>
                                <th style={styles.colStyle} scope="col">Телефон</th>
                                <th style={styles.colStyle} scope="col">E-mail</th>
                                <th style={styles.colStyle} scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Items.map(item => (
                                <tr>
                                    <th style={styles.rowStyle} scope="row">{item.user.login}</th>
                                    <td style={styles.rowStyle}>{item.user.name}</td>
                                    <td style={styles.rowStyle}>{item.user.surname}</td>
                                    <td style={styles.rowStyle}>{item.user.midname}</td>
                                    <td style={styles.rowStyle}>{item.user.phone}</td>
                                    <td style={styles.rowStyle}>{item.user.mail}</td>
                                    <td style={styles.actionsStyle}>
                                        <Container fluid style={{ minWidth: 350 }}>
                                            <Row className="justify-content-md-center">
                                                <TableButton text="Просмотр" group="managers" type="info" variant="primary" items={item} />
                                                <TableButton velt={() => { this.setState({ isLoaded: false }); this.updateMethod() }} text="Редактировать" group="managers" type="edit" variant="warning" items={item} />
                                                <TableButton text="Удалить" group="managers" type="delete" variant="danger" items={item} />
                                            </Row>
                                        </Container>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

class DevelopersTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            modalShow: false,
            setModalShow: false,
            Items: [],
        }
        this.updateMethod = this.updateMethod.bind(this)
    }

    updateMethod() {
        var jwt = getJWT()

        fetch("/devs", {
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

    componentDidUpdate(prevProps, prevState) {
        if ( !_.isEqual(prevState.Items, this.state.Items) ) {
            this.updateMethod()
        }
    }

    componentDidMount() {
        this.updateMethod()
    }

    render() {
        const { error, isLoaded, Items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div style={{ marginRight: "20px" }}>
                    <Table striped hover responsive>
                        <thead style={{ borderRadius: 30 }} className="text-white bg-primary">
                            <tr>
                                <th style={styles.colStyle} scope="col">Логин</th>
                                <th style={styles.colStyle} scope="col">Имя</th>
                                <th style={styles.colStyle} scope="col">Фамилия</th>
                                <th style={styles.colStyle} scope="col">Отчество</th>
                                <th style={styles.colStyle} scope="col">Телефон</th>
                                <th style={styles.colStyle} scope="col">E-nail</th>
                                <th style={styles.colStyle} scope="col">Группа</th>
                                <th style={styles.colStyle} scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Items.map(item => (
                                <tr>
                                    <th style={styles.rowStyle} scope="row">{item.user.login}</th>
                                    <td style={styles.rowStyle}>{item.user.name}</td>
                                    <td style={styles.rowStyle}>{item.user.surname}</td>
                                    <td style={styles.rowStyle}>{item.user.midname}</td>
                                    <td style={styles.rowStyle}>{item.user.phone}</td>
                                    <td style={styles.rowStyle}>{item.user.mail}</td>
                                    <td style={styles.rowStyle}>{item.workgroup.name}</td>
                                    <td style={styles.actionsStyle}>
                                        <Container fluid style={{ minWidth: 350 }}>
                                            <Row className="justify-content-md-center">
                                                <TableButton text="Просмотр" group="developers" type="info" variant="primary" items={item} />
                                                <TableButton velt={() => { this.setState({ isLoaded: false }); this.updateMethod() }} text="Редактировать" group="developers" type="edit" variant="warning" items={item} />
                                                <TableButton text="Удалить" group="developers" type="delete" variant="danger" items={item} />
                                            </Row>
                                        </Container>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

const styles = {
    colStyle: {
        textAlign: "center"
    },
    rowStyle: {
        verticalAlign: "middle",
        textAlign: "center"
    },
    actionsStyle: {
        maxWidth: 400,
        verticalAlign: "middle",
        textAlign: "center"
    }
}

export { ClientsTable, ProjetcsTable, ManagersTable, DevelopersTable };