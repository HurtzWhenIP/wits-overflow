import '../styles/Profile.css';
import useStore from '../hooks/useStore';
import useAxios from '../hooks/useAxios';
import Questions from '../components/Questions';
import axios from '../apis/ForumServer';
import Loading from '../components/Loading';
import { useState,useEffect } from 'react';
import ProfileEdit from '../components/ProfileEdit';
import ProfileInfo from '../components/ProfileInfo';

function Profile(){
    //state of component
    const [data,setData] = useState([]);
    const [edit,setEdit] = useState(false);

    //pulluser object from store
    const userObjExplore = useStore((state) => {return(state.userObjExplore)});
    const userObjSelf = useStore((state) => {return(state.userObj)});
    //current user object to use
    const userObj = (userObjExplore === null) ? userObjSelf : userObjExplore;


    //request users question
    const [status,response,error,loading,refetch] = useAxios({
        axiosInstance: axios,
        method: "POST",
        url: 'getUserQuestions.php',
        requestConfig: {
            data: {
                "UserID": userObj.UserID,
            }
        }
    });

    //pay attention to response
    useEffect(() => {
        if(status === 200){
            setData(Array(response));
        }

        return(() => {console.log(Array(response))});
    }, [response]);

    useEffect(() => {
        if(userObjExplore === null){
            refetch();
        }
    }, [userObj,userObjExplore]);

    return(
        <div className='profileBkg'>
            {loading && <Loading caption={"Validating Credentials..."}/>}
            <div className='profileBox userDetails'>
                
                {edit ? 
                <ProfileEdit userObj={userObj} edit={edit} setEdit={setEdit}/> : 
                <ProfileInfo visiting={false} userObj={userObj} edit={edit} setEdit={setEdit}/>}
            </div>

            <div className='profileBox userQuestions'>
                <h1 style={{borderBottom: "1px solid black",
                    paddingBottom: "0.3em",
                    fontSize: "2.5rem",
                }}>Your Questions:</h1>
                <Questions data={data}/>
            </div>
        </div>
    )
}

export default Profile;