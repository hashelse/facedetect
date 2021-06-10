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

const newapp = new Clarifai.App({
  apiKey: '3e979f3355a1424280e2a695ceee668e'
});

const particlesOptions = {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
    }

class App extends Component {
  constructor (){
    super();
    this.state = {
      input : "",
      imageUrl : "",
      box: "",
      route: "signin",
      isSignedIn: false,
      tags: [] ,
      user:{
        id: '',
        name:'',
        email:'',
        entries:0,
        joined:''
      },
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
 
  getTags = (res) => {
   //console.log(res)
   const tags = [];
   tags[0] = res.outputs[0].data.concepts[0].name; //todo
   tags[1] = res.outputs[0].data.concepts[1].name; //todo
   tags[2] = res.outputs[0].data.concepts[2].name; //todo
   tags[3] = res.outputs[0].data.concepts[3].name; //todo
   tags[4] = res.outputs[0].data.concepts[4].name; //todo
   tags[5] = res.outputs[0].data.concepts[5].name; //todo

   this.setState({tags:tags});

	  //console.log(tags)
  }

  onButtonSubmit = () => {
  this.setState({imageUrl:this.state.input});  
    newapp.models.predict(Clarifai.GENERAL_MODEL,this.state.input)
    .then(res => {
	    this.getTags(res)
    })
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


            <ImageLinkForm tags={this.state.tags} onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>     <FaceRecognition  box={box} imageUrl={imageUrl}/>
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
