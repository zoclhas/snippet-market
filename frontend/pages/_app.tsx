import { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import { Provider } from "react-redux";
import { useStore } from "@/store";

import { Navbar } from "@/components/header/header";

import "@/styles/main.css";

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    const links = [
        { link: "/", label: "Home" },
        {
            link: "/products",
            label: "Products",
        },
        { link: "/faq", label: "FaQ" },
    ];

    const store = useStore(pageProps.initialReduxState);

    return (
        <>
            <Head>
                <title>Snippet</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <Provider store={store}>
                <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}
                >
                    <MantineProvider
                        theme={{ colorScheme }}
                        withGlobalStyles
                        withNormalizeCSS
                    >
                        <ModalsProvider>
                            <Navbar links={links} />
                            <Component {...pageProps} />
                        </ModalsProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            </Provider>
        </>
    );
}
