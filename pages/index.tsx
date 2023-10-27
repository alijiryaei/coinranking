import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Http from "@utils/Http";
import Container from "@mui/material/Container";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { priceFormatter } from "@/utils/Helper";


interface Coin {
  uuid: string;
  name: string;
  price: string;
  iconUrl: string;
  marketCap: string;
  rank: number;
  change : string
}

interface CoinsData {
  data: {
    coins: Coin[];
  };
}




export default function Home({
  coins,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Coinranking</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="lg">
          <TableContainer sx={{ maxHeight: "100vh" }} component={Box}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left">All coins</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Market Cap</TableCell>
                  <TableCell align="left">7d</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coins.map((coin) => (
                  <TableRow hover key={coin.uuid}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" gap={2}>
                        {coin.rank}
                        <img
                          style={{ width: 24, height: 24 }}
                          src={coin.iconUrl}
                        />
                        {coin.name}
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{priceFormatter(coin.price)}</TableCell>
                    <TableCell align="left">{priceFormatter(coin.marketCap)}</TableCell>
                    <TableCell>{coin.change}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  coins: Coin[];
}> = async () => {
  const res = await Http.get<CoinsData>({ url: "coins" });

  return {
    props: {
      coins: res.data.coins,
    },
  };
};
