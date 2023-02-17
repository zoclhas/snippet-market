import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Text,
    Title,
    createStyles,
    Space,
    Card,
    LoadingOverlay,
    Button,
    Group,
    SimpleGrid,
} from "@mantine/core";
import Link from "next/link";
import Head from "next/head";
import { Message } from "@/components/message/message";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import { listProducts } from "@/redux/actions/productActions";

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: "4rem",
        paddingBottom: "2rem",
    },

    card_hover: {
        position: "relative",
        bottom: "0px",

        display: "flex",
        flexDirection: "column",

        "&:hover": {
            bottom: "6px",
        },
    },

    card_content: {
        display: "grid",
        gridTemplateRows: "0.5fr 1fr 0.5fr",
        minHeight: "fit-content",

        flexGrow: 1,
    },

    product_image_wrapper: {
        overflow: "hidden",
    },
    product_image: {
        objectFit: "cover",
        aspectRatio: "1",

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

    card_description: {
        maxHeight: 120,
        overflow: "hidden",
    },

    link: {
        textDecoration: "none",
    },
}));

export default function Products() {
    const { classes } = useStyles();
    const dispatch = useDispatch();

    const productsList = useSelector(
        (state: any) => state.productReducer.products
    );
    let { loading, products, error } = productsList;

    let query = "";
    let pageNo = 1;

    useEffect(() => {
        dispatch(listProducts(query, pageNo) as any);
    }, [dispatch, query, pageNo]);

    const url = process.env.NEXT_PUBLIC_API_URL;

    return (
        <>
            <Head>
                <title>Snippet | Products</title>
            </Head>
            {loading ? (
                <div style={{ width: "100%", position: "relative" }}>
                    <LoadingOverlay visible={loading} overlayBlur={5} />
                </div>
            ) : error ? (
                <Message color="red" title="Uh oh!">
                    {error}
                </Message>
            ) : (
                <Container className={classes.wrapper}>
                    <Title>Products</Title>
                    <Space h="xl" />
                    <SimpleGrid
                        cols={3}
                        spacing="xl"
                        verticalSpacing="xl"
                        breakpoints={[
                            { maxWidth: "xs", cols: 1 },
                            { maxWidth: "sm", cols: 2 },
                        ]}
                    >
                        {products.map((product: any) => {
                            return (
                                <Card
                                    shadow="sm"
                                    p="lg"
                                    radius="lg"
                                    withBorder
                                    key={product.name}
                                    className={classes.card_hover}
                                    component={Link}
                                    href={`/product/${product.id}`}
                                >
                                    <Card.Section
                                        className={
                                            classes.product_image_wrapper
                                        }
                                    >
                                        <img
                                            src={`${url}${product.image}`}
                                            alt={`${product.name} image`}
                                            width="100%"
                                            className={classes.product_image}
                                        />
                                    </Card.Section>

                                    <Card.Section
                                        p="xl"
                                        className={classes.card_content}
                                    >
                                        <Card.Section
                                            pl="xl"
                                            pr="xl"
                                            style={{ alignSelf: "flex-start" }}
                                        >
                                            <Group>
                                                <Text size={22} weight={800}>
                                                    {product.name}
                                                </Text>
                                            </Group>
                                            <Group>
                                                <Text
                                                    mb="md"
                                                    weight="bold"
                                                    color="cyan"
                                                >
                                                    {product.old_price && (
                                                        <sup
                                                            className={
                                                                classes.old_price
                                                            }
                                                        >
                                                            ${product.old_price}
                                                        </sup>
                                                    )}
                                                    {product.old_price && " "}$
                                                    {product.price}
                                                </Text>
                                            </Group>
                                        </Card.Section>

                                        <Text
                                            size="sm"
                                            color="dimmed"
                                            dangerouslySetInnerHTML={{
                                                __html: product.description.replace(
                                                    new RegExp("\r?\n", "g"),
                                                    "<br />"
                                                ),
                                            }}
                                            className={classes.card_description}
                                        ></Text>

                                        <Link
                                            href={`/product/${product.id}`}
                                            className={classes.link}
                                            style={{ alignSelf: "flex-end" }}
                                        >
                                            <Button
                                                variant="light"
                                                color="blue"
                                                fullWidth
                                                mt="md"
                                                radius="lg"
                                            >
                                                Check it out &nbsp;
                                                <FontAwesomeIcon
                                                    icon={faArrowRightLong}
                                                />
                                            </Button>
                                        </Link>
                                    </Card.Section>
                                </Card>
                            );
                        })}
                    </SimpleGrid>
                </Container>
            )}
        </>
    );
}
