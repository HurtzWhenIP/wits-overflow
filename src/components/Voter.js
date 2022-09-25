import '../styles/Voter.css';
import useAxiosFunction from '../hooks/useAxiosFunction';
import { useState,useEffect } from 'react';
import Loading from './Loading';
import axios from '../apis/ForumServer';
import useStore from '../hooks/useStore';

function Voter({post,isQuestion}){

    const [indicator,setIndicator] = useState(null);
    const [timer,setTimer] = useState(true);

    const [status,response,error,loading,axiosFunction] = useAxiosFunction();

    const userObj = useStore(state => state.userObj);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleClick = async (vote) => {
        if(timer){
            
            axiosFunction({
                axiosInstance: axios,
                method: 'POST',
                url: 'makeVote.php',
                requestConfig: {
                    data: {
                        UserID: userObj.UserID,
                        PostID: isQuestion ? post.PostID : post.AnswerID,
                        IsQuestion: isQuestion ? 1 : 0,
                        Vote: vote ? 1 : -1
                    }
                }
            });
        }

        setTimer(false);
        await delay(3000);
        setTimer(true);
    }

    useEffect(() => {
        if(status === 200){
            // window.location.reload(false);
        }
        return () => {
            console.log(`Voted: ${indicator}`);
        };
    }, [status,response,indicator]);

    return(
        <div className="voterBox">
            {loading && <Loading caption="Sending Vote"/>}
            <div className='voteupButton voteButton' onClick={() => {
                setIndicator(true);
                handleClick(true);
            }}></div>
            <div className='votedownButton voteButton' onClick={() => {
                setIndicator(false);
                handleClick(false);
            }}></div>
        </div>
    )

}

export default Voter;