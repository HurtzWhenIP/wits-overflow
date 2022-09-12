import { useEffect, useState } from "react";
import '../styles/Questions.css';
import Loading from "./Loading";
import Question from './Question';

function Questions({ data }) {
    //stores question set 
    const [questions, setQuestions] = useState(null);
    const [loading,setLoading] = useState(true);

    //updates questions set when necesarry
    useEffect(() => {
        try {
            if (data[0].length > 0) {
                console.log("Got Data");
                setQuestions(data[0]);
                setLoading(false);
            }
        } catch (error) {
            console.log("Data in Transition");
            setLoading(true);
        }
    }, [data])

    return (
        <>
            {loading && <Loading caption={"Turns out... Some questions may take longer to answer than others"}/>}
            <div className="questionsHolder">
                {questions && questions.map((question) => {
                    return(<Question question={question}/>)
                })}
            </div>
        </>
    )
}

export default Questions;