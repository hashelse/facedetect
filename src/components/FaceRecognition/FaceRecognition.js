import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({tags,imageUrl,box}) => {
    return (
        <div className="center ma">
            <div className="absolute ma2">
            <img src={imageUrl} className="br3" id = "inputimage" alt="" width="500px" height="auto"/>
            <div className="bounding-box" style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>

            </div>

            


        </div>


    )
}

export default FaceRecognition;
