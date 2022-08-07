import { DateTime } from "luxon";
import * as React from "react";
interface GoalCardProps {
  userName: string;
  goalTitle: string;
  betVal: number;
  postDate: Date;
  endDate: Date;
}

const GoalCard = ({
  userName,
  goalTitle,
  betVal,
  postDate,
  endDate,
}: GoalCardProps) => {
  return (
    <div className="p-4 bg-indigo-100 gap-x-12 rounded-sm flex flex-col">
      <div>
        <div className="h-10 flex items-center">
          <h3 className="text-2xl font-bold">{goalTitle}</h3>
        </div>

        <div className="mt-2 flex flex-col lg:flex-row lg:items-center lg:gap-x-12 space-y-5 lg:space-y-0">
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
