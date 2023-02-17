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

import { addToCart, removeFromCart } from "@/redux/actions/cartActions";

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
        justifyContent: "space-between",
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

    const productId = router.query["id"] as unknown as number;
    const qty = router.query["qty"] as unknown as number;

    const cart = useSelector((state: any) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty) as any);
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id: number) => {
        dispatch(removeFromCart(id) as any);
    };

    const checkoutHandler = () => {
        router.push("/login?redirect=shipping");
    };

    const url = process.env.NEXT_PUBLIC_API_URL;

    return (
        <>
            <Head>
                <title>Snippet | Cart</title>
            </Head>
            <Container className={classes.wrapper}>
                <Title>Cart</Title>
                <Space h="xl" />
                {cartItems && (
                    <>
                        {cartItems.length === 0 ? (
                            <Message title="Cart is empty!" color="red">
                                Please add items to your cart.{" "}
                                <Anchor component={Link} href="/products">
                                    Go back
                                </Anchor>
                            </Message>
                        ) : (
                            <div className={classes.cart_content}>
                                <SimpleGrid
                                    cols={2}
                                    breakpoints={[{ maxWidth: "xs", cols: 1 }]}
                                >
                                    {cartItems.map((item, index: number) => (
                                        <Card
                                            shadow="xl"
                                            radius="lg"
                                            withBorder
                                            p={0}
                                            style={{ overflow: "visible" }}
                                            key={item.product}
                                        >
                                            <Group
                                                spacing={0}
                                                style={{ overflow: "hidden" }}
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
                                                    <Text fz={22} fw={600}>
                                                        {item.name}
                                                    </Text>
                                                    <Space h={3} />
                                                    <Divider variant="dotted" />
                                                    <Text fz={18} fw={600}>
                                                        ${item.price}
                                                    </Text>
                                                    <Space h={3} />
                                                    <Divider variant="dotted" />
                                                    <Space h="xs" />
                                                    <Select
                                                        defaultValue={String(
                                                            item.qty
                                                        )}
                                                        value={String(item.qty)}
                                                        radius="lg"
                                                        data={Array(
                                                            item.countInStock
                                                        )
                                                            .fill(0)
                                                            .map(
                                                                (_, index) =>
                                                                    `${
                                                                        index +
                                                                        1
                                                                    }`
                                                            )}
                                                        onChange={(e) => {
                                                            dispatch(
                                                                addToCart(
                                                                    item.product,
                                                                    parseInt(e)
                                                                ) as any
                                                            );
                                                        }}
                                                    />
                                                    <Space h="xs" />
                                                    <Divider variant="dotted" />
                                                    <Space h="xs" />
                                                    <Button
                                                        color="red"
                                                        variant="light"
                                                        radius="md"
                                                        onClick={() =>
                                                            removeFromCartHandler(
                                                                item.product
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </Button>
                                                </div>
                                            </Group>
                                        </Card>
                                    ))}
                                </SimpleGrid>
                                <Card
                                    shadow="xl"
                                    radius="lg"
                                    withBorder
                                    className={classes.checkout}
                                >
                                    <Text size="lg" mb={16}>
                                        <Group>
                                            <Text fw={800}>Items:</Text>
                                            {cartItems.reduce(
                                                (acc, item) => acc + item.qty,
                                                0
                                            )}
                                        </Group>
                                    </Text>
                                    <Card.Section>
                                        <Divider />
                                    </Card.Section>
                                    <Text size="lg" mt={16} mb={16}>
                                        <Group>
                                            <Text fw={800}>Subtotal:</Text>$
                                            {cartItems
                                                .reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        item.qty * item.price,
                                                    0
                                                )
                                                .toFixed(2)}
                                        </Group>
                                    </Text>
                                    <Card.Section>
                                        <Divider />
                                    </Card.Section>
                                    <Button
                                        mt={16}
                                        radius="lg"
                                        variant="light"
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                        styles={() => ({
                                            root: {
                                                width: "100%",
                                            },
                                        })}
                                    >
                                        Checkout&nbsp;
                                        <FontAwesomeIcon
                                            icon={faArrowRightLong}
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
