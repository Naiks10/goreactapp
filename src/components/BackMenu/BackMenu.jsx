import React from "react"
import { Row, Col } from "react-bootstrap";
import { isMobile } from "../Functions/Funcs";
import { BackMenuButton } from "./BackMenuButton"

//#--BackMenu--#//

class BackMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isClicked : false
        }
    }

    componentDidMount() {
        isMobile()
    }

    render() {
        if (localStorage.getItem("type") === "bottom") {
            return (
                <Row style={style.mainStyle_bottom} className="animated slideInLeft">
                    {React.Children.map(this.props.children, (child, i) => {
                        return (
                            <Col>
                                {child}
                            </Col>
                        )
                    })}
                </Row>
            );
        } else {
            return (
                <div style={style.mainStyle_standart} className="animated slideInLeft">
                    {React.Children.map(this.props.children, (child, i) => {
                        return (
                            <div>
                                {child}
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
}

//#--Styles--#//

const style = {
    mainStyle_bottom: {
        position: "fixed",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "#34495e",
        height: "5.6em",
        zIndex: "999999",
    },
    mainStyle_standart: {
        position: "fixed",
        top: "0",
        bottom: "0",
        backgroundColor: "#34495e",
        width: "5.6em",
        zIndex: "999999",
    }
}

export default BackMenu;