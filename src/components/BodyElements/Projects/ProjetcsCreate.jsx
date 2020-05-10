import React from "react"
import { Container, Col, Row, Form, Button } from "react-bootstrap"
import axios from "axios"
import { getLogin, getJWT } from "../../Functions/Funcs"
import history from "../../Functions/history"

const jwt = getJWT()

class ProjectCreateWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : null,
            info : null,
            editable : false,
            activity : false,
            start : null,
            fin : null        
        }
    }
    render() {
        return (
            <React.Fragment>
            <div className="ProjectElement" style={styles.divStyle}>
                <Form>
                    <Form.Group as={Col}>
                        <Form.Label style={{ fontSize: 24, fontWeight: 'bold' }}>
                            СОЗДАТЬ НОВЫЙ ПРОЕКТ
                       </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Как назовём наш (да-да, естественно, он только ваш) проект?</Form.Label>
                        <Form.Control 
                            type="input" 
                            placeholder="Название проекта" 
                            onChange={(e) => {this.setState({name : e.target.value})}} >
                        </Form.Control>
                        <Form.Text 
                            className="text-muted">
                                Только не пишите слишком сложное название - наш менеджер может не выговорить.
                                </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Название это хорошо, но без описания и целей мы далеко не уйдём. 
                            Расскажите что-нибудь о себе и проекте. Но лучше если только о проекте.
                        </Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="7" 
                            onChange={(e) => {this.setState({info : e.target.value})}}
                            >
                        </Form.Control>
                        <Form.Text className="text-muted">Если у вас очень много интересной информации, и в несколько строчек не уместитесь, то это наверно ТЗ. Не копируйте весь текст. Давайте перейдём к след. пункту</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Всё не поместилось в панель информации? Пришлите нам файлы  с ТЗ. БЗ, ФЗ, ПЗ (честно, мы не знаем, существует ли что-то за исключением ТЗ, но всё же)</Form.Label>
                        <Form.Row><ProjectDocsElement /></Form.Row>
                        <Form.Text className="text-muted">Не кидайте более 20 файлов, наш сис.админ будет ругаться. Можете предоставить ссылку на файлообменник в предыдщем пункте.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Когда начнём - когда закончим?</Form.Label>
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                controlId="formBasicDateStart">
                                <Form.Label>Дата начала</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Дата начала"
                                    onChange={(e) => { this.setState({ start: e.target.value }) }} />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                controlId="formBasicDateFinish">
                                <Form.Label>Дата окончания</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Дата конца"
                                    onChange={(e) => { this.setState({ fin: e.target.value }) }} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Text className="text-muted">Не кидайте более 20 файлов, наш сис.админ будет ругаться. Можете предоставить ссылку на файлообменник в предыдщем пункте.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Самое страшное для нас... правки. Вы же не хотите нас мучить, правда?</Form.Label>
                        <Form.Check
                            custom
                            type="checkbox"
                            id="1"
                            label="Проект поддерживает правки"
                            onChange={(e) => { this.setState({ editable: e.target.value === 'on' ? true : false }) }}
                        />
                        <Form.Text className="text-muted">Пока вы делаете правки, в мире плачет где-то один тимлид.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Давайте подумаем о режиме работы</Form.Label>
                        <Form.Row>
                        <Form.Check
                            custom
                            type="radio"
                            inline
                            name="2"
                            id="2"
                            label="Я знаю, что нужно и какие этапы должны быть включены в мой проект"
                            onChange={() => { this.setState({ activity : true }) }}
                        />
                        <Form.Check
                            custom
                            type="radio"
                            inline
                            name="2"
                            id="3"
                            label="Всё проектирование перекладываю на вас."
                            onChange={() => { this.setState({ activity : false }) }}
                        />
                        </Form.Row>
                        <Form.Text className="text-muted">Пока вы делаете правки, в мире плачет где-то один тимлид.</Form.Text>
                    </Form.Group>
                </Form>
            </div>
            <div style={{marginLeft: 40, marginRight: 40}}>
                <Button variant="primary" onClick={() => {
                    fetch('/projects?mode=client', {
                        method : 'POST',
                        headers: {
                            'Authorization': `Bearer ${jwt}`
                        },
                        body : JSON.stringify({
                            name : this.state.name,
                            info : this.state.info,
                            client : {user : { login : getLogin()}},
                            editable : this.state.editable,
                            activity : this.state.activity,
                            start : new Date(this.state.start),
                            finish : new Date(this.state.fin)
                        })
                    })
                    .then(() => {
                        history.push('/workspace/projects')
                    })
                }}> Осуществить вашу мечту</Button>
                <Form.Text className="text-muted">Эта кнопочка создаст заявку на создание проекта</Form.Text>
            </div>
            </React.Fragment>
        );
    }
}

class ProjectCreateWindowManager extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
            <div className="ProjectElement" style={styles.divStyle}>
                <Form>
                    <Form.Group as={Col}>
                        <Form.Label style={{ fontSize: 24, fontWeight: 'bold' }}>
                            СОЗДАТЬ НОВЫЙ ПРОЕКТ
                       </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Название проекта</Form.Label>
                        <Form.Control type="input" placeholder="Название проекта" ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Описание проекта</Form.Label>
                        <Form.Control as="textarea" placeholder="Описание проекта" rows="7" ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Заказчик</Form.Label>
                        <Form.Control as="textarea" placeholder="Описание проекта" rows="7" ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Группа разработки</Form.Label>
                        <Form.Control as="textarea" placeholder="Описание проекта" rows="7" ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Прикрепляемые файлы</Form.Label>
                        <Form.Row><ProjectDocsElement /></Form.Row>
                        <Form.Text className="text-muted">Не кидайте более 20 файлов. Можете предоставить ссылку на файлообменник в предыдщем пункте.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Начало и конец</Form.Label>
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                controlId="formBasicDateStart">
                                <Form.Label>Дата начала</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Дата начала"
                                    onChange={(e) => { this.setState({ formTaskStart: e.target.value }) }} />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                controlId="formBasicDateFinish">
                                <Form.Label>Дата окончания</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Дата конца"
                                    onChange={(e) => { this.setState({ formTaskFin: e.target.value }) }} />
                            </Form.Group>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Правки проекта после инициализации</Form.Label>
                        <Form.Check
                            custom
                            type="checkbox"
                            id="1"
                            label="Проект поддерживает правки"
                        />
                    </Form.Group>
                </Form>
            </div>
            <div style={{marginLeft: 40, marginRight: 40}}>
                <Button variant="primary">Создать проект</Button>
            </div>
            </React.Fragment>
        );
    }
}


class ProjectDocsElement extends React.Component {
    render() {
        return (
            <div>
                <div className="ProjectElementFMT" >
                    <img
                        width="48"
                        height="48"
                        src="/assets/img/upload.png" />
                </div>
                <div><p className="text-center">Загрузить</p></div>
            </div>
        )
    }
}

const styles = {
    divStyle: {
        //backgroundColor : 'white',
        marginTop: 40,
        marginBottom: 30,
        marginLeft: 40,
        marginRight: 40,
        //padding: 30,
        //boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        //borderRadius: 3
    }
}

export { ProjectCreateWindow, ProjectCreateWindowManager }