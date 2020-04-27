import React from 'react'

//signin will be a smart component
class SignIn extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        signInEmail:'',
        signInPassword:'' 
      }
    }

    //create onChange method for email:
    onEmailChange = (event) =>{
     this.setState({signInEmail:event.target.value});
    }

    //create onChange method for email:
    onPasswordChange = (event) =>{
        this.setState({signInPassword:event.target.value});
    }

    //submit button connect to database
    onSubmitSignin = () =>{
     //fetch by default gets a GET request   
     fetch('https://shielded-bastion-73314.herokuapp.com/signin',{   
      method:'post',//set request method type to post
      headers: {'Content-type':'application/json'},
      //this object(that contains entered data) will be convert to json 
      body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
      })
     })
     .then(response => response.json())
     .then(user => {
       //check the data that we recive from server
       if(user.id){
        //for routing (to use props in SignIn class methods we must declare in constructor props parameter)
        this.props.loadUser(user)
        this.props.onRouteChange('home')//this method is from outside
       }
     })  
    }

    render(){
        //component props passed form app
        const {onRouteChange} = this.props;
        return(
            <div>
              <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">  
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                 className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100"
                                 type="email" name="email-address"
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
                             value="Sign in"
                             onClick={this.onSubmitSignin}
                             />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
              </article> 
            </div>
        )
    }
}

export default SignIn;