import React, { useState, useEffect } from 'react';
import recipe from '../assets/recipe.jpeg';
import RecipeItems from '../components/RecipeItems';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';
import axios from "axios";
import '../App.css';
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const addRecipe = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipe");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    getRecipes();
  }, []);

  return (
    <>
      <section className='home'>
        <div className='left'>
          <h1>Recipe Sharing</h1>
          <h5>The Recipe Sharing Web App allows users to discover and share a wide variety of recipes.</h5>
          <button onClick={()=>navigate('/addRecipe')}>Share your recipe</button>
        </div>
        <div className='right'>
          <img src={recipe} width="400px" height="300px" alt="Recipe" />
        </div>
      </section>

      <div className='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#D69ADE" fillOpacity="1" d="M0,288L15,282.7C30,277,60,267,90,234.7C120,203,150,149,180,106.7C210,64,240,32,270,32C300,32,330,64,360,101.3C390,139,420,181,450,197.3C480,213,510,203,540,186.7C570,171,600,149,630,160C660,171,690,213,720,208C750,203,780,149,810,112C840,75,870,53,900,69.3C930,85,960,139,990,186.7C1020,235,1050,277,1080,261.3C1110,245,1140,171,1170,160C1200,149,1230,203,1260,234.7C1290,267,1320,277,1350,250.7C1380,224,1410,160,1425,128L1440,96L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"></path>
        </svg>
      </div>

      {/* ✅ Fix Modal */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={setIsOpen} />
        </Modal>
      )}

      {/* ✅ Fix Recipe List Rendering */}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>{recipe.name}</li>
        ))}
      </ul>

      <div className='recipe'>
        <RecipeItems recipes={recipes} />
      </div>
    </>
  );
}
