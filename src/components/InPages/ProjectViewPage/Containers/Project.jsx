import React from "react";
import axios from 'axios';
import { ModuleContainer, CreateSubModuleModal } from './Module'
import {Row, Col} from "react-bootstrap";
import { SubButton } from "../Buttons"
import { Modulecontext, GetDate, GetStatus } from '../Consts'
import { getJWT } from "../../../Functions/Funcs"


export class ProjectContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            length: 0,
            isLoaded: false,
            error: null,
            intervalId: null,
            isOvered: false,
            isShowedSub: false
        }
    }

    componentDidMount() {
        this.GetData()
    }

    GetData() {
        this.setState({ isLoaded: false })
        axios.get(`/modules?project=${this.props.data.id}&asc.orderby=module_index`, {
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({
                    data: data.items,
                    isLoaded: true
                })
            })
    }

    render() {
        const { isLoaded, data, error, isOvered, isShowedSub } = this.state;
        return (
            <div
                style={
                    {
                        marginTop: 15,
                        marginBottom: 15
                    }
                }>
                <Col
                    onMouseEnter={
                        () => {
                            this.setState({ isOvered: true })
                        }
                    }
                    onMouseLeave={
                        () => {
                            this.setState({ isOvered: false })
                        }
                    }>
                    <Row style={{ position: "relative" }}>
                        <div
                            className="d-flex align-items-center"
                            style={
                                {
                                    zIndex: 1,
                                    paddingTop: 4,
                                    paddingBottom: 4
                                }
                            }>
                            Проект "{this.props.data.name}"
                        </div>
                        {
                            isOvered
                                ? <Row style={{ marginLeft: 10 }}>
                                    <SubButton onClick={() => this.setState({ isShowedSub: true })} />
                                </Row>
                                : null
                        }
                        <div
                            className="d-flex align-items-center"
                            style={
                                {
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    position: "absolute",
                                    zIndex: 2,
                                    color: 'white',
                                    paddingLeft: 6,
                                    paddingRight: 6,
                                    borderRadius: 5,
                                    fontSize: 14,
                                    backgroundColor: GetStatus(this.props.data.status.id)
                                }
                            }><a>{GetDate(this.props.data.start)}-{GetDate(this.props.data.finish)}</a>
                        </div>
                    </Row>
                </Col>
                {
                    isLoaded && data != null
                        ? data.map(item => (
                            <Modulecontext.Provider value={() => this.GetData()}>
                                <ModuleContainer data={item} />
                            </Modulecontext.Provider>
                        ))
                        : null
                }
                {
                    isShowedSub
                        ? <CreateSubModuleModal
                            task_data={this.props.data}
                            update={() => this.GetData()}
                            show={this.state.isShowedSub}
                            onHide={() => this.setState({ isShowedSub: false })} />
                        : null
                }
            </div>
        )
    }
}