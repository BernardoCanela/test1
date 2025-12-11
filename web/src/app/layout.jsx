import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const metadata = {
  title: "Mindframe Media | Vision Framed, Impact Delivered",
  description:
    "A creative agency in Vila Nova de Gaia helping brands, businesses, and creators through strategy, storytelling, and design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Poppins:wght@200;300;500;700&display=swap"
          rel="stylesheet"
        />
        <style jsx global>{`
          .font-montserrat { font-family: 'Montserrat', sans-serif; }
          .font-poppins { font-family: 'Poppins', sans-serif; }
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 10px; }
          ::-webkit-scrollbar-track { background: #000; }
          ::-webkit-scrollbar-thumb { background: #FF0000; }
          ::-webkit-scrollbar-thumb:hover { background: #CC0000; }
        `}</style>
      </head>
      <body className="font-poppins bg-white text-black">
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
