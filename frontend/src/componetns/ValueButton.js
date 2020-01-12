import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export class ValueButton extends Component {
  render() {
    const { type, value, click} = this.props;
    return (
          <Button  color={type === value ? "primary" : "default"} onClick={() => click(type)}>
                {type}
          </Button>
    );
  }
}

export default ValueButton;
