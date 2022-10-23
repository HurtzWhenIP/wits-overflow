import useStore from "../hooks/useStore";
import '../styles/Reportsummary.css';
import useAxios from '../hooks/useAxios';
import useAxiosFunction from '../hooks/useAxiosFunction';
import axios from '../apis/ForumServer';
import { useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import Loading from '../components/Loading';
import Report from "../components/Report";

function Reportsummary() {
    const currPost = useStore(state => state.currPost);
    const isQuestion = currPost.AnswerID ? false : true;

    const history = useHistory();

    const [status, response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: 'GetReportSummary.php',
        requestConfig: {
            data: {
                AnswerID: currPost.AnswerID
            }
        }
    });

    const [reports,setReports] = useState(null);

    useEffect(() => {
        if ((status === 200) && response) {
            console.log(response);
            setReports(response);
        }
        return () => {
            console.log((status === 200) ? "retreived reports" : "Fetching reports");
        };
    }, [status, response]);

    const [fstatus, fresponse, ferror, floading, axiosFetch] = useAxiosFunction();

    const deleteQuestion = (e) => {
        e.preventDefault();
        axiosFetch({
            axiosInstance: axios,
            method: 'POST',
            url: 'DeleteAnswer.php',
            requestConfig: {
                data: {
                    AnswerID: currPost.AnswerID
                }
            }
        });
    };

    const deactivateReports = (e) => {
        e.preventDefault();
        //ignore reprts for questions
        axiosFetch({
            axiosInstance: axios,
            method: 'POST',
            url: 'IgnoreReports.php',
            requestConfig: {
                data: {
                    AnswerID: currPost.AnswerID,
                }
            }
        });
    };

    useEffect(() => {
        if(fstatus === 200){
            history.goBack();
        }
        return () => {
            console.log((fstatus === 200) ? "Trying to moderate question" : "Moderated Question");
        };
    }, [fstatus,fresponse]);

    return (
        <div className='reportSumm'>
            {loading && <Loading caption={"Fetching Report Summary..."} />}
            {floading && <Loading caption={"Moderating Answer..."} />}
            <h2>Reports Overview</h2>
            <div className='rptContent'>
                <h3>{isQuestion ? "Question " : "Answer "} Content:</h3>
                <p>{currPost.PostContent}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id
                    est turpis. Etiam ullamcorper elit porta, aliquet massa pretium,
                    porta nisl. Nulla efficitur diam nisl, et tempus leo euismod nec.</p>

                <div className="voteCounter">
                    <span style={{ color: 'green', margin: " 0 2em" }}>Upvotes: {currPost.UpVotes}</span>
                    <span style={{ color: 'red', margin: "0 2em" }}>Downvotes: {currPost.DownVotes}</span>
                </div>

                <div className="postUserInfo">
                    <span>Posted By:</span>
                    <h4 style={{ margin: '0' }}>{currPost.FirstName} {currPost.LastName}</h4>
                </div>
            </div>
            <h2 style={{margin: '0'}}>Reports:</h2>

            <div className='reportBox'>
                {(reports !== null) && reports.map((report) => {
                    return(<Report report={report}/>);
                    })}
            </div>

            <div className='reportBtns'>
                <button className="rptBtn" onClick={deleteQuestion}>Delete Answer</button>
                <button className="rptBtn" onClick={deactivateReports}>Deactivate Reports</button>
            </div>
        </div>
    );
}

export default Reportsummary;