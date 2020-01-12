import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export class ValueButton extends Component {
  render() {
    const { type, value, click} = this.props;
    return (
      <div>
          
          <Button  color={type === value ? "primary" : "default"} onClick={() => click(type)}>
                {type}
                <img src={"./assets/" + this.props.type +".svg"} style={{display:"inline"}}></img>
          </Button>
      </div>
    );
  }
}

export default ValueButton;
  