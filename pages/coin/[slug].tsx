import Http from "@utils/Http";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CoinDetail } from "@/types/coinDetailPage";
import CoinDetailPage from "@/components/Templates/Coin";


interface CoinDetailData {
  data: {
    coin: CoinDetail;
  };
}

export default function CoinPage({
  coin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <CoinDetailPage {...coin} />
  );
}

export const getServerSideProps: GetServerSideProps<{
  coin: CoinDetail;
}> = async ({ query }) => {
  const uuid = query.slug as string;
  const res = await Http.get<CoinDetailData>({ url: `coin/${uuid}` });

  return {
    props: {
      coin: res.data.coin,
    },
  };
};
