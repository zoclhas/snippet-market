import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    //
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    //
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    //
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_SUCCESS,
    ORDER_CANCEL_FAIL,
} from "@/redux/types/orderTypes";
import { CART_CLEAR_ITEMS } from "@/redux/types/cartTypes";
const url = process.env.NEXT_PUBLIC_API_URL;

export const createOrder =
    (order: object) => async (dispatch: any, getState) => {
        try {
            dispatch({ type: ORDER_CREATE_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(
                `${url}/api/orders/add/`,
                order,
                config
            );

            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data,
            });

            dispatch({ type: CART_CLEAR_ITEMS, payload: data });
            localStorage.removeItem("cartItems");
        } catch (error) {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload:
                    error.response.data && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };

export const getOrderDetails =
    (id: number) => async (dispatch: any, getState) => {
        try {
            dispatch({ type: ORDER_DETAILS_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(
                `${url}/api/orders/${id}/`,
                config
            );

            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload:
                    error.response.data && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };

export const getMyOrders = () => async (dispatch: any, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `${url}/api/orders/my-orders/`,
            config
        );

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload:
                error.response.data && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const cancelOrder =
    (order: object) => async (dispatch: any, getState) => {
        try {
            dispatch({ type: ORDER_CANCEL_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                `${url}/api/orders/cancel/${order[0]["id"]}/`,
                order,
                config
            );

            dispatch({
                type: ORDER_CANCEL_SUCCESS,
                payload: data,
            });

            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ORDER_CANCEL_FAIL,
                payload:
                    error.response.data && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };
