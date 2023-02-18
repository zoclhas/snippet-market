import { useState, useEffect } from "react";
import {
    Container,
    Card,
    TextInput,
    Loader,
    PasswordInput,
    Divider,
    Text,
    Title,
    Anchor,
    Button,
    Space,
    createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { Message } from "@/components/message/message";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faAt } from "@fortawesome/free-solid-svg-icons";

const useStyles = createStyles({
    wrapper: {
        height: "90vh",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    bottom_links: {
        display: "flex",
        justifyContent: "space-between",
    },
});

export default function ForgotPassword() {
    const { classes } = useStyles();
    const url = process.env.NEXT_PUBLIC_API_URL;

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const sendResetLink = async () => {
        setLoading(true);

        const { data: token } = await axios.get(`${url}/api/get-csrf-token/`);
        const csrftoken = getCookie("csrftoken");
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== "") {
                const cookies = document.cookie.split(";");
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === name + "=") {
                        cookieValue = decodeURIComponent(
                            cookie.substring(name.length + 1)
                        );
                        break;
                    }
                }
            }
            return cookieValue;
        }

        const { data } = await axios.post(
            `${url}/api/users/password-reset/`,
            {
                email: email,
            },
            {
                headers: { "X-CSRFToken": csrftoken },
            }
        );
        setLoading(false);
        setMessage(data);
    };

    return (
        <Container className={classes.wrapper}>
            <form
                style={{ flexGrow: 1, maxWidth: "30rem" }}
                onSubmit={(e) => {
                    e.preventDefault();
                    sendResetLink();
                }}
            >
                <Card withBorder shadow="xl" radius="xl">
                    <Text size="xl" fw={800} mb={16}>
                        Login
                    </Text>
                    <Card.Section mb={16}>
                        <Divider />
                    </Card.Section>
                    <TextInput
                        icon={<FontAwesomeIcon icon={faAt} />}
                        placeholder="johndoe@example.com"
                        radius="xl"
                        variant="filled"
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        mb={16}
                    />

                    {/* {error && (
                        <>
                            <Card.Section mb={16}>
                                <Divider />
                            </Card.Section>
                            <Message title="Uh oh!" color="red">
                                {error}
                            </Message>
                            <Space h={16} />
                        </>
                    )} */}
                    {message}
                    <Card.Section mb={16}>
                        <Divider />
                    </Card.Section>
                    <Button
                        onSubmit={sendResetLink}
                        variant="light"
                        radius="xl"
                        mb={16}
                        style={{ width: "100%" }}
                        type="submit"
                        loading={loading}
                    >
                        Send&nbsp;
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </Button>
                    <Card.Section mb={16}>
                        <Divider />
                    </Card.Section>
                    <div className={classes.bottom_links}>
                        <Text size="sm">
                            <Anchor component={Link} href="/forgot-password">
                                Forgot Password?
                            </Anchor>
                        </Text>
                        <Text size="sm">
                            New here?&nbsp;
                            <Anchor component={Link} href="/register">
                                Register{" "}
                                <FontAwesomeIcon icon={faArrowRightLong} />
                            </Anchor>
                        </Text>
                    </div>
                </Card>
            </form>
        </Container>
    );
}
