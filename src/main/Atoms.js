import React from "react";

class Atoms extends React.Component {
  atoms = ["Drink water", "Take shower", "Listen Jazz music", "Study React"];
  render() {
    return (
      <div className="Atoms">
        <ul>
          {this.atoms.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Atoms;
