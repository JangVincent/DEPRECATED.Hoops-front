import React from "react";

class Routains extends React.Component {
  routains = ["Rest Day", "Normal Day", "For test", "For study"];
  render() {
    return (
      <div className="Routains">
        <ul>
          {this.routains.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Routains;
