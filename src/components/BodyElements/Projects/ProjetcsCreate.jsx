import React from "react"
import {Container, Col, Row, Form} from "react-bootstrap"

class ProjectCreateWindow extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
           <div style={styles.divStyle}>
                   <Form.Group as={Col}>
                       <Form.Label style={{fontSize : 24, fontWeight : 'bold'}}>
                            Создать новый проект
                       </Form.Label>
                        <Row>
                            <Form.Label>Название проекта</Form.Label>
                        </Row>
                   </Form.Group>
           </div>
        );
    }
}

const styles = {
    divStyle : {
        backgroundColor : 'white',
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        padding: 30,
        boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: 3
    }
}

export {ProjectCreateWindow}