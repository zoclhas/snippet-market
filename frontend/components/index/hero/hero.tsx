import { createStyles, Container, Text, Button, Group } from "@mantine/core";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: "relative",
        boxSizing: "border-box",
    },

    inner: {
        position: "relative",
        paddingTop: 200,
        paddingBottom: 120,

        [BREAKPOINT]: {
            paddingBottom: 80,
            paddingTop: 80,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 62,
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [BREAKPOINT]: {
            fontSize: 42,
            lineHeight: 1.2,
        },
    },

    description: {
        marginTop: theme.spacing.xl,
        fontSize: 24,

        [BREAKPOINT]: {
            fontSize: 18,
        },
    },

    controls: {
        marginTop: theme.spacing.xl * 2,

        [BREAKPOINT]: {
            marginTop: theme.spacing.xl,
        },
    },

    control: {
        height: 54,
        paddingLeft: 38,
        paddingRight: 38,

        [BREAKPOINT]: {
            height: 54,
            paddingLeft: 18,
            paddingRight: 18,
            flex: 1,
        },
    },
}));

export default function Hero() {
    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    <Text
                        component="span"
                        variant="gradient"
                        gradient={{ from: "blue", to: "cyan" }}
                        inherit
                    >
                        Snippet
                    </Text>{" "}
                    Market
                </h1>

                <Text className={classes.description} color="dimmed">
                    Elevate your stationery game with our premium products,
                    offered at a competitive price.
                </Text>

                <Group className={classes.controls}>
                    <a href="#products">
                        <Button
                            size="xl"
                            className={classes.control}
                            variant="gradient"
                            gradient={{ from: "blue", to: "cyan" }}
                            rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        >
                            Products
                        </Button>
                    </a>

                    <Link href="/login">
                        <Button
                            component="a"
                            href="https://github.com/mantinedev/mantine"
                            size="xl"
                            variant="default"
                            className={classes.control}
                            rightIcon={
                                <FontAwesomeIcon
                                    icon={faArrowUpRightFromSquare}
                                />
                            }
                        >
                            Login
                        </Button>
                    </Link>
                </Group>
            </Container>
        </div>
    );
}
