import '../styles/User.css'
import { useHistory } from 'react-router-dom';
import useStore from '../hooks/useStore';

function User({user}){

    const history = useHistory();

    const setUserobjexplore = useStore(state => state.setUserobjexplore);

    const handleClick = () => {
        setUserobjexplore(user);
        history.push('profile');
    }

    return(
        <div className='userBox' onClick={handleClick}>
            <h2>{user.FirstName} {user.LastName}</h2>
            <h3>{user.Email}</h3>
            <h4>{user.UserDescription}</h4>
        </div>
    );
}

export default User;