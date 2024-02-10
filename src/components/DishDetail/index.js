// DishDetail.js
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../Header'
import './index.css'

function DishDetail() {
  const {id} = useParams()
  const [dish, setDish] = useState(null)
  const [errorFetching, setErrorFetching] = useState(null)

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/categories.php?id=${id}`,
        )
        const data = await response.json()

        if (data.categories && data.categories.length > 0) {
          setDish(data.categories[0])
        } else {
          setErrorFetching('Dish not found')
        }
      } catch (error) {
        setErrorFetching('Error fetching dish')
      }
    }

    fetchDish()
  }, [id])

  if (errorFetching) {
    return <div>Error: {errorFetching}</div>
  }

  if (!dish) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <img
        src={dish.strCategoryThumb}
        alt={dish.strCategory}
        className="dish-item-img"
      />
      <div className="detail-dish-card">
        <div>
          <h2>{dish.strCategory}</h2>
          <p>{dish.strCategoryDescription}</p>
        </div>
      </div>
    </div>
  )
}

export default DishDetail
