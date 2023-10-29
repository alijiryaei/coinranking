import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import useQueryUtils from "@/hooks/useQueryUtils";

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
  
  return (
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
  );
};

export default CoinTableHead;
