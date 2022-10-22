import useStore from "../hooks/useStore";

function Reportpage(){
    const currPost = useStore(state => state.currPost);
    const isQuestion = currPost.AnswerID ? false : true;


    return(
        <div>
            <div className='rptContent'>
                
            </div>
        </div>
    );
}

export default Reportpage;