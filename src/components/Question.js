import '../styles/Question.css';
import { useHistory } from 'react-router-dom';
import useStore from '../hooks/useStore';

function Question({ question }) {

  const history = useHistory();
  const setQuestion = useStore(state=> state.setQuestion);

  const openPage = () => {
    setQuestion(question);
    history.push('/question')
  }

  return (
    <div className="tilesWrap" key={question.PostID}>
      <h3>{question.PostTitle}</h3>
      <p>{question.PostContent}</p>
      <h3 style={question.Solved ? {color: 'green'} : {color: 'red'}}>{question.Solved ? "Solved" : "Unsolved"}</h3>
      <button onClick={openPage}>Read more</button>
    </div>
  );
}


export default Question;