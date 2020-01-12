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

export class DataGraph extends Component {
  render() {

    const { data, name } = this.props;

    return (
      <div>
        <BarChart width={300} height={180} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar stackId={name + "-graph"} dataKey="data">
            {data.map((entry, i) => <Cell fill={data[i].name === name ? "#4326d4" : "#d0cce0"} />)}
          </Bar>
        </BarChart>
      </div>
    );
  }
}

export default DataGraph;
