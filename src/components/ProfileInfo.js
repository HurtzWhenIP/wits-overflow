import '../styles/PageInfo.css';

function ProfileInfo({userObj,edit,setEdit}){

    return(
        <div className="infoBox">
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
            <button onClick={(e) => {
                e.preventDefault();
                setEdit(!edit)
            }}
            style={{
                margin: "0.5em 3em",
            }}>Edit Profile</button>
        </div>
    );
}

export default ProfileInfo;