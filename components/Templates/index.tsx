import Head from "next/head";
import Container from "@mui/material/Container";
import CoinTable from "../Home/CoinTable";
import { FC } from "react";
import { Coin } from "@/types/homePage";
import { Box, Pagination, Stack } from "@mui/material";
import useQueryUtils from "@/hooks/useQueryUtils";

interface HomePageProps {
  coins: Coin[];
}

const HomePage: FC<HomePageProps> = ({ coins }) => {
  const queryUtils = useQueryUtils();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    queryUtils.update("page", value.toString());
  };

  const page = queryUtils.state.page ? Number(queryUtils.state.page) : 1;
  return (
    <>
      <Head>
        <title>Coinranking</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="lg">
          <Box width={200} height={200}>
            test box
          </Box>
          <CoinTable coins={coins} />
          <Stack
            padding={3}
            direction="row"
            justifyContent="center"
            width="100%"
          >
            <Pagination
              page={page}
              onChange={handleChange}
              count={10}
              shape="rounded"
            />
          </Stack>
        </Container>
      </main>
    </>
  );
};

export default HomePage;
