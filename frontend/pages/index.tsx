import { Divider } from "@mantine/core";
// import Head from "next/head";

import Hero from "@/components/index/hero/hero";
import Products from "@/components/index/products/products";

export default function Home() {
    return (
        <>
            <Hero />
            <Divider />
            <Products />
            <Divider />
        </>
    );
}
