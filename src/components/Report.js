import { FcHighPriority } from 'react-icons/fc';
import {GrAlert} from 'react-icons/gr';

function Report({ report }) {

    return (
        <div className='rptEntry'>
            <div className='rptIcon'>
                {!report.IsReviewed ? <FcHighPriority size={30}/> : <GrAlert size={30}/> }
            </div>
            <div className={report.IsReviewed ? 'rptInfo' : 'rptInfo2'}>
                <h4>{report.Topic}</h4>
                <p>{report.Comments}</p>
                <span>{report.DateCreated}</span>
            </div>
        </div>
    );
}

export default Report;