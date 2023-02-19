import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Text,
    Title,
    createStyles,
    Space,
    Loader,
    Card,
    Button,
    Group,
    Image,
    Divider,
    Select,
    Anchor,
    SimpleGrid,
} from "@mantine/core";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Message } from "@/components/message/message";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getOrderDetails } from "@/redux/actions/orderActions";

const useStyles = createStyles((theme) => ({
    wrapper: {
        maxWidth: "1300px",
        paddingTop: "6rem",
        paddingBottom: "2rem",
    },

    loader_wrapper: {
        marginTop: "1rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "center",
    },

    order_content: {
        display: "grid",
        gridTemplateColumns: "1fr 0.3fr",
        gap: "2rem",

        [theme.fn.smallerThan("xs")]: {
            gridTemplateColumns: "1fr",
        },
    },

    card_body: {
        height: "250px",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,

        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    product_image_wrapper: {
        overflow: "hidden",
    },
    product_image: {
        objectFit: "cover",
        aspectRatio: "1",

        transition: "250ms ease-in-out",

        "&:hover": {
            scale: "1.05",
        },
    },

    checkout: {
        height: "max-content",
    },
}));

export default function Order() {
    const { classes } = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const userLogin = useSelector((state: any) => state.userLogin);
    const { userInfo } = userLogin;

    const orderDetails = useSelector((state: any) => state.orderDetails);
    const { loading, order, error } = orderDetails;

    const orderId = parseInt(router.asPath.split("/")[2]);

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }

        if (!order || order.id !== orderId)
            dispatch(getOrderDetails(orderId) as any);
    }, [dispatch, order, orderId]);

    const url = process.env.NEXT_PUBLIC_API_URL;

    return (
        <>
            <Head>
                <title>Snippet | Order {order?.id}</title>
            </Head>
            <Container className={classes.wrapper}>
                <Title>Order #{order?.id}</Title>
                {loading ? (
                    <div className={classes.loader_wrapper}>
                        <Loader variant="bars" size="xl" />
                    </div>
                ) : error ? (
                    <>
                        <Space h={16} />
                        <Message title="Uh oh!" color="red">
                            {error}
                        </Message>
                    </>
                ) : (
                    <>
                        {order.orderItems.length === 0 ? (
                            <Message title="Cart is empty!" color="red">
                                Please add items to your cart.
                                <Anchor component={Link} href="/products">
                                    Go back
                                </Anchor>
                            </Message>
                        ) : (
                            <div className={classes.order_content}>
                                <SimpleGrid
                                    cols={3}
                                    mt={16}
                                    breakpoints={[
                                        { maxWidth: "xs", cols: 1 },
                                        { maxWidth: "sm", cols: 2 },
                                    ]}
                                >
                                    {order &&
                                        order.orderItems.map((item) => (
                                            <Card
                                                key={item.id}
                                                shadow="xl"
                                                radius="lg"
                                                withBorder
                                            >
                                                <Title size={18}>
                                                    {item.name}
                                                </Title>
                                                <Card.Section
                                                    mt={16}
                                                    mb={16}
                                                    className={
                                                        classes.product_image_wrapper
                                                    }
                                                >
                                                    <img
                                                        className={
                                                            classes.product_image
                                                        }
                                                        width="100%"
                                                        src={`${url}/${item.image}`}
                                                    />
                                                </Card.Section>
                                                <Text
                                                    style={{ display: "flex" }}
                                                >
                                                    <Text fw={800}>
                                                        Price:{" "}
                                                    </Text>
                                                    &nbsp;{item.qty} X $
                                                    {item.price}
                                                    &nbsp; =&nbsp;$
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
                                                </Text>
                                            </Card>
                                        ))}
                                </SimpleGrid>
                                <div>
                                    <Card
                                        shadow="xl"
                                        radius="lg"
                                        withBorder
                                        mt={16}
                                    >
                                        <Title size={22} mb={16}>
                                            Order Summary
                                        </Title>
                                        <Card.Section mb={16}>
                                            <Divider />
                                        </Card.Section>
                                        <Text
                                            style={{ display: "flex" }}
                                            mb={16}
                                        >
                                            <Text fw={800}>
                                                Payment Method:
                                            </Text>
                                            {order?.payment_method}
                                        </Text>
                                        <Card.Section mb={16}>
                                            <Divider />
                                        </Card.Section>
                                        <Text
                                            style={{ display: "flex" }}
                                            mb={16}
                                        >
                                            <Text fw={800}>Delivery ETA: </Text>
                                            {order?.delivery_eta
                                                ? order?.delivery_eta
                                                : "Will be updated soon"}
                                        </Text>
                                        <Card.Section mb={16}>
                                            <Divider />
                                        </Card.Section>
                                        <Text
                                            style={{ display: "flex" }}
                                            mb={16}
                                        >
                                            <Text fw={800}>Delivered: </Text>
                                            &nbsp;
                                            {order?.is_delivered ? "Yes" : "No"}
                                        </Text>
                                        <Card.Section mb={16}>
                                            <Divider />
                                        </Card.Section>
                                        <Text
                                            style={{ display: "flex" }}
                                            mb={16}
                                        >
                                            <Text fw={800}>Delivered At: </Text>
                                            &nbsp;
                                            {order?.delivered_at
                                                ? order?.delivered_at
                                                : "Not yet delivered"}
                                        </Text>
                                        <Card.Section mb={16}>
                                            <Divider />
                                        </Card.Section>
                                        <Text
                                            style={{ display: "flex" }}
                                            mb={16}
                                        >
                                            <Text fw={800}>Total Price: </Text>
                                            &nbsp; ${order?.total_price}
                                        </Text>
                                        <Card.Section mb={16}>
                                            <Divider />
                                        </Card.Section>
                                        <Text style={{ display: "flex" }}>
                                            <Text fw={800}>Paid: </Text>&nbsp;
                                            {order?.is_paid ? "Yes" : "No"}
                                        </Text>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}
