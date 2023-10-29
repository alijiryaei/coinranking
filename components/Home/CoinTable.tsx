import { Box, Table, TableBody, TableContainer } from "@mui/material";
import CoinTableHead from "./CoinTableHead";
import CoinTableRow from "./CoinTableRow";
import { Coin } from "@/types/homePage";
import { FC } from "react";

interface CoinTableProps {
  coins: Coin[];
}

const CoinTable: FC<CoinTableProps> = ({ coins }) => (
  <TableContainer marginTop={4} component={Box}>
    <Table stickyHeader>
      <CoinTableHead />
      <TableBody>
        {coins.map((coin) => (
           <CoinTableRow key={coin.uuid} {...coin} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CoinTable;
