import useStore from "../hooks/useStore";
import "../styles/QuestionPage.css";
import useAxios from "../hooks/useAxios";
import axios from "../apis/ForumServer";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Answer from "../components/Answer";
import MainQuestion from "../components/mainQuestion";
import useAxiosFunction from "../hooks/useAxiosFunction";

function QuestionPage() {
  const question = useStore((state) => state.question);
  const userObj = useStore(state => state.userObj);
  const [answers, setAnswers] = useState(null);
  const [newAnswer, setNewanswer] = useState(false);
  const [answerContent, setAnswercontent] = useState("");
  const [invalid, setInvalid] = useState(false);

  const [status, response, error, loading, refetch] = useAxios({
    axiosInstance: axios,
    method: "POST",
    url: "getUserAnswers.php",
    requestConfig: {
      data: {
        ParentPostID: question.PostID,
      },
    },
  });

  useEffect(() => {
    if (status === 200) {
      setAnswers(response);
    }
    return () => {
      console.log("setting answers");
    };
  }, [response, status]);

  //handling posting of new answer
  const [astatus,aresponse,aerror,aloading,axiosFetch] = useAxiosFunction();

  const submitAnswer = (e) => {
    e.preventDefault();
    setNewanswer(!newAnswer);
    setInvalid(false);

    //post answer
    if(newAnswer && (answerContent.length > 0)){
        axiosFetch({
            axiosInstance: axios,
            method: 'POST',
            url: 'addAnswer.php',
            requestConfig: {
                data: {
                    UserID: userObj.UserID,
                    ParentPostID: question.PostID,
                    AnswerContent: answerContent
                }
            }
        })
    }
    else{
        setInvalid(true);
    }
  };

  useEffect(() => {
    if(astatus === 200){
        window.location.reload(false);
    }
    return () => {
        console.log((astatus === 200) ? "Answer Posted" : "Posting Answer...");
    };
  }, [astatus,aresponse]);

  //TODO Change question data at top and include question asker

  return (
    <div className="QuestionPage">
      {loading && (
        <Loading caption="Hmm... Maybe it just isn't a question worth answers" />
      )}
      {aloading && <Loading caption="Posting Answer"/>}
      <div>
        <MainQuestion question={question} />
      </div>

      {newAnswer && (
        <div>
          <div className="newAnswerText">
            <textarea
              placeholder="Enter Your answer..."
              className="descText"
              id="descText"
              cols="50"
              rows="6"
              onChange={(e) => {
                setAnswercontent(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      )}

      {newAnswer && invalid && (
        <h4 style={{ color: "red" }}>answer submission incomplete</h4>
      )}
      <button
        className="newAnswerBtn"
        style={{ marginTop: "2.5em" }}
        onClick={submitAnswer}
      >
        {newAnswer ? "Post Answer" : "New Answer +"}
      </button>

      <span style={{ fontSize: "3em", margin: "0.5em" }}>Answers</span>
      <div className="answerHolder">
        {(!loading && answers) &&
          answers.map((answer) => {
            return <Answer answer={answer} key={answer.AnswerID} />;
          })}
      </div>
    </div>
  );
}

export default QuestionPage;
