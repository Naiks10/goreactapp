import React from "react";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { TitlePanel } from './Panels'
import { Row, Col } from "react-bootstrap"
import { getJWT } from "../../Functions/Funcs";
import { ProjectGraphContext } from "./Consts";


function GetUTCDate(value) {
   var vex = new Date(value).getTime()
   return vex
}

export class ProjectChartView extends React.Component {
    render() {
        return (
            <div>
                <ProjectGraphContext.Consumer>
                    { value => <ProjectChartViewContainer context={value}/>}
                </ProjectGraphContext.Consumer>
            </div>
        )
    }
}

//ProjectChartView
export class ProjectChartViewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: true,
            isLoaded: false,
            Items: []
        }
    }

    componentDidMount() {
        //this.props.context.updateValue(this.props.context.ID)
        //alert(1)
    }


    //static contextType = ProjectGraphContext;

    //rendering
    render() {
        const options = {
            title: {
                text: '    '
            },
            series: [{
                name: 'Фактические данные ',
                data: [1, 2, 3],
                color: '#6e6e6e'
            },
            {
                name: 'Плановые данные ',
                data: [1, 3, 4, 6],
                color: 'rgb(27, 214, 74)'
            },
            ]
        }

        var fstDate = new Date("2020-05-01T00:00:00").getTime()
        var scndDate = new Date("2020-05-08T00:00:00").getTime()

        var s = []
        var s_fact = []
        console.log('context ' + this.props.context.Items)
        //alert(this.props.context.IsLoaded)
        if (this.props.context.isLoaded && this.props.context.Items !== null) {
        var items = this.props.context.Items === null ? [] : this.props.context.Items
         items.map(item => (
            s.push([GetUTCDate(item.time), item.progress])
        )) }
        if (this.props.context.isLoaded && this.props.context.ItemsFact !== null) {
            var items = this.props.context.Items_fact === null ? [] : this.props.context.Items_fact
             items.map(item => (
                s_fact.push([GetUTCDate(item.time), item.progress])
            )) }

        const options1 = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Прогресс выполнения проекта'
            },
            subtitle: {
                text: 'Данные изменяются в зависиомти от манипуляция с задачами'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Дата'
                }
            },
            yAxis: {
                title: {
                    text: 'Прогресс выполненния (%)'
                },
                min: 0,
                max : 100
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y:.2f} %'
            },

            plotOptions: {
                series: {
                    marker: {
                        enabled: true
                    }
                }
            },

            //colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            series: [{
                name: "Плановый проект",
                color : '#6CF',
                data: s
            }, {
                name: "Фактический проект",
                color : '#6e6e6e',
                data: s_fact
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        plotOptions: {
                            series: {
                                marker: {
                                    radius: 2.5
                                }
                            }
                        }
                    }
                }]
            }
        }
        return (
            <div>
                <TitlePanel
                    isExpanded={this.state.isExpanded}
                    title="ПРОГРЕСС"
                    onClick={() => { this.setState({ isExpanded: !this.state.isExpanded }) }
                    } />
                {
                    this.state.isExpanded //if expanded
                        ? <div className="ProjectElement">
                            <Col>
                                <Row
                                    style={{ fontWeight: 'bold' }}>
                                    <b>Период проекта</b>
                                </Row>
                                <div>
                                    {this.props.context.isLoaded && (this.props.context.Items || this.props.context.Items_fact) !== null
                                        ? <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options1}
                                        />
                                        : null
                                    }
                                </div>
                            </Col>
                        </div>
                        : null //else
                }
            </div>
        )
    }
}



//ProjectChartView.contextType = ProjectGraphContext;
