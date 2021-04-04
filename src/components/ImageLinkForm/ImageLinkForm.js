import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({tags,onInputChange,onButtonSubmit}) => {
    return (
        <div className="ma0 mt0">
            <p className="br4 f3 courier white shadow-2 b--dashed b--white-10 pa4 ">
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
                {'https://i.imgur.com/ZINR6jY.jpg'}<br />
            </p>
	    {(tags.length !== 0)?
	    <div className="br4 b--dashed shadow-1 b--white-20">
	    <p className="courier gold">Predictions:</p>
	    <p className="courier">{tags[0]}</p>
	    <p className="courier">{tags[1]}</p>
	    <p className="courier">{tags[2]}</p>
	    </div>:<div></div>
	    }

        <div>
            <a href="https://nidhishdb.github.io/currency/" className="f6 link 
            dim br-pill ph3 pv2 mb2 dib white bg-dark-blue">
                Currency Detection</a>
            
            
        </div>

        </div>
	    
    )
}

export default ImageLinkForm;
