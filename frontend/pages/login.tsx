import { useState, useEffect } from "react";
import {
    Container,
    Card,
    TextInput,
    PasswordInput,
    Divider,
    Text,
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAt,
    faLock,
    faEye,
    faEyeSlash,
    faArrowRightLong,
    faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import { login } from "@/redux/actions/userActions";

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

export default function Login() {
    const { classes } = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirect = router.query["redirect"];

    const userLogin = useSelector((state: any) => state.userLogin);
    const { loading, userInfo, error } = userLogin;

    useEffect(() => {
        if (userInfo) router.push(`/${redirect ? redirect : ""}`);
    }, [router, userInfo, redirect]);

    const form = useForm({
        initialValues: {
            email: "",
        },
        validate: {
            email: (value) => !/^\S+@\S+$/.test(value),
        },
    });

    const loginHandler = () => {
        dispatch(login(email, password) as any);

        setInterval(() => {
            if (localStorage.getItem("userInfo")) location.reload();
        }, 1500);
    };

    return (
        <>
            <Head>
                <title>Snippet | Login</title>
            </Head>
            <Container className={classes.wrapper}>
                <form
                    style={{ flexGrow: 1, maxWidth: "30rem" }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.onSubmit(loginHandler() as any);
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
                        <PasswordInput
                            icon={<FontAwesomeIcon icon={faLock} />}
                            placeholder="••••••••"
                            variant="filled"
                            radius="xl"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            visibilityToggleIcon={({ reveal, size }) =>
                                reveal ? (
                                    <Text size={size}>
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    </Text>
                                ) : (
                                    <Text size={size}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </Text>
                                )
                            }
                            mb={16}
                        />
                        {error && (
                            <>
                                <Card.Section mb={16}>
                                    <Divider />
                                </Card.Section>
                                <Message title="Uh oh!" color="red">
                                    {error}
                                </Message>
                                <Space h={16} />
                            </>
                        )}
                        <Card.Section mb={16}>
                            <Divider />
                        </Card.Section>
                        <Button
                            onClick={loginHandler}
                            variant="light"
                            radius="xl"
                            mb={16}
                            style={{ width: "100%" }}
                            type="submit"
                            loading={loading}
                        >
                            Login&nbsp;
                            <FontAwesomeIcon icon={faRightToBracket} />
                        </Button>
                        <Card.Section mb={16}>
                            <Divider />
                        </Card.Section>
                        <div className={classes.bottom_links}>
                            <Text size="sm">
                                <Anchor
                                    component={Link}
                                    href="/forgot-password"
                                >
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
        </>
    );
}
