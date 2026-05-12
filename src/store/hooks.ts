import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>(); // to update states
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;// to litsen to the redux state changes and updating the ui