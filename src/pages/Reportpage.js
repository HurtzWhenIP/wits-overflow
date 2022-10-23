import useStore from "../hooks/useStore";
import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'
import { useState, useEffect } from "react";
import '../styles/Reportpage.css';
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import useAxiosFunction from "../hooks/useAxiosFunction";
import axios from '../apis/ForumServer';

function Reportpage() {
    const currPost = useStore(state => state.currPost);
    const isQuestion = currPost.AnswerID ? false : true;
    const reportOptions = ['Vulgarity and Harrasment', 'Non-Relevent post', 'Unauthorised Content','Other'];

    const [topic, setTopic] = useState(null);
    const [desc, setDesc] = useState('');
    const [flag,setFlag] = useState(false);

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    //request for a report
    const [status, response, error, loading, axiosFetch] = useAxiosFunction();

    const handleReport = (e) => {
        e.preventDefault();
        setFlag(false);
        //if a report topic is chosen then send req
        if ((topic !== null) && (topic.length > 0)) {
            //send request for report 
            axiosFetch({
                axiosInstance: axios,
                method: 'POST',
                url: 'MakeReport.php',
                requestConfig: {
                    data: {
                        PostID: isQuestion ? currPost.PostID : currPost.AnswerID,
                        "IsQuestion": isQuestion ? 1 : 0,
                        ReportTopic: topic,
                        ReportComments: desc
                    }
                }
            });
        }
        else{
            setFlag(true);
        }
    }

    //handle request logic
    useEffect(() => {
        if((status === 200)){
            history.goBack();
        }
        return () => {
            console.log((status===200) ? "sending request" : "Request sent")
        };
    }, [response,status]);

    return (
        <div className='rptPage'>
            {(loading && (status!==200)) && <Loading caption={"Hopefully the Moderators take you seriously:)..."} />}
            <h1 style={{ margin: '0' }}>Report Page</h1>
            {flag && <h3 style={{color: 'red'}}>Please ensure a Report Reason is chosen</h3>}
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

            <ComboBox className='cmbBox' placeholder="Choose Report Reason:" highlightColor="rgb(0,120,156)" options={reportOptions} enableAutocomplete onSelect={(e) => { setTopic(e) }} />

            <textarea
                placeholder="If needed Enter an additional Description of the Report..."
                className="descText"
                id="descText"
                cols="30"
                rows="5"
                onChange={(e) => {
                    setDesc(e.target.value);
                }}
            ></textarea>

            <div className='rptBtns'>
                <button className="rptBtn" onClick={goBack}>Discard</button>
                <button className="rptBtn" onClick={handleReport}>Submit</button>
            </div>
        </div>
    );
}

export default Reportpage;