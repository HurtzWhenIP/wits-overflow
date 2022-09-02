import useAxios from "../hooks/useAxios";
import axios from '../apis/ForumServer';
import { useState,useEffect } from "react";

function Homepage(){

    //state to hold question data
    const [data,setData] = useState([]);

    const [response,error,loading,refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: 'getAllQuestions.php',
    });

    useEffect(() => {
        const result = Array.isArray(response);
        if(response && (result.length>0)){
            console.log("Questions stored");
            setData(result);
        }

        return(() => {
            console.log(data);
        })
    },[response,data])

    return(
        <h1>Homepage</h1>
    )
}

export default Homepage;