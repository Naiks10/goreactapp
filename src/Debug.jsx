import React from "react"
import { Form, Button } from "react-bootstrap"
import bsCustomFileInput from 'bs-custom-file-input'
import { getJWT } from "./components/Functions/Funcs"



export class TestView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            src: null
        }
    }

    render() {
        bsCustomFileInput.init()
        return (
            <div>
                <img width="64" height="64" src={this.state.src} style={{ borderRadius: '50%' }} />
                <Form>
                    <Form.File onChange={(event) => {
                        var reader = new FileReader();
                        var vex
                        reader.onloadend = function () {
                            alert(reader.result)
                            alert(vex)
                            this.setState({ src: [reader.result] })
                        }.bind(this)
                        vex = reader.readAsDataURL(event.target.files[0]);
                    }
                    } id="custom-file"
                        label="Custom file input" custom></Form.File>
                </Form>
                <Button onClick={() => {
                    const fileInput = document.querySelector('#custom-file');
                    const formData = new FormData();
                    console.log(fileInput.files[0])
                    formData.append('file', fileInput.files[0]);
                    fetch('/upload', {
                        headers: {
                            'Authorization': `Bearer ${getJWT()}`
                        },
                        method: 'POST',
                        body: formData
                    })
                }}>Отправить</Button>
            </div >
        )
    }
}