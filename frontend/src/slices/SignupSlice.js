import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    error:"",
    message:"",
}
export const GetUserSignup=createAsyncThunk("userSignup", async(userdata)=>{
    try {
      const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
      };
        const response = await fetch(`/api/users/createUser`, headers);
        const res= await response.json();
        return res;
    } catch (error) {
         throw new Error(error.error.message)
    }
})
export const signupSlice= createSlice({
    name:"userSignup",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
          .addCase(GetUserSignup.pending, (state) => {
            console.log("pending....");
            state.loading = true;
          })
          .addCase(GetUserSignup.fulfilled, (state, action) => {
            console.log("fulfilled....");
            state.loading  = false;
            state.message=action.payload?.message
            state.error=action.payload?.error
          })
          .addCase(GetUserSignup.rejected, (state, action) => {
            console.log("failed...");
            state.loading  = false;
            state.error = action.payload.error;
          })
      },
})
export default signupSlice.reducer;