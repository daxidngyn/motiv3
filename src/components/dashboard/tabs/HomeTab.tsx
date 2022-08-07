import Image from "next/image";
import Link from "next/link";
import { trpc } from "../../../utils/trpc";
import GoalCard from "../../GoalCard";

const DashboardHomeTab = ({ session }: any) => {
  const { data: userGoals } = trpc.useQuery(
    ["goal.fetchAll", session.user?.id],
    { enabled: !!session }
  );

  const { data: followingFeed } = trpc.useQuery(
    ["follow.getFollowingFeed", { userId: session.user?.id, limit: 3 }],
    { enabled: !!session }
  );

  return (
    <div>
      <h1 className="font-semibold text-3xl md:text-4xl">
        Welcome back, {session.user?.name}
      </h1>
      <div className="mt-6">
        <h2 className="font-medium text-xl md:text-2xl pb-2">Active Goals</h2>
        {userGoals && (
          <>
            {userGoals.goals.length == 0 ? (
              <div className="flex flex-col items-center justify-center mt-4">
                <Image
                  src="/add_goal_graphic.svg"
                  width={200}
                  height={200}
                  alt="Add goals graphic"
                />
                <h3 className="mt-6 text-lg font-medium">
                  You havn&apos;t created any goals yet!
                </h3>
              </div>
            ) : (
              <div className="space-y-3">
                {userGoals.goals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    userName={userGoals.name!}
                    goalTitle={goal.title}
                    description={goal.description}
                    betVal={goal.buyIn}
                    postDate={goal.createdAt}
                    endDate={goal.endDate}
                    users={null}
                    defaultJoined={true}
                    id={goal.id}
                    userId={session.user.id}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between pb-2 mt-12">
          <h2 className="font-medium text-xl md:text-2xl ">Latest Activity</h2>

          <Link href="/dashboard?tab=feed">
            <a>View all</a>
          </Link>
        </div>

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
                {followingFeed.map((goal, idx) => {
                  if (idx > 2) return null;

                  return (
                    <GoalCard
                      key={goal.id}
                      userName={goal.owner.name!}
                      goalTitle={goal.title}
                      description={goal.description}
                      betVal={goal.buyIn}
                      postDate={goal.createdAt}
                      endDate={goal.endDate}
                      users={goal.users}
                      defaultJoined={false}
                      id={goal.id}
                      userId={session.user.id}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHomeTab;
