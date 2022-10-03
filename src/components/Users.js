import '../styles/Users.css'
import User from './User';

function Users({users}){

    return(
        <>
            <div className='Usersbox'>
                {users.map(user => <User user={user} key={user.UserID}/>)}
            </div>
        </>
    );
}

export default Users;