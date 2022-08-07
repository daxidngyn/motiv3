import Image from "next/image";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { trpc } from "../../../utils/trpc";
import GoalCard from "../../GoalCard";

const DashboardFollowingTab = ({ session }: any) => {
  const [userQuery, setUserQuery] = useState("");
  const { data: userResults } = trpc.useQuery(["user.getMatches", userQuery], {
    enabled: userQuery.length >= 3,
  });

  const { data: followList } = trpc.useQuery([
    "follow.getFollowing",
    session.user.id,
  ]);

  const { mutate: follow } = trpc.useMutation(["follow.followUser"]);

  const followUser = (id: string) => {
    follow({
      userId: session.user.id,
      targetId: id,
    });
    setUserQuery("");
  };

  return (
    <div className="">
      <div>
        <h2 className="font-medium text-xl md:text-2xl pb-2">Following</h2>
        <div className="relative flex flex-col">
          <label htmlFor="userQuery" className="text-sm pb-1">
            Search for a user to follow
          </label>
          <div className="flex px-2 bg-white focus-within:ring-2 ring-indigo-500 rounded-md">
            <input
              id="userQuery"
              name="userQuery"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Enter an email to search..."
              className="py-1 rounded-md outline-none flex-grow"
            />
            <button type="button" onClick={() => setUserQuery("")}>
              <FaTimes className="opacity-70" />
            </button>
          </div>

          {userQuery.length >= 3 && userResults && userResults.length > 0 && (
            <div className="bg-white shadow-lg absolute -bottom-28 w-full">
              <div className="px-4 py-2 border-b">
                Showing {userResults.length}&nbsp;
                {userResults.length === 1 ? "result" : "results"} for &quot;
                {userQuery}&quot;:
              </div>
              {userResults.map((user) => (
                <div
                  key={user.id}
                  className="p-4 flex items-center justify-between"
                >
                  <span>{user.name}</span>
                  {user.id !== session.user.id && (
                    <button onClick={() => followUser(user.id)}>Follow</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {followList && followList?.following.length > 0 ? (
          <div className="mt-4">
            {followList.following.map((user) => (
              <div
                key={user.id}
                className="flex items-center bg-grey-200 p-4 rounded-md justify-between"
              >
                <div className="flex items-center gap-x-3">
                  <Image
                    // @ts-ignore
                    src={user.image}
                    width={32}
                    height={32}
                    alt={`${user.name} profile picture`}
                    className="rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
                <button>Unfollow</button>
              </div>
            ))}
          </div>
        ) : (
          <div>You aren&apos;t following anyone!</div>
        )}
      </div>

      <h2 className="font-medium text-xl md:text-2xl pb-2 mt-12">Activity</h2>
    </div>
  );
};

export default DashboardFollowingTab;
