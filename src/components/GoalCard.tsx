import * as React from "react";
interface GoalCardProps {
  userName: string;
  goalTitle: string;
  betVal: number;
}

const GoalCard = ({ userName, goalTitle, betVal }: GoalCardProps) => {
  return (
    <div className="p-6 bg-indigo-100 lg:grid grid-cols-12 gap-x-12 rounded-sm flex flex-col-reverse">
      <div className="mt-5 lg:mt-0 col-span-2 flex lg:flex-col items-center justify-between lg:items-start lg:justify-start">
        <div className="flex items-center gap-x-3">
          <div className="rounded-full bg-indigo-500 w-10 h-10" />
          <div className="text-lg">{userName}</div>
        </div>
        <div className="opacity-70 lg:mt-2 text-sm">Posted on x</div>
      </div>

      <div className="col-span-10">
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
            <span>8/6/22 - 1/6/23</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center">
            <span className="font-medium">Daily</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
