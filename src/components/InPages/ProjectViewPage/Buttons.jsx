import React from "react"
import { GetStatus } from './Consts'

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
    }
    render() {
        return (

            <div
                onClick={this.props.onClick}
                className="d-flex align-items-center InButton"
                style={style.ButtonStyle}>
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="/assets/img/icon_issue.png"
                        width="20"
                        height="20" />
                </div>
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