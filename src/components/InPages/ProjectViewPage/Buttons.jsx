import React from "react"
import { GetStatus } from './Consts'
import { Modal, Button} from "react-bootstrap"

export class AddButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div
                onClick={this.props.onClick}
                className="d-flex align-items-center InButton"
                style={style.ButtonStyle}>
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="/assets/img/icon_add.png"
                        width="20"
                        height="20" />
                </div>
            </div>
        )
    }
}

export class EditButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div
                onClick={this.props.onClick}
                className="d-flex align-items-center InButton"
                style={style.ButtonStyle}>
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="/assets/img/icon_edit.png"
                        width="20"
                        height="20" />
                </div>
            </div>
        )
    }
}

export class StatusButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div
                onClick={this.props.onClick}
                className="d-flex align-items-center InButton"
                style={style.ButtonStyle}>
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="/assets/img/icon_status.png"
                        width="20"
                        height="20" />
                </div>
            </div>
        )
    }
}

export class DeleteButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div
                onClick={this.props.onClick}
                className="d-flex align-items-center InButton"
                style={style.ButtonStyle}>
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="/assets/img/icon_delete.png"
                        width="20"
                        height="20" />
                </div>
            </div>
        )
    }
}

export class IssueButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible : false
        }
    }
    render() {
        return (

            <div
                onClick={() => this.setState({visible : true})}
                className="d-flex align-items-center InButton"
                style={style.ButtonStyle}>
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="/assets/img/icon_issue.png"
                        width="20"
                        height="20" />
                </div>
                <Modal
                show={this.state.visible}
                onHide={() => this.setState({visible : false})}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Выберите действие</Modal.Title>
                </Modal.Header>
                <Modal.Footer style={{ position: 'relative' }}>
                    <Button
                        onClick={() => this.setState({visible : false})}
                        variant="outline-primary">Отмена</Button>
                    <Button
                        onClick={() => { this.props.onClickNote(); this.setState({visible : false}) }}
                        variant="outline-success">Добавить правку</Button>
                        <Button
                        onClick={() => { this.props.onClickIssue(); this.setState({visible : false}) }}
                        variant="outline-warning">Добавить проблему</Button>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
}

export class CalendButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div
                onClick={this.props.onClick}
                className="d-flex align-items-center"
                style={
                    {
                        borderRadius: 4,
                        padding: 6,
                        marginLeft: 10,
                        backgroundColor: GetStatus(this.props.status)
                    }
                }>
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="/assets/img/icon_calend.png"
                        width="20"
                        height="20" />
                </div>
            </div>
        )
    }
}

export class SubButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div
                onClick={this.props.onClick}
                className="d-flex align-items-center InButton"
                style={style.ButtonStyle}>
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="/assets/img/icon_sub.png"
                        width="20"
                        height="20" />
                </div>
            </div>
        )
    }
}

const style = {
    ButtonStyle: {
        borderRadius: 4,
        padding: 6,
        marginLeft: 10
    }
}