import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaAngleLeft } from "react-icons/fa";
import { prisma } from "../../../server/db/client";

export default function GoalPage({ goalData }: any) {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(goalData);
  const numCheckpoints = goalData.checkpoints.length / goalData.users.length;

  const toggleCheckpoint = (checkpoint: any) => {
    if (!checkIfValidToVote(checkpoint)) return;
  };

  const checkIfValidToVote = (checkpoint: any) => {
    const today = DateTime.now();
    const date = DateTime.fromJSDate(new Date(checkpoint.date));

    return (
      today.day === date.day &&
      today.month === date.month &&
      today.year === date.year
    );
  };

  return (
    <>
      <Head>
        <title>{goalData.title} | MOTIV3</title>
      </Head>
      <main className="relative">
        <div className="w-full max-w-6xl mx-auto pt-12 pb-12 md:pt-8 px-6">
          <div>
            <h1 className="text-4xl font-semibold">{goalData.title}</h1>
            <p className="opacity-70 mt-1 font-medium">
              {goalData.description
                ? goalData.description
                : "No description available"}
            </p>
          </div>

          <div className="mt-10 space-y-6 md:space-y-0 divide-y-2 divide-indigo-50 md:divide-y-0 flex flex-col md:flex-row items-center text-center md:text-left md:items-start justify-between bg-indigo-100 px-4 py-6 rounded-md">
            <div className="w-full flex flex-col items-center md:items-start justify-center">
              <h3 className="text-xl font-medium">Posted by</h3>
              <div className="flex items-center gap-x-2 mt-2">
                <Image
                  src={goalData.owner.image}
                  alt={`${goalData.owner.name} profile picture`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <div className="text-lg font-medium">
                    {goalData.owner.name}
                  </div>
                  <div className="text-sm opacity-70">
                    {goalData.owner.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 w-full md:pt-0 flex flex-col items-center justify-center">
              <h3 className="text-xl font-medium">Bet Value</h3>
              <div className="text-lg lg:mt-2">
                ${parseFloat(goalData.buyIn)}
              </div>
            </div>

            <div className="pt-6 w-full md:pt-0 flex flex-col items-center justify-center">
              <h3 className="text-xl font-medium">Timeframe</h3>
              <div className="text-lg lg:mt-2">
                {/* @ts-ignore */}
                {new Date(goalData.createdAt).toLocaleDateString(
                  // @ts-ignore
                  DateTime.DATE_SHORT
                )}
                &nbsp;-&nbsp;{/* @ts-ignore */}
                {new Date(goalData.endDate).toLocaleDateString(
                  // @ts-ignore
                  DateTime.DATE_SHORT
                )}
              </div>
            </div>

            <div className="pt-6 w-full md:pt-0 flex flex-col items-center justify-center">
              <h3 className="text-xl font-medium">Daily</h3>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold border-b pb-1 border-black">
              Checkpoints
            </h2>

            {session && (
              <div className="mt-6 space-y-12">
                {goalData.users.map((user: any) => {
                  // @ts-ignore
                  // if (user.id === session.user.id) return null;

                  return (
                    <div key={user.id}>
                      <div className="flex items-center gap-x-2 justify-center">
                        <Image
                          src={user.image}
                          alt={`${user.name} profile picture`}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <div className="text-2xl font-medium">{user.name}</div>
                      </div>
                      <div className="relative flex items-center justify-center mt-6">
                        <div className="w-fit flex items-center gap-x-16">
                          {[...Array(numCheckpoints)].map((x, i) => (
                            <div key={i} className="flex flex-col items-center">
                              <div
                                onClick={() =>
                                  toggleCheckpoint(goalData.checkpoints[i])
                                }
                                className={`w-10 h-10 rounded-full border border-black bg-white relative z-20 ${
                                  checkIfValidToVote(goalData.checkpoints[i]) &&
                                  "cursor-pointer"
                                }`}
                              />
                              <div className="mt-2">
                                {new Date(
                                  goalData.checkpoints[i].date
                                ).toLocaleDateString(
                                  // @ts-ignore
                                  DateTime.DATE_SHORT
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const goalId = ctx.query.id;

  const goalData = await prisma.goal.findUnique({
    where: { id: goalId },
    select: {
      owner: true,
      users: true,
      title: true,
      description: true,
      createdAt: true,
      endDate: true,
      checkpoints: true,
      buyIn: true,
    },
  });

  return {
    props: { goalData: JSON.parse(JSON.stringify(goalData)) },
  };
}
