import React from "react"
import { Jumbotron, Container, Carousel, Row } from "react-bootstrap"

class About extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        window.scrollTo(0, 0)
        return (
            <Container style={styles.containerStyle}>
                <div className="bg-white" style={styles.containerStyle._mainPageStyle}>
                    <Jumbotron className="bg-white">
                        <div className="justify-content-md-center">
                            <Row>
                                <img style={{ display: "block", marginLeft: "auto", marginBottom: 90, marginRight: "auto" }} src="/assets/img/reu.png" width="250" height="250" />
                                <img style={{ display: "block", marginLeft: "auto", marginTop: 90, marginRight: "auto" }} src="/assets/img/logob.png" width="287" height="155" />
                            </Row>
                        </div>
                        <h2>О проекте</h2>
                        <p>
                            Это проект производстенной практики студента 4-го курса <b>РЭУ им. Г.В.Плеханова Московского Приборостроительного Техникума</b>, Рябова Владислав Олеговича.<br />
                            <br />
                            - <b>Тема данного проекта</b> : <i>"Разработка продвижение и сопровождение информационной системы <u>Учёт заказчиков и разработчиков при процессе разработки программного обеспечения.</u>"</i><br />
                            - <b>Руководитель практики от техникума</b> : Соколов Александр Леонидович<br />
                            - <b>Руководитель практики от организации</b> : Петров Иван Сергеевич<br />
                            <br />
                            Данный проект разрабатывается под контролем организации <b>ООО "Профинтерес"</b> (организация в которой проходит практика).
                        </p>
                        <div className="justify-content-md-center">

                        </div>
                    </Jumbotron>
                </div>
                <div className="bg-white" style={styles.containerStyle._mainPageStyle}>
                    <Jumbotron className="bg-white">
                        <h2>Галерея</h2>
                        <br />
                        <Carousel indicators={false} interval={5000}>
                            <Carousel.Item>
                                <img
                                    style={{ borderRadius: 8 }}
                                    className="d-block w-100"
                                    src="/assets/img/slide1.png"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <div style={{ borderRadius: 6, backgroundColor: '#34495e' }}>
                                        <h3>Выбирайте нужные элементы</h3>
                                        <p>Приложение имеет удобный интерфейс, позволяющий переключаться между разделами взаимодействия</p>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    style={{ borderRadius: 8 }}
                                    className="d-block w-100"
                                    src="/assets/img/slide2.png"
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <div style={{ borderRadius: 6, backgroundColor: '#34495e' }}>
                                        <h3>Удобное отслеживание плана проекта</h3>
                                        <p >Наше программное решение позволяет легко понять на какой стадии идёт разработка</p>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    style={{ borderRadius: 8 }}
                                    className="d-block w-100"
                                    src="/assets/img/slide3.png"
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <div style={{ borderRadius: 6, backgroundColor: '#34495e' }}>
                                        <h3>Лёгкое редактирование</h3>
                                        <p>Помимо этого наш интерфейс предоставляет удобные и понятные формы заполнения</p>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Jumbotron>
                </div>
            </Container>
        )
    }
}

const styles = {
    containerStyle: {
        marginTop: 20,
        _mainPageStyle: {
            boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: 5,
            marginBottom: 5,
        },
        _text: {
            color: '#34495e',
        }
    }
}

export default About;