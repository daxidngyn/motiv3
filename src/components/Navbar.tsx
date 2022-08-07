import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center justify-between h-16 px-6 shadow-md fixed w-full bg-indigo-500 text-white">
      <Link href="/">
        <a className="flex items-center gap-x-2">
          <Image src="/logo.svg" width={28} height={28} alt="MOTIV3 Logo" />
          <span className="text-xl font-semibold tracking-wide ">MOTIV3</span>
        </a>
      </Link>

      {session && status === "authenticated" && session.user ? (
        <div className="flex items-center gap-x-4">
          <button
            // onClick={toggleCreateGoalModal}
            className="bg-grey-200 text-black py-1 px-4 rounded-lg hover:bg-grey-300 transition duration-300 ease-in-out"
          >
            New Goal
          </button>
          <div className="border rounded-full w-9 h-9 relative">
            <Image
              src={session.user.image!}
              layout="fill"
              alt={`${session.user.name} profile pic`}
              className="rounded-full"
            />
          </div>
        </div>
      ) : (
        <Link href="/signin">
          <a className="bg-white text-black font-semibold px-6 py-1.5 rounded-md">
            Sign in
          </a>
        </Link>
      )}

      {/* <CreateGoalModal
        isOpen={createGoalModalIsOpen}
        toggleIsOpen={toggleCreateGoalModal}
        contentLabel="create goal modal"
      /> */}
    </div>
  );
};

export default Navbar;
