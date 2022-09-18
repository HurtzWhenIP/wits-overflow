import "../styles/Comments.css";
import useAxios from "../hooks/useAxios";
import axios from "../apis/ForumServer";
import { useState, useEffect } from "react";
import useStore from '../hooks/useStore';
import useAxiosFunction from "../hooks/useAxiosFunction";
import Loading from '../components/Loading';

function Comments({ post, closer, isQuestion }) {
    const [data, setData] = useState(null);
    const [newComment, setNewComment] = useState(false);
    const [commentContent, setCommentcontent] = useState("");

    const userObj = useStore((state) => state.userObj);

    const [status, response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: "POST",
        url: "getComments.php",
        requestConfig: {
            data: {
                PostID: isQuestion ? post.PostID : post.AnswerID,
                IsQuestion: isQuestion ? 1 : 0,
            },
        },
    });

    useEffect(() => {
        if (status === 200) {
            setData(response);
            console.log(response);
        }
        return () => {
            console.log(response);
        };
    }, [status, response]);

    //handle submiting a new comment
    const [cstatus, cresponse, cerror, cloading, axiosFetch] = useAxiosFunction();

    const submitComment = (e) => {
        e.preventDefault();
        setNewComment(!newComment);

        if (newComment && (commentContent.length > 0)) {
            axiosFetch({
                axiosInstance: axios,
                method: 'POST',
                url: 'addComment.php',
                requestConfig: {
                    data: {
                        UserID: userObj.UserID,
                        PostID: isQuestion ? post.PostID : post.AnswerID,
                        IsQuestion: isQuestion ? 1 : 0,
                        CommentContent: commentContent
                    }
                }
            })
        }
    };

    useEffect(() => {
        if(cstatus === 200){
            window.location.reload(false);
        }
        return () => {
            console.log((cstatus === 200) ? "Posted Comment" : "Posting Comment...?");
        };
    }, [cstatus,cresponse]);

    return (
        <div className="commentsHolder">
            {loading && !data ? (
                <span>Loading...</span>
            ) : (
                data.map((comment) => {
                    return (
                        <div className="commentText">
                            <span>{comment.CommentContent}</span>
                        </div>
                    );
                })
            )}

            {cloading && <Loading caption="Posting Comment"/>}

            {newComment && (
                <div style={{ marginTop: "1em" }}>
                    <div className="group">
                        <input
                            className="input"
                            type="text"
                            required
                            onChange={(e) => setCommentcontent(e.target.value)}
                        />
                        <span className="bar"></span>
                        <label className="label">Comment Content</label>
                    </div>
                </div>
            )}
            <button
                className="newCommentBtn"
                style={{ marginTop: newComment && "1em" }}
                onClick={submitComment}
            >
                {newComment ? "Post Comment" : "New Comment +"}
            </button>

            <span
                className="commntBtn"
                onClick={() => {
                    closer(false);
                }}
            >
                ▲
            </span>
        </div>
    );
}

export default Comments;
