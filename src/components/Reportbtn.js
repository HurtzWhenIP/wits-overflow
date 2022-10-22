import { FcHighPriority } from 'react-icons/fc'
import '../styles/Reportbtn.css'
import { useHistory } from 'react-router-dom'
import useStore from '../hooks/useStore';

function Reportbtn({ post , isQuestion}) {

    const history = useHistory();
    const setCurrpost = useStore(state => state.setCurrpost);

    const handleClick = () => {
        if (post) {
            setCurrpost(post);
            history.push('/reportpage');
        }
    }

    return (
        <div className='reportBtnBox'>
            <span className='reportTxt' onClick={handleClick}> <span><FcHighPriority size={30} className='reportTxt' /></span> Report</span>
        </div>
    )
}

export default Reportbtn;