import { combineReducers } from "redux";
import {
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,
    //
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
} from "../types/productTypes";

const productsListReducer = (state = { products: [] }, action: any) => {
    switch (action.type) {
        case PRODUCTS_LIST_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case PRODUCTS_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case PRODUCTS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

const getProductReducer = (state = {}, action: any) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };
        case PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

const productReducer = combineReducers({
    products: productsListReducer,
    product: getProductReducer,
});

export default productReducer;
