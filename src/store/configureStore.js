import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import api from './middlewares/api';

export default function configureStoreFn() {
    return configureStore({ reducer, middleware: [...getDefaultMiddleware(), api] });
}
