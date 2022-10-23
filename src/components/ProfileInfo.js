import '../styles/PageInfo.css';
import useAxios from '../hooks/useAxios';
import axios from '../apis/ForumServer';
import { useEffect,useState } from 'react';
import Loading from './Loading';

function ProfileInfo({visiting,userObj,edit,setEdit}){

    const [data,setData] = useState(null);
    const [achievements,setAchievements] = useState(null);

    const [status,response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: 'GetUserStats.php',
        requestConfig: {
            data: {
                UserID: userObj.UserID,
            }
        }
    });

    const [astatus,aresponse, aerror, aloading, arefetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: 'GetAchievements.php',
        requestConfig: {
            data: {
                UserID: userObj.UserID
            }
        }
    });

    useEffect(() => {
        if(astatus === 200){
            setAchievements(aresponse[0]);
        }
        return(() => {
            console.log(aresponse);
        })
    },[astatus,aresponse]);

    useEffect(() => {
        if(status === 200){
            setData(response[0]);
        }
        return () => {
            console.log(response[0]);
        };
    }, [status,response]);

    //Achievements
    //AnswersAsked => Problem Solver
    //QuestionAsked => Enquisitionor
    //AnswerUpVote => Quality Solutions
    //QuestionUpVote => Riddle me this
    //UpVotes => POWER USER

    return(
        <div className="infoBox">
            {loading && <Loading caption={'Fetching user stats'}/>}
            <h1
            style={{
                textDecoration: "underline",
                margin: "0 0 0 0",
                fontSize: "xxx-large",
            }}
            >Profile Information:</h1>
            <div className="infoBox1">
                <div className="profImg"></div>
                <div className='infoBox2'>
                    <h5>{`Name: ${userObj.FirstName} ${userObj.LastName}`}</h5>
                    <h5>{`Email: ${userObj.Email}`}</h5>
                    <div className='achievements'>

                    </div>
                </div>
            </div>
            <>
                    <h1>{userObj.UserDescription}</h1>
            </>

            {data && <div className='statsBox'>
                <h3 style={{textDecoration: 'underline',margin: "0.35em"}}>User Stats:</h3>
                <h5>Questions Asked: {data.AskedCount}</h5>
                <h5>Questions Answered: {data.AnsweredCount}</h5>
                <h5>Up-votes received: {data.UpVotes}</h5>
                <h5>Down-votes received: {data.DownVotes}</h5>
                <h3 className='score'>Score: {data.Score}</h3>
            </div>}

            {!visiting && <button onClick={(e) => {
                e.preventDefault();
                setEdit(!edit)
            }}
            style={{
                margin: "0.5em 3em",
            }}>Edit Profile</button>}
        </div>
    );
}

export default ProfileInfo;