import { Component } from 'react';


//***Main class.


class Alert extends Component {
  constructor(props) {
    super(props);
    //***Set Alert’s colors to be null by default, as its subclasses will override them.
    this.color = null;
    this.bgColor = null;
  }


  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px"
    };
  }


  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}


//***Subclasses from main Class (Alert).


class InfoAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'rgb(0, 0, 0)'; 
      this.bgColor = 'rgb(250, 127, 127)';
    }
  }


  class ErrorAlert extends Alert {
    constructor(props) {
      super(props);
      //***red
      this.color = 'rgb(0, 0, 0)'; 
      //***light red
      this.bgColor = 'rgb(250, 127, 127)';
    }
  }


  class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    //***red
    this.color = 'rgb(0, 0, 0)'; 
    //***light red
    this.bgColor = 'rgb(250, 127, 127)';
  }
}


export { InfoAlert, ErrorAlert, WarningAlert };