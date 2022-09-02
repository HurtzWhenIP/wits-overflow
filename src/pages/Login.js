import '../styles/Login.css'
import { useState,useEffect } from 'react';
import useAxiosFunction from '../hooks/useAxiosFunction';
import hash from '../components/Hash';
import axios from '../apis/ForumServer'
import useStore from '../hooks/useStore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../components/Loading';

function Login(){
    //state to hold sign in data
    const [username,setUsername] = useState('');
    const [pswd,setPswd] = useState('');
    const [errorPrompt, setErrorprompt] = useState(false); //handle error prompt state
    const [errorCaption, setErrorcaption] = useState("Loading...");

    //hook to make request
    const [response, error, loading, axiosFetch] = useAxiosFunction();

    const history = useHistory();

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
            //setPswd(hash(pswd));
        }
        return (true);
    }

    const login = async () => {
        let str = await hash(pswd)
        if(validation()){
            //launch request to signin 
            axiosFetch({
                axiosInstance: axios,
                method: 'POST',
                url: 'login.php',
                requestConfig: {
                    data: {
                        "Email": username,
                        "HashedPassword": str,
                    }
                }
            });
        }
    }

    const setUserobj = useStore((state) => {return(state.setUserobj)});

    //useEffect to detect changes in reply
    useEffect(() => {
        if(response){
            const result = Array.isArray(response) && Array(response);
            if(response && (result.length > 0)){
                if(response[0]){
                    setUserobj(response[0]);
                    history.push('/homepage');
                }  
            }
        }
    }, [response]);

    return(
        <div className="loginBox">
            {loading && <Loading caption={"Attempting Log In"}/>}
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