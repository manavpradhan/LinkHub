import Link from "next/link";
import MyHead from "../components/MyHead";

export default function Home() {
  return (
    <>
      <MyHead
        title="Home"
        description="Welcome to TypeFinance, where we help you to choose the best financing for you"
        image="https://typefinance.com/typefinance-dp.jpg"
        url="https://typefinance.com"
      />

      <main className="w-full min-h-screen flex flex-col justify-center items-center dark:bg-black bg-white">
        <h1 className="text-center ">
          {" "}
          <span className="text-gray-600 dark:text-white">Welcome to</span>{" "}
          <br />
          <span className="text-indigo-600 font-semibold">
            NextJS Featured Template
          </span>
        </h1>
        <Link
          title="Notice the page loader"
          className="bg-indigo-600 rounded-sm inline-block my-2 p-1 px-2 text-white"
          href="/apply"
        >
          Link to a page
        </Link>
      </main>
    </>
  );
}
