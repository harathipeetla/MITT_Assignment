// Home component
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {FaHeart as SolidHeart, FaHeart as RegularHeart} from 'react-icons/fa'
import Header from '../Header'

import './index.css'

function Home({addToCart}) {
  const [dishes, setDishes] = useState([])
  const [filteredDishes, setFilteredDishes] = useState([])
  const [errorFetching, setErrorFetching] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const dishesPerPage = 5
  const [favorites, setFavorites] = useState([])
  const [addedToCartMessage, setAddedToCartMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/categories.php',
        )
        const data = await response.json()
        setDishes(data.categories)
        setFilteredDishes(data.categories)
      } catch (error) {
        setErrorFetching(error.message)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    setCurrentPage(1) // Reset pagination when search term changes
  }, [filteredDishes])

  const indexOfLastDish = currentPage * dishesPerPage
  const indexOfFirstDish = indexOfLastDish - dishesPerPage
  const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const handleSearch = searchTerm => {
    const filtered = dishes.filter(dish =>
      dish.strCategory.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredDishes(filtered)
  }

  const toggleFavorite = idCategory => {
    if (favorites.includes(idCategory)) {
      setFavorites(favorites.filter(dishId => dishId !== idCategory))
    } else {
      setFavorites([...favorites, idCategory])
    }
  }

  const handleAddToCart = dish => {
    addToCart(dish)
    setAddedToCartMessage(`${dish.strCategory} has been added to the cart`)
    // Optionally, you can add some UI indication that the item has been added to the cart
  }

  if (errorFetching) {
    return <div>Error: {errorFetching}</div>
  }

  return (
    <div>
      <Header onSearch={handleSearch} />
      <h1>Dishes</h1>
      {addedToCartMessage && <p>{addedToCartMessage}</p>}
      {filteredDishes.length === 0 ? (
        <p>No dishes found</p>
      ) : (
        <div className="dish-container">
          <ul className="each-dish-card">
            {currentDishes.map(dish => (
              <li key={dish.idCategory} className="each-dish">
                <Link
                  to={`/dishes/${dish.idCategory}`}
                  className="link-element"
                >
                  <h2 className="dish-category">{dish.strCategory}</h2>
                  <img
                    src={dish.strCategoryThumb}
                    alt={dish.strCategory}
                    className="dish-image"
                  />
                </Link>
                {/* Use React Icons for favorite toggle */}
                <div className="adding-funcs">
                  <div>
                    {favorites.includes(dish.idCategory) ? (
                      <SolidHeart
                        style={{color: 'red', cursor: 'pointer'}}
                        onClick={() => toggleFavorite(dish.idCategory)}
                      />
                    ) : (
                      <RegularHeart
                        style={{cursor: 'pointer'}}
                        onClick={() => toggleFavorite(dish.idCategory)}
                        className="heart"
                      />
                    )}
                  </div>
                  <div className="cart-btn-container">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(dish)}
                      type="button"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <nav className="pagination-container">
            <ul className="pagination">
              {Array.from(
                {length: Math.ceil(filteredDishes.length / dishesPerPage)},
                (_, i) => (
                  <li key={i + 1} className="page-item">
                    <button
                      onClick={() => paginate(i + 1)}
                      className="page-link"
                      type="button"
                    >
                      {i + 1}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

export default Home
