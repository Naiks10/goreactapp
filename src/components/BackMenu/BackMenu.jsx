import React from "react"

class BackMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={style.mainStyle}>
                {React.Children.map(this.props.children, (child, i) => {
                    return (
                        <div>
                            {child}
                        </div>
                    )
                })}
            </div>
        );
    }
}

const style = {
    mainStyle: {
        position: "fixed",
        top: "0",
        bottom: "0",
        backgroundColor: "#34495e",
        width: "5.6em",
        zIndex: "999999",
    }
}

export default BackMenu;