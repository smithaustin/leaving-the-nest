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


    constructor(props) {
        super(props)
        this.state = {
            data: "",
            loading: true
        }
    }

    componentDidMount() {
        axios.get('data/cities.json')
            .then(res => {
                console.log(res.data[this.props.location].climate)
                this.setState({
                    raw: res.data,
                    data: res.data[this.props.location].climate,
                    loading: false
                })

            })
    }

    getData(){
        return this.res.data[this.props.location].climate;
    }

    componentWillUpdate(){
        console.log("will update")
    }

    componentDidUpdate(prevProps){
        if(prevProps.location !== this.props.location){
            this.setState({data: this.state.raw[this.props.location].climate})
        }
    }

    render() {
        // const data = getData(title, placeName)
        // console.log(data)
        // console.log("here")

        return (
            <div>
                {this.state.data && (
                    <AreaChart width={460} height={250}
                        data={this.state.data}
                        // margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
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
