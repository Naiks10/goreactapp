import React from "react"
import { Row, Container, Button } from "react-bootstrap"
import "hover.css"
import { Link } from "react-router-dom"


//#--main-navigation-class--#//
class MainNavigation extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="bg-white animated slideInDown " style={styles.mainNavigationStyle}>
                <Container fluid style={{ paddingLeft: "-90px" }}>
                    <Row className="justify-content-md-center" style={styles.mainNavigationStyle._rowStyle}>
                        <MainNavigationTabButton path="/p/main" text={<a>Главная <i className="fad fa-home"></i></a>} />
                        <MainNavigationTabButton path="/p/news" text={<a>Новости <i className="fad fa-newspaper"></i></a>} />
                        <MainNavigationTabButton path="/p/about" text={<a>О проекте <i className="fad fa-question-circle"></i></a>} />
                        <MainNavigationTabButton path="/p/development" text={<a>Разработка <i className="fad fa-code"></i></a>} />
                    </Row>
                </Container>
            </div>
        )
    }

}

//#--main-tab-class--#//

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

//#--styles--#//

const styles = {
    mainNavigationStyle: {
        height: 90,
        paddingTop: 45,
        boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        position : "sticky", 
        zIndex: "999999",
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