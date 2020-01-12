import React, { Component } from "react";
// 
import { geolocated } from "react-geolocated";
import SideControl from "./components/SideControl";
import SideVisual from "./components/SideVisual";
import MapVisual from "./components/MapVisual";
// 
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
// 

// function getData(state) {
//   let finalData = [];
//   const selectedPopulationOption = state.population;

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
      name: "montréal",
      population: 1000000000,
      lat: 45.508888,
      long: -73.561668,
      salary: 1000,
      cost_of_living: 1500,
      safety_rating: 3
    }
  ]
};

//       if (
//         selectedPopulationOption === "medium" &&
//         population >= 10000 &&
//         population <= 1000000
//       )
//         return true;

//       if (selectedPopulationOption === "small" && population <= 10000)
//         return true;

//       if (selectedPopulationOption === "all") return true;

//       return false;
//     })
//     .forEach(value => finalData.push(value));

//   return finalData;
// }

export class Main extends Component {
  state = {
    // Options
    population: "all", // small (<10,000), medium (100,000), large (1,000,000+), all
    distance: "province", // province, country, out
    // Map
    selected: undefined,
    hover: undefined,
    location: "",
    industry: ""
  };

  componentDidMount() {
    console.log("counted~")
  }

  handlePopulationChange = (size) => {
    this.setState({ population: size });
  };

  handleLocationChange = (e) => {
    console.log(e);
    this.setState({location: e});
  };

  handleIndustryChange = (e) => {
    console.log(e);
    this.setState({industry: e});
  }

  render() {
    if (!this.props.coords) {
      return <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </div>
    };
    return (
      <div style={{ height: "100%" }}>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <SideControl onIndustryChange={this.handleIndustryChange} onPopulationChange={this.handlePopulationChange}/>
            <p></p>


          </Grid>
          <Grid item xs={7} style={{ border: "1px solid black" }}>
            <MapVisual onLocationChange={this.handleLocationChange} />
          </Grid>
          <Grid item xs={3} style={{ border: "1px solid black" }}>
            {(this.state.location && this.state.industry) && (
              <SideVisual location={this.state.location} industry={this.state.industry} population={this.state.population} />
            )}
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
})(Main);
