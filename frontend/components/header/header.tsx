import { useState } from "react";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Paper,
    Transition,
    Button,
    Menu,
    Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ThemeSwitch } from "./themeSwtich";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faUser,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { logout } from "@/redux/actions/userActions";

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

    modal_footer: {
        display: "flex",
        gap: "1rem",
        justifyContent: "flex-end",
    },
}));

interface NavbarProps {
    links: { link: string; label: string }[];
}

export function Navbar({ links }: NavbarProps) {
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [opened, { toggle, close }] = useDisclosure(false);
    const { classes, cx } = useStyles();
    const [logoutModal, setLogoutModal] = useState(false);

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

    const dispatch = useDispatch();
    const userLogin = useSelector((state: any) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout() as any);
    };

    return (
        <>
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
                        {userInfo ? (
                            <Menu
                                position="bottom-end"
                                transition="pop-top-right"
                                onClose={() => setUserMenuOpened(false)}
                                onOpen={() => setUserMenuOpened(true)}
                            >
                                <Menu.Target>
                                    <Button
                                        variant="light"
                                        radius="md"
                                        className={classes.links}
                                    >
                                        {userInfo.name}
                                    </Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        icon={<FontAwesomeIcon icon={faUser} />}
                                        component={Link}
                                        href="/profile"
                                    >
                                        Profile
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={
                                            <FontAwesomeIcon
                                                icon={faRightFromBracket}
                                            />
                                        }
                                        onClick={() => setLogoutModal(true)}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <Link href="/login">
                                <Button
                                    variant="light"
                                    radius="md"
                                    className={classes.links}
                                >
                                    Log in
                                </Button>
                            </Link>
                        )}
                        <Link href="/cart">
                            <Button
                                variant="light"
                                radius="md"
                                className={classes.links}
                            >
                                <FontAwesomeIcon icon={faCartShopping} />
                            </Button>
                        </Link>
                        <ThemeSwitch display="hide" />
                    </Group>

                    <Group className={classes.burger}>
                        <ThemeSwitch display="show" />
                        <Link href="/cart">
                            <Button variant="light" radius="md">
                                <FontAwesomeIcon icon={faCartShopping} />
                            </Button>
                        </Link>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            className={classes.burger}
                            size="sm"
                        />
                    </Group>

                    <Transition
                        transition="fade"
                        duration={200}
                        mounted={opened}
                    >
                        {(styles) => (
                            <Paper
                                className={classes.dropdown}
                                withBorder
                                style={styles}
                                radius="lg"
                                shadow="xl"
                            >
                                {items}
                                <Link
                                    href="profile"
                                    className={cx(classes.link, {
                                        [classes.linkActive]:
                                            router.pathname === "/profile",
                                    })}
                                >
                                    Profile
                                </Link>
                            </Paper>
                        )}
                    </Transition>
                </Container>
            </Header>
            <Modal
                opened={logoutModal}
                onClose={() => setLogoutModal(false)}
                centered
                overlayBlur={3}
                title="Are you sure you want to logout?"
                radius="lg"
            >
                <div className={classes.modal_footer}>
                    <Button
                        variant="default"
                        onClick={() => setLogoutModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="light"
                        onClick={() => {
                            logoutHandler();
                            setLogoutModal(false);
                        }}
                    >
                        Logout&nbsp;
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Button>
                </div>
            </Modal>
        </>
    );
}
