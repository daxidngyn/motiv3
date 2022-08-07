import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="w-16 md:w-40 flex flex-col items-center justify-between pt-4 shadow-lg bg-white  fixed left-0 top-16 h-screen">
      <div className="flex flex-col items-center px-2 space-y-3 w-full">
        <Link href="/dashboard">
          <a
            className={`${
              router.asPath === "/dashboard?tab=home" ||
              router.asPath === "/dashboard"
                ? "bg-indigo-100"
                : "bg-grey-200"
            } flex items-center justify-center md:justify-start hover:bg-indigo-200 w-full rounded-full hover:rounded-md md:rounded-md py-0.5 transition duration-300 ease-in-out`}
          >
            <HiOutlineHome className="w-10 h-10 md:w-9 md:h-9 cursor-pointer p-2 md:hover:bg-transparent rounded-full" />
            <span className="hidden md:block text-sm">Dashboard</span>
          </a>
        </Link>

        <Link href="/dashboard?tab=feed">
          <a
            className={`${
              router.asPath === "/dashboard?tab=feed"
                ? "bg-indigo-100"
                : "bg-grey-200"
            } flex items-center justify-center md:justify-start hover:bg-indigo-200 w-full rounded-full hover:rounded-md md:rounded-md py-1 transition duration-300 ease-in-out`}
          >
            <HiOutlineUserGroup className="w-10 h-10 md:w-9 md:h-9 cursor-pointer p-2 md:hover:bg-transparent rounded-full" />
            <span className="hidden md:block text-sm">My Feed</span>
          </a>
        </Link>

        <Link href="/dashboard?tab=following">
          <a
            className={`${
              router.asPath === "/dashboard?tab=following"
                ? "bg-indigo-100"
                : "bg-grey-200"
            } flex items-center justify-center md:justify-start hover:bg-indigo-200 w-full rounded-full hover:rounded-md md:rounded-md py-1 transition duration-300 ease-in-out`}
          >
            <HiOutlineUserGroup className="w-10 h-10 md:w-9 md:h-9 cursor-pointer p-2 md:hover:bg-transparent rounded-full" />
            <span className="hidden md:block text-sm">Following</span>
          </a>
        </Link>
      </div>

      <div className="pb-20 w-full px-2">
        <button
          onClick={() => signOut()}
          className="px-2 bg-grey-200 w-full rounded-lg py-1 text-left"
        >
          Signout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
