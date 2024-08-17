"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PagesProvider } from "./context/pages";
import PageRenderer from "./components/Pages";
import Layout from "./components/Global/Layout";
import { AnswersProvider } from "./context/answers";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
              <PageRenderer />
            </Layout>
          </AnswersProvider>
        </PagesProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
