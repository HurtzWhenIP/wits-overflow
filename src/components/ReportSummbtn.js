import { FcHighPriority } from 'react-icons/fc'
import { FaHistory } from 'react-icons/fa';
import '../styles/Reportbtn.css'
import { useHistory } from 'react-router-dom'
import useStore from '../hooks/useStore';

function ReportSummbtn({ post, isQuestion }) {

    const history = useHistory();
    const setCurrpost = useStore(state => state.setCurrpost);

    const handleClick = () => {
        if (post) {
            setCurrpost(post);
            history.push('/reportsummary');
        }
    }

    return (
        <div className='reportBtnBox'>
            {(post.IsUnderReview) ? <span style={{ color: 'red' }} className='reportTxt' onClick={handleClick}> <span><FcHighPriority size={30} className='reportTxt' /></span> Active Reports</span>
                : <span className='reportTxt' onClick={handleClick}> <span><FaHistory size={25} className='reportTxt' /></span> Reports Overview</span>}
        </div>
    )
}

export default ReportSummbtn;