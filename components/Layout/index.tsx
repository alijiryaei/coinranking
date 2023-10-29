import {
  AppBar,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Head from "next/head";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleColorMode } from "@/store/colorMode/colorModeSlice";

interface RootLayoutProps {
  title: string;
}

const RootLayot: FC<PropsWithChildren<RootLayoutProps>> = ({
  children,
  title,
}) => {
  const mode = useSelector((state:RootState) => state.persistedReducer.colorMode.mode) ?? "light";
  const dispatch = useDispatch();

  const handleToggleColorModeClick = () => {
   const color = mode === "light" ? "dark" : "light"
   dispatch(toggleColorMode(color))
  }
  return(
  <>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <AppBar color="transparent" position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack direction="row" justifyContent="space-between" minWidth="100%">
            <Stack maxWidth="20%" direction="row" gap={2} alignItems="center">
              <Image
                src="https://cdn.coinranking.com/assets/64374966bb4cd0691a9429341ae9b413.svg"
                width={28}
                height={28}
                alt="logo"
              />
              <Typography variant="h5">Coinranking</Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <IconButton>
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton onClick={handleToggleColorModeClick}>
                {mode === "light" ? (<ModeNightIcon />) : (<WbSunnyIcon />)}
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
    <main style={{marginTop : 50}}>{children}</main>
  </>
)};

export default RootLayot;
