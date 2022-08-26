import '../styles/verifyPlayer.css';
import React from 'react';
import {useHistory} from 'react-router-dom'
import { useState } from 'react';

function Verifyplayer() {

    const history = useHistory();

    const [flag,setFlag] = useState(true);

    const timeout = setTimeout(() => {
        setFlag(!flag);
    },2500);

    const signIn = () => {
        clearTimeout(timeout);
        history.push('/login');
    }

    const signUp = () => {
        clearTimeout(timeout);
        history.push('signup');
    }

    return (
        <div className="verificationBox">
            <div className="titleBox">
                <div className="witsLogo"></div>
                <h1 className="title">Wits-Overflow</h1>
            </div>
            {flag ? <h3 className="questions">Questons? Yes.</h3> : <h3 className="answers">Answers? Maybe...</h3>}
            <div className="descriptionBox">
                <div className="witsKudu"></div>
                    <ul className="desc">
                        <span className="descSpan">
                        Welcome to Wits-Overflow, an online discussion forum for 
                        the Wits CSAM community.
                        </span>
                    </ul>
                <div className="witsKudu2"></div>
            </div>
            <div className="btnBox">
                <div className="btnDiv">
                    <button onClick={signIn}>
                        <strong>Sign In</strong>
                    </button>
                    <span className="btnSpan">Already have an Account.</span>
                </div>
                <div className="btnDiv">
                    <button onClick={signUp}> 
                        <strong>Sign Up</strong>
                    </button>
                    <span className="btnSpan">Need a new Account?</span>
                </div>

            </div>
            
        </div>
    )
}

export default Verifyplayer;