import {thunk} from 'redux-thunk';
import { configureStore, Tuple } from '@reduxjs/toolkit';
import CombinedReducer from './reducer';

const store = configureStore({
    reducer: CombinedReducer,
    middleware: () => new Tuple(thunk),
});

export default store;
