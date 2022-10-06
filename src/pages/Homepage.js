import useAxios from "../hooks/useAxios";
import axios from "../apis/ForumServer";
import { useState, useEffect } from "react";
import "../styles/Homepage.css";
import { FcSearch } from "react-icons/fc";
import Loading from "../components/Loading";
import Questions from "../components/Questions";
import useAxiosFunction from "../hooks/useAxiosFunction";
import useStore from "../hooks/useStore";

function Homepage() {
  //state to hold question data
  const [data, setData] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [query, setQuery] = useState("All");
  const [newQuestion, setNewquestion] = useState(false);
  const [postTitle, setPosttitle] = useState("");
  const [postContent, setPostcontent] = useState("");
  const [invalid,setInvalid] = useState(false);

  const userObj = useStore(state => state.userObj);

  //hook to handle retreiving main question list
  const [status, response, error, loading, refetch] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "GetAllQuestions.php",
  });

  //hook to handle posting new Question
  const [qstatus, qresponse, qerror, qloading, axiosFetch] = useAxiosFunction();

  useEffect(() => {
    const result = Array.isArray(response) && Array(response);
    if (response && status === 200 && result.length > 0) {
      setData(result);
    }

    return () => {
        console.log("Questions stored");
    };
  }, [response]);

  //logic to handle submission of a question
  const submitQuestion = (e) => {
    e.preventDefault();
    setNewquestion(!newQuestion);
    setInvalid(false);

    //handle submission of new question
    if (newQuestion && (postTitle.length > 0) && (postContent.length > 0)) {
      axiosFetch({
        axiosInstance: axios,
        method: "POST",
        url: "AddQuestion.php",
        requestConfig: {
          data: {
            UserID: userObj.UserID,
            PostTitle: postTitle,
            PostContent: postContent 
          },
        },
      });
    }else{
        if(qstatus !== 200){
            setInvalid(true);
        }
    }

  };

  //wait for question to be posted
  useEffect(() => {
    
    if(qstatus === 200){
        window.location.reload(false);
    }

    return () => {
        console.log((qstatus === 200) ? "Posted Question" : "Posting Question")
    };
  }, [qresponse,qstatus]);

  return (
    <>
      <div className="wrapper">
        {loading && <Loading caption={"Loading Data..."} />}
        {qloading && <Loading caption="Posting Question.."/>}
        <h2>Search For a Question</h2>
        <div className="search_box">
          <div
            className="dropdown_items"
            onClick={() => {
              setIsopen(!isOpen);
            }}
          >
            <div className="default_option">{query}</div>
            <ul className={isOpen ? "ul_active" : "ul_search"}>
              <div
                className="li_search"
                key={0}
                onClick={() => {
                  setQuery("All");
                }}
              >
                All{" "}
              </div>
              <div
                className="li_search"
                key={1}
                onClick={() => {
                  setQuery("Recent");
                }}
              >
                Recent{" "}
              </div>
              <div
                className="li_search"
                key={2}
                onClick={() => {
                  setQuery("Popular");
                }}
              >
                Popular
              </div>
            </ul>
          </div>
          <div className="search_field">
            <input type="text" className="input" placeholder="Search" />
            <i className="fas fa-search"></i>
          </div>
          <span className="search_button">{<FcSearch size={35} />}</span>
        </div>

        {newQuestion && (
          <div>
            <div className="group">
              <input
                className="input"
                type="text"
                required
                onChange={(e) => setPosttitle(e.target.value)}
              />
              <span className="bar"></span>
              <label className="label">Question Title</label>
            </div>

            <div className="userDesc">
              <textarea
                placeholder="Enter Description of the question..."
                className="descText"
                id="descText"
                cols="50"
                rows="8"
                onChange={(e) => {
                  setPostcontent(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
        )}

        {(newQuestion && invalid) && <h4 style={{color: 'red'}}>question submission incomplete</h4>}
        <button
          className="newQuestionBtn"
          style={{ marginTop: newQuestion && "1em" }}
          onClick={submitQuestion}
        >
          {newQuestion ? "Post Question" : "New Question +"}
        </button>
        
        <Questions data={data} />
      </div>
    </>
  );
}

export default Homepage;
