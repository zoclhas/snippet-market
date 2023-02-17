import { useMemo } from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import productReducer from "@/redux/reducers/productReducers";
import { cartReducer } from "@/redux/reducers/cartReducers";

let store;

const reducers = combineReducers({ productReducer, cart: cartReducer });

function initStore(initialState) {
    return createStore(
        reducers,
        otherInitState as any,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
}

const userInfoFromStorage = () => {
    if (typeof localStorage !== "undefined") {
        return JSON.parse(localStorage.getItem("userInfo"));
    }
    return null;
};

const cartItemsFromStorage = () => {
    if (typeof localStorage !== "undefined") {
        return localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [];
    }
    return null;
};

const cartItems = cartItemsFromStorage();

const userInfo = userInfoFromStorage();

const otherInitState = {
    cart: { cartItems: cartItems },
};

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}
