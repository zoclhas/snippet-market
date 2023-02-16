import { useState, useRef } from "react";
import {
    TextInput,
    Textarea,
    SimpleGrid,
    Group,
    Title,
    Button,
    Container,
    LoadingOverlay,
    createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Message } from "@/components/message/message";
import { useRouter } from "next/router";
import emailjs from "@emailjs/browser";

const useStyles = createStyles({
    wrapper: {
        paddingTop: 64,
        paddingBottom: 64,
        position: "relative",
    },
});

export default function Contact() {
    const { classes } = useStyles();
    const router = useRouter();

    const formRef = useRef();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const emailServiceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
    const emailTemplateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
    const emailPublicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validate: {
            name: (value) => value.trim().length < 2,
            email: (value) => !/^\S+@\S+$/.test(value),
        },
    });

    const sendEmail = () => {
        setLoading(true);

        emailjs
            .sendForm(
                emailServiceId,
                emailTemplateId,
                formRef.current,
                emailPublicKey
            )
            .then(
                (result) => {
                    console.log(result.text);
                    setLoading(false);

                    (
                        document.getElementById(
                            "contactForm"
                        ) as HTMLFormElement
                    ).reset();
                    location.reload();
                },
                (error) => {
                    console.log(error.text);
                    setLoading(false);
                    setError(error.text);
                }
            );
    };

    return (
        <Container id="contact" className={classes.wrapper}>
            <LoadingOverlay visible={loading} overlayBlur={2} />
            {error && (
                <Message color="red" title="Uh oh!">
                    {error}
                </Message>
            )}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendEmail();
                }}
                ref={formRef}
                id="contactForm"
            >
                <Title order={2} size="h1">
                    Get in touch
                </Title>

                <SimpleGrid
                    cols={2}
                    mt="xl"
                    breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                >
                    <TextInput
                        label="Name"
                        placeholder="Your name"
                        name="user_name"
                        variant="filled"
                        required
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Your email"
                        name="user_email"
                        variant="filled"
                        required
                        {...form.getInputProps("email")}
                    />
                </SimpleGrid>
                <Textarea
                    mt="md"
                    label="Message"
                    placeholder="Your message"
                    maxRows={10}
                    minRows={5}
                    autosize
                    name="message"
                    variant="filled"
                    required
                    {...form.getInputProps("subject")}
                />

                <Group position="center" mt="xl">
                    <Button type="submit" size="md" radius="md">
                        Send message
                    </Button>
                </Group>
            </form>
        </Container>
    );
}
