import React from 'react'

//smart component
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state={
     email:'',
     password:'',
     name:'',
    }
  }

  onEmailChange = (event) =>{
    this.setState({email:event.target.value})
  }

  onPasswordChange = (event) =>{
    this.setState({password:event.target.value})
  }

  onNameChange = (event) =>{
    this.setState({name:event.target.value})
  } 
 
  //in this method we send data to the server
  onClickRegister = () =>{
    fetch('https://shielded-bastion-73314.herokuapp.com/register',{
     method: 'post',
     headers: {'Content-type':'application/json'},
     body: JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,

     })
    })
    .then(respone => respone.json())
    .then(user => {
        if(user.id){
         this.props.loadUser(user)
         this.props.onRouteChange('home')
        }
    })
  }

  render(){
   
    return(
        <div>
          <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">  
            <main className="pa4 black-80">
                <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                             className="b pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100" 
                             type="text" 
                             name="name"  
                             id="name"
                             onChange={this.onNameChange}
                             />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                             className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100" 
                             type="email" 
                             name="email-address"  
                             id="email-address"
                             onChange={this.onEmailChange}
                             />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                             className="b pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100"
                             type="password"
                             name="password"  
                             id="password"
                             onChange={this.onPasswordChange}
                             />
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                         type="submit"
                         //button name  
                         value="Register"
                         onClick={this.onClickRegister}
                         />
                    </div>
                </div>
            </main>
          </article> 
        </div>
    )
  }
}

export default Register;