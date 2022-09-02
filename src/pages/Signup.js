import '../styles/Signup.css'
import { useState } from 'react';
import useAxiosFunction from '../hooks/useAxiosFunction';
import Loading from '../components/Loading'
import axios from '../apis/ForumServer'
import hash from '../components/Hash'


function Signup(){
    //state to hold registration info
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [pswd,setPswd] = useState('');
    const [errorPrompt, setErrorprompt] = useState(false); //handle error prompt state
    const [errorCaption, setErrorcaption] = useState("Loading...");

      //functions to vaidate data fields
      const emailValidation = () => {
        //eslint-disable-next-line
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(email)) {
            setErrorcaption('Invalid Email Address');
            setErrorprompt(true);
            setEmail("");
            return (false);
        } else {
            return (true);
        }
    }

    const namesValidation = () => {
        if (!fname) {
            setErrorcaption('Invalid First Name');
            setErrorprompt(true);
            return (false);
        }
        if (!lname) {
            setErrorcaption('Invalid Last Name');
            setErrorprompt(true);
            return (false);
        }
        if (!pswd) {
            setErrorcaption('Invalid Username');
            setErrorprompt(true);
            return (false);
        }
        else{
            //hash password
            setPswd(hash(pswd));
        }
        return (true);
    }


    return(
        <div className="SignupBox">
            <div className="witsLogo"></div>
            <h1>Create an account with Wits-Overflow</h1>

            <form className="SignUpForm">
                <div className="grid-container">
                    <div className="group">
                        <input className="input" type="text" required onChange={(e) => setFname(e.target.value)}/>  
                        <span className="bar"></span>
                        <label className='label'>First name</label>
                    </div>

                    <div class="group">      
                        <input className="input" type="text" required
                        onChange={(e) => setLname(e.target.value)}/>
                        
                        <span className="bar"></span>
                        <label className='label'>Last name</label>
                    </div>

                    <div class="group">      
                        <input className="input" type="text" required
                        onChange={(e) => setEmail(e.target.value)}/>
                        
                        <span className="bar"></span>
                        <label className='label'>Email</label>
                    </div>

                    <div class="group">      
                        <input className="input" type="password" required
                        onChange={(e) => setPswd(e.target.value)}/>
                        
                        <span className="bar"></span>
                        <label className='label'>Password</label>
                    </div>
                </div>
            </form>
            <button className='loginBtn'>Sign Up</button>

        </div>
    )
}

export default Signup;