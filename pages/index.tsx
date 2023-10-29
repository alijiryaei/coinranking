import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Http from "@utils/Http";
import Container from "@mui/material/Container";
import {
  Box,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { priceFormatter } from "@/utils/Helper";
import useQueryUtils from "@/hooks/useQueryUtils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateWishlist } from "@/store/wishlist/wishlistActions";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { WishlistItem } from "@/types/store";

interface Coin {
  uuid: string;
  name: string;
  price: string;
  iconUrl: string;
  marketCap: string;
  rank: number;
  change: string;
}

interface CoinsData {
  data: {
    coins: Coin[];
  };
}

export default function Home({
  coins,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const queryUtils = useQueryUtils();
  const wishlist = useSelector((state : RootState) => state.persistedReducer.wishlist.wishlistItems) ?? [];
  const dispatch = useDispatch();

  const handlewishlist = (wishlistItemToAdd : WishlistItem) => {
    dispatch(updateWishlist(wishlist , wishlistItemToAdd))
  }

  const handleSortingClick = (key: string) => () => {
    if (queryUtils.state.sorton === key) {
      const sortByKey = queryUtils.state.sortby === "desc" ? "asc" : "desc";
      queryUtils.update("sortby", sortByKey);
      return;
    }
    queryUtils.updateMultipleParam({ sorton: key, sortby: "desc" , page : "1"});
  };


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
     queryUtils.update("page" , value.toString());
  };

  const page = queryUtils.state.page ? Number(queryUtils.state.page) : 1;

  const handleCoinClick = (uuid : string) => () => {
    queryUtils.updateUrl(`coin/${uuid}`)
  }

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
          <TableContainer component={Box}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Typography
                      sx={{ cursor: "pointer" }}
                      variant="subtitle2"
                      onClick={handleSortingClick("")}
                    >
                      All coins
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      sx={{ cursor: "pointer" }}
                      variant="subtitle2"
                      onClick={handleSortingClick("price")}
                    >
                      Price
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      sx={{ cursor: "pointer" }}
                      variant="subtitle2"
                      onClick={handleSortingClick("marketCap")}
                    >
                      Market Cap
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      sx={{ cursor: "pointer" }}
                      variant="subtitle2"
                      onClick={handleSortingClick("change")}
                    >
                      7d
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coins.map((coin) => {
                  const favouriteCoin = wishlist.some(wishlistItem => wishlistItem.uuid === coin.uuid)
                  return(
                  <TableRow  sx={{cursor: "pointer"}} onClick={handleCoinClick(coin.uuid)} hover key={coin.uuid}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" gap={2}>
                        <IconButton onClick={(e) => {
                          e.stopPropagation()
                          handlewishlist({uuid : coin.uuid , name: coin.name , iconUrl:coin.iconUrl})
                        }}>
                          <FavoriteIcon color={favouriteCoin ? "error" : "inherit"} fontSize="small" />
                        </IconButton>
                        {coin.rank}
                        <img
                          style={{ width: 24, height: 24 }}
                          src={coin.iconUrl}
                        />
                        {coin.name}
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      {priceFormatter(coin.price)}
                    </TableCell>
                    <TableCell sx={{ width: 200 }} align="left">
                      {priceFormatter(coin.marketCap)}
                    </TableCell>
                    <TableCell>{coin.change}</TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack
            padding={3}
            direction="row"
            justifyContent="center"
            width="100%"
          >
            <Pagination page={page} onChange={handleChange} count={10} shape="rounded" />
          </Stack>
        </Container>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  coins: Coin[];
}> = async ({ query }) => {
  const params = {
    orderBy: query.sorton ? query.sorton : "marketCap",
    orderDirection: query.sortby ?? "desc",
    offset: query.page ? Number(query.page) * 50 - 50 : 0
  };
  const res = await Http.get<CoinsData>({ url: "coins", params });

  return {
    props: {
      coins: res.data.coins,
    },
  };
};
