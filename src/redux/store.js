import {configureStore} from '@reduxjs/toolkit';
// import todoReducer from '../features/todo/todoSlice';
import sidebarReducer from './sidebarSlice';
import loaderReducer from './loaderSlice';

export const store = configureStore({
   reducer: {
        sidebar: sidebarReducer,
        loader: loaderReducer
    }
});