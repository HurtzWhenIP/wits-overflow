import Voter from "./Voter";
import Comments from "./Comments";
import { useState } from "react";
import "../styles/QuestionPage.css";

function MainQuestion({ question }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mainQuestionBox">
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
          <h3
            className="altText"
            style={question.Solved ? { color: "green" } : { color: "red" }}
          >
            {question.Solved ? "Solved" : "Unsolved"}
          </h3>
        </div>
        <div>
          <Voter post={question} />
        </div>
      </div>
      {(open && question) ? (
        <Comments closer={setOpen} post={question} isQuestion={true} />
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

export default MainQuestion;
