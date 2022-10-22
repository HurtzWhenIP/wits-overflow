import '../styles/Question.css';
import { useHistory } from 'react-router-dom';
import useStore from '../hooks/useStore';
import Reportbtn from '../components/Reportbtn';

function Question({ question }) {

  const history = useHistory();
  const setQuestion = useStore(state => state.setQuestion);

  const openPage = () => {
    setQuestion(question);
    history.push('/question')
  }

  return (
    <div className="tilesWrap" key={question.PostID}>
      <div className="question" >
        <div className="head1"> {question.PostID} </div>
        <div className="head2">{question.PostTitle}</div>
        <div className="parag">
          {question.PostContent}
        </div>
        <h3 style={question.Solved ? { color: 'green' } : { color: 'red' }}>{question.Solved ? "Solved" : "Unsolved"}</h3>
        <span className="quest_button" onClick={() => { openPage() }}>Read more</span>
        <Reportbtn post={question} isQuestion={true}/>
      </div>
    </div>
  );

}


export default Question;