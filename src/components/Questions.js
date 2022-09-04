import { useEffect, useState } from "react";
import '../styles/Questions.css';
import Loading from "./Loading";

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
            <div>
                {questions && questions.map((question) => {
                    const list = (
                        <>
                            <div className="tilesWrap" key={question.PostID}>
                                <h2>{question.PostID}</h2>
                                <h3>{question.PostTitle}</h3>
                                <p>{question.PostContent}</p>
                                <h3>{question.Solved}</h3>
                                <button>Read more</button>
                            </div>
                            <hr />
                        </>
                    );
                    return list;
                })}
            </div>
        </>
    )
}

export default Questions;