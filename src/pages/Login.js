import '../styles/Login.css'

function Login(){
    return(
        <div className="loginBox">
            <div className="witsLogo"></div>
            <h1>Wits-Overflow Login</h1>
            <form className='form'>
                <div class="group">      
                    <input className="input" type="text" required/>
                    
                    <span className="bar"></span>
                    <label className='label'>Username</label>
                </div>
                
                <div class="group">      
                    <input className="input" type="password" required/>
                    
                    <span className="bar"></span>
                    <label className='label'>Password</label>
                </div>
            </form>
            <button className='loginBtn'>Login</button>
        </div>
    );
}

export default Login;