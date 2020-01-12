import React, { Component } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import axios from 'axios';

export class CommutingGraph extends Component {


    constructor(props) {
        super(props)
        this.state = {
            data: "",
            loading: true
        }
    }

    componentDidMount() {
        axios.get('data/commuting.json')
            .then(res => {
                console.log(res.data[this.props.location].commute_mode)
                this.setState({
                    raw: res.data,
                    data: res.data[this.props.location].commute_mode,
                    loading: false
                })

            })
    }

    getData(){
        return this.res.data[this.props.location].commute_mode;
    }

    componentWillUpdate(){
        console.log("will update")
    }

    componentDidUpdate(prevProps){
        if(prevProps.location !== this.props.location){
            this.setState({data: this.state.raw[this.props.location].commute_mode})
        }
    }

    render() {
        // const data = getData(title, placeName)
        // console.log(data)
        // console.log("here")

        return (
            <div>
                {this.state.data && (
                    <BarChart width={460} height={250}
                        data={this.state.data}
                        // margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#820401" />
                    </BarChart>
                )}
            </div>
        );
    }
}

export default CommutingGraph;
