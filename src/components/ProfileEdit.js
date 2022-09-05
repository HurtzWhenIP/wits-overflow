
function ProfileEdit({userObj,edit,setEdit}){

    return(
        <>
            <h1>ProfileEdit</h1>
            <button onClick={(e) => {
                e.preventDefault();
                setEdit(!edit)
            }}>Save!</button>
        </>
    );
}

export default ProfileEdit;