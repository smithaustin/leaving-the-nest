import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoidG9reW9qYWNrIiwiYSI6ImNrNWE1MWhzZjE2ODAza280enRobG9obHEifQ.PC30cobNt4J9mEanFnSGtA'
});

export class Search extends Component {
    render() {
        return (
            <div>
                <h1>pls search</h1>
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: '50vh',
                        width: '50vw'
                    }}
                >
                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                    </Layer>
                </Map>;
            </div>
        )
    }
}

export default Search
