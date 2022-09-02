import useAxios from "../hooks/useAxios";
import axios from '../apis/ForumServer';
import { useState,useEffect } from "react";

function Homepage() {
    //state to hold question data
    const [data,setData] = useState([]);
    const [isOpen, setIsopen] = useState(false);
    const [query, setQuery] = useState("All");

    const [response,error,loading,refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: 'getAllQuestions.php',
    });

    useEffect(() => {
        const result = Array.isArray(response) && Array(response);
        if(response && (result.length>0)){
            console.log("Questions stored");
            setData(result);
        }

    },[response])

    return (
        <div className="wrapper">
            <h1>Search For a Question</h1>
            <div className="search_box">
                <div className="dropdown" onClick={() => {
                    setIsopen(!isOpen);
                }}>
                    <div className="default_option">{query}</div>
                    <ul className={isOpen ? "ul_active" : "ul"} >

                        <li key={0} onClick={() => {
                            setQuery("All");
                        }} >All </li>
                        <li key={1} onClick={() => {
                            setQuery("Recent");
                        }} >Recent </li>
                        <li key={2} onClick={() => {
                            setQuery("Popular");
                        }}>Popular</li>
                
                    </ul>
                </div>
                <div className="search_field">
                    <input type="text" className="input" placeholder="Search" />
                    <i className="fas fa-search"></i>
                </div>
                <button>Search</button>
            </div>
        </div>


    )};

export default Homepage;