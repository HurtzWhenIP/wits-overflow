import Voter from "./Voter";
import Comments from "./Comments";
import { useState } from "react";
import "../styles/QuestionPage.css";
import useAxiosFunction from '../hooks/useAxiosFunction';
import useStore from '../hooks/useStore';
import axios from '../apis/ForumServer';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import { useHistory } from "react-router-dom";

function MainQuestion() {

  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [toggle,setToggle] = useState(false);

  const question = useStore(state => state.question);
  const setQuestion = useStore(state => state.setQuestion);
  const userObj = useStore(state => state.userObj);
  const setUserobjexplore = useStore(state => state.setUserobjexplore);

  const [status, response, error, loading, axiosFetch] = useAxiosFunction();

  const setSolve = (e) => {
    e.preventDefault();
    setToggle(!toggle);
    axiosFetch({
      axiosInstance: axios,
      method: 'POST',
      url: 'setQuestionSolved.php',
      requestConfig: {
        data: {
          UserID: userObj.UserID,
          PostID: question.PostID,
          Solved: !question.Solved
        }
      }
    });
  }

  useEffect(() => {
    if (status === 200) {
      question.Solved = !question.Solved;
      setQuestion(question);
      console.log(question);
      window.location.reload(false);
    }
    return () => {
      console.log(`set as ${question.Solved}`);
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
          UserID: question.UserID,
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
    <div className="mainQuestionBox">
      {loading && <Loading caption="Changing question state" />}
      {profloading && <Loading caption="Fetching User Credentials" />}
      <div className="MainQuestion">
        <div>
          <h1 className="altText">{question.PostiTitle}</h1>
          <h3>{question.PostContent}</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id
            est turpis. Etiam ullamcorper elit porta, aliquet massa pretium,
            porta nisl. Nulla efficitur diam nisl, et tempus leo euismod nec.
            Maecenas sed fringilla tellus. Praesent posuere nunc eu accumsan
            aliquet. In et libero aliquam, commodo justo ac, vestibulum velit.
            Vestibulum felis quam, mollis ac venenatis eget, vestibulum id
            justo. Morbi ornare molestie magna in interdum. Sed convallis tempus
            dolor ac ullamcorper. Maecenas et dui vitae eros viverra iaculis.
            Fusce vestibulum augue in lectus faucibus eleifend. Integer a neque
            volutpat, feugiat.
          </p>

          <div className="postUserInfo" onClick={viewPoster}>
            <span>Posted By:</span>
            <h4 style={{margin: '0'}}>{question.FirstName} {question.LastName}</h4>
          </div>


          <h3
            className="altText"
            style={question.Solved ? { color: "green" } : { color: "red" }}
          >
            {question.Solved ? "Solved" : "Unsolved"}
          </h3>
          
          {(userObj.UserID === question.UserID) && <button className='markerBtn' onClick={setSolve} style={{ color: question.Solved ? "red" : "green" }}>Mark Question as {question.Solved ? "Unsolved" : "Solved"}</button>}
        </div>
        <div>
          <Voter post={question} isQuestion={true}/>
        </div>
      </div>

      <div className="voteCounter">
        <span style={{ color: 'green',margin: " 0 2em" }}>Upvotes: {question.UpVotes}</span>
        <span style={{ color: 'red',margin: "0 2em"}}>Downvotes: {question.DownVotes}</span>
      </div>

      {(open && question) ? (
        <Comments closer={setOpen} post={question} isQuestion={true} />
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

export default MainQuestion;
