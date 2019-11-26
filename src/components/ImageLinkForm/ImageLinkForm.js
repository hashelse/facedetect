import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
    return (
        <div className="ma0 mt0">
            <p className="f3 courier washed-red shadow-2 pa2 ">
                {'FaceDetect can detect face in pictures'}<br />
                {'Enter URL of image and hit detect'}
            </p>
            <div className="center" style={{clear:'both'}}>
                <div className="form center pa4 br3 shadow-5">
                    <input type="text" className="f4 br2 pa2 w-70 center" onChange={onInputChange}/>
                    <button className="f4 w-30 ml3 grow br2 link ph2 pv2 div white b--black-30
                    bg-dark-green"
                    onClick={onButtonSubmit}>Detect</button> 
                </div>

            </div>

            <p className="courier washed-red shadow-2 pa2 ">
                {'Here is a picture to help you get started!'}<br />
                {'https://i.imgur.com/ZINR6jY.jpg'}
            </p>
        </div>
    )
}

export default ImageLinkForm;
