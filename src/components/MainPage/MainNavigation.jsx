import React from "react"
import { Row, Container, Button } from "react-bootstrap"
import "hover.css"
import { Link } from "react-router-dom"

class MainNavigation extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="bg-white animated slideInDown " style={styles.mainNavigationStyle}>
                <Container fluid style={{ paddingLeft: "-90px" }}>
                    <Row className="justify-content-md-center" style={styles.mainNavigationStyle._rowStyle}>
                        <MainNavigationTabButton path="/p/main" text="Главная" />
                        <MainNavigationTabButton path="/p/news" text="Новости" />
                        <MainNavigationTabButton path="/p/about" text="О проекте" />
                        <MainNavigationTabButton text="Разработка" />
                    </Row>
                </Container>
            </div>
        )
    }

}

class MainNavigationTabButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="hvr-underline-from-center" style={styles.mainNavigationTabButtonStyle}>
                <Link to={this.props.path} style={{ textDecoration: "none", color : "inherit" }}>
                    <p style={styles.mainNavigationTabButtonStyle._pStyle}>
                        {this.props.text}
                    </p>
                </Link>
            </div>
        )
    }
}

const styles = {
    mainNavigationStyle: {
        height: 90,
        paddingTop: 45,
        boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        position : "sticky", 
        top : 0,
        _rowStyle: {
            height: 45,
        }
    },
    mainNavigationTabButtonStyle: {
        height: 45,
        cursor: "pointer",

        _pStyle: {
            fontSize: 18,
            marginLeft: 40,
            marginRight: 40,
            verticalAlign: "middle",
            textAlign: "center"
        }
    }
}

export default MainNavigation