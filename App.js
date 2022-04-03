import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Welcome } from './screens/welcome/index';  //bringing in the welcome component from the screens folder
import RootNavigation from './navigation/RootNavigation';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {magic, web3} from './screens/MagicLogin/magic'

import watchListReducer from './components /store/reducers/watchlist';
import topmoversReducer from './components /store/reducers/topmovers';
import newsReducer from './components /store/reducers/news';


const rootReducer = combineReducers({
  watchlist: watchListReducer,
  topmovers: topmoversReducer,
  news: newsReducer,

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


//We begin with Root Navigation instead of the Welcome Component 
export default function App() {
  return (

    <Provider store={store}>
      <RootNavigation />
      <magic.Relayer />

    </Provider>

    
    
  );
}


