import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import { Navbar } from "@/components/header/header";

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    const links = [
        {
            link: "/products",
            label: "Products",
        },
        {
            link: "/contact",
            label: "Contact",
        },
    ];

    return (
        <>
            <Head>
                <title>Snippet</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: "dark",
                }}
            >
                <ModalsProvider>
                    <Navbar links={links} />
                    <Component {...pageProps} />
                </ModalsProvider>
            </MantineProvider>
        </>
    );
}
