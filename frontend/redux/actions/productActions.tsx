import axios from "axios";
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
    (query?: number, page?: number) => async (dispatch: any) => {
        try {
            dispatch({ type: PRODUCTS_LIST_REQUEST });

            const { data } = await axios.get(
                `${url}/api/products?query=${query}page=${page}`
            );

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
