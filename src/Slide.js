import React from 'react'

export const Slide = ({ image, slideWidth, altText }) => {
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
            data-src={image} src="https://images.iphonephotographyschool.com/7944/1120b/Blurry-iPhone-Photo-1.jpg" />
   
        ;
};