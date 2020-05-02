import React from "react"
import 'hover.css'
import { Link, Redirect } from "react-router-dom"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Helmet from "react-helmet"
import { getRole, isMobile } from "../Functions/Funcs"


//Класс Главной кнопки

class MainMenuButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            size: "38"
        }
    }

    render() {
        return (
            <div className="MainMenuButton"
                onClick={this.props.onClick}
                onMouseEnter={() => { this.setState({ size: "30" }) }}
                onMouseLeave={() => { this.setState({ size: "34" }) }}>

                <div style={{ width: "5.6rem", height: "5.6rem" }}>
                    <img width={this.state.size} height={this.state.size} src="/assets/img/menu.png" />
                </div>

            </div>
        );
    }
}

//Класс основной кнопки

class BackMenuButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <Container className={`BackMenuButton`} onMouseEnter={this.FindObject}>
                <Link className="def" style={{ textDecoration: "none" }} to={this.props.path} className="row">
                    <div style={{ width: "5.6rem", height: "5.6rem" }}>
                        <img width="34" height="34" src={'/' + this.props.src} />
                    </div>
                    <Col>
                        {this.props.text}
                    </Col>
                </Link>
            </Container>
        );
    }
}

export {
    BackMenuButton,
    MainMenuButton
}
