import React from "react";
import PropTypes from 'prop-types';

import { Slide } from "./Slide";
import { LeftArrow, RightArrow } from "./Arrows";
import { getResponsiveScreenConfig } from "./utility";

class Carousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: props.config.slidesToShow - 1,
            translateValue: 0,
            slideWidth: "100%",
            currentSettings: {
                settings: {
                    slidesToScroll: props.config.slidesToScroll,
                    slidesToShow: props.config.slidesToShow
                }
            }
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.changeWidth);
        this.changeWidth();
        let carouselSettings = getResponsiveScreenConfig(this.props);
        if (carouselSettings) {
            this.setState({
                currentSettings: carouselSettings,
                currentIndex: carouselSettings.settings.slidesToShow - 1
            });
        }
        this.startStopAutoplay(this.props);
    }

    startStopAutoplay(props) {
        if (props.config.autoplay) {
            this.intervalThread = setInterval(() => {
                this.goToNextSlide();
            }, 2000);
        }
        else if (this.intervalThread || !this.props.config.autoplay) {
            clearInterval(this.intervalThread);
        }
    }

    componentWillReceiveProps(nextProps) {
        // Prevent an unneeded render
        if (nextProps.config) {
            this.changeWidth(nextProps);
        }
        this.startStopAutoplay(nextProps);
      }

    componentWillUnmount() {
        window.removeEventListener("resize", this.changeWidth);
        clearInterval( this.intervalThread);
    }

    goToPrevSlide = () => {
        let { currentIndex, currentSettings } = this.state;

        // STEP 1: Check if no more data on the left of carousel
        if (currentIndex === currentSettings.settings.slidesToShow - 1) return;

        let extraSlides = currentIndex + 1 - currentSettings.settings.slidesToShow;
        let newIndex, jumpMultiplicator;

        if (
            currentIndex + 1 - currentSettings.settings.slidesToScroll <
            currentSettings.settings.slidesToShow
        ) {
            newIndex = currentSettings.settings.slidesToShow - 1;
            jumpMultiplicator = extraSlides;
        } else {
            jumpMultiplicator = currentSettings.settings.slidesToScroll;
            newIndex = currentIndex - currentSettings.settings.slidesToScroll;
        }
        this.setState(prevState => ({
            currentIndex: newIndex,
            translateValue:
                prevState.translateValue +
                this.slideWidth() * jumpMultiplicator +
                60 * jumpMultiplicator
        }));
    };

    goToNextSlide = () => {
        let { currentIndex, currentSettings } = this.state;
        let { carouselData } = this.props;
        
        if (currentIndex === carouselData.length - 1) {
            return this.setState({
                currentIndex: currentSettings.settings.slidesToShow - 1,
                translateValue: 0
            });
        }

        //Calculate translate jump
        //If carouselData left to scroll are less than scroll slides, then reduce jump multiplicator
        let {
            newIndex,
            jumpMultiplicator
        } = this.calculateNextIndexAndTranslateValue();

        this.setState(prevState => ({
            currentIndex: newIndex,
            translateValue:
                prevState.translateValue -
                this.slideWidth() * jumpMultiplicator -
                60 * jumpMultiplicator
        }));
    };

    slideWidth = () => {
        return document.querySelector(".slide").clientWidth;
    };

    changeWidth = (props) => {
        let carouselSettings = getResponsiveScreenConfig(props && props.config ? props : this.props);
        
        //If carouselData left to scroll are less than scroll slides, then reduce jump multiplicator
        if (
            carouselSettings &&
            (carouselSettings.breakpoint !== this.state.currentSettings.breakpoint ||
            (props && props.config))
        ) {
            this.setState({
                currentSettings: carouselSettings,
                currentIndex: carouselSettings.settings.slidesToShow - 1,
                slideWidth:
                    Math.floor(100 / carouselSettings.settings.slidesToShow, 0) - 4 + "%"
            });
            this.setState({
                translateValue: 0
            });
        }
    };

    calculateNextIndexAndTranslateValue() {
        let { currentIndex, currentSettings } = this.state;
        let { carouselData } = this.props;

        let extraSlides = carouselData.length - 1 - currentIndex;
        let jumpMultiplicator, newIndex;

        if (
            currentIndex + currentSettings.settings.slidesToScroll >
            carouselData.length - 1
        ) {
            jumpMultiplicator = extraSlides;
            newIndex = carouselData.length - 1;
        } else {
            jumpMultiplicator = currentSettings.settings.slidesToScroll;
            newIndex = currentIndex + currentSettings.settings.slidesToScroll;
        }
        return { newIndex, jumpMultiplicator };
    }

    render() {
        
        return (
            <div>
                <LeftArrow goToPrevSlide={this.goToPrevSlide} />

                <RightArrow goToNextSlide={this.goToNextSlide} />
                <div className="carousel">
                    <div
                        className="carousel-wrapper"
                        style={{
                            transform: `translateX(${this.state.translateValue}px)`,
                            transition: `transform ease-in-out ${
                                this.props.config.transitionDelay
                                    ? this.props.config.transitionDelay
                                    : 0.45
                                }s`
                        }}
                    >
                        {this.props.carouselData.map((image, i) => {
                            return (
                                
                                    <Slide
                                key={i}
                                image={image.largeImageURL}
                                imagePreview={image.previewURL}
                                slideWidth={this.state.slideWidth}
                                altText={i}
                            />
                            
                            
                        )})}
                    </div>
                </div>
                <div className="buttonContainer">
                <button className="btn btn-primary desktopButton" onClick={this.goToPrevSlide}>Prev</button>
                <button className="btn btn-primary desktopButton" onClick={this.goToNextSlide}>Next</button>
                </div>
                
            </div>
        );
    }
}

export default Carousel;

Carousel.propTypes = {
    carouselData: PropTypes.array,
    config: PropTypes.shape({
        slidesToShow: PropTypes.number.isRequired,
        slidesToScroll: PropTypes.number.isRequired,
        autoplay: PropTypes.bool,
        transitionDelay: PropTypes.number,
        responsive: PropTypes.arrayOf(PropTypes.shape({
            breakpoint: PropTypes.number.isRequired,
            settings: PropTypes.shape({
                slidesToShow: PropTypes.number.isRequired,
                slidesToScroll: PropTypes.number.isRequired,
            })
        }))
    }),
    
}
