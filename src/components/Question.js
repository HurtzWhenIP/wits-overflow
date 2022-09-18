import '../styles/Question.css';

function Question({ question }) {
  return (
    <div className="tilesWrap" key={question.PostID}>
      <div className="question" >
        <div className="head1"> {question.PostID} </div>
        <div className="head2">{question.PostTitle}</div>
        <div className="parag">
          {question.PostContent}
        </div>
        <h3 style={question.Solved ? {color: 'green'} : {color: 'red'}}>{question.Solved ? "Solved" : "Unsolved"}</h3>
        <div className="quest_button" onClick={(e)=> {
          
        }}>Read more </div>
      </div>
    </div>
  );

}


export default Question;