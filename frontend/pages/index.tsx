import { Divider } from "@mantine/core";
// import Head from "next/head";

import Hero from "@/components/index/hero/hero";
import Products from "@/components/index/products/products";
import Contact from "@/components/index/contact/contact";

export default function Home() {
    return (
        <>
            <Hero />
            <Divider />
            <Products />
            <Divider />
            <Contact />
        </>
    );
}
