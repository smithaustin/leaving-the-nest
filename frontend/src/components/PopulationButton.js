import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export class PopulationButton extends Component {
  render() {
    const { type, population, populationClick} = this.props;
    return (
      <div>
          <Button variant="contained" color={type === population ? "primary" : "default"} onClick={() => populationClick(type)}>
                {type}
          </Button>
      </div>
    );
  }
}

export default PopulationButton;
