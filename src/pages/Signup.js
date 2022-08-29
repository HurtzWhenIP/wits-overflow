import '../styles/Signup.css'


function Signup(){
    return(
        <div className="SignupBox">
            <div className="witsLogo"></div>
            <h1>Create an account with Wits-Overflow</h1>

            <form className="SignUpForm">
                <div className="grid-container">
                    <div className="group">
                        <input className="input" type="text" required/>  
                        <span className="bar"></span>
                        <label className='label'>First name</label>
                    </div>

                    <div class="group">      
                        <input className="input" type="text" required/>
                        
                        <span className="bar"></span>
                        <label className='label'>Last name</label>
                    </div>

                    <div class="group">      
                        <input className="input" type="text" required/>
                        
                        <span className="bar"></span>
                        <label className='label'>Email</label>
                    </div>

                    <div class="group">      
                        <input className="input" type="password" required/>
                        
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