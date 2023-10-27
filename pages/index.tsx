import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import type { GetServerSideProps , InferGetServerSidePropsType} from "next";
import Http from "@utils/Http";

const inter = Inter({ subsets: ["latin"] });

interface Coin {
  uuid: string;
  name: string;
  price: string;
}

interface CoinsData {
  data: {
    coins : Coin[]
  }
}

export default function Home({coins}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Coinranking</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>{coins.map((item)=> <div key={item.uuid}>{item.name}</div>)}</div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{coins : Coin[]}> = async () => {
  const res = await Http.get<CoinsData>({ url: "coins" });

  return {
    props: {
      coins: res.data.coins,
    },
  };
};
