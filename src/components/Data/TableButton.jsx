import React from "react"
import { Button } from "react-bootstrap"
import 
{ 
    ClientsTableModalView, 
    ClientsTableModalEdit, 
    ClientsTableModalDelete, 
    ManagersTableModalView, 
    ManagersTableModalEdit, 
    ManagersTableModalDelete, 
    DevelopersTableModalView, 
    DevelopersTableModalEdit, 
    DevelopersTableModalDelete, 
    ProjectsTableModalView
} from "../Modals/Modals"

class TableButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            setModalShow: false
        }
    }

    render() {
        return (
            <div>
                <Button
                    onClick={() => this.setState({ modalShow: true })}
                    style={{ marginRight: "5px" }}
                    variant={this.props.variant}
                >
                    {this.props.text}
                </Button>
                {(() => {
                    switch (this.props.group) {
                        case "clients":
                            switch (this.props.type) {
                                case "info":
                                    return (
                                        <ClientsTableModalView
                                            items={this.props.items}
                                            show={this.state.modalShow}
                                            onHide={() => this.setState({ modalShow: false })}
                                        />
                                    )
                                    break;
                                case "edit":
                                    return (
                                        <ClientsTableModalEdit
                                            velt={this.props.velt}
                                            items={this.props.items}
                                            show={this.state.modalShow}
                                            onHide={() => this.setState({ modalShow: false })}
                                        />
                                    )
                                    break;
                                case "delete":
                                    return (
                                        <ClientsTableModalDelete
                                            items={this.props.items}
                                            show={this.state.modalShow}
                                            onHide={() => this.setState({ modalShow: false })}
                                        />
                                    )
                            }
                            break;
                        case "projects":
                            switch (this.props.type) {
                                case "info":
                                    return (
                                        <ProjectsTableModalView
                                            items={this.props.items}
                                            show={this.state.modalShow}
                                            onHide={() => this.setState({ modalShow: false })}
                                        />
                                    )
                            }
                            break;
                        case "managers":
                            switch (this.props.type) {
                                case "info":
                                    return (
                                        <ManagersTableModalView
                                            items={this.props.items}
                                            show={this.state.modalShow}
                                            onHide={() => this.setState({ modalShow: false })}
                                        />
                                    )
                                    break;
                                case "edit":
                                    return (
                                        <ManagersTableModalEdit
                                            velt={this.props.velt}
                                            items={this.props.items}
                                            show={this.state.modalShow}
                                            onHide={() => this.setState({ modalShow: false })}
                                        />
                                    )
                                    break;
                                case "delete":
                                    return (
                                        <ManagersTableModalDelete
                                            items={this.props.items}
                                            show={this.state.modalShow}
                                            onHide={() => this.setState({ modalShow: false })}
                                        />
                                    )
                                    break;
                            }
                            break;
                        case "developers":
                            switch (this.props.type) {
                                case "info":
                                    return (
                                        <DevelopersTableModalView
                                            items={this.props.items}
                                            show={this.state.modalShow}
                                            onHide={() => this.setState({ modalShow: false })}
                                        />
                                    )
                                    break;
                                case "edit":
                                    return (
                                        <DevelopersTableModalEdit
                                            velt={this.props.velt}
                                            items={this.props.items}
                                            show={this.state.modalShow}
                                            onHide={() => this.setState({ modalShow: false })}
                                        />
                                    )
                                    break;
                                case "delete":
                                    return (
                                        <DevelopersTableModalDelete
                                            items={this.props.items}
                                            show={this.state.modalShow}
                                            onHide={() => this.setState({ modalShow: false })}
                                        />
                                    )
                                    break;
                            }
                    }
                })()}
            </div>
        )
    }
}

export default TableButton;