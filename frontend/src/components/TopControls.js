import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
// 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

export class TopControls extends Component {
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
        navigator.geolocation.getCurrentPosition(success, error, options)
    }

    render() {
    return (
        <Grid 
            container 
            style={{ border: "1px solid green"}} 
            direction="row"
            justify="flex-start"
            alignItems="center"    
        >
            <h1>Industry</h1>
            <FormControl style={{ border: "1px solid black"}}>
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            // onChange={handleChange}
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                { this.state.industries.map((value, index) => {
                    return <MenuItem key={index} value={10}>{value}</MenuItem>
                })}
            </Select>
            </FormControl>
        </Grid>
    );
    }
}

export default TopControls;
