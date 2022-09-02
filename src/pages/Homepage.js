import useAxios from "../hooks/useAxios";
import axios from '../apis/ForumServer';
import { useState } from "react";

function Homepage(){
    const [response,error,loading,refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: 'getUsers.php',
    });

    return(
        <>
            {loading ? <h1>Homepage</h1> : <h1>{response}</h1>}
        </>
    )
}

export default Homepage;