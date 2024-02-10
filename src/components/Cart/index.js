// Cart component

import Header from '../Header'

const Cart = ({cartItems}) => (
  <div>
    <div>
      <Header />
    </div>
    <h1>Your cart</h1>
    {cartItems.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <p>{item.strCategory}</p>
            {/* Display other details of the dish item */}
            <img src={item.strCategoryThumb} alt="thumb dish" />
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default Cart
