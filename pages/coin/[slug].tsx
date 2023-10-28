import Http from "@utils/Http";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface CoinDetail {
    uuid : string;
    symbol : string;
    name : string;
    description : string;
    iconUrl : string;
    websiteUrl : string;
    marketCap : string;
    price :string;
    change : string;
    numberOfMarkets : number;
    numberOfExchanges : number;

}

interface CoinDetailData {
    data : {
        coin : CoinDetail
    }
}

export default function CoinPage({coin} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <p>{coin.name}</p>;
}



export const getServerSideProps: GetServerSideProps<{
  coin : CoinDetail
}> = async ({ query }) => {
  const uuid = query.slug as string;
  const res = await Http.get<CoinDetailData>({ url: `coin/${uuid}`});

  return {
    props: {
      coin: res.data.coin,
    },
  };
};
