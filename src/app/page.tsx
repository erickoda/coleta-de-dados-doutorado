"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PersonalData from "./components/Pages/PersonalData";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Instructions from "./components/Pages/Instructions";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <main className="flex col min-h-screen bg-neutral-900 flex-col items-center justify-center">
          <div className="flex flex-col items-start justify-start bg-neutral-700 rounded-base p-4 text-neutral-100 max-w-3xl space-y-3">
            {/* <ConsentStatement /> */}
            {/* <PersonalData /> */}
            <Instructions />
          </div>
        </main>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
