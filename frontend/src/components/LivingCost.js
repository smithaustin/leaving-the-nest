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

function getSelectedColor(name, selectedName) {
    return "#" + (selectedName === name ? "4326d4": "d0cce0");
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
                'montréal': mon.data.living_cost,
                'toronto': tor.data.living_cost
            }]
        });
    }

    render() {
        const {place} = this.props;

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
                    <Bar dataKey="vancouver" fill={getSelectedColor("vancouver", place)}/>
                    <Bar dataKey="calgary" fill={getSelectedColor("calgary", place)}/>
                    <Bar dataKey="montréal" fill={getSelectedColor("montréal", place)}/>
                    <Bar dataKey="toronto" fill={getSelectedColor("toronto", place)}/>
                </BarChart>
                )}
            </div>
        );
    }
}

export default LivingCostGraph;
