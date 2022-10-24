import '../styles/PageInfo.css';
import useAxios from '../hooks/useAxios';
import axios from '../apis/ForumServer';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { FcApproval, FcDecision, FcRating, FcPuzzle, FcVip, FcInfo } from 'react-icons/fc';

function ProfileInfo({ visiting, userObj, edit, setEdit }) {

    const [data, setData] = useState(null);
    const [achievements, setAchievements] = useState(null);
    const [info, setInfo] = useState(false);

    const [status, response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: 'GetUserStats.php',
        requestConfig: {
            data: {
                UserID: userObj.UserID,
            }
        }
    });

    const [astatus, aresponse, aerror, aloading, arefetch] = useAxios({
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
        arefetch();
        refetch();
        return () => {
            console.log(visiting ? "Visiting User" : "User Page");
        };
    }, [visiting]);

    useEffect(() => {
        if (astatus === 200) {
            setAchievements(aresponse[0]);
        }
        return (() => {
            console.log(aresponse[0]);
        })
    }, [astatus, aresponse]);

    useEffect(() => {
        if (status === 200) {
            setData(response[0]);
        }
        return () => {
            console.log(response[0]);
        };
    }, [status, response]);

    //Achievements
    //AnswersAsked => Problem Solver
    //QuestionAsked => Enquisitionor
    //AnswerUpVote => Quality Solutions
    //QuestionUpVote => Golden Curiosity
    //UpVotes => POWER USER

    const showInfo = () => {
        setInfo(true);
    }

    const hideInfo = () => {
        setInfo(false);
    }

    return (
        <div className="infoBox">
            {loading && <Loading caption={'Fetching user stats'} />}
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
                    {data && <div className='statsBox'>
                        <h3 style={{ textDecoration: 'underline', margin: "0.35em" }}>User Stats:</h3>
                        <h5>Questions Asked: {data.AskedCount}</h5>
                        <h5>Questions Answered: {data.AnsweredCount}</h5>
                        <h5>Up-votes received: {data.UpVotes}</h5>
                        <h5>Down-votes received: {data.DownVotes}</h5>
                        <h4 className='score'>Score: {data.Score}</h4>
                    </div>}

                </div>
            </div>
            <>
                <h1 style={{margin: '0.35em'}}>{userObj.UserDescription}</h1>
            </>

            {(achievements) && <div className='achievements'>
                <h3 style={{ textDecoration: 'underline', margin: '0', flexGrow: '2' }}><FcInfo
                    onMouseOver={showInfo}
                    onMouseLeave={hideInfo}
                    size={25}
                    className='infoBtn'/> User Achievements: </h3>
                <div className='achievHolder'>
                    {achievements.AnswerAskedAchievement ? <h4 className="achievTxt"><FcApproval size={30} /> Problem Solver</h4> : <p></p>}
                    {achievements.QuestionAskedAchievement ? <h4 className="achievTxt"><FcDecision size={30} /> Enquisitionor</h4> : <p></p>}
                    {achievements.AnswerUpVoteAchievement ? <h4 className="achievTxt"> <FcRating size={30} /> Quality Solutions</h4> : <p></p>}
                    {achievements.QuestionUpVoteAchievement ? <h4 className="achievTxt"> <FcPuzzle size={30} /> Golden Curiosity</h4> : <p></p>}
                    {(achievements.QuestionUpVoteAchievement && achievements.AnswerUpVoteAchievement) ? <h4 className="achievTxt"><FcVip size={30} /> POWER USER</h4> : <p></p>}

                </div>
            </div>}

            {(info === true) &&
                <div className='achievInfoBox'>
                    <h2 style={{textDecoration: 'underline'}}>Achievement Information:</h2>
                    <h4><FcApproval size={40} /> Problem Solver</h4>
                    <p>Awarded for Answering forum questions frequently</p>
                    <h4><FcDecision size={40} /> Enquisitionor</h4>
                    <p>Awarded for Actively posting Questions to the forum</p>
                    <h4> <FcRating size={40} /> Quality Solutions</h4>
                    <p>Achievement awarded for a users, who's posted Answers have a considerable number of UpVotes</p>
                    <h4> <FcPuzzle size={40} /> Golden Curiosity</h4>
                    <p>Achievement awarded for a users, who's posted Question have a considerable number of UpVotes</p>
                    <h4><FcVip size={40} /> POWER USER</h4>
                    <p>Achievement Given top those who have earned both the 'Quality Solutions' & 'Golden Curiosity' Awards</p>
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