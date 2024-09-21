import React, { useEffect, useState } from "react";
import styles from "../styles/apply.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import useUserStore from "@/store/userStore";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();
  const user = useUserStore();

  useEffect(() => {
    if (user.user_logged) {
      router.push("/dashboard");
    }
  }, [user.user_logged]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://192.168.0.11:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Invalid") {
          toast.error("Invalid email or password");
        }
        if (data.message === "logged in") {
          console.log(data);
          toast("Welcome " + data.user.userHandle);
          setLoggedIn(true);
          user.setUserInfo(data.user, data.token);
          user.saveUserInfo(data.user, data.token);
          router.push("/dashboard");
        }
      });
  };

  return (
    <>
      <section className="">
        <div
          className={
            styles.background +
            " main min-h-screen flex justify-center items-center flex-col"
          }
        >
          <div
            className={
              styles.content +
              "form bg-gray-50 p-5 rounded-lg dark:bg-gray-900 shadow-lg"
            }
          >
            <h1 className="text-2xl font-bold text-center dark:text-white">
              You are now among the top creators
            </h1>
            <p className="text-center dark:text-gray-100">
              Access your dashboard
            </p>
            <p className="text-center pt-6 pb-6 font-semibold text-gray-500 dark:text-gray-300">
              Start building your Hub 👇
            </p>
            <div className="">
              <form
                className=" flex flex-col gap-5 pb-5"
                onSubmit={handleSubmit}
              >
                <span className="flex shadow-md border-2 rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-800 dark:shadow-gray-700">
                  <img src="/svg/mail.svg" alt="" className="w-6 mr-4" />
                  <input
                    type="email"
                    placeholder="Email ID"
                    className="focus:outline-none text-center bg-transparent dark:text-white w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </span>
                <span className="flex  shadow-md border-2 rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-800 dark:shadow-gray-700">
                  <img src="/svg/password.svg" alt="" className="w-6 mr-4" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="focus:outline-none text-center bg-transparent dark:text-white w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </span>
                <input
                  type="submit"
                  value={"Login"}
                  className="w-full bg-indigo-500 p-2 rounded-md text-white cursor-pointer mt-3 hover:bg-indigo-700 ease-in-out transition-colors"
                />
              </form>
            </div>
          </div>
          <span className="flex gap-3 text-center text-sm text-gray-400 mt-5">
            <p className="">Don't have an account?</p>
            <Link href="/apply">
              <p className="text-indigo-500 hover:text-indigo-700 cursor-pointer font-semibold">
                Apply
              </p>
            </Link>
          </span>
        </div>
      </section>
    </>
  );
};

export default login;
