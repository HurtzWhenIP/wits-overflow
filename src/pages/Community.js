import '../styles/Community.css';
import { useState, useEffect} from 'react';
import Loading from '../components/Loading';
import useAxios from '../hooks/useAxios';
import useAxiosFunction from '../hooks/useAxiosFunction';
import axios from '../apis/ForumServer';
import Users from '../components/Users';

function Community() {

    const [search,setSearch] = useState('');
    const [users,setUsers] = useState(null);

    const [status,response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: 'getUsers.php'
    });

    useEffect(() => {
        if(status === 200){
            setUsers(response);
        }
        return () => {
            console.log(response);
        };
    }, [status,response]);

    const [fstatus,fresponse,ferror,floading,fetch] = useAxiosFunction();

    const handleClick = (e) => {
        e.preventDefault();
        fetch({
            axiosInstance: axios,
            method: 'POST',
            url: 'searchUsers.php',
            requestConfig: {
                data: {
                    Username: search,
                }
            }
        });
    }

    useEffect(() => {
        if(fstatus === 200){
            setUsers(fresponse);
        }
        return () => {
            console.log(fresponse);
        };
    }, [fstatus,fresponse]);

    return (
        <>
        {loading && <Loading caption={'Fetching User Profiles...'}/>}
        {floading && <Loading caption={'Fetching User Profiles...'}/>}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <div className='communityBox'>
                <div className="searchbar">
                    <input  onChange={(e) => {setSearch(e.target.value)}} type="text" className="searchbar__input" name="q" placeholder="Search Users"/>
                        <button type="submit" className="searchbar__button" onClick={handleClick}>
                            <i className="material-icons">search</i>
                        </button>
                </div>

                {users && (users.length === 0) && <h2 style={{color: 'red'}}>No Matching Users</h2>}
                {users && <Users users={users}/>}
            </div>
        </>
    );
}

export default Community;