import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from "@/redux/types/userTypes";

const url = process.env.NEXT_PUBLIC_API_URL;

export const login =
    (email: string, password: string) => async (dispatch: any) => {
        try {
            dispatch({ type: USER_LOGIN_REQUEST });

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                `${url}/api/users/login/`,
                { email: email, password: password },
                config
            );

            dispatch({
                type: USER_LOGIN_SUCCESS,
                paylod: data,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                    error.response.data && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };
