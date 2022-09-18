import '../styles/Comments.css'
import useAxios from '../hooks/useAxios';
import axios from '../apis/ForumServer';
import { useState,useEffect } from 'react';

function Comments({post,closer,isQuestion}){

    const [data,setData] = useState(null);

    const [status,response,error,loading,refetch] = useAxios({
        axiosInstance: axios,
        method: 'POST',
        url: 'getComments.php',
        requestConfig: {
            data: {
                PostID: (isQuestion ? post.PostID : post.AnswerID),
                IsQuestion: (isQuestion ? 1 : 0)
            }
        }
    })

    useEffect(() => {
        if(status === 200){
            setData(response);
            console.log(response);
        }
        return () => {
            console.log(response);
        };
    }, [status,response]);

    return(
        <>
        {(loading && !data) ? <span>Loading...</span> : data.map((comment) => {
            return(
                <div className='commentText'>
                    <span>{comment.CommentContent}</span>
                </div>
            )
        })}
        <span className='commntBtn' onClick={() => {closer(false)}}>▲</span>
        </>
    )
    
}

export default Comments;