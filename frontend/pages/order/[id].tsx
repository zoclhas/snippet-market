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

export default function Order() {
    const { classes } = useStyles();

    return (
        <Container className={classes.wrapper}>
            <Title>Order</Title>
        </Container>
    );
}
