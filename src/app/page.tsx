"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PagesProvider } from "./context/pages";
import PageRenderer from "./components/Pages";
import Layout from "./components/Global/Layout";
import { AnswersProvider } from "./context/answers";
import ProgressBar from "./components/ProgressBar";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    success: {
      main: '#000000',
    },
    warning: {
      main: '#000000',
    },
    primary: {
      main: '#000000',
    }

  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PagesProvider>
          <AnswersProvider>
            <CssBaseline />
            <Layout>
              <ProgressBar />
              <PageRenderer />
            </Layout>
          </AnswersProvider>
        </PagesProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
