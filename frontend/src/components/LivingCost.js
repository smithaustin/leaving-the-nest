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

function getData() {
    
}

export class LivingCostGraph extends Component {
   
    
    constructor(props){
        super(props)
        this.state = {
            data: ""
        }
    }

    async componentDidMount(){
        const [van, cal, mon, tor] = await Promise.all([
            axios.get('data/vancouver.json'),
            axios.get('data/calgary.json'),
            axios.get('data/montreal.json'),
            axios.get('data/toronto.json')
        ]);

        this.setState({
            data: [{
                'name':"Rent for One Bedroom",
                'vancouver': van.data.living_cost,
                'calgary': cal.data.living_cost,
                'montreal': mon.data.living_cost,
                'toronto': tor.data.living_cost
            }]
        });
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
                <BarChart width={300} height={250}
                    data={this.state.data}
                    barCategoryGap={0}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="vancouver" fill="#29006D"/>
                    <Bar dataKey="calgary" fill="#C02323"/>
                    <Bar dataKey="montreal" fill="#F17E23"/>
                    <Bar dataKey="toronto" fill="EBBE28"/>
                </BarChart>
                )}
            </div>
        );
    }
}

export default LivingCostGraph;
