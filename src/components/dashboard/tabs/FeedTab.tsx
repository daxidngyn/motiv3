import Image from "next/image";
import Link from "next/link";
import { trpc } from "../../../utils/trpc";
import GoalCard from "../../GoalCard";

const DashboardFeedTab = ({ session }: any) => {
  const { data: userGoals } = trpc.useQuery(
    // @ts-ignore
    ["goal.fetchAll", session.user?.id],
    { enabled: !!session, refetchOnWindowFocus: true }
  );

  const { data: followingFeed } = trpc.useQuery(
    ["follow.getFollowingFeed", { userId: session.user?.id }],
    { enabled: !!session }
  );

  //   console.log(followingFeed);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-3xl md:text-4xl">My Feed</h1>
        <Link href="/dashboard?tab=following">
          <a>View following</a>
        </Link>
      </div>

      <div className="mt-6">
        {followingFeed && (
          <>
            {followingFeed.length == 0 ? (
              <div className="flex flex-col items-center justify-center mt-4">
                <Image
                  src="/add_goal_graphic.svg"
                  width={200}
                  height={200}
                  alt="Add goals graphic"
                />
                <h3 className="mt-6 text-lg font-medium">
                  No one that you follow have created any goals! Find some more
                  friends bud lel
                </h3>
              </div>
            ) : (
              <div className="space-y-3">
                {followingFeed.map((goal, idx) => (
                  <GoalCard
                    key={goal.id}
                    userName={goal.owner.name!}
                    description={goal.description}
                    goalTitle={goal.title}
                    betVal={goal.buyIn}
                    postDate={goal.createdAt}
                    endDate={goal.endDate}
                    users={goal.users}
                    defaultJoined={false}
                    id={goal.id}
                    userId={session.user.id}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardFeedTab;
