import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa";
import { getMotiv3AuthSession } from "../utils/getMotiv3AuthSession";

export default function Signin({ providers }: any) {
  return (
    <main className="flex-grow h-full flex flex-col justify-center items-center">
      <div className="max-w-2xl mx-auto w-full border rounded-lg p-4">
        <div className="flex items-center justify-center pt-6">
          <Image
            src="/colorLogo.svg"
            alt="MOTIV3 Logo"
            width={200}
            height={200}
            className="scale-150"
          />
        </div>
        <div className="space-y-8 rounded-lg bg-darkgray p-8 md:p-12">
          {providers && "discord" in providers && (
            <button
              onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
              className="w-full py-6 flex items-center gap-x-3 justify-center bg-[#7289da] text-white rounded-lg"
            >
              <FaDiscord className="h-7 w-7" />
              <h1 className="text-2xl">Login with Discord</h1>
            </button>
          )}

          <div className="relative flex items-center justify-center">
            <div className="absolute left-0 top-2.5 z-10 w-full border-t border-darkishGray p-1" />
            <span className="relative z-20 bg-darkgray px-4 text-sm text-zinc-400 bg-white">
              Or continue with
            </span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            {providers && "google" in providers && (
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-x-4 bg-grey-200 py-2 rounded-lg"
              >
                <FcGoogle className="w-6 h-6" />
                <span className="font-medium text-xl">Google</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getMotiv3AuthSession(ctx);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
      props: {},
    };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers },
  };
};
