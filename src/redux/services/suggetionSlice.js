import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    suggestedusers : [],
}


const suggetionSlice = createSlice({
    name: "suggestion",
    initialState,
    reducers: {
        setSuggetions: (state, action) =>{
            state.suggestedusers = action.payload;
        },
        followUser : (state, action) => {
            const userId = action.payload;
             const user = state.suggestedusers.find(u => u._id === userId)
             if (user) {
                user.isFollowed = true;
            }
        }
    }
})

export const { setSuggetions, followUser } = suggetionSlice.actions;

export default suggetionSlice.reducer;
