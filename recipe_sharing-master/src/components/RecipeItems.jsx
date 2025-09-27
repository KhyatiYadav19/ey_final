// import React from 'react'
import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import recipe from '../assets/recipe.jpeg'
import {BsStopwatchFill} from "react-icons/bs"
import {FaHeart} from "react-icons/fa6"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function RecipeItems({ recipes }) {
  const [allRecipes, setAllRecipes] = useState(recipes || [])
  let path = window.location.pathname === "/myRecipe" ? true : false
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
  const [isFavRecipe, setIsFavRecipe] = useState(false)
  console.log(allRecipes)

    useEffect(() => {
        setAllRecipes(recipes || [])
    }, [recipes])

    const onDelete = async (id) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:5000/recipe/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);

        // Remove from localStorage fav if present
        let favItems = JSON.parse(localStorage.getItem("fav")) || [];
        if (favItems.some(fav => fav._id === id)) {
          favItems = favItems.filter(fav => fav._id !== id);
          localStorage.setItem("fav", JSON.stringify(favItems));
        }

        // Filter UI
        setAllRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id));
      } catch (error) {
        console.error('Delete failed:', error);
        if (error.response?.status === 403) {
          alert('Unauthorized to delete this recipe.');
        } else if (error.response?.status === 404) {
          alert('Recipe not found.');
        } else {
          alert('Error deleting recipe. Please try again.');
        }
      }
    }

    const favRecipe = (item) => {
      let filterItem = favItems.filter(recipe => recipe._id !== item._id)
      favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 ? [...favItems, item] : filterItem
      localStorage.setItem("fav", JSON.stringify(favItems))
        setIsFavRecipe(pre => !pre)
    }

    return (
      
          <div className='card-container'>
              {
                  allRecipes?.map((item, index) => {
                      return (
                          <div key={index} className='card'>
                              <img src={`http://localhost:5000/images/${item.coverImage}`} width="120px" height="100px"></img>
                              <div className='card-body'>
                                  <div className='title'>{item.title}</div>
                                  <div className='icons'>
                                      <div className='timer'><BsStopwatchFill /></div>
                                      {(!path)?<FaHeart onClick={() => favRecipe(item)}
                                        style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "" }}
                                        />:
                                     <div className='action'>
                                       <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                       <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' />

                                      </div>}
                                      </div>
                                      </div>
                                      </div>
                      )
                    }
                  )
                }
                </div>
       )
    }





{/* //         allRecipes?.map((item, index) => (
//           <div key={recipe.id} className='card'>
//             <img src={recipe} width="207px" height="150px"></img>
//             <div className='card-body'>
//                 <div className='title'>{recipe.title}</div>
//                 <div className='icons'>
//                     <div className='timer'><BsStopwatchFill /></div>
//                     <FaHeart/>
//                 </div>
//                 {/* <p>{recipe.description}</p> 
//           </div>
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default RecipeItems;//     return (
//       <div className='card-container'>{ */}
