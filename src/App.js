import {useState} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import DishDetail from './components/DishDetail'
import Cart from './components/Cart'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const addToCart = dish => {
    setCartItems([...cartItems, dish])
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? (
              <Redirect to="/home" />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )}
          </Route>
          <Route path="/home">
            <Home addToCart={addToCart} />
          </Route>
          <Route path="/dishes/:id" component={DishDetail} />
          <Route path="/cart">
            <Cart cartItems={cartItems} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
