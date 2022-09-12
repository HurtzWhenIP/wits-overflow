import '../styles/Question.css';

function Question({ question }) {
  return (
    <div className="tilesWrap" key={question.PostID}>
      <h3>{question.PostTitle}</h3>
      <p>{question.PostContent}</p>
      <h3 style={question.Solved ? {color: 'green'} : {color: 'red'}}>{question.Solved ? "Solved" : "Unsolved"}</h3>
      <button>Read more</button>
    </div>
  );
}


export default Question;