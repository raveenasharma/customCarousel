import React from "react";
import "./App.css";
import Carousel from "./Carousel";

import { demoConfigs, carouselData, configTypes } from './carousel-config' 

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedConfig: demoConfigs[0]
    }
  }

  changeConfig = (index) => {
    this.setState({
      selectedConfig: {...demoConfigs[index]}
    })
  }

  render() {
    
    return (
      <div className="App">
        <h3>Custom Carousel <small>by Raveena Sharma</small></h3>
        <Carousel carouselData={carouselData} config={this.state.selectedConfig} />
  
        <br />
        <h4>Carousel Settings</h4>
        <div className="configContainer">
          {configTypes.map((item, index) =>
            <div className="configItem" key={index}>
              <button className="btn btn-info configButton" onClick={() => this.changeConfig(index)}>{item}</button>
              <textarea cols="30" rows="10"
                defaultValue={JSON.stringify(demoConfigs[index], undefined, 4)}>
              </textarea>
          </div>)}
        </div>
      </div>
    );
  }
  
}

export default App;
