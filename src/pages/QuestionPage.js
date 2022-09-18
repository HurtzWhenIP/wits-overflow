import useStore from "../hooks/useStore";
import '../styles/QuestionPage.css';
import useAxios from '../hooks/useAxios';
import axios from '../apis/ForumServer';
import { useState,useEffect } from "react";
import Loading from "../components/Loading";
import Answer from "../components/Answer";
import MainQuestion from "../components/mainQuestion";

function QuestionPage(){

    const question = useStore(state => state.question);
    const [answers,setAnswers] = useState(null)

    const [status,response,error,loading,refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: 'getUserAnswers.php',
        requestConfig: {
            data: {
                ParentPostID: question.PostID
            }
        }
    })

    useEffect(() => {
        if(status === 200){
            setAnswers(response);
        }
        return () => {
            console.log('setting answers');
        };
    }, [response,status]);

    return(
        <div className='QuestionPage'>
            {loading && <Loading caption="Hmm... Maybe it just isn't a question worth answers"/>}
            <span style={{fontSize: '3em',margin: '0.5em'}}>Question: {question.PostID}</span>
            <div>
                <MainQuestion question={question}/>
            </div>
            <span style={{fontSize: '3em',margin: '0.5em'}}>Answers</span>
            <div className="answerHolder">
                {!loading && answers.map((answer) => {
                    return(<Answer answer={answer} key={answer.AnswerID}/>)
                })}
            </div>
        </div>
    )
}

export default QuestionPage;