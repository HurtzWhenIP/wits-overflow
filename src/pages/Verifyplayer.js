import '../styles/verifyPlayer.css';
import React from 'react';
import {useHistory} from 'react-router-dom'

function Verifyplayer() {

    const history = useHistory();

    const signIn = () => {
        history.push('/login');
    }

    const signUp = () => {
        history.push('signup');
    }

    return (
        <div className="verificationBox">
            <div className="titleBox">
                <div className="witsLogo"></div>
                <h1 className="title">Wits-Overflow</h1>
            </div>
            <h3 className="slogan">Slogan</h3>
            <div className="descriptionBox">
            <div className="witsKudu"></div>
                <p>
Lorem ipsum dolor sit amet, ctae eros tempus, quis consectetur quam tincidunt. Nulla aliquam velit eu cursus molestie. Nulla facilisi. Mauris consequat risus id purus scelerisque varius. Aenean ut purus ut metus fringilla rhoncus. Suspendisse vel porttitor ipsum, ac euismod mi. Duis et arcu ut purus convallis posuere ut in orci. Sed vel risus eu risus semper tincidunt. Maecenas feugiat ornare lectus, non tempor neque pretium a. </p>
                <div className="witsKudu2"></div>
            </div>
            <div className="btnBox">
                <button onClick={signIn}>
                    Sign In
                </button>
                <button onClick={signUp}>
                    Sign Up
                </button>

            </div>
            
        </div>
    )
}

export default Verifyplayer;