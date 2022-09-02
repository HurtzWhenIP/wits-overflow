import '../styles/Signup.css'
import { useState,useEffect } from 'react';
import useAxiosFunction from '../hooks/useAxiosFunction';
import Loading from '../components/Loading'
import axios from '../apis/ForumServer'
import hash from '../components/Hash'
import useStore from '../hooks/useStore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


function Signup(){
    //TODO validate user for sign up then register user
    //state to hold registration info
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [pswd,setPswd] = useState('');
    const [errorPrompt, setErrorprompt] = useState(false); //handle error prompt state
    const [errorCaption, setErrorcaption] = useState("Loading...");
    const [register,setRegister] = useState(false);

      //functions to vaidate data fields
      const emailValidation = () => {
        //eslint-disable-next-line
        //TODO find regex for wits email
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
            setErrorcaption('Invalid Password');
            setErrorprompt(true);
            return (false);
        }
        else{
            //hash password
            setPswd(hash(pswd));
        }
        return (true);
    }

    //check if user is valid
    const [response,error,loading,axiosFetch] = useAxiosFunction();

    const setUserobj = useStore(state => {return(state.setUserobj)});

    const checkUser = () => {
        if(namesValidation() && emailValidation()){
            setRegister(false);
            axiosFetch({
                axiosInstance: axios,
                method: "POST",
                url: "validateUser.php",
                requestConfig: {
                    "Email": email
                }
            });
        }
    }

    const registerUser = () => {
        //at this point user is ready to be registered
        axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: "register.php",
            requestConfig: {
                "FirstName": fname,
		        "LastName": lname,
		        "Email": email,
		        "HashedPassword": pswd
            }
        })
    }

    useEffect(() => {
       if(register){
        //check if user is registered 
        if(response){
            const result = JSON.parse(response);
            if(result){
                setUserobj(result);
            }
        }
       }
       else{
        //check response of username validation
        const result = Array.isArray(response);
        if(response && (result.length === 0)){
            // this means that user is not in db
            console.log("Attempting to register user");
            setRegister(true);
            registerUser();
        }
       }
    }, [response]);

    return(
        <div className="SignupBox">
            <div className="witsLogo"></div>
            <h1>Create an account with Wits-Overflow</h1>
            {errorPrompt && <h3 style={{color: "red"}}>{errorCaption}</h3>}

            <form className="SignUpForm">
                <div className="grid-container">
                    <div className="group">
                        <input className="input" type="text" required onChange={(e) => setFname(e.target.value)}/>  
                        <span className="bar"></span>
                        <label className='label'>First name</label>
                    </div>

                    <div className="group">      
                        <input className="input" type="text" required
                        onChange={(e) => setLname(e.target.value)}/>
                        
                        <span className="bar"></span>
                        <label className='label'>Last name</label>
                    </div>

                    <div className="group">      
                        <input className="input" type="text" required
                        onChange={(e) => setEmail(e.target.value)}/>
                        
                        <span className="bar"></span>
                        <label className='label'>Email</label>
                    </div>

                    <div className="group">      
                        <input className="input" type="password" required
                        onChange={(e) => setPswd(e.target.value)}/>
                        
                        <span className="bar"></span>
                        <label className='label'>Password</label>
                    </div>
                </div>
            </form>
            <button className='loginBtn' onClick={checkUser}>Sign Up</button>

        </div>
    )
}

export default Signup;