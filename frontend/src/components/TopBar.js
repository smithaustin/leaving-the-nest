import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';


export class TopBar extends Component {
    state = {
        industries: []
    }

    componentDidMount() {
        axios.get('data/industry_categories/industries.json')
            .then(res => {
                console.log(res.data)
                this.setState({
                    industries: res.data.categories
                })

        })
        // navigator.geolocation.getCurrentPosition(success, error, options)
    }

    render() {
        return (
            <Grid
                container 
                direction="row"
                justify="flex-start"
                alignItems="center"    
            >
                <img className="logo" src="./assets/logo.svg"></img>
            </Grid>
        );
    }
}

export default TopBar;
