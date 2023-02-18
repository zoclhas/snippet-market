import axios from "axios";
import { Dispatch } from "redux";
import {
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
} from "../types/productTypes";

const url = process.env.NEXT_PUBLIC_API_URL;

export const listProducts =
    (query: string, page: number) => async (dispatch: Dispatch) => {
        try {
            dispatch({ type: PRODUCTS_LIST_REQUEST });

            const { data } = await axios.get(`${url}/api/products/`);

            dispatch({
                type: PRODUCTS_LIST_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: PRODUCTS_LIST_FAIL,
                payload:
                    error.response.data && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };

export const getProduct = (id: number) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: PRODUCT_REQUEST });

        const { data } = await axios.get(`${url}/api/product/${id}`);

        dispatch({
            type: PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: PRODUCT_FAIL,
            payload:
                error.response.data && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
