import React from "react"
import "animate.css"
import { Row, Form, Button } from "react-bootstrap"

class BodyContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="animated fadeIn bg-white" style={styles.bodyStyle}>
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

class SearchContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="bg-white" style={styles.searchStyle}>
                <Row style={styles.rowStyle}>
                    <div style={{ marginRight: 20 }}>
                        <Form.Control placeholder="Что ищем?" />
                    </div>
                    <Button style={{ marginRight: 50 }} variant="outline-primary">Поиск</Button>
                    {React.Children.map(this.props.children, (child, i) => {
                        return (
                            <div className="animated fadeInRight" style={{marginRight : 15}}>
                                {child}
                            </div>
                        )
                    })}
                </Row>
            </div>
        )
    }
}

const styles = {
    bodyStyle: {
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40,
        padding: 30,
        boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: 3
    },
    searchStyle: {
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        padding: 20,
        boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: 3
    },
    rowStyle: { 
        marginLeft: 10, 
        marginRight: 10 
    }

}

export { BodyContainer, SearchContainer };
