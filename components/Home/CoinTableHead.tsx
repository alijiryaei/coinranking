import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import useQueryUtils from "@/hooks/useQueryUtils";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const CoinTableHead = () => {
  const queryUtils = useQueryUtils()
  const handleSortingClick = (key: string) => () => {
    if (queryUtils.state.sorton === key) {
      const sortByKey = queryUtils.state.sortby === "desc" ? "asc" : "desc";
      queryUtils.update("sortby", sortByKey);
      return;
    }
    queryUtils.updateMultipleParam({ sorton: key, sortby: "desc", page: "1" });
  };
  
  const icon =
    queryUtils.state.sortby &&
    (queryUtils.state.sortby === "desc" ? (
      <ArrowDropDownIcon fontSize="small" />
    ) : (
      <ArrowDropUpIcon fontSize="small" />
    ));
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left">
          <Typography
            sx={{ cursor: "pointer" ,display : "flex" , alignItems : "center"}}
            variant="subtitle2"
            onClick={handleSortingClick("")}
          >
            All coins
            {queryUtils.state.sorton === "" && icon}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography
            sx={{ cursor: "pointer" , display : "flex" , alignItems : "center"}}
            variant="subtitle2"
            onClick={handleSortingClick("price")}
          >
            Price
            {queryUtils.state.sorton === "price" && icon}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography
            sx={{ cursor: "pointer" , display : "flex" , alignItems : "center"}}
            variant="subtitle2"
            onClick={handleSortingClick("marketCap")}
          >
            Market Cap
            {queryUtils.state.sorton === "marketCap" && icon}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography
            sx={{ cursor: "pointer" , display : "flex" , alignItems : "center" }}
            variant="subtitle2"
            onClick={handleSortingClick("change")}
          >
            7d
            {queryUtils.state.sorton === "change" && icon}
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CoinTableHead;
