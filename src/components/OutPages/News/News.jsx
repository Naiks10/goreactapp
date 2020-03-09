import React from "react"

import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap"

//#--news-class--#//

class News extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        window.scrollTo(0, 0)
        return (
            <Container style={styles.containerStyle}>
                <div 
                 className="bg-white" 
                 style={styles.containerStyle._mainPageStyle}>
                    <Jumbotron className="bg-white">
                        <h1>Новостей пока нет</h1>
                    </Jumbotron>
                </div>
            </Container>
        )
    }
}

//#--STYLES--#//

const styles = {
    containerStyle: {
        marginTop: 20,
        _mainPageStyle: {
            boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: 5,
            marginBottom: 5,
        }
    }
}

export default News;