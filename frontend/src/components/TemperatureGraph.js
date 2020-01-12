import React, { Component } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
  import axios from 'axios';

export class TemperatureGraph extends Component {
   
    
    constructor(props){
        super(props)
        this.state = {
            data: ""
        }
    }

    componentDidMount(){
        axios.get('data/' + this.props.location + '.json')
            .then(res => {
                console.log(res.data.climate)
                this.setState({
                    data: res.data.climate
            })
        })
    }

    render() {
        // const data = getData(title, placeName)
        // console.log(data)
        // console.log("here")
    
        return(
            <div>
                { this.state.data && (
                    <AreaChart width={300} height={250}
                    data={this.state.data}
                    margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area dataKey="high" stroke="#E7E34E" fill="#E7E34E" />
                    <Area dataKey="low" stroke="#F7F4BF" fill="#F7F4BF" />
                </AreaChart>
                )}
            </div>
        );
    }
}

export default TemperatureGraph;
