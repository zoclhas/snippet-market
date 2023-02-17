import { useState, useEffect } from "react";
import {
    Container,
    Card,
    TextInput,
    PasswordInput,
    Divider,
    Text,
    Anchor,
    Button,
    Space,
    createStyles,
    SimpleGrid,
    Popover,
    Box,
    Progress,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { Message } from "@/components/message/message";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faIdBadge,
    faAt,
    faLock,
    faEye,
    faEyeSlash,
    faArrowRightLong,
    faRightToBracket,
    faCheck,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { register } from "@/redux/actions/userActions";

const useStyles = createStyles({
    wrapper: {
        height: "90vh",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    bottom_links: {
        display: "flex",
        justifyContent: "space-between",
    },
});

const requirements = [
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function PasswordRequirement({
    meets,
    label,
}: {
    meets: boolean;
    label: string;
}) {
    return (
        <Text
            color={meets ? "teal" : "red"}
            sx={{ display: "flex", alignItems: "center" }}
            mt={7}
            size="sm"
        >
            {meets ? (
                <FontAwesomeIcon icon={faCheck} />
            ) : (
                <FontAwesomeIcon icon={faXmark} />
            )}{" "}
            <Box ml={10}>{label}</Box>
        </Text>
    );
}

function getStrength(password: string) {
    let multiplier = password.length > 7 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function Register() {
    const { classes } = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const [popoverOpened, setPopoverOpened] = useState(false);
    const [visible, { toggle }] = useDisclosure(false);
    const [value, setValue] = useState("");
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(value)}
        />
    ));

    const strength = getStrength(value);
    const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(false as boolean | string);

    const redirect = router.query["redirect"];

    const userRegister = useSelector((state: any) => state.userRegister);
    const { loading, userInfo, error } = userRegister;

    const userLogin = useSelector((state: any) => state.userLogin);
    const { userInfo: userLoginInfo } = userLogin;
    useEffect(() => {
        if (userLoginInfo) router.push(`/${redirect ? redirect : ""}`);
    }, [router, userInfo, redirect]);

    const form = useForm({
        initialValues: {
            email: "",
        },
        validate: {
            email: (value) => !/^\S+@\S+$/.test(value),
        },
    });

    const registerHandler = () => {
        if (password === confirmPassword) {
            setPasswordErr(false);
            dispatch(register(name, email, password) as any);

            setInterval(() => {
                if (localStorage.getItem("userInfo")) location.reload();
            }, 1500);
        } else {
            setPasswordErr("Passwords don't match.");
        }
    };

    return (
        <>
            <Head>
                <title>Snippet | Register</title>
            </Head>
            <Container className={classes.wrapper}>
                <form
                    style={{ flexGrow: 1, maxWidth: "30rem" }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.onSubmit(registerHandler() as any);
                    }}
                >
                    <Card withBorder shadow="xl" radius="xl">
                        <Text size="xl" fw={800} mb={16}>
                            Register
                        </Text>
                        <Card.Section mb={16}>
                            <Divider />
                        </Card.Section>
                        <TextInput
                            icon={<FontAwesomeIcon icon={faIdBadge} />}
                            placeholder="John Doe"
                            radius="xl"
                            variant="filled"
                            required
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            mb={16}
                        />
                        <TextInput
                            icon={<FontAwesomeIcon icon={faAt} />}
                            placeholder="johndoe@example.com"
                            radius="xl"
                            variant="filled"
                            required
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            mb={16}
                        />
                        <SimpleGrid
                            cols={2}
                            breakpoints={[{ maxWidth: "xs", cols: 1 }]}
                        >
                            <Popover
                                opened={popoverOpened}
                                position="bottom"
                                width="target"
                                transition="pop"
                            >
                                <Popover.Target>
                                    <div
                                        onFocusCapture={() =>
                                            setPopoverOpened(true)
                                        }
                                        onBlurCapture={() =>
                                            setPopoverOpened(false)
                                        }
                                    >
                                        <PasswordInput
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faLock}
                                                />
                                            }
                                            placeholder="Password"
                                            variant="filled"
                                            radius="xl"
                                            required
                                            value={value}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setValue(e.target.value);
                                            }}
                                            visibilityToggleIcon={({
                                                reveal,
                                                size,
                                            }) =>
                                                reveal ? (
                                                    <Text size={size}>
                                                        <FontAwesomeIcon
                                                            icon={faEyeSlash}
                                                        />
                                                    </Text>
                                                ) : (
                                                    <Text size={size}>
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                        />
                                                    </Text>
                                                )
                                            }
                                            visible={visible}
                                            onVisibilityChange={toggle}
                                        />
                                    </div>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Progress
                                        color={color}
                                        value={strength}
                                        size={5}
                                        style={{ marginBottom: 10 }}
                                    />
                                    <PasswordRequirement
                                        label="Includes at least 8 characters"
                                        meets={value.length > 5}
                                    />
                                    {checks}
                                </Popover.Dropdown>
                            </Popover>
                            <PasswordInput
                                icon={<FontAwesomeIcon icon={faLock} />}
                                placeholder="Confirm Password"
                                variant="filled"
                                radius="xl"
                                required
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                visibilityToggleIcon={({ reveal, size }) =>
                                    reveal ? (
                                        <Text size={size}>
                                            <FontAwesomeIcon
                                                icon={faEyeSlash}
                                            />
                                        </Text>
                                    ) : (
                                        <Text size={size}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </Text>
                                    )
                                }
                                visible={visible}
                                onVisibilityChange={toggle}
                                mb={16}
                            />
                        </SimpleGrid>
                        {error && (
                            <>
                                <Card.Section mb={16}>
                                    <Divider />
                                </Card.Section>
                                <Message title="Uh oh!" color="red">
                                    {error}
                                </Message>
                                <Space h={16} />
                            </>
                        )}
                        {passwordErr && (
                            <>
                                <Card.Section mb={16}>
                                    <Divider />
                                </Card.Section>
                                <Message title="Uh oh!" color="red">
                                    {passwordErr}
                                </Message>
                                <Space h={16} />
                            </>
                        )}
                        <Card.Section mb={16}>
                            <Divider />
                        </Card.Section>
                        <Button
                            onClick={registerHandler}
                            variant="light"
                            radius="xl"
                            mb={16}
                            style={{ width: "100%" }}
                            type="submit"
                            loading={loading}
                            disabled={color !== "teal"}
                        >
                            Register&nbsp;
                            <FontAwesomeIcon icon={faRightToBracket} />
                        </Button>
                        <Card.Section mb={16}>
                            <Divider />
                        </Card.Section>
                        <div className={classes.bottom_links}>
                            <Text size="sm">
                                Already registered?&nbsp;
                                <Anchor component={Link} href="/login">
                                    Login{" "}
                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                </Anchor>
                            </Text>
                        </div>
                    </Card>
                </form>
            </Container>
        </>
    );
}
