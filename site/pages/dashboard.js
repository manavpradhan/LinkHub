import LinkBox from "@/components/LinkBox";
import useThemeStore from "@/store/themeStore";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const dashboard = () => {
  const router = useRouter();
  const { user_token, user_handle } = useUserStore((state) => ({
    user_token: state.user_token,
    user_handle: state.user_handle,
  }));

  const theme = useThemeStore();

  useEffect(() => {
    if (user_token === "") {
      router.push("login");
    }
  }, [user_token]);

  return (
    <>
      <div className="flex gap-4 items-center justify-center md:justify-start px-8 pt-6 dark:bg-black bg-white w-full  text-gray-600 dark:text-white">
        <button className="inline-flex items-center gap-3 border-purple-500 rounded-md border-[2px] px-4 md:px-6 py-4 dark:bg-purple-900 hover:bg-purple-300 dark:hover:bg-purple-500 transition-all">
          <img
            src={
              theme.current_theme === "light"
                ? "/svg/editL.svg"
                : "/svg/editD.svg"
            }
            className="w-6 fill-white"
          />
          <span className="font-semibold">Edit Links</span>
        </button>
        <button className="inline-flex items-center gap-3 border-purple-500 rounded-md border-[2px] px-4 md:px-6 py-4 dark:bg-purple-900 hover:bg-purple-300 dark:hover:bg-purple-500 transition-all">
          <img
            src={
              theme.current_theme === "light"
                ? "/svg/avatarL.svg"
                : "/svg/avatarD.svg"
            }
            className="w-7 text-white"
          />
          <span className="font-semibold">Edit Profile</span>
        </button>
      </div>
      <main className="w-full min-h-screen dark:bg-black bg-white p-6">
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 text-gray-600 dark:text-white">
          <LinkBox
            lbTitle={"Links"}
            lbNumber={5}
            lbSvg={"url"}
            lbTheme={"bg-red-400"}
          />
          <LinkBox
            lbTitle={"Growth"}
            lbNumber={"30%"}
            lbSvg={"growth"}
            lbTheme={"bg-yellow-400"}
          />
        </section>
      </main>
    </>
  );
};

export default dashboard;
