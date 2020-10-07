import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
    return (
        <div className="ma0 mt0">
            <p className="f3 courier white shadow-2 b--dashed b--white-10 pa4 ">
                {'FaceDetect performs face recognition in images'}<br />
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

            <p className="courier lightest-blue pa3 ">
                {'Here is a image to help you get started!'}<br />
                {'https://i.imgur.com/ZINR6jY.jpg'}
            </p>
        </div>
    )
}

export default ImageLinkForm;
