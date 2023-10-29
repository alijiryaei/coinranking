import { RootState } from "@/store/store";
import { updateWishlist } from "@/store/wishlist/wishlistActions";
import { WishlistItem } from "@/types/store";
import { priceFormatter } from "@/utils/Helper";
import { Box, Container, IconButton, Stack, Typography, useTheme } from "@mui/material";
import Http from "@utils/Http";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';

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

  const dispatch = useDispatch();
  const wishlist =
    useSelector(
      (state: RootState) => state.persistedReducer.wishlist.wishlistItems,
    ) ?? [];
  const favouriteCoin = wishlist.some(
    (wishlistItem) => wishlistItem.uuid === coin.uuid,
  );

  const handlewishlist = (wishlistItemToAdd: WishlistItem) => {
    dispatch(updateWishlist(wishlist, wishlistItemToAdd));
  };

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
          <IconButton
            onClick={() => {
              handlewishlist({
                uuid: coin.uuid,
                name: coin.name,
                iconUrl: coin.iconUrl,
              });
            }}
          >
            <FavoriteIcon
              color={favouriteCoin ? "error" : "inherit"}
              fontSize="small"
            />
          </IconButton>
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
  const res = await Http.get<CoinDetailData>({ url: `coin/${uuid}` });

  return {
    props: {
      coin: res.data.coin,
    },
  };
};
