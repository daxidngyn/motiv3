import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "../../components/dashboard/Sidebar";
import DashboardHomeTab from "../../components/dashboard/tabs/HomeTab";
import { getMotiv3AuthSession } from "../../utils/getMotiv3AuthSession";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading" || !session)
    return (
      <div>
        <div>loading...</div>
      </div>
    );

  return (
    <>
      <Head>
        <title>Dashboard | MOTIV3</title>
      </Head>

      <main className="flex-grow h-full flex flex-col">
        <div className="relative z-10 flex h-full flex-grow items-stretch overflow-hidden bg-grey-100">
          <Sidebar />
          <div className="flex-grow pt-8 px-6">
            {router.asPath === "/dashboard" && (
              <DashboardHomeTab session={session} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getMotiv3AuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}
