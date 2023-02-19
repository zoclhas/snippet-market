import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Text,
    Title,
    createStyles,
    Loader,
    Card,
    Button,
    Group,
    Image,
    Divider,
    Select,
} from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { Message } from "@/components/message/message";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import { getProduct } from "@/redux/actions/productActions";

const useStyles = createStyles((theme) => ({
    wrapper: {
        maxWidth: "1300px",
        minHeight: "90vh",
        paddingTop: "6rem",
        paddingBottom: "2rem",

        display: "grid",
        placeItems: "center",
    },

    product_info: {
        display: "grid",
        gridTemplateColumns: "1fr 0.5fr 0.5fr",
        gap: "2rem",

        [theme.fn.smallerThan("xs")]: {
            gridTemplateColumns: "1fr",
        },
    },

    product_content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },

    add_to_cart: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
}));

export default function Product() {
    const { classes } = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const getProductById = useSelector(
        (state: any) => state.productReducer.product
    );
    let { loading, product, error } = getProductById;

    const id = parseInt(router.asPath.split("/")[2]);

    useEffect(() => {
        dispatch(getProduct(id) as any);
    }, [dispatch, id]);

    const [qty, setQty] = useState<string | number>(1);

    const addToCart = () => {
        router.push(`/cart?id=${id}&qty=${qty}`);
    };

    const url = process.env.NEXT_PUBLIC_API_URL;

    return (
        <Container className={classes.wrapper}>
            {loading ? (
                <Loader size="xl" variant="bars" />
            ) : error ? (
                <Message title="Uh oh!" color="red">
                    {error}
                </Message>
            ) : (
                <>
                    {product && (
                        <>
                            <Head>
                                <title>Snippet | {product.name}</title>
                            </Head>
                            <div className={classes.product_info}>
                                <Image
                                    radius="lg"
                                    height="100%"
                                    fit="cover"
                                    src={`${url}${product.image}`}
                                    alt={`${product.name} image`}
                                    withPlaceholder
                                />
                                <div className={classes.product_content}>
                                    <Title>{product.name}</Title>
                                    <Divider size="sm" variant="dashed" />
                                    <Text
                                        color="dimmed"
                                        dangerouslySetInnerHTML={{
                                            __html: product.description.replace(
                                                new RegExp("\r?\n", "g"),
                                                "<br />"
                                            ),
                                        }}
                                    ></Text>
                                </div>
                                <Card
                                    shadow="xl"
                                    radius="lg"
                                    withBorder
                                    className={classes.add_to_cart}
                                >
                                    <Text size="lg" mb={16}>
                                        <Group>
                                            <Text fw={800}>Price:</Text>$
                                            {product.price}
                                        </Group>
                                    </Text>
                                    <Card.Section>
                                        <Divider />
                                    </Card.Section>
                                    <Text size="lg" mt={16} mb={16}>
                                        <Group>
                                            <Text fw={800}>Status:</Text>
                                            {product.count_in_stock > 0 ? (
                                                <Text color="green">
                                                    In Stock
                                                </Text>
                                            ) : (
                                                <Text color="red">
                                                    Out of Stock
                                                </Text>
                                            )}
                                        </Group>
                                    </Text>
                                    <Card.Section>
                                        <Divider />
                                    </Card.Section>
                                    <Text size="lg" mt={16} mb={16}>
                                        <Group>
                                            <Text fw={800}>Qty:</Text>
                                            <Select
                                                maxDropdownHeight={150}
                                                value={String(qty)}
                                                disabled={
                                                    product.count_in_stock <= 0
                                                }
                                                radius="lg"
                                                data={
                                                    product.count_in_stock > 0
                                                        ? Array(
                                                              product.count_in_stock
                                                          )
                                                              .fill(0)
                                                              .map(
                                                                  (_, index) =>
                                                                      `${
                                                                          index +
                                                                          1
                                                                      }`
                                                              )
                                                        : []
                                                }
                                                onChange={setQty}
                                            />
                                        </Group>
                                    </Text>
                                    <Card.Section>
                                        <Divider />
                                    </Card.Section>
                                    <Button
                                        mt={16}
                                        disabled={product.count_in_stock <= 0}
                                        variant="light"
                                        radius="lg"
                                        onClick={addToCart}
                                    >
                                        <FontAwesomeIcon icon={faCartPlus} />
                                        &nbsp; Add to Cart
                                    </Button>
                                </Card>
                            </div>
                        </>
                    )}
                </>
            )}
        </Container>
    );
}
