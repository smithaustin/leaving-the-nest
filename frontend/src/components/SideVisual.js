import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area,
} from 'recharts';
import TemperatureGraph from "./TemperatureGraph";
import LivingCostGraph from "./LivingCost";


export class SideVisual extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: false
        }
    }

    render() {
        const location = this.props.location.charAt(0).toUpperCase() + this.props.location.slice(1)
        return (
            <div>
                <h2>{this.props.location}</h2>
                <h2>{this.props.industry}</h2>
                <p>{this.props.population}</p>
                <TemperatureGraph location={this.props.location}/>
                <LivingCostGraph/>
            </div>
        );
    }
}

export default SideVisual;
