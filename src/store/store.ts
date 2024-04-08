import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {issuesSlice} from './slices';

const rootReducer = combineReducers({
  issues: issuesSlice,
})

const initialValue = {
  issues: {
    data: [],
    isLoading: false,
    error: undefined,
    filteredIssues: {
     to_do: [],
     in_progress: [],
     done: [],
    },
    prevUrl: null,
    repoInfo: null
   }
}

export const store = configureStore({
  reducer: {
    issues: issuesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export const createReduxStore = (initialState: RootState = initialValue) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState: initialState
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

