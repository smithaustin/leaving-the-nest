import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
// 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export class IndustrySelector extends Component {
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
            <div>
                <FormControl style={{ border: "1px solid black"}}>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                onChange={console.log}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    { this.state.industries.map((value, index) => {
                        return <MenuItem key={index} value={value}>{value}</MenuItem>
                    })}
                </Select>
                </FormControl>
            </div>
        );
    }
}

export default IndustrySelector;
