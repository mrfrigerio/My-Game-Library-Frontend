import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/Auth";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./styles/theme";
import Routes from "./routes";
import { Layout } from "./components/Layout";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CssBaseline />
      <AuthProvider>
        <ThemeProvider theme={darkTheme}>
          <Box
            sx={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Layout>
              <Routes />
            </Layout>
          </Box>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
