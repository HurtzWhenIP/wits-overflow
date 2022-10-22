import useStore from "../hooks/useStore";



function Reportsummary(){
    const currPost = useStore(state => state.currPost);
    const isQuestion = currPost.AnswerID ? false : true;

    return(<h1>Report Summary</h1>);
}

export default Reportsummary;