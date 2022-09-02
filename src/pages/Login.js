import '../styles/Login.css'
import { useState,useEffect } from 'react';
import useAxiosFunction from '../hooks/useAxiosFunction';
import hash from '../components/Hash';
import axios from '../apis/ForumServer'

function Login(){
    //state to hold sign in data
    const [username,setUsername] = useState('');
    const [pswd,setPswd] = useState('');
    const [errorPrompt, setErrorprompt] = useState(false); //handle error prompt state
    const [errorCaption, setErrorcaption] = useState("Loading...");

    //hook to make request
    const [response, error, loading, axiosFetch] = useAxiosFunction();

    //functons to validate sign up
    const validation = () => {
        if (!username) {
            setErrorcaption('Invalid Username');
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

    const login = () => {
        if(validation()){
            //launch request to signin 
            axiosFetch({
                axiosInstance: axios,
                method: 'POST',
                url: 'login.php',
                requestConfig: {
                    data: {
                        "Email": username,
                        "HashedPassword": pswd,
                    }
                }
            });
        }
    }

    //useEffect to detect changes in reply
    useEffect(() => {
        const result = Array.isArray(response);
        if(response && (result.length > 0)){
            console.log(result);
            
        }
    }, [response]);

    return(
        <div className="loginBox">
            <div className="witsLogo"></div>
            <h1>Wits-Overflow Login</h1>
            <form className='form'>
                <div className="group">      
                    <input className="input" type="text" required
                    onChange={(e) => {setUsername(e.target.value)}}/>
                    
                    <span className="bar"></span>
                    <label className='label'>Username</label>
                </div>
                
                <div className="group">      
                    <input className="input" type="password" required
                    onChange={(e) => {setPswd(e.target.value)}}/>
                    
                    <span className="bar"></span>
                    <label className='label'>Password</label>
                </div>
            </form>
            <button className='loginBtn' onClick={login}>Login</button>
        </div>
    );
}

export default Login;