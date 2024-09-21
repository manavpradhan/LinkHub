import React, { useEffect, useState } from "react";
import styles from "../styles/apply.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import useUserStore from "@/store/userStore";

const Apply = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  // const [registered, setRegistered] = useState(false);

  const { user_token, user_handle } = useUserStore((state) => ({
    user_token: state.user_token,
    user_handle: state.user_handle,
  }));

  const user = useUserStore();

  const router = useRouter();

  useEffect(() => {
    if (user_token !== "") {
      router.push("/dashboard");
    }
  }, [user_token]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://192.168.0.11:8000/api/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password, email, type }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "duplicate email") {
          toast.error("Email already exists");
        }
        if (data.message === "duplicate handle") {
          toast.error("User handle already exists");
        }
        if (data.message === "registered") {
          console.log(data);
          toast(
            "you have been successfully registered. Welcome " +
              data.user.userHandle
          );
          // localStorage.setItem("userToken", data.token);
          // setRegistered(true);
          user.setUserInfo(data.user, data.token);
          user.saveUserInfo(data.user, data.token);
          router.push("/dashboard");
        }
      })
      .catch((err) => toast(err.message));
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
              Join the top 1% creators
            </h1>
            <p className="text-center dark:text-gray-100">
              Make a LinkTree for your brand
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
                  <img src="/svg/ig.svg" alt="" className="w-6 mr-4" />
                  <input
                    type="text"
                    placeholder="Instagram handle"
                    className="focus:outline-none text-center bg-transparent dark:text-white w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </span>
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
                <span className="flex shadow-md border-2 rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-800 dark:shadow-gray-700">
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
                <h5 className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Account Type
                </h5>
                <span className="flex dark:text-white gap-4 justify-evenly">
                  <label className="flex gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      value={"creator"}
                      checked={type === "creator"}
                      onChange={handleTypeChange}
                    />
                    <p>Creator</p>
                  </label>
                  <label className="flex gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      value={"brand"}
                      checked={type === "brand"}
                      onChange={handleTypeChange}
                    />
                    <p>Brand</p>
                  </label>
                  <label className="flex gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      value={"agency"}
                      checked={type === "agency"}
                      onChange={handleTypeChange}
                    />
                    <p>Agency</p>
                  </label>
                </span>
                <input
                  type="submit"
                  value={"Register"}
                  className="w-full bg-indigo-500 p-2 rounded-md text-white cursor-pointer mt-3 hover:bg-indigo-700 ease-in-out transition-colors"
                />
              </form>
            </div>
          </div>
          <span className="flex gap-3 text-center text-sm text-gray-400 mt-5">
            <p className="">Already have an account?</p>
            <Link href="/login">
              <p className="text-indigo-500 hover:text-indigo-700 cursor-pointer font-semibold">
                Login
              </p>
            </Link>
          </span>
        </div>
      </section>
    </>
  );
};

export default Apply;
