import { createSlice } from '@reduxjs/toolkit'

const user=localStorage.getItem('user');
const initialState = {
  currentUser:user?JSON.parse(user):null,
  loading:false,
  error:false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
     state.loading=true;
    },
    loginSuccess: (state,actions) => {
      state.loading=false;
      console.log(actions.payload);
      localStorage.setItem('user',JSON.stringify(actions.payload));
      state.currentUser=actions.payload;
    },
    loginFailure: (state) => {
      state.error=true;
      state.loading=false;
    },
    logout: (state) => {
        state.loading=false;
        state.error=false;
        state.currentUser=null;
        localStorage.removeItem('user');
    },
    subscription:(state,action)=>{
      if(state.currentUser.subscribedUsers.includes(action.payload)){
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId)=>channelId===action.payload
          ),1 
        ); 
      }
      else{
        state.currentUser.subscribedUsers.push(action.payload);
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure,logout ,subscription} = userSlice.actions

export default userSlice.reducer