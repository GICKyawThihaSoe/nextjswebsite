import Layout from "@/compas/Layout";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
