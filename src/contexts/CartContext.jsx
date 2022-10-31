import { createContext, useEffect, useContext, useReducer } from 'react';
import reducer from '@reducers/CartReducer';
import { ADD_TO_CART, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT, CLEAR_CART, COUNT_CART_TOTALS, SET_INITAL_MONEY } from '@actions';

const getLocalStorage = () => JSON.parse(localStorage.getItem('cart') || "[]");

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  moneyAvailable: 0,
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add to cart
  const addToCart = (id, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, amount, product } });
  };

  // remove item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  // toogle ammount
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // save cart
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const setInitialMoney = initialMoney => {
    console.log(initialMoney)
    dispatch({ type: SET_INITAL_MONEY, payload: {initialMoney}})
  }

  return <CartContext.Provider value={{ ...state, addToCart, removeItem, toggleAmount, clearCart, setInitialMoney }}>{children}</CartContext.Provider>;
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
