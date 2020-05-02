import React from "react"
import {Button, Spinner} from "react-bootstrap";

export class Loading extends React.Component {
    render() {
        return (
            <>
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Загрузка...</span>
                </Button>{' '}
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />Загрузка...</Button>
            </>
        )
    }
}