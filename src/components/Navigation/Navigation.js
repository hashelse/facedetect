import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {

        if(isSignedIn){
            return (
            <nav style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim pa2 mr3 b--black-30 shadow-1 black br2 courier ba pointer'>Sign Out</p>
                </nav>
            );
        }else {
            return (
                <nav style={{display:'flex',justifyContent:'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim pa2 mr3 b--black-30 shadow-1 black br2 courier ba pointer'>Sign in</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim pa2 mr3 b--black-30 shadow-1 black br2 courier ba pointer'>Register</p>
                </nav>
            );
            
        }
        
}

export default Navigation;