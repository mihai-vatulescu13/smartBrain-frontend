import React from 'react';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import './App.css';


const particlesOptions={
  //to chande properties look to official site(react particles js -> properties)
   particles: {
     number:{
       value:80,
       density:{
         enable:true,
         value_area:800
       }
     }
   }
}


const initialState={
  input:'',
     imageUrl:'',
     box:{},
     //default route page(signin appear first)
     route:'signin',
     isSignedIn:false,
     //create an user profile object
     user:{
      id:'',
      name:'',
      email:'',
      entries:0,
      joined: ''
    }
}

class App extends React.Component{
  
  constructor(){
   super()
   this.state = initialState
   
  }

  //update the user that we recived
  loadUser = (data) =>{
   this.setState({user:{
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
   }})
  }

  //create a method(property of the app)(and pass as prop to ImageLinkForm):
  onInputChange = (event) =>{
    this.setState({input:event.target.value})
    // console.log(event.target.value)
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width,height)
    // console.log('clarifai face',clarifaiFace)
    //calculate percentages for all sides and return an object:
    return {
     leftCol: clarifaiFace.left_col * width,
     rightCol: width - (clarifaiFace.right_col * width),
     topRow: clarifaiFace.top_row * height,
     bottomRow: height - (clarifaiFace.bottom_row * height)

    }
  } 

  displayFaceBox = (box) =>{
    // console.log(box)
     this.setState({box:box})
  }

   
  onButtonSubmit = () =>{
   //modify the state 
   this.setState({imageUrl:this.state.input})

   // COLOR_MODEL -> TO RECOGNIZE COLORS (request to clarifai api with model and an given image)
   fetch('https://shielded-bastion-73314.herokuapp.com/imageUrl',{
    method:'post',
    headers: {'Content-type' : 'application/json'},
    body: JSON.stringify({
     input: this.state.input
    })
   })
   .then(response =>response.json())
   .then(response => {
      if(response){
        fetch('https://shielded-bastion-73314.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
     })  //calculateFaceLocation() represents an object
    .catch(error => console.log(error))
  }


  //method that modify the route
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({initialState})
    }else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  render(){
    //destructuring the state object:
    const {isSignedIn ,route ,imageUrl, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
                   params={particlesOptions}
        />
        {/* create our components: */}
        <Navigation isSignedIn={isSignedIn} 
                    onRouteChange={this.onRouteChange} 
        />
        { (route === 'home') ?
          <div>
            <Logo/>
            <Rank //pass the properties to the component
             name={this.state.user.name}
             entries={this.state.user.entries}
            />
            <ImageLinkForm onInputChange={this.onInputChange}
                            onSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl}
                             box={box}
            /> 
          </div> 
          : ((route === 'signin') ? 
          <SignIn onRouteChange={this.onRouteChange}
                  loadUser={this.loadUser}
          /> 
          : <Register onRouteChange={this.onRouteChange}
                      loadUser={this.loadUser}
          />)
      
        }
      </div>
    )
  }
}

export default App;
