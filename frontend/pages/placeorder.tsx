import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Text,
    Title,
    createStyles,
    Space,
    Card,
    Button,
    Group,
    Divider,
    Anchor,
    SimpleGrid,
} from "@mantine/core";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Message } from "@/components/message/message";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

import { createOrder } from "@/redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "@/redux/types/orderTypes";

const useStyles = createStyles((theme) => ({
    wrapper: {
        maxWidth: "1300px",
        paddingTop: "6rem",
        paddingBottom: "2rem",
    },

    cart_content: {
        display: "grid",
        gridTemplateColumns: "1fr 0.2fr",
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
        justifyContent: "center",
    },

    product_image_wrapper: {
        overflow: "hidden",
        borderRadius: theme.radius.lg,
    },
    product_image: {
        objectFit: "cover",

        transition: "250ms ease-in-out",

        "&:hover": {
            scale: "1.05",
        },

        [theme.fn.largerThan("sm")]: {
            aspectRatio: "1",
        },
    },

    checkout: {
        height: "max-content",
    },
}));

export default function Cart() {
    const { classes } = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const cart = useSelector((state: any) => state.cart);
    const { cartItems } = cart;
    const shippingAddress = cart.shippingAddress;

    const orderCreate = useSelector((state: any) => state.orderCreate);
    const { loading, success, order, error } = orderCreate;

    useEffect(() => {
        if (success) {
            router.push(`/order/${order.id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [success, router]);

    const placeOrder = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: "Cash on delivery",

                itemsPrice: cart.cartItems
                    .reduce((acc, item) => acc + item.price * item.qty, 0)
                    .toFixed(2),

                taxPrice: Number(
                    0.05 *
                        cart.cartItems
                            .reduce(
                                (acc, item) => acc + item.price * item.qty,
                                0
                            )
                            .toFixed(2)
                ).toFixed(2),

                totalPrice: Number(
                    parseFloat(
                        cart.cartItems
                            .reduce(
                                (acc, item) => acc + item.price * item.qty,
                                0
                            )
                            .toFixed(2)
                    ) +
                        0.05 *
                            cart.cartItems.reduce(
                                (acc, item) => acc + item.price * item.qty,
                                0
                            )
                ).toFixed(2),
            }) as any
        );
    };

    useEffect(() => {
        if (
            shippingAddress.location === undefined ||
            shippingAddress.grade === undefined
        )
            router.push("/shipping");
    }, [shippingAddress]);

    const url = process.env.NEXT_PUBLIC_API_URL;

    return (
        <>
            <Head>
                <title>Snippet | Cart</title>
            </Head>
            <Container className={classes.wrapper}>
                <Title>Place Order</Title>
                <Space h="xl" />
                {cartItems && (
                    <>
                        {cartItems.length === 0 ? (
                            <Message title="Cart is empty!" color="red">
                                Please add items to your cart.
                                <Anchor component={Link} href="/products">
                                    Go back
                                </Anchor>
                            </Message>
                        ) : (
                            <div className={classes.cart_content}>
                                <div>
                                    <div>
                                        <SimpleGrid cols={2}>
                                            <Text size={20}>
                                                <Title size={20}>
                                                    Shipping:
                                                </Title>
                                                {shippingAddress?.location},{" "}
                                                {shippingAddress?.grade}
                                            </Text>
                                            <Text size={20}>
                                                <Title size={20}>
                                                    Payment Method:
                                                </Title>
                                                Cash on delivery
                                            </Text>
                                        </SimpleGrid>
                                    </div>
                                    <Space h={16} />
                                    <Divider />
                                    <Space h={16} />
                                    <SimpleGrid
                                        cols={2}
                                        breakpoints={[
                                            { maxWidth: "xs", cols: 1 },
                                        ]}
                                    >
                                        {cartItems.map(
                                            (item, index: number) => (
                                                <Card
                                                    shadow="xl"
                                                    radius="lg"
                                                    withBorder
                                                    p={0}
                                                    style={{
                                                        overflow: "visible",
                                                    }}
                                                    key={item.product}
                                                >
                                                    <Group
                                                        spacing={0}
                                                        style={{
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <Card.Section
                                                            className={
                                                                classes.product_image_wrapper
                                                            }
                                                        >
                                                            <img
                                                                src={`${url}${item.image}`}
                                                                alt={`${item.name} image`}
                                                                width="100%"
                                                                height={250}
                                                                className={
                                                                    classes.product_image
                                                                }
                                                            />
                                                        </Card.Section>
                                                        <div
                                                            className={
                                                                classes.card_body
                                                            }
                                                        >
                                                            <Text
                                                                fz={22}
                                                                fw={600}
                                                            >
                                                                {item.name}
                                                            </Text>
                                                            <Divider variant="dashed" />
                                                            <Text
                                                                fz={18}
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                }}
                                                            >
                                                                {item.qty} X $
                                                                {item.price}
                                                                =&nbsp;
                                                                <Text fw={600}>
                                                                    $
                                                                    {(
                                                                        item.qty *
                                                                        item.price
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </Text>
                                                            </Text>
                                                        </div>
                                                    </Group>
                                                </Card>
                                            )
                                        )}
                                    </SimpleGrid>
                                </div>
                                <Card
                                    shadow="xl"
                                    radius="lg"
                                    withBorder
                                    className={classes.checkout}
                                >
                                    <Title size={22} mb={16}>
                                        Order Summary
                                    </Title>
                                    <Card.Section mb={16}>
                                        <Divider />
                                    </Card.Section>
                                    <Text size="lg" mb={16}>
                                        <Group>
                                            <Text fw={800}>Subtotal:</Text>$
                                            {cart.cartItems
                                                .reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        item.price * item.qty,
                                                    0
                                                )
                                                .toFixed(2)}
                                        </Group>
                                    </Text>
                                    <Card.Section>
                                        <Divider />
                                    </Card.Section>
                                    <Text size="lg" mt={16} mb={16}>
                                        <Group>
                                            <Text fw={800}>VAT:</Text>$
                                            {Number(
                                                0.05 *
                                                    cart.cartItems
                                                        .reduce(
                                                            (acc, item) =>
                                                                acc +
                                                                item.price *
                                                                    item.qty,
                                                            0
                                                        )
                                                        .toFixed(2)
                                            ).toFixed(2)}
                                        </Group>
                                    </Text>
                                    <Card.Section>
                                        <Divider />
                                    </Card.Section>
                                    <Text size="lg" mt={16} mb={16}>
                                        <Group>
                                            <Text fw={800}>Total:</Text>$
                                            {Number(
                                                parseFloat(
                                                    cart.cartItems
                                                        .reduce(
                                                            (acc, item) =>
                                                                acc +
                                                                item.price *
                                                                    item.qty,
                                                            0
                                                        )
                                                        .toFixed(2)
                                                ) +
                                                    0.05 *
                                                        cart.cartItems.reduce(
                                                            (acc, item) =>
                                                                acc +
                                                                item.price *
                                                                    item.qty,
                                                            0
                                                        )
                                            ).toFixed(2)}
                                        </Group>
                                    </Text>
                                    <Card.Section mb={16}>
                                        <Divider />
                                    </Card.Section>
                                    {error && (
                                        <>
                                            <Message title="Uh oh!" color="red">
                                                {error}
                                            </Message>
                                            <Card.Section mt={16} mb={16}>
                                                <Divider />
                                            </Card.Section>
                                        </>
                                    )}
                                    <Button
                                        radius="lg"
                                        variant="light"
                                        disabled={cartItems.length === 0}
                                        onClick={placeOrder}
                                        styles={() => ({
                                            root: {
                                                width: "100%",
                                            },
                                        })}
                                    >
                                        Place Order&nbsp;
                                        <FontAwesomeIcon
                                            icon={faCartArrowDown}
                                        />
                                    </Button>
                                </Card>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}
