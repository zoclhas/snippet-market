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
    SimpleGrid,
    createStyles,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import { saveShippingAddress } from "@/redux/actions/cartActions";

const useStyles = createStyles({
    wrapper: {
        minHeight: "90vh",
        paddingTop: "6rem",
        paddingBottom: "2rem",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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

export default function Shipping() {
    const { classes } = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const cart = useSelector((state: any) => state.cart);
    const { shippingAddress } = cart.shippingAddress;

    const [location, setLocation] = useState(
        shippingAddress?.location ? shippingAddress.location : ""
    );
    const [grade, setGrade] = useState(
        shippingAddress?.grade ? shippingAddress.grade : ""
    );

    const submitHandler = () => {
        dispatch(saveShippingAddress({ location, grade }) as any);
        router.push("/order");
    };

    return (
        <>
            <Head>
                <title>Snippet | Shipping</title>
            </Head>
            <Container className={classes.wrapper}>
                <div style={{ width: "100%" }}>
                    <Title>Shipping</Title>
                    <Space h={16} />
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitHandler();
                        }}
                    >
                        <Card withBorder shadow="xl" radius="xl">
                            <SimpleGrid cols={2} mb={16}>
                                <TextInput
                                    defaultValue={
                                        shippingAddress?.location
                                            ? shippingAddress.location
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    placeholder="Enter location"
                                    radius="xl"
                                    variant="filled"
                                    label="Location"
                                    required
                                    mb={16}
                                />
                                <TextInput
                                    defaultValue={
                                        shippingAddress?.grade
                                            ? shippingAddress.grade
                                            : ""
                                    }
                                    onChange={(e) => setGrade(e.target.value)}
                                    placeholder="Example: 12B"
                                    radius="xl"
                                    variant="filled"
                                    label="Grade"
                                    required
                                    mb={16}
                                />
                            </SimpleGrid>
                            <Card.Section mb={16}>
                                <Divider />
                            </Card.Section>
                            <Button
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    submitHandler();
                                }}
                                variant="light"
                                radius="xl"
                                style={{ width: "100%" }}
                                type="submit"
                                // loading={loading}
                            >
                                Save&nbsp;
                                <FontAwesomeIcon icon={faFloppyDisk} />
                            </Button>
                        </Card>
                    </form>
                </div>
            </Container>
        </>
    );
}
