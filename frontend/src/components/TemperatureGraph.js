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

function getData() {
    
}

export class TemperatureGraph extends Component {
   
    
    constructor(props){
        super(props)
        this.state = {
            data: ""
        }
    }

    componentDidMount(){
        axios.get('data/cities/' + this.props.location + '.json')
            .then(res => {
                console.log(res.data.climate)
                this.setState({
                    data: res.data
            })
        })
    }

    render() {

        const prop = this.props;
        const {title, placeName} = prop;
        // const data = getData(title, placeName)
        // console.log(data)
        // console.log("here")
    
        return(
            <div>
                { this.state.data && (
                    <AreaChart width={300} height={250}
                    data={this.state.data.climate.high.map((value, index) => {
                        return {name: index+1, t: value}
                    })}
                    margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area dataKey="t" stroke="#E7E34E" fill="#E7E34E" />
                </AreaChart>
                )}
            </div>
        );
    }
}

export default TemperatureGraph;
