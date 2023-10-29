import { priceFormatter } from "@/utils/Helper";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import Http from "@utils/Http";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface CoinDetail {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  iconUrl: string;
  websiteUrl: string;
  marketCap: string;
  price: string;
  change: string;
  numberOfMarkets: number;
  numberOfExchanges: number;
  color: string;
}

interface CoinDetailData {
  data: {
    status: string;
    coin: CoinDetail;
  };
}

export default function CoinPage({
  coin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    palette: { error, success },
  } = useTheme();
  return (
    <>
      <Box
        mb={2}
        width="100%"
        height={100}
        sx={{ backgroundColor: coin.color, opacity: 0.3 }}
      />
      <Container maxWidth="lg">
        <Stack mb={2} direction="row" gap={2} alignItems="center">
          <img src={coin.iconUrl} width={30} height={30} />
          <Typography variant="h4">{coin.name}</Typography>
          <Typography variant="body1">{coin.symbol}</Typography>
        </Stack>
        <Stack mb={2}>
          <Typography variant="h4">{priceFormatter(coin.price)}</Typography>
          <Typography
            color={+coin.change > 0 ? success.main : error.main}
            variant="h6"
          >
            {coin.change}
          </Typography>
        </Stack>
        <Box>
          <Typography variant="caption">
            Coin description: {coin.description}
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  coin: CoinDetail;
}> = async ({ query }) => {
  const uuid = query.slug as string;
  const res = await Http.get<CoinDetailData>({ url: `coin/${uuid}`});

  return {
    props: {
      coin: res.data.coin,
    },
  };
};
