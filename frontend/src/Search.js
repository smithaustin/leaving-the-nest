import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Grid from "@material-ui/core/Grid";
import DataGraph from "./components/DataGraph";
import PopulationButton from "./components/PopulationButton";
import { TopControls } from "./components/TopControls";
import { geolocated } from "react-geolocated";

import axios from 'axios';
// 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IndustrySelector from "./components/IndustrySelector";


import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SideVisual from "./components/SideVisual";


const Map = ReactMapboxGl({
  scrollZoom: false,
  interactive: false,
  accessToken:
    "pk.eyJ1IjoidG9reW9qYWNrIiwiYSI6ImNrNWE1MWhzZjE2ODAza280enRobG9obHEifQ.PC30cobNt4J9mEanFnSGtA"
});

const data = {
  places: [
    {
      name: "toronto",
      population: 5000,
      lat: 43.65107,
      long: -79.347015,
      salary: 30000,
      cost_of_living: 1000,
      safety_rating: 5
    },
    {
      name: "vancouver",
      population: 50000,
      lat: 49.246292,
      long: -123.116226,
      salary: 8000,
      cost_of_living: 2000,
      safety_rating: 9
    },
    {
      name: "montreal",
      population: 1000000000,
      lat: 45.508888,
      long: -73.561668,
      salary: 1000,
      cost_of_living: 1500,
      safety_rating: 3
    }
  ]
};

function getData(state) {
  let finalData = [];
  const selectedPopulationOption = state.population;

  data.places
    .filter(place => {
      const { population } = place;
      if (selectedPopulationOption === "large" && population > 1000000)
        return true;

      if (
        selectedPopulationOption === "medium" &&
        population >= 10000 &&
        population <= 1000000
      )
        return true;

      if (selectedPopulationOption === "small" && population <= 10000)
        return true;

      if (selectedPopulationOption === "all") return true;

      return false;
    })
    .forEach(value => finalData.push(value));

  return finalData;
}

export class Search extends Component {
  state = {
    // Options
    population: "all", // small (<10,000), medium (100,000), large (1,000,000+), all

    // Map
    selected: undefined,
    hover: undefined
  };

  populationClick = size => {
    this.setState({ population: size });
  };

  render() {
    //   return !this.props.isGeolocationAvailable ? (
    //     <div>Your browser does not support Geolocation</div>
    // ) : !this.props.isGeolocationEnabled ? (
    //     <div>Geolocation is not enabled</div>
    // ) : this.props.coords ?

    if (!this.props.coords)
      return <p>Loading geolocation......</p>;

    return (
      <div style={{ height: "100%" }}>
        <Grid container spacing={0}> 
          <Grid item xs={2} style={{ border: "1px solid red" }}>
            <div>
             <h2>Current Location</h2>
             { this.props.coords == true &&
                <p>{this.props.coords}</p>
             }
             <p>Vancouver</p>
            </div>

            <div style={{ border: "1px solid black", width:"100%" }}>
              <h2>Industry</h2>
              <IndustrySelector/>
            </div>
            


            {/* Population Density */}
            <div>
              <h2>Population Density</h2>
            {/* <PopulationButton
              type="small"
              population={this.state.population}
              populationClick={this.populationClick}
            />
            <PopulationButton
              type="medium"
              population={this.state.population}
              populationClick={this.populationClick}
            />
            <PopulationButton
              type="large"
              population={this.state.population}
              populationClick={this.populationClick}
            />
            <PopulationButton
              type="all"
              population={this.state.population}
              populationClick={this.populationClick}
            /> */}
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button>Small</Button>
              <Button>Medium</Button>
              <Button>Large</Button>
              <Button>All</Button>
              </ButtonGroup>
            </div>

            <div>
             <h2>Distance from Home</h2>
             <ButtonGroup size="small" aria-label="small outlined button group">
              <Button>Within Province</Button>
              <Button>Within Canada</Button>
              <Button>Out of Country</Button>
              </ButtonGroup>
            </div>

            <div>
             <h2>Landscape</h2>
              <ButtonGroup size="small" aria-label="small outlined button group">
              <Button>Mountain</Button>
              <Button>Costal</Button>
              <Button>Urban</Button>
              </ButtonGroup>
            </div>


          </Grid>
          <Grid item xs={7} style={{ border: "1px solid blue" }}>
            <div style={this.state.hover ? { cursor: "pointer" } : {}}>
              <Map
                //eslint-disable-next-line
                style="mapbox://styles/mapbox/outdoors-v10"
                containerStyle={{
                  height: "90vh"
                }}
                center={[-100, 61.0]}
                zoom={[2]}
              >
                {getData(this.state).map(place => {
                  const name = place.name;
                  return (
                    <Layer
                      type="symbol"
                      key={name}
                      id={name}
                      layout={{
                        "icon-image": "school-15",
                        "icon-size":
                          this.state.hover === name ||
                          this.state.selected === name
                            ? 1.5
                            : 1.0
                      }}
                    >
                      <Feature
                        coordinates={[place.long, place.lat]}
                        onClick={obj => {
                          this.setState({ selected: place });
                        }}
                        onMouseEnter={obj => {
                          this.setState({ hover: place });
                        }}
                        onMouseLeave={obj => {
                          this.setState({ hover: undefined });
                        }}
                      />
                    </Layer>
                  );
                })}
              </Map>
            </div>
          </Grid>
          <Grid item xs={3} style={{ border: "1px solid orange" }}>
           <SideVisual />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 50000
})(Search);
