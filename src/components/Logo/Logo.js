import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import face from './face.png'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt shadow-2" options={{ max : 55 }} style={{ height: 90, width: 100 }} >
            <div className="Tilt-inner pa3">
                <img src={face} style={{paddingTop:'9x'}} alt="brainlogo" /> </div>
            </Tilt>
        </div>
    )
}

export default Logo;