import { DateTime } from "luxon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
interface GoalCardProps {
  userName: string;
  goalTitle: string;
  betVal: number;
  postDate: Date;
  endDate: Date;
  users: Array<object> | null;
  defaultJoined: boolean;
  description: string;
  id: string;
  userId: string;
}

const GoalCard = ({
  userName,
  goalTitle,
  description,
  betVal,
  postDate,
  endDate,
  users,
  defaultJoined,
  id,
  userId,
}: GoalCardProps) => {
  const [joined, setJoined] = useState(defaultJoined);

  const { mutate: joinGoal } = trpc.useMutation(["goal.joinGoal"], {
    onSettled(data) {
      setJoined(true);
    },
  });

  useEffect(() => {
    if (joined) return;

    // @ts-ignore
    const found = users?.find((user) => user.id === userId);

    if (found) {
      setJoined(true);
    }
  }, [users]);

  return (
    <div className="p-4 bg-indigo-100 gap-x-12 rounded-sm flex flex-col">
      <div>
        <div className="flex items-center justify-between gap-x-2 relative">
          <Link href={`/dashboard/goal/${id}`}>
            <a
              className={`text-2xl font-semibold underline ${
                !joined && "pr-24 md:pr-0"
              }`}
            >
              {goalTitle}
            </a>
          </Link>

          {!joined && (
            <div className="absolute top-0 right-0">
              <button
                type="button"
                onClick={() => joinGoal({ userId: userId, goalId: id })}
                className="bg-indigo-500 text-white rounded-full px-4 py-1.5 hover:bg-indigo-600 transition duration-300 ease-in-out"
              >
                Join goal
              </button>
            </div>
          )}
        </div>

        <p className="mt-0.5">{description}</p>

        <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:gap-x-12 space-y-5 lg:space-y-0 text-sm">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <span className="font-medium">Bet Value</span>
            <span className="hidden lg:block">:&nbsp;</span>
            <span>${betVal}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center">
            <span className="font-medium">Timeframe</span>
            <span className="hidden lg:block">:&nbsp;</span>
            <span>
              {/* @ts-ignore */}
              {postDate.toLocaleDateString(DateTime.DATE_SHORT)}-
              {/* @ts-ignore */}
              {endDate.toLocaleDateString(DateTime.DATE_SHORT)}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center">
            <span className="font-medium">Daily</span>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4 lg:mt-0 flex items-center justify-between border-t-2 lg:border-t-0 border-indigo-50">
        <div className="flex items-center gap-x-2 lg:gap-x-3">
          <div className="rounded-full bg-indigo-500 w-8 h-8 lg:w-10 lg:h-10" />
          <div className="lg:text-lg">{userName}</div>
        </div>
        <div className="opacity-70 lg:mt-2 text-sm">
          {/* @ts-ignore */}
          Posted on {postDate.toLocaleDateString(DateTime.DATE_SHORT)}
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
