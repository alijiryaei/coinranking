import Http from "@utils/Http";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CoinDetail } from "@/types/coinDetailPage";
import CoinDetailPage from "@/components/Templates/Coin";
import RootLayot from "@/components/Layout";

interface CoinDetailData {
  data: {
    coin: CoinDetail;
  };
}

export default function CoinPage({
  coin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <RootLayot title={coin.name}>
      <CoinDetailPage {...coin} />
    </RootLayot>
  );
}

export const getServerSideProps: GetServerSideProps<{
  coin: CoinDetail;
}> = async ({ query }) => {
  try {
  const uuid = query.slug as string;
  const res = await Http.get<CoinDetailData>({ url: `coin/${uuid}` });

  return {
    props: {
      coin: res.data.coin,
    },
  };
  }catch(e) {
    return {
      notFound : true
    }
  } 
};
