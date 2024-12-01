import { useState } from "react";
import SearchResult from "./SearchResult";
import "./Search.css";
const Search=()=>{
    const [query, setQuery] = useState("");
    const [searchRes,setSearchRes]=useState([]);
    async function handleClick(){
        const key="3f4e22fce5014d0498196a673b08335f";
        let url=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${query}`;

        let proms= await fetch(url);
        let obj= await proms.json();
        console.log(obj);
        setSearchRes(obj.results);
    }
    return(
        <div className="search-wrapper">
        <input type="text" placeholder="Type ingrediens you like" onChange={(e)=>{ setQuery(e.target.value) }}/>
        <button onClick={handleClick}>Search</button>
        {searchRes.length > 0 ? <SearchResult results={searchRes}/> : null }
        </div>
    );
}

export default Search;