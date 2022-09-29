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
      <div className="question" >
        <div className="head1"> {question.PostID} </div>
        <div className="head2">{question.PostTitle}</div>
        <div className="parag">
          {question.PostContent}
        </div>
        <h3 style={question.Solved ? {color: 'green'} : {color: 'red'}}>{question.Solved ? "Solved" : "Unsolved"}</h3>
        <h3 className="quest_button" onClick={()=> {openPage()}}>Read more</h3>
      </div>
    </div>
  );

}


export default Question;