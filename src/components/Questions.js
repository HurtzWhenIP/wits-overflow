import { useEffect, useState } from "react";
import '../styles/Questions.css';
function Questions({ data }) {
    //stores question set 
    const [questions, setQuestions] = useState(null);

    //updates questions set when necesarry
    useEffect(() => {
        try {
            if (data[0].length > 0) {
                console.log("Got Data");
                setQuestions(data[0]);
            }
        } catch (error) {
            console.log("Data in Transition");
        }
    }, [data])

    return (
        <div>

            {questions && questions.map((question) => {
                const list = (
                    <>
                        <ul className="tilesWrap">
                            <h2>{question.PostID}</h2>
                            <h3>{question.PostTitle}</h3>
                            <p>{question.PostContent}</p>
                            <h3>{question.Solved}</h3>
                            <button>Read more</button>
                        </ul>
                        <hr />
                    </>
                );
                return list;
            })}
        </div>
    )
}

export default Questions;