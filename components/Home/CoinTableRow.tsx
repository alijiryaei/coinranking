import useQueryUtils from "@/hooks/useQueryUtils";
import useWishlist from "@/hooks/useWishlist";
import { priceFormatter } from "@/utils/Helper";

import { IconButton, Stack, TableCell, TableRow } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { FC } from "react";
import { Coin } from "@/types/homePage";

const CoinTableRow: FC<Coin> = ({
  uuid,
  name,
  iconUrl,
  rank,
  price,
  marketCap,
  change,
}) => {
  const queryUtils = useQueryUtils();
  const { isFavouriteCoin, handleFavouriteCoinClick } = useWishlist();

  const handleCoinClick = (_uuid: string) => () => {
    queryUtils.updateUrl(`coin/${_uuid}`);
  };

  return (
    <TableRow sx={{ cursor: "pointer" }} onClick={handleCoinClick(uuid)} hover>
      <TableCell>
        <Stack alignItems="center" direction="row" gap={2}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleFavouriteCoinClick({
                uuid,
                name,
                iconUrl,
              });
            }}
          >
            <FavoriteIcon
              color={isFavouriteCoin(uuid) ? "error" : "inherit"}
              fontSize="small"
            />
          </IconButton>
          {rank}
          <img style={{ width: 24, height: 24 }} src={iconUrl} alt={name} />
          {name}
        </Stack>
      </TableCell>
      <TableCell align="left">{priceFormatter(price)}</TableCell>
      <TableCell sx={{ width: 200 }} align="left">
        {priceFormatter(marketCap)}
      </TableCell>
      <TableCell>{change}</TableCell>
    </TableRow>
  );
};

export default CoinTableRow;
