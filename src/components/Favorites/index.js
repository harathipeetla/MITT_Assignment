// Favorites.js
import React from 'react'
import Header from '../Header'

function Favorites({favorites, dishes}) {
  // Filter the dishes array to get only the favorite dishes
  const favoriteDishes = dishes.filter(dish =>
    favorites.includes(dish.idCategory),
  )

  return (
    <div>
      <div>
        <Header />
      </div>
      <h1>Favorite Dishes</h1>
      {favoriteDishes.map(dish => (
        <div key={dish.idCategory}>
          <img src={dish.strCategoryThumb} alt={dish.strCategory} />
          <h2>{dish.strCategory}</h2>
          <p>{dish.strCategoryDescription}</p>
        </div>
      ))}
    </div>
  )
}

export default Favorites
