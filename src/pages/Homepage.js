import useAxios from "../hooks/useAxios";
import axios from '../apis/ForumServer';
import { useState, useEffect } from "react";
import '../styles/Homepage.css'
import { FcSearch } from "react-icons/fc";
import Loading from "../components/Loading";
import Questions from "../components/Questions";


function Homepage() {
    //state to hold question data
    const [data, setData] = useState([]);
    const [isOpen, setIsopen] = useState(false);
    const [query, setQuery] = useState("All");

    const [status,response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: 'getAllQuestions.php',
    });

    useEffect(() => {
        const result = Array.isArray(response) && Array(response);
        console.log(response);
        if (response && (status === 200) && (result.length > 0)) {
            console.log("Questions stored");
            setData(result);
        }

        return (() => { console.log(data) })
    }, [response])

    return (
        <>
            <div className="wrapper">
                {loading && <Loading caption={"Loading Data..."} />}
                <h2>Search For a Question</h2>
                <div className="search_box">
                    <div className="dropdown_items" onClick={() => {
                        setIsopen(!isOpen);
                    }}>
                        <div className="default_option">{query}</div>
                        <ul className={isOpen ? "ul_active" : "ul_search"} >

                            < div className='li_search' key={0} onClick={() => {
                                setQuery("All");
                            }} >All </div>
                            <div className="li_search" key={1} onClick={() => {
                                setQuery("Recent");
                            }} >Recent </div>
                            <div className="li_search" key={2} onClick={() => {
                                setQuery("Popular");
                            }}>Popular</div>

                        </ul>
                    </div>
                    <div className="search_field">
                        <input type="text" className="input" placeholder="Search" />
                        <i className="fas fa-search"></i>
                    </div>
                    <span className="search_button">{<FcSearch size={35} />}</span>
                </div>
                <Questions data={data} /> 
            </div>

            
        </>
    );
};

export default Homepage;