import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area,
} from 'recharts';


export class SideVisual extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: false
        }
    }

    componentDidMount(props) {
        axios.get('data/vancouver.json')
            .then(res => {
                console.log(res.data)
                this.setState({
                    data: res.data
                })

                console.log(this.state.data.climate.high.map((value, index) => {
                    return {name: index, t: value}
                }))


            })
        console.log(this.props.location)
    }

    render() {
        return (
            <div>
                <h2>{this.props.location}</h2>
                <h2>{this.props.industry}</h2>
                <p>{this.props.population}</p>
                <div>
                    {this.state.data && (
                        <AreaChart
                            width={400}
                            height={400}
                            data={this.state.data.climate.high.map((value, index) => {
                                return {name: index, t: value}
                            })}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                            <XAxis dataKey="name" />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Area type="monotone" dataKey="t" stroke="#ff7300" yAxisId={0} fill="#fff000" />
                            {/* <Area type="monotone" dataKey="t" stroke="#387908" yAxisId={1} /> */}
                        </AreaChart>
                    )}
                </div>
            </div>
        );
    }
}

export default SideVisual;
