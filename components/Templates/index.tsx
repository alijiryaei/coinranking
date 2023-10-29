import Container from "@mui/material/Container";
import CoinTable from "../Home/CoinTable";
import { FC } from "react";
import { Coin } from "@/types/homePage";
import { Pagination, Stack } from "@mui/material";
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
    <Container maxWidth="lg">
      <CoinTable coins={coins} />
      <Stack padding={3} direction="row" justifyContent="center" width="100%">
        <Pagination
          page={page}
          onChange={handleChange}
          count={10}
          shape="rounded"
        />
      </Stack>
    </Container>
  );
};

export default HomePage;
