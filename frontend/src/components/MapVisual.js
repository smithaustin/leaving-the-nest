import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

// defines the Mapbox React Component
const Map = ReactMapboxGl({
    scrollZoom: false,
    interactive: false,
    accessToken: "pk.eyJ1IjoidG9reW9qYWNrIiwiYSI6ImNrNWE1MWhzZjE2ODAza280enRobG9obHEifQ.PC30cobNt4J9mEanFnSGtA"
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
            name: "montréal",
            population: 1000000000,
            lat: 45.508888,
            long: -73.561668,
            salary: 1000,
            cost_of_living: 1500,
            safety_rating: 3
        },
        {
            name: "calgary",
            population: 1019942,
            lat: 51.05,
            long: -114.09
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

export class MapVisual extends Component {
    state = {
        // Options
        population: "all", // small (<10,000), medium (100,000), large (1,000,000+), all
        distance: "province", // province, country, out
        // Map
        selected: undefined,
        hover: undefined
    };

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("counted~")
    }

    handleChange(e){
        this.props.onLocationChange(e.target.value)
    }

    populationClick = (size) => {
        this.setState({ population: size });
    };
    render() {
        return (
            <div style={this.state.hover ? { cursor: "pointer" } : {}}>
                <Map
                    //eslint-disable-next-line
                    style="mapbox://styles/mapbox/light-v10"
                    containerStyle={{
                        height: "90vh"
                    }}
                    center={[-100, 61.0]}
                    zoom={[3]}
                >
                    {getData(this.state).map(place => {
                        const name = place.name;
                        return (
                            <Layer
                                type="circle"
                                key={name}
                                id={name}
                                paint={{
                                    "circle-radius": (this.state.hover && this.state.hover.name === name) ||
                                        (this.state.selected && this.state.selected.name === name)
                                        ? 15
                                        : 10,
                                    "circle-color": "#29066B"
                                }}
                                // layout={{
                                //     "icon-image": "school-15",
                                //     "text-field": name,
                                //     "text-allow-overlap": true,
                                //     "text-ignore-placement": true,
                                //     "text-anchor": "bottom-right",
                                //     "text-justify": "right",
                                //     "text-line-height": 2.3,
                                //     "icon-size":
                                //         (this.state.hover && this.state.hover.name === name) ||
                                //             (this.state.selected && this.state.selected.name === name)
                                //             ? 1.5
                                //             : 1.0
                                // }}
                            >
                                <Feature
                                    coordinates={[place.long, place.lat]}
                                    onClick={obj => {
                                        this.setState({ selected: place });
                                        this.props.onLocationChange(place.name);
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
        )
    }
}

export default MapVisual;