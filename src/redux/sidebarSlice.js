import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isOpen: false
    
}


export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setSidebar: (state,action)=>{
            state.isOpen = !state.isOpen;
        },
        

    }
})

export const {setSidebar} = sidebarSlice.actions
export default sidebarSlice.reducer
