// import {createSlice} from '@reduxjs/toolkit';

// const initialState= {
//     cartItems:[],
//     loading:false,
//     error:""
// }
// const CartSlice= createSlice({
//     name:"cart",
//     initialState,
//     reducers:{
//         setCartItems: (state, action) => {
//             console.log("action.payload",action.payload);
//             const data= state.cartItems.findIndex((item)=> action.payload._id===item._id)
//             if(data===-1){
//                 state.cartItems.push(action.payload);
//             }
//             else{
//                 state.cartItems.map((item)=>{
//                     if(item.id==action.payload.id){
//                         item.qnty +=1;
//                     }
//                 })
//             }
//         },
//         IncreaseQnty:(state, action)=>{
//             state.cartItems.map((item)=>{
//                 if(item._id==action.payload._id){
//                     item.qnty +=1;
//                 }
//             })
//         },
//         decQnty:(state, action)=>{
//             state.cartItems.map((item)=>{
//                 if(item._id==action.payload._id){
//                     if(item.qnty>1){
//                         item.qnty -=1;
//                     }
//                 }
//             })
//         },
//         removeToCart:(state, action)=>{
//             state.cartItems= state.cartItems.filter((item)=> item._id!==action.payload._id)
//         },
//         setLoading: (state, action) => {
//          state.loading = action.payload;
//         },
//         setError: (state, action) => {
//         state.error = action.payload;
//         },
//     }
// });
// export const { setCartItems, setLoading, setError, IncreaseQnty,decQnty, removeToCart } = CartSlice.actions;
// export default CartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    loading: false,
    error: "",
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cartItems = action.payload.cartItems;
        },
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.productId === action.payload.productId);
            if (itemIndex > -1) {
                state.cartItems[itemIndex].quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
        },
        increaseQnty: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.productId === action.payload.productId);
            if (itemIndex > -1) {
                state.cartItems[itemIndex].quantity += 1;
            }
        },
        decQnty: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.productId === action.payload.productId);
            if (itemIndex > -1 && state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity -= 1;
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.productId !== action.payload.productId);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setCart, addToCart, increaseQnty, decQnty, removeFromCart, clearCart, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;





