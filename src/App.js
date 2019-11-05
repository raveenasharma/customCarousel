import React from "react";
import "./App.css";
import Carousel from "./Carousel";

import { getData } from './api'
import { demoConfigs, configTypes } from './carousel-config' 

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedConfig: demoConfigs[0],
      data: []
    }
  }

  componentDidMount() {
    getData.then(data => {
      this.setState({
        data: data
      }, () => {
          //Add lazy load observer
          var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
          if (
            "IntersectionObserver" in window &&
            "IntersectionObserverEntry" in window &&
            "intersectionRatio" in window.IntersectionObserverEntry.prototype
          ) {
            let lazyImageObserver = new IntersectionObserver(function(
              entries,
              observer
            ) {
              entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                  let lazyImage = entry.target;
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.srcset = lazyImage.dataset.srcset;
                  lazyImage.classList.remove("lazy");
                  lazyImageObserver.unobserve(lazyImage);
                }
              });
            });
        
            lazyImages.forEach(function(lazyImage) {
              lazyImageObserver.observe(lazyImage);
            });
          }
        

      })
    }
      
    )
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
        <Carousel carouselData={this.state.data} config={this.state.selectedConfig} />
  
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
