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
        url: "GetComments.php",
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
            console.log("Fetched Comments");
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
                url: 'AddComment.php',
                requestConfig: {
                    data: {
                        UserID: userObj.UserID,
                        PostID: isQuestion ? post.PostID : post.AnswerID,
                        IsQuestion: isQuestion ? 1 : 0,
                        CommentContent: commentContent
                    }
                }
            });
        }
    };

    useEffect(() => {
        if (cstatus === 200) {
            window.location.reload(false);
        }
        return () => {
            console.log((cstatus === 200) ? "Posted Comment" : "Posting Comment...?");
        };
    }, [cstatus, cresponse]);

    const handleClick = (cid) => {
        axiosFetch({
            axiosInstance: axios,
            method: 'POST',
            url: 'HideComment.php',
            requestConfig: {
                data: {
                    CommentID: cid
                }
            }
        });
    };

    return (
        <div className="commentsHolder">
            {(loading) && !data ? (
                <span>Loading...</span>
            ) : (
                data.map((comment) => {
                    return (
                        <div className="commentText">
                            <span style={{textDecoration: (comment.IsHidden && (comment.UserID === userObj.UserID)) ? 'line-through' : 'none'}}>{((comment.UserID !== userObj.UserID) && comment.IsHidden) ? "COMMENT REMOVED" : comment.CommentContent}</span>
                            <span>~{comment.FirstName} {comment.LastName}</span>
                            {(post.UserID === userObj.UserID) && <button className='commentBtn' onClick={(e) => {
                                e.preventDefault();
                                handleClick(comment.CommentID);
                            }}>delete</button>}
                        </div>
                    );
                })
            )}

            {((response.length === 0) && (status === 200)) && <h4>No Comment Unfortunately...</h4>}

            {cloading && <Loading caption="Posting Comment" />}

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
