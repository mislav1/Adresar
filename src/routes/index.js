import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from "redux"
import { Provider } from "react-redux"
import ReduxThunk from "redux-thunk"

import createRootReducer from "../reducers"
import Home from "../pages/Home"
import AddressBook from "../pages/AddressBook"

const preloadedState = undefined;

const store = createStore(
    createRootReducer(),
    preloadedState,
    compose(applyMiddleware(ReduxThunk))
);

export default function Routes() {
    return (
        <Provider store={store}>
            <BrowserRouter forceRefresh={true}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/adresar" exact component={AddressBook} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )

}