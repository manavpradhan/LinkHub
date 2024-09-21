import "../styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import NProgress from "nprogress";
import "../public/nprogress.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import useUserStore from "@/store/userStore";
import useThemeStore from "@/store/themeStore";

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  const user = useUserStore();
  const router = useRouter();
  const curTheme = useThemeStore();

  useEffect(() => {
    const userInfo = user.loadUser();
    if (Object.keys(userInfo).length !== 0) {
      const token = localStorage.getItem("user-token");
      user.setUserInfo(userInfo, token);
    }

    const now = new Date();
    if (now.getTime > user.expiry) {
      localStorage.removeItem("user-info");
      localStorage.removeItem("user-token");
    }

    curTheme.setTheme(theme);
    curTheme.saveTheme(theme);

    const handleStart = () => {
      setIsLoading(true);
      NProgress.start();
    };
    const handleComplete = () => {
      setIsLoading(false);
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [theme]);

  return (
    <div className={theme}>
      <NavBar setTheme={setTheme} />
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-WYTYXQXVK6`}
      />
      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-WYTYXQXVK6', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Component {...pageProps} />
      <ToastContainer />
      {isLoading && (
        <div className="nprogress-custom-parent">
          <div className="nprogress-custom-bar" />
        </div>
      )}
      <Footer />
    </div>
  );
}
