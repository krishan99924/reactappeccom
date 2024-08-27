import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    token:"",
    message:"",
    error:"",
    userDetail:{},
    userId: null
}
export const GetUserLogin=createAsyncThunk("login", async(userdata)=>{
    try {
      const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
      };
        const response = await fetch(`/api/users/login`, headers);
        const res= await response.json();
        return res;
    } catch (error) {
        throw new Error(error.error.message)
    }
})
export const LoginSlice= createSlice({
    name:"login",
    initialState,
    reducers:{
              logout: (state) => {
            // Reset the state to its initial values on logout
            state.loading = false;
            state.message = "";
            state.error = "";
            state.token = "";
            state.userDetail = {};
            state.userId=null
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(GetUserLogin.pending, (state) => {
            state.loading = true;
          })
          .addCase(GetUserLogin.fulfilled, (state, action) => {
            console.log(action.payload);
            state.loading  = false;
            state.message=action.payload?.message
            state.error=action.payload?.error
            state.token=action.payload?.token
            state.userDetail=action.payload?.userdetails
            state.userId=action.payload?.userId
          })
          .addCase(GetUserLogin.rejected, (state, action) => {
            console.log("failed...");
            state.loading  = false;
            state.error = action.payload.error;
          })
      },
})
export const { logout } = LoginSlice.actions;
export default LoginSlice.reducer;