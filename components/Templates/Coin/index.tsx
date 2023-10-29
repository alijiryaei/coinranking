/* eslint-disable react/destructuring-assignment */
import useWishlist from "@/hooks/useWishlist";
import { priceFormatter } from "@/utils/Helper";

import { Box, Container, IconButton, Stack, Typography, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { FC } from "react";
import { CoinDetail } from "@/types/coinDetailPage";


const CoinDetailPage : FC<CoinDetail> = (coin) => {
  const {
    palette: { error, success },
  } = useTheme();
  const { isFavouriteCoin, handleFavouriteCoinClick } = useWishlist();
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
          <img src={coin.iconUrl} alt={coin.name} width={30} height={30}  />
          <Typography variant="h4">{coin.name}</Typography>
          <Typography variant="body1">{coin.symbol}</Typography>
          <IconButton
            onClick={() => {
              handleFavouriteCoinClick({
                uuid: coin.uuid,
                name: coin.name,
                iconUrl: coin.iconUrl,
              });
            }}
          >
            <FavoriteIcon
              color={isFavouriteCoin(coin.uuid) ? "error" : "inherit"}
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
};

export default CoinDetailPage;