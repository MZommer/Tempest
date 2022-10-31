import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT, SET_INITAL_MONEY } from '../actions';


function addToCart(state, action) {
    const { id, amount, product } = action.payload;
    const tempItem = state.cart.find(i => i.id === id);

    if (tempItem) {
      const tempCart = state.cart.map(cartItem => {
        if (cartItem.id === id) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max)
            newAmount = cartItem.max;
          return { ...cartItem, amount: newAmount };
        } 
        return cartItem;
      });

      return { ...state, cart: tempCart };
    }
    const newItem = {
        id: id,
        name: product.name,
        amount,
        image: product.thumb,
        price: product.price,
        max: product.stock,
    };
    return { ...state, cart: [...state.cart, newItem] };
}

function toggleItemAmount(state, action) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map(item => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1;
          if (newAmount > item.max)
            newAmount = item.max;
          return { ...item, amount: newAmount };
        }

        if (value === 'dec') {
          let newAmount = item.amount - 1;
          if (newAmount < 1)
            newAmount = 1;
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });

    return { ...state, cart: tempCart };
}

function countCart(state, action) {
    const { total_items, total_amount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
  
          total.total_items += amount;
          total.total_amount += price * amount;
  
          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      return { ...state, total_items, total_amount };
}

export default function CartReducer(state, action) {
    switch (action.type) {
        case SET_INITAL_MONEY:
            return { ...state, moneyAvailable: action.payload.initialMoney}
        case ADD_TO_CART:
            return addToCart(state, action);
        case REMOVE_CART_ITEM:
            const tempCart = state.cart.filter(item => item.id !== action.payload);
            return { ...state, cart: tempCart };
        case CLEAR_CART:
            return { ...state, cart: [] };
        case TOGGLE_CART_ITEM_AMOUNT:
            return toggleItemAmount(state, action);
        case COUNT_CART_TOTALS:
           return countCart(state, action);
        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }
}