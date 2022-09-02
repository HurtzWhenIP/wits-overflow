import { useState } from "react";
import "../styles/Homepage.css";


function Homepage() {
    const [isOpen, setIsopen] = useState(false);
    const [query, setQuery] = useState("All");

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

    );
}

export default Homepage;