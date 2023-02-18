import { useState, useEffect } from "react";
import {
    Container,
    Card,
    TextInput,
    Loader,
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

import { getUserDetails, updateUserProfile } from "@/redux/actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "@/redux/types/userTypes";

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

    bottom_links: {
        display: "flex",
        justifyContent: "space-between",
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

    const userUpdateProfile = useSelector(
        (state: any) => state.userUpdateProfile
    );
    const { success, error: updateError } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails("profile") as any);
                setName(userInfo.name);
                setEmail(userInfo.email);
            }
        }
    }, [dispatch, userInfo, user, success]);

    const updateUserHandler = () => {
        dispatch(
            updateUserProfile({
                id: user.id,
                name: name,
                email: email,
            }) as any
        );
    };

    const url = process.env.NEXT_PUBLIC_API_URL;

    return (
        <>
            <Head>
                <title>Snippet | Profile</title>
            </Head>
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
                        {updateError && (
                            <>
                                <Message title="Uh oh!" color="red">
                                    {updateError}
                                </Message>
                                <Space h={16} />
                            </>
                        )}
                        {user && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    updateUserHandler();
                                }}
                            >
                                <Card withBorder shadow="xl" radius="lg">
                                    <TextInput
                                        icon={
                                            <FontAwesomeIcon icon={faIdBadge} />
                                        }
                                        defaultValue={user.name}
                                        placeholder="John Doe"
                                        radius="xl"
                                        variant="filled"
                                        required
                                        type="text"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        mb={16}
                                    />
                                    <Card.Section mb={16}>
                                        <Divider />
                                    </Card.Section>
                                    <Button
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            updateUserHandler();
                                        }}
                                        variant="light"
                                        radius="xl"
                                        style={{ width: "100%" }}
                                        type="submit"
                                        loading={loading}
                                        mb={16}
                                    >
                                        Update&nbsp;
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Button>
                                    <Card.Section mb={16}>
                                        <Divider />
                                    </Card.Section>
                                    <div className={classes.bottom_links}>
                                        <Text size="sm">
                                            <Anchor
                                                component={Link}
                                                href={`${url}/api/password-reset/`}
                                            >
                                                Change Password?
                                            </Anchor>
                                        </Text>
                                    </div>
                                </Card>
                            </form>
                        )}
                    </div>
                    <div>
                        <Title size={22}>Orders</Title>
                    </div>
                </div>
            </Container>
        </>
    );
}
