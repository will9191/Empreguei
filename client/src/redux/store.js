/* import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
 */

import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { companyReducer } from './companyRelated/companySlice';
import { clientReducer } from './clientRelated/clientSlice';
import { jobReducer } from './jobRelated/jobSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        company: companyReducer,
        client: clientReducer,
        job: jobReducer,
      
    },
});

export default store;