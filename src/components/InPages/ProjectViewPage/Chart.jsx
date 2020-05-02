import React from "react";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { TitlePanel } from './Panels'
import {Row, Col} from "react-bootstrap"

export class ProjectChartView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true
        }
    }

    render() {
        const options = {
            title: {
                text: '    '
            },
            series: [{
                name: 'Фактические данные ',
                data: [1, 2, 3],
                color: '#2098D1'
            },
            {
                name: 'Плановые данные ',
                data: [1, 3, 4, 6],
                color: 'rgb(27, 214, 74)'
            },
            ]
        }
        return (
            <div>
                <TitlePanel
                    isExpanded={this.state.isExpanded}
                    title="ПРОГРЕСС"
                    onClick={() => { this.setState({ isExpanded: !this.state.isExpanded }) }
                    } />
                {
                    this.state.isExpanded
                        ? <div className="ProjectElement">
                            <Col>
                                <Row style={{ fontWeight: 'bold' }}><b>Период проекта</b></Row>
                                <div>
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={options}
                                    />
                                </div>
                            </Col>
                        </div>
                        : null
                }
            </div>
        )
    }
}
