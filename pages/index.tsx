import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Http from "@utils/Http";
import HomePage from "@/components/Templates";
import { Coin } from "@/types/homePage";
import RootLayot from "@/components/Layout";

interface CoinsData {
  data: {
    coins: Coin[];
  };
}

export default function Home({
  coins,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <RootLayot title="Coinranking">
      <HomePage coins={coins} />
    </RootLayot>
  );
}

export const getServerSideProps: GetServerSideProps<{
  coins: Coin[];
}> = async ({ query }) => {
  try {
  const params = {
    orderBy: query.sorton ? query.sorton : "marketCap",
    orderDirection: query.sortby ?? "desc",
    offset: query.page ? Number(query.page) * 50 - 50 : 0,
  };
  const res = await Http.get<CoinsData>({ url: "coins", params });

  return {
    props: {
      coins: res.data.coins,
    },
  };
  } catch(e) {
    return {
      notFound : true
    }
  }
};
