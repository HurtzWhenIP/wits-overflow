import '../styles/PageInfo.css';
import useAxios from '../hooks/useAxios';
import axios from '../apis/ForumServer';
import { useEffect,useState } from 'react';
import Loading from './Loading';

function ProfileInfo({visiting,userObj,edit,setEdit}){

    const [data,setData] = useState(null);

    const [status,response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: 'getUserStats.php',
        requestConfig: {
            data: {
                UserID: userObj.UserID,
            }
        }
    });

    useEffect(() => {
        if(status === 200){
            setData(response);
        }
        return () => {
            console.log(response[0]);
        };
    }, [status,response]);

    return(
        <div className="infoBox">
            {loading && <Loading caption={'Fetching user stats'}/>}
            <h1
            style={{
                textDecoration: "underline",
                margin: "0.2em 0 0.5em 0",
                fontSize: "xxx-large",
            }}
            >Profile Information:</h1>
            <div className="infoBox1">
                <div className="profImg"></div>
                <div className='infoBox2'>
                    <h2
                    style={{
                        margin: "1.8em 0.2em"
                    }}
                    >{`Name: ${userObj.FirstName} ${userObj.LastName}`}</h2>
                    <h4>{`Email: ${userObj.Email}`}</h4>
                </div>
            </div>
            <>
                    <h1>{userObj.UserDescription}</h1>
            </>

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