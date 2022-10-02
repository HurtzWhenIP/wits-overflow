import "../styles/Answer.css";
import Voter from "./Voter";
import Comments from "./Comments";
import { useState, useEffect } from "react";
import useAxiosFunction from "../hooks/useAxiosFunction";
import axios from '../apis/ForumServer';
import Loading from "./Loading";
import useStore from "../hooks/useStore";
import { useHistory } from "react-router-dom";

function Answer({ answer }) {
  const history = useHistory();


  const userObj = useStore(state => state.userObj);
  const setUserobjexplore = useStore(state => state.setUserobjexplore);

  const [open, setOpen] = useState(false);
  const [appendAnswer, setAppendanswer] = useState(false);
  const [answerContent, setAnswercontent] = useState('');

  const [status, response, error, loading, axiosFetch] = useAxiosFunction();

  const submitAnswer = (e) => {
    e.preventDefault();
    setAppendanswer(!appendAnswer);

    if (appendAnswer && (answerContent.length > 0)) {
      axiosFetch({
        axiosInstance: axios,
        method: 'POST',
        url: "updateAnswer.php",
        requestConfig: {
          data: {
            "AnswerID": answer.AnswerID,
            "AnswerContent": (answer.AnswerContent + answerContent),
            "Edited": 0
          }
        }
      });
    }
  }

  useEffect(() => {
    if (status === 200) {
      window.location.reload(false);
    }
    return () => {
      console.log((status === 200) ? "Answer Updated" : "Updating Answer");
    };
  }, [status, response]);

  //handle viewing of posted user
  const [profstatus, profresponse, proferror, profloading, profaxiosFetch] = useAxiosFunction();

  const viewPoster = () => {
    //send request for user profile 
    profaxiosFetch({
      axiosInstance: axios,
      method: 'POST',
      url: 'getUserProfile.php',
      requestConfig: {
        data: {
          UserID: answer.UserID,
        }
      }
    });
  }

  useEffect(() => {
    if(profstatus === 200){
      setUserobjexplore(profresponse[0]);
      history.push('profile');
    }
    return () => {
      console.log((status === 200) ? 'fetched profile' : 'fetching profile...');
    };
  }, [profstatus,profresponse]);

  return (
    <div className="mainQuestionBox answerBoxx">
      {loading && <Loading caption="Updating Answer" />}
      {profloading && <Loading caption="Fetching User Credentials" />}
      <div className="answerBox">
        <div>
          <p>{answer.AnswerContent}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id
            est turpis. Etiam ullamcorper elit porta, aliquet massa pretium,
            porta nisl. Nulla efficitur diam nisl, et tempus leo euismod nec.
            Maecenas sed fringilla tellus. Praesent posuere nunc eu accumsan
            aliquet. In et libero aliquam, commodo justo ac, vestibulum velit.
          </p>
        </div>
        <div>{answer && <Voter post={answer} isQuestion={false} />}</div>

        <div className="postUserInfo" style={{float: "right !important"}} onClick={viewPoster}>
            <span>Posted By:</span>
            <h4 style={{margin: '0'}}>{answer.FirstName} {answer.LastName}</h4>
          </div>
      </div>

      <div className="voteCounter">
        <span style={{ color: 'green',margin: " 0 2em" }}>Upvotes: {answer.UpVotes}</span>
        <span style={{ color: 'red',margin: "0 2em"}}>Downvotes: {answer.DownVotes}</span>
      </div>

      {appendAnswer && (
        <div>
          <div className="appendAnswerText">
            <textarea
              placeholder="Enter Your answer..."
              className="descText"
              id="descText"
              cols="50"
              rows="5"
              onChange={(e) => {
                setAnswercontent(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      )}

      {appendAnswer && (
        <h4 style={{ color: "red" }}>answer submission incomplete</h4>
      )}
      {(userObj.UserID === answer.UserID) && <button
        className="appendAnswerBtn"
        style={{ marginTop: "0.5em" }}
        onClick={submitAnswer}
      >
        {appendAnswer ? "Confirm Edit" : "Append Answer"}
      </button>}

      {(open && answer) ? (
        <Comments post={answer} isQuestion={false} closer={setOpen} />
      ) : (
        <span
          className='commntBtn'
          style={{ margin: "1em" }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          ▼
        </span>
      )}
    </div>
  );
}

export default Answer;
