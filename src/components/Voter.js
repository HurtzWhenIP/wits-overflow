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
    const setQuestion = useStore(state => state.setQuestion);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleClick = async (vote) => {
        if(timer){
            
            axiosFunction({
                axiosInstance: axios,
                method: 'POST',
                url: 'MakeVote.php',
                requestConfig: {
                    data: {
                        UserID: userObj.UserID,
                        PostID: isQuestion ? post.PostID : post.AnswerID,
                        IsQuestion: isQuestion ? 1 : 0,
                        Vote: vote ? 1 : 0
                    }
                }
            });
            
            await delay(1500);

            if(isQuestion){
                //Refresh Global stored main question
                axiosFunction({
                    axiosInstance: axios,
                    method: 'POST',
                    url: 'GetSingleQuestion.php',
                    requestConfig: {
                        data: {
                            PostID: post.PostID
                        }
                    }
                })
            }
        }

        setTimer(false);
        await delay(3000);
        setTimer(true);
    }

    useEffect(() => {
        if(status === 200){
            if(!isQuestion){
                window.location.reload(false);
            }else{
                try {
                    if(response[0].PostID){
                        console.log(response[0]);
                        setQuestion(response[0]);
                        // window.location.reload(false);
                    }
                } catch (error) {
                    console.log("Unable to refresh question");
                }
            }
        }
        return () => {
            console.log(`Voted: ${indicator}`);
        };
    }, [status, response, indicator, isQuestion, setQuestion]);

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