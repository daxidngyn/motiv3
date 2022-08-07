import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaAngleLeft } from "react-icons/fa";
import { prisma } from "../../../server/db/client";

export default function GoalPage({ goalData }: any) {
  const router = useRouter();

  const numCheckpoints = goalData.checkpoints.length / goalData.users.length;

  return (
    <>
      <Head>
        <title>{goalData.title} | MOTIV3</title>
      </Head>
      <main className="relative">
        <div className="w-full max-w-6xl mx-auto pt-8 px-6">
          <div>
            <h1 className="text-4xl font-semibold">{goalData.title}</h1>
            <p className="opacity-70 mt-1 font-medium">
              {goalData.description}
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-medium">Posted by</h2>
            <div className="flex items-center gap-x-2 mt-2">
              <Image
                src={goalData.owner.image}
                alt={`${goalData.owner.name} profile picture`}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <div className="text-lg font-medium">{goalData.owner.name}</div>
                <div className="text-sm opacity-70">{goalData.owner.email}</div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-xl font-medium">Checkpoints</h2>

            <div className="relative flex items-center justify-between mt-2">
              {[...Array(numCheckpoints)].map((x, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border border-black bg-white relative z-20"
                />
              ))}

              <div className="w-full border-b border-black absolute z-10" />
            </div>
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
