import { useSession } from "next-auth/react";
import Head from "next/head";
import GoalCard from "../../components/GoalCard";
import { getMotiv3AuthSession } from "../../utils/getMotiv3AuthSession";
import { trpc } from "../../utils/trpc";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const { data: userGoals } = trpc.useQuery(
    // @ts-ignore
    ["goal.fetchAll", session.user?.id],
    { enabled: !!session }
  );

  if (status === "loading")
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

      <main className="flex-grow">
        <div>hello</div>
        {userGoals && (
          <div className="space-y-3">
            {userGoals.goals.map((goal) => (
              <GoalCard
                key={goal.id}
                userName={userGoals.name!}
                goalTitle={goal.title}
                betVal={goal.buyIn}
              />
            ))}
          </div>
        )}
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
