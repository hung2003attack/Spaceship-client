import { configureStore, combineReducers } from '@reduxjs/toolkit';
import hideShow from './hideShow';
import home from './storeSocial_network/home';
import background from './background';
import changeLanguage from './languageRD';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
const persistConfig = {
    key: 'root',
    version: 1,

    storage: AsyncStorage,
};
const rootReducer = combineReducers({
    language: changeLanguage,
    background: background,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: { persistedReducer, hideShow, home },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
