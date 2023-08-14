//***src/components/Alert.js

import { Component } from 'react';

//***Simple class component that attempts to render text it receives from its props, using the style from its getStyle function. 
class Alert extends Component {
  constructor(props) {
    super(props);
    //***Set Alert’s colors to be null by default, as its subclasses will override them.
    this.color = null;
    this.bgColor = null;
  }

  //***getStyle function defines a basic style for the color, background color, borders, and some spacing.
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

//***After the definition of the Alert component class, creation a subclass named InfoAlert.
class InfoAlert extends Alert {
    constructor(props) {
      super(props);
      //***blue
      this.color = 'rgb(0, 0, 0)'; 
      //***light blue
      this.bgColor = 'rgb(250, 127, 127)';
    }
  }

  //***After the definition of the Alert component class, creation a subclass named ErrorAlert.
class ErrorAlert extends Alert {
    constructor(props) {
      super(props);
      //***red
      this.color = 'rgb(0, 0, 0)'; 
      //***light red
      this.bgColor = 'rgb(250, 127, 127)';
    }
  }

    //***After the definition of the Alert component class, creation a subclass named WarningAlert.
class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    //***red
    this.color = 'rgb(0, 0, 0)'; 
    //***light red
    this.bgColor = 'rgb(250, 127, 127)';
  }
}

  //***Export InfoAlert (so it can used it in the CitySearch component).
  export { InfoAlert, ErrorAlert, WarningAlert };