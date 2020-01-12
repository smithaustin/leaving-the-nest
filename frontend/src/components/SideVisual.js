import React, { Component } from "react";
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
        // const location = this.props.location.charAt(0).toUpperCase() + this.props.location.slice(1)
        console.log(this.props)
        console.log("----------")
        return (
            <div>
                <h1>{this.props.location}</h1>
                {/* <h2>{this.props.industry}</h2> */}
                {/* <h2>{this.props.population}</h2> */}
                <h2>Annual Climate</h2>
                <TemperatureGraph location={this.props.location}/>
                <h2>Living Cost</h2>
                <LivingCostGraph place={this.props.location} />
            </div>
        );
    }
}

export default SideVisual;
