import React, { Component } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function getData(title, placeName, data) {
  let graphData = [];

  data.forEach(place => {
    graphData.push({
      name: place.name,
      [ title ]: place[title]
    });
  });

  return graphData;
}

export class DataGraph extends Component {

  render() {

    const prop = this.props;
    const {title, placeName} = prop;
    const data = getData(title, placeName, prop.data.places)

    console.log("-----")
    console.log(data)
    console.log("-----")
    return (
      <div>
        <BarChart width={300} height={180} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar stackId={placeName + "-graph"} dataKey={title}>
            {data.map((entry, i) => <Cell fill={data[i].name === placeName ? "#4326d4" : "#d0cce0"} />)}
          </Bar>
        </BarChart>
      </div>
    );
  }
}

export default DataGraph;
