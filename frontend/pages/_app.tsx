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
import { useStore } from "@/redux/store";

import { Navbar } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";

import { Analytics } from "@vercel/analytics/react";

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
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
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
                            <Footer links={links} />
                            <Analytics />
                        </ModalsProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            </Provider>
        </>
    );
}
