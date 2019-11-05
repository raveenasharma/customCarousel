import React from 'react'

export const Slide = ({ image, imagePreview, slideWidth, altText }) => {
    const styles = {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 60%",
        margin: "0 30px 0 30px",
        width: `${slideWidth}`,
        minWidth: `${slideWidth}`,
        height: "auto"
    };
    return <img className="slide lazy" style={styles} data-srcset={image} alt={`Slide ${altText}`}
            data-src={image} src={imagePreview} />
            
   
        ;
};