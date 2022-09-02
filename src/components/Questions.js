import { useEffect,useState } from "react";

function Questions({data}){
    //stores question set 
    const [questions,setQuestions] = useState(null);

    //updates questions set when necesarry
    useEffect(() => {
        try {
            if(data[0].length > 0){
                console.log("Got Data");
                setQuestions(data[0]);
            }
        } catch (error) {
            console.log("Data in Transition");
        }
    },[data])
    
    return(
        <div>
        
        {data[0].map((question) => {
          const list = (
            <>
              <ul>
                <li>Id: {question.PostID}</li>
                <li>Name: {question.UserID}</li>
                <li>Age: {question.PostTitle}</li>
                <li>City: {question.PostContent}</li>
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