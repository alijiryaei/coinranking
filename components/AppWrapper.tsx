import { RootState } from "@/store/store";
import { Theme, createTheme } from "@mui/material";
import { FC, useMemo } from "react";
import { useSelector } from "react-redux";

interface AppWrapperProps {
  children: (them : Theme) => JSX.Element;
}

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  const mode = useSelector(
    (state: RootState) => state.persistedReducer.colorMode.mode,
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return <>{children(theme)}</>;
};

export default AppWrapper;
