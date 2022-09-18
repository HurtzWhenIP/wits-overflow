import "../styles/Answer.css";
import Voter from "./Voter";
import Comments from "./Comments";
import { useState } from "react";

function Answer({ answer }) {

    const [open,setOpen] = useState(false);

  return (
    <div className="mainQuestionBox answerBoxx">
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
      </div>
      {(open && answer) ? (
        <Comments post={answer} isQuestion={false} closer={setOpen}/>
      ) : (
        <span
        className='commntBtn'
        style={{margin: "1em"}}
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
