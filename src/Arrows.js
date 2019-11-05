import React from 'react';

export const LeftArrow = props => {
    return (
        <div className="backArrow arrow prev" onClick={props.goToPrevSlide}>
            <span className="glyphicon glyphicon-chevron-left"></span>
        </div>
    );
};

export const RightArrow = props => {
    return (
        <div className="nextArrow arrow next" onClick={props.goToNextSlide}>
            <span className="glyphicon glyphicon-chevron-right"></span>
        </div>
    );
};