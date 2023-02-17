import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
} from "@/redux/types/cartTypes";
import axios from "axios";
import { Dispatch } from "redux";

const url = process.env.NEXT_PUBLIC_API_URL;

export const addToCart =
    (id: number, qty: number) => async (dispatch: any, getState: any) => {
        const { data } = await axios.get(`${url}/api/product/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data.id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.count_in_stock,
                qty,
            },
        });
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    };

export const removeFromCart =
    (id: number) => (dispatch: any, getState: any) => {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id,
        });

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    };

export const saveShippingAddress = (data: object) => (dispatch: Dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
};
