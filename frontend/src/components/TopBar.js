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
<<<<<<< HEAD
                <img src="./assets/logo.svg"></img>
=======
                <h1 style={{color: "#29066B"}}>Leave the Nest</h1>
>>>>>>> 285a4e7f5ab0cb91cb2df5e4900f19c380809cb0
            </Grid>
        );
    }
}

export default TopBar;
