import React from "react"
import { Jumbotron, Container } from "react-bootstrap"

class About extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container style={styles.containerStyle}>
                <div className="bg-white" style={styles.containerStyle._mainPageStyle}>
                    <Jumbotron className="bg-white">
                        <div className="justify-content-md-center">
                            <img style={{ display: "block", marginLeft: "auto", marginBottom : 90, marginRight: "auto" }} src="/assets/img/reu.png" width="250" height="250" />
                        </div>
                        <h2>О проекте</h2>
                        <p>
                            Это проект производстенной практики студента 4-го курса <b>РЭУ им. Г.В.Плеханова Московского Приборостроительного Техникума</b>, Рябова Владислав Олеговича.<br/>
                            <br/>
                            - <b>Тема данного проекта</b> : <i>"Разработка продвижение и сопровождение информационной системы <u>Учёт заказчиков и разработчиков при процессе разработки программного обеспечения.</u>"</i><br/>
                            - <b>Руководитель практики от техникума</b> : Соколов Александр Леонидович<br/>
                            - <b>Руководитель практики от организации</b> : Петров Иван Сергеевич<br/>
                            <br/>
                            Данный проект разрабатывается под контролем организации <b>ООО "Профинтерес"</b> (организация в которой проходит практика).
                        </p>
                        <div className="justify-content-md-center">
                            <img style={{ display: "block", marginLeft: "auto", marginTop: 90, marginRight: "auto" }} src="/assets/img/logob.png" width="287" height="155" />
                        </div>
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
        }
    }
}

export default About;