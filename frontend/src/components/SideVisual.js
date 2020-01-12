import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';

export class SideVisual extends Component {
    componentDidMount(props) {
        // axios.get('data/industry_categories/industries.json')
        //     .then(res => {
        //         console.log(res.data)
        //         this.setState({
        //             industries: res.data.categories
        //         })

        // })
        // // navigator.geolocation.getCurrentPosition(success, error, options)
        console.log(this.props.location)
    }

    render() {
        return (
            <div>
                <h2>{this.props.location}</h2>
            </div>
        );
    }
}

export default SideVisual;
