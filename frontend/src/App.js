import React from 'react'
import {  BrowserRouter,  Route,   Switch } from "react-router-dom";
import { Provider } from 'react-redux'
 import { configureStore, combineReducers } from "@reduxjs/toolkit";


import {user} from './reducers/user'
import {Home} from './pages/Home'
import{ Profile} from'./pages/Profile'
import {ListOfUsers} from './pages/ListOfUsers'
import {SignUp} from './pages/SignUp'
import {Navbar} from './components/Navbar'
 

const reducer = combineReducers({ user: user.reducer})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Navbar />
    <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/users" exact>
      <ListOfUsers />
    </Route>
     < Route path = "/signup" exact >
       <SignUp />
       </Route>
    <Route path="/profile" exact>
      <Profile />
    </Route>
    </Switch>
    </BrowserRouter>
    </Provider>
  )
}
