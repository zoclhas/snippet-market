import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Text,
    Title,
    createStyles,
    Anchor,
    Space,
    Card,
    LoadingOverlay,
    Button,
    Group,
    SimpleGrid,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { Message } from "@/components/message/message";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowUpRightFromSquare,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

import { listProducts } from "@/redux/actions/productActions";

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: "3rem",
        paddingBottom: "3rem",
    },

    card_alignment: {
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

    card_header: {
        marginLeft: "0.2rem",
        marginRight: "0.2rem",
    },

    old_price: {
        textDecoration: "line-through",
        color: theme.colors.gray[6],
    },

    link: {
        textDecoration: "none",
    },
}));

export default function Products() {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();

    const productsList = useSelector(
        (state: any) => state.productReducer.products
    );
    let { loading, products, error } = productsList;

    if (products) {
        products = products.slice(0, 3);
    }

    let query = "";
    let pageNo = 1;

    useEffect(() => {
        dispatch(listProducts(query, pageNo));
    }, [dispatch, query, pageNo]);

    const url = process.env.NEXT_PUBLIC_API_URL;

    return (
        <Container id="products" className={classes.wrapper}>
            <Title>Products</Title>
            <Anchor href="/products" component={Link}>
                View more <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Anchor>
            <Space h="xl" />
            {loading ? (
                <div style={{ width: "100%", position: "relative" }}>
                    <LoadingOverlay visible={loading} overlayBlur={5} />
                </div>
            ) : error ? (
                <Message color="red" title="Uh oh!">
                    {error}
                </Message>
            ) : (
                <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
                    {products.map((product: any) => (
                        <Card
                            shadow="sm"
                            p="lg"
                            radius="lg"
                            withBorder
                            key={product.name}
                            className={classes.card_alignment}
                        >
                            <Card.Section
                                className={classes.product_image_wrapper}
                            >
                                <img
                                    src={`${url}${product.image}`}
                                    alt={`${product.name} image`}
                                    width="100%"
                                    className={classes.product_image}
                                />
                            </Card.Section>

                            <Card.Section className={classes.card_header}>
                                <Group mt="md">
                                    <Text size={22} weight={800}>
                                        {product.name}
                                    </Text>
                                </Group>
                                <Group>
                                    <Text mb="md" weight="bold" color="cyan">
                                        {product.old_price && (
                                            <sup className={classes.old_price}>
                                                ${product.old_price}
                                            </sup>
                                        )}
                                        {product.old_price && " "}$
                                        {product.price}
                                    </Text>
                                </Group>
                            </Card.Section>

                            <Text size="sm" color="dimmed">
                                {product.description.length > 30
                                    ? product.description.substring(0, 31) +
                                      "..."
                                    : product.description}
                            </Text>

                            <Link
                                href={`/product/${product.id}`}
                                className={classes.link}
                            >
                                <Button
                                    variant="light"
                                    color="blue"
                                    fullWidth
                                    mt="md"
                                    radius="lg"
                                >
                                    Check it out &nbsp;
                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                </Button>
                            </Link>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Container>
    );
}
