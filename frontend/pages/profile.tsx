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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faIdBadge,
    faAt,
    faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { getUserDetails } from "@/redux/actions/userActions";

const useStyles = createStyles({
    wrapper: {
        minHeight: "90vh",
        maxWidth: "1300px",
        paddingTop: "6rem",
        paddingBottom: "2rem",
    },

    profile_grid: {
        display: "grid",
        gridTemplateColumns: "0.4fr 1fr",
        gap: "1rem",
    },
});

export default function Profile() {
    const { classes } = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const form = useForm({
        initialValues: {
            email: "",
        },
        validate: {
            email: (value) => !/^\S+@\S+$/.test(value),
        },
    });

    const userDetails = useSelector((state: any) => state.userDetails);
    const { loading, user, error } = userDetails;

    const userLogin = useSelector((state: any) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        } else {
            if (!user || !user.name) dispatch(getUserDetails("profile") as any);
        }
    }, [dispatch, userInfo]);

    const updateUserHandler = () => {
        //TODO
    };

    return (
        <Container className={classes.wrapper}>
            <Title>User Profile</Title>
            <Space h={32} />
            <div className={classes.profile_grid}>
                <div>
                    <Title size={22}>Edit Profile</Title>
                    <Space h={16} />
                    {loading && (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Loader variant="bars" />
                            </div>
                            <Space h={16} />
                        </>
                    )}
                    {error && (
                        <>
                            <Message title="Uh oh!" color="red">
                                {error}
                            </Message>
                            <Space h={16} />
                        </>
                    )}
                    {user && (
                        <form onSubmit={updateUserHandler}>
                            <Card withBorder shadow="xl" radius="lg">
                                <TextInput
                                    icon={<FontAwesomeIcon icon={faIdBadge} />}
                                    defaultValue={user.name}
                                    placeholder="John Doe"
                                    radius="xl"
                                    variant="filled"
                                    required
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    mb={16}
                                />
                                <TextInput
                                    icon={<FontAwesomeIcon icon={faAt} />}
                                    defaultValue={user.email}
                                    placeholder="johndoe@example.com"
                                    radius="xl"
                                    variant="filled"
                                    required
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    mb={16}
                                />
                                <Card.Section mb={16}>
                                    <Divider />
                                </Card.Section>
                                <Button
                                    onClick={updateUserHandler}
                                    variant="light"
                                    radius="xl"
                                    style={{ width: "100%" }}
                                    type="submit"
                                    loading={loading}
                                >
                                    Update&nbsp;
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                            </Card>
                        </form>
                    )}
                </div>
                <div>
                    <Title size={22}>Orders</Title>
                </div>
            </div>
        </Container>
    );
}
