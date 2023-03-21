import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";


const identifier=JSON.parse(localStorage.getItem('user'))

const initialState={
    isLoading:false,
    user:identifier?identifier:null
}

export const registerUser=createAsyncThunk('user/registerUser',async (user,thunkAPI)=>{
     try {
      const resp=await customFetch.post('/auth/register',user)
      return resp.data
      
     } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
     }
})
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
   
   try {
     const resp = await customFetch.post("/auth/login", user);
     return resp.data;
   } catch (error) {
     return thunkAPI.rejectWithValue(error.response.data.msg);
   }
    
  }
);


const UserSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      toast.success(`Hello ${user.name}`);
      localStorage.setItem('user',JSON.stringify(user))
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      toast.success(`Welcome ${user.name}`);
      localStorage.setItem("user", JSON.stringify(user));
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

  },
  reducers:{
    logOut:(state)=>{
      state.user=null;
      localStorage.removeItem('user')
      localStorage.removeItem('cart')
    }
  }
});

export const {logOut}=UserSlice.actions


export default UserSlice.reducer