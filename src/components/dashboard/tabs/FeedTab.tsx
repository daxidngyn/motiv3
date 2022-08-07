import Image from "next/image";
import { trpc } from "../../../utils/trpc";
import GoalCard from "../../GoalCard";

const DashboardFeedTab = ({ session }: any) => {
  const { data: userGoals } = trpc.useQuery(
    // @ts-ignore
    ["goal.fetchAll", session.user?.id],
    { enabled: !!session, refetchOnWindowFocus: true }
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-3xl md:text-4xl">My Feed</h1>
        <div className="flex items-center gap-x-4">
          <div>
            <span>Following</span>
          </div>
          <div>
            <span>Followers</span>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-8">
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
                    betVal={goal.buyIn}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <h2 className="font-medium text-xl md:text-2xl pb-2 mt-12">Activity</h2>
    </div>
  );
};

export default DashboardFeedTab;
