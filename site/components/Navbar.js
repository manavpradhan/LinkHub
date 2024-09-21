import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import styles from "../styles/themeToggle.module.css";
import useUserStore from "@/store/userStore";
import useThemeStore from "@/store/themeStore";

const NavBar = ({ setTheme }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user_id, user_handle, user_email, flag, user_token } = useUserStore(
    (state) => ({
      user_id: state.user_id,
      user_handle: state.user_handle,
      user_email: state.user_email,
      flag: state.user_logged,
      user_token: state.user_token,
    })
  );

  const user = useUserStore();
  const theme = useThemeStore();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.asPath]);

  const handleLogout = () => {
    user.resetUser();
  };

  return (
    <>
      <nav className="bg-gray-300 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 flex-1">
          <Link href="/" className="flex items-center">
            <img
              src="/images/favicon.ico"
              className="h-8 mr-3"
              alt="Company Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              LinkHub
            </span>
          </Link>
          <button
            onClick={toggleMobileMenu}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`${
              mobileMenuOpen ? "" : "hidden"
            } w-full md:block md:w-auto focus:outline-none`}
            id="navbar-default"
          >
            <div className={`${styles.smallLayout} flex gap-20`}>
              <ul className="font-medium flex flex-col md:items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-300 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-300 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    href="/"
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                {user_handle === "" && (
                  <li>
                    <Link
                      href="/apply"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Apply
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/features"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Custom
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="flex justify-center items-center gap-10">
                <ThemeToggle setTheme={setTheme} />
                <div className="flex gap-4 items-center">
                  {flag ? (
                    <>
                      <div className="flex gap-3 text-right items-center">
                        <div className="flex flex-col text-xs  md:text-md flex-wrap dark:text-gray-300">
                          <span className="font-semibold">{user_handle}</span>
                          <span>Role</span>
                        </div>
                        <div>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/4140/4140061.png"
                            className="w-10"
                          />
                        </div>
                      </div>
                      <div className="flex items-center ml-4 gap-5">
                        <img
                          src={
                            theme.current_theme === "light"
                              ? "/svg/notificationL.svg"
                              : "/svg/notificationD.svg"
                          }
                          className="w-7 cursor-pointer"
                        />
                        <img
                          src={
                            theme.current_theme === "light"
                              ? "/svg/logoutL.svg"
                              : "/svg/logoutD.svg"
                          }
                          className="w-6 cursor-pointer"
                          onClick={handleLogout}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      plz log in
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
