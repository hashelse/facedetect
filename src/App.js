import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';


const app = new Clarifai.App({
  apiKey: 'eef8f175ea6c4f259bdc9f230e44592a'
});


const particlesOptions = {
  particles: {
    number: {
      value:65,
      density: {
        enable: true,
        value_area: 800
      },
      color:'#32678c',



    }
}}
class App extends Component {
  constructor (){
    super();
    this.state = {
      input : "",
      imageUrl : "",
      box: "",
      route: "signin",
      isSignedIn: false,
      user:{
        id: '',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
        leftCol:clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height ,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height) 
    }
        
  } 

  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  onButtonSubmit = () => {
  this.setState({imageUrl:this.state.input});  
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      if (response){
        fetch('https://mighty-fjord-55698.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        }).then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries : count}))
          })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))}
    )
    .catch(err => console.log(err));

  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route : route})
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        <Particles className="particles" params={particlesOptions} />

        {
        this.state.route === 'home' 
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/> 


            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>     <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div> 
        : (route === 'signin') ?
        <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
        <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
        
      
        }
      </div>
    );
  }
}

export default App;
