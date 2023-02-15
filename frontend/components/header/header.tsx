import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Paper,
    Transition,
    Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ThemeSwitch } from "./themeSwtich";
import Link from "next/link";
import { useRouter } from "next/router";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
    root: {
        zIndex: 999,
        position: "fixed",
        boxShadow: "0 7px 16px rgba(0, 0, 0, 0.09);",
    },

    dropdown: {
        position: "absolute",
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: "hidden",

        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: "8px 12px",
        borderRadius: theme.radius.md,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },

        [theme.fn.smallerThan("sm")]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).color,
        },
    },
}));

interface NavbarProps {
    links: { link: string; label: string }[];
}

interface userInfoProps {
    userInfo: {
        token: string;
        id: number;
        username: string;
        email: string;
        isAdmin: boolean;
    }[];
}

export function Navbar({ links }: NavbarProps, userInfo?: userInfoProps) {
    const [opened, { toggle, close }] = useDisclosure(false);
    const { classes, cx } = useStyles();

    const router = useRouter();

    const items = links.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: router.pathname === link.link,
            })}
            onClick={(event) => {
                close();
            }}
        >
            {link.label}
        </Link>
    ));

    function isObjEmpty(obj: any) {
        return Object.keys(obj).length === 0;
    }

    return (
        <Header height={HEADER_HEIGHT} className={classes.root}>
            <Container className={classes.header}>
                <Link href="/" className={classes.link}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-scissors"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        ></path>
                        <path d="M6 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                        <path d="M6 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                        <path d="M8.6 8.6l10.4 10.4"></path>
                        <path d="M8.6 15.4l10.4 -10.4"></path>
                    </svg>
                </Link>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>

                <Group>
                    {isObjEmpty(userInfo) ? (
                        <Link href="/login">
                            <Button className={classes.links}>Log in</Button>
                        </Link>
                    ) : (
                        <Button>HI</Button>
                    )}
                    <ThemeSwitch display="hide" />
                </Group>

                <Group className={classes.burger}>
                    <ThemeSwitch display="show" />
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        className={classes.burger}
                        size="sm"
                    />
                </Group>

                <Transition transition="fade" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper
                            className={classes.dropdown}
                            withBorder
                            style={styles}
                            radius="lg"
                            shadow="xl"
                        >
                            {items}
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}
