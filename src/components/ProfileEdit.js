import { useState,useEffect } from "react";
import useAxiosFunction from "../hooks/useAxiosFunction";
import axios from '../apis/ForumServer';
import '../styles/ProfileEdit.css';
import Loading from './Loading';

function ProfileEdit({userObj,edit,setEdit}){

    const [userDesc,setUserdesc] = useState('');

    const [status,response, error, loading, axiosFetch] = useAxiosFunction();

    //attempt to update profile
    const editProfile = () => {
        axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: "updateUser.php",
            requestConfig: {
                data: {
                    UserID: userObj.USerID,
                    HashedPassword: userObj.HashedPassword,
                    FirstName: userObj.FirstName,
                    LastName: userObj.LastName,
                    UserDescription: userDesc,
                }
            }
        });
    }

    //detect changes in response 
    useEffect(() => {
        if(status === 200){
            userObj.UserDescription = userDesc;
            setEdit(!edit);
        }
    }, [response]);

    return(
        <div className="profileEditBox">
            {loading && <Loading caption={"Updating User Profile."}/>}
            <h3 className="editTextBlock">{`First Name: ${userObj.FirstName}`}</h3>
            <h3 className="editTextBlock">{`Last Name: ${userObj.LastName}`}</h3>
            <h3 className="editTextBlock">{`Username/Email: ${userObj.Email}`}</h3>
            <div className="userDesc profileEditText">
                    <textarea placeholder='Enter short user description' 
                    className="descText" id="descText" cols="25" rows="2"
                    onChange={(e) => {setUserdesc(e.target.value)}}>
                        {userObj.UserDescription}
                    </textarea>
            </div>
            <button className="profileEditBtn" onClick={(e) => {
                e.preventDefault();
                editProfile();
            }}>Save!</button>
        </div>
    );
}

export default ProfileEdit;