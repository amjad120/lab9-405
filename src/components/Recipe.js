import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Recipe.css";
const Recipe=()=>{
    
    const params=useParams();
    const id = params.id;
    const [title,setTitle]=useState("");
    const [recipeDetails,setRecipeDetails]=useState(null);

    useEffect(()=>{
        async function doFetch(){
            const key="3f4e22fce5014d0498196a673b08335f";
            let url= `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`;

            let proms= await fetch(url);
            let data= await proms.json();
            setRecipeDetails(data);
            setTitle(data.title);
        }
        doFetch();
    },[id]);

    return recipeDetails && (
        <div className="recipe-details">
        
        <h1>{recipeDetails.title}</h1>
        <img src={recipeDetails.image} alt={recipeDetails.title}></img>
        
        <div dangerouslySetInnerHTML={{__html: recipeDetails.summary}}/>
        <h2>Ingredients</h2>
        
        <ul>
            <ul>{recipeDetails.extendedIngredients.map((ing)=> (
                <li key={ing.id}>{ing.original}</li>
            ))}</ul>
        </ul>
        <h2>Instructions</h2>
        <ol>
            {recipeDetails.analyzedInstructions[0].steps.map((step)=>(
                 <li key={step.number}>{step.step}</li>
            ))}
        </ol>
        </div>
    );
    
}

export default Recipe;