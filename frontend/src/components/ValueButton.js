import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export class ValueButton extends Component {
  render() {
    const { type, value, click} = this.props;
    return (
      <div>
          <img alt="pic" src={"./assets/"+this.value+".svg"}></img>
          <Button  color={type === value ? "primary" : "default"} onClick={() => click(type)}>
                {type}
          </Button>
      </div>
    );
  }
}

export default ValueButton;
  