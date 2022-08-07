import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { trpc } from "../utils/trpc";
import ModalWrapper from "./ModalWrapper";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { data: session, status } = useSession();

  const [createGoalModalIsOpen, setCreateGoalModalIsOpen] = useState(false);
  const toggleCreateGoalModal = () => {
    setCreateGoalModalIsOpen(!createGoalModalIsOpen);
  };

  return (
    <div className="flex items-center justify-between h-16 px-6 shadow-md fixed w-full bg-indigo-500 text-white">
      <Link href="/">
        <a className="flex items-center gap-x-2">
          <Image src="/logo.svg" width={28} height={28} alt="MOTIV3 Logo" />
          <span className="text-xl font-semibold tracking-wide ">MOTIV3</span>
        </a>
      </Link>

      {session && status === "authenticated" ? (
        <div className="flex items-center gap-x-4">
          <button
            onClick={toggleCreateGoalModal}
            className="bg-grey-200 text-black py-1 px-4 rounded-lg hover:bg-grey-300 transition duration-300 ease-in-out"
          >
            New Goal
          </button>
          <div className="border rounded-full w-9 h-9 relative">
            <Image
              src={session.user?.image!}
              layout="fill"
              alt={`${session.user?.name} profile pic`}
              className="rounded-full"
            />
          </div>

          <CreateGoalModal
            isOpen={createGoalModalIsOpen}
            toggleIsOpen={toggleCreateGoalModal}
            contentLabel="create goal modal"
            // @ts-ignore
            userId={session.user?.id}
          />
        </div>
      ) : (
        <Link href="/signin">
          <a className="bg-white text-black font-semibold px-6 py-1.5 rounded-md">
            Sign in
          </a>
        </Link>
      )}
    </div>
  );
};

export default Navbar;

interface AddedUser {
  id: string;
  email: string;
}
const CreateGoalModal = ({
  isOpen,
  toggleIsOpen,
  contentLabel,
  userId,
}: {
  isOpen: boolean;
  toggleIsOpen: Function;
  contentLabel: string;
  userId: string;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [buyIn, setBuyIn] = useState(0);

  const [userQuery, setUserQuery] = useState("");

  const { data: users } = trpc.useQuery(["user.getMatches", userQuery], {
    enabled: userQuery.length >= 3,
  });
  const uploadGoal = trpc.useMutation(["goal.createGoal"], {
    onSettled: async (data, error, variables, context) => {
      console.log("uploaded goal:", data);
    },
  });

  const [addedUsers, setAddedUsers] = useState<AddedUser[]>([]);
  const addUserToGoal = (user: AddedUser) => {
    setAddedUsers((prevUsers) => [
      ...prevUsers,
      { id: user.id, email: user.email },
    ]);
    setUserQuery("");
  };

  const removeUser = (id: string) => {
    const newAddedUsers = addedUsers.filter((user) => user.id !== id);

    setAddedUsers([...newAddedUsers]);
  };

  const checkExisting = (id: string) => {
    const check = addedUsers.some((user) => {
      return user.id === id;
    });

    return check;
  };

  const createGoal = () => {
    const days = calculateDayDiff(endDate);
    const includedUsers = addedUsers.map((user) => {
      return { id: user.id };
    });

    // @ts-ignore
    uploadGoal.mutate({
      users: includedUsers,
      owner: userId,
      title: title,
      description: description,
      endDate: endDate,
      buyIn: buyIn,
      daysInBetween: days,
    });
  };

  const calculateDayDiff = (day: Date) => {
    const startDate = DateTime.fromISO(day.toISOString()).set({
      year: DateTime.now().get("year"),
    });
    const diff = Math.abs(startDate.diffNow().as("day"));
    const wholeNumberedDateDifference = Math.round(diff);

    return Math.round(diff);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      toggleIsOpen={toggleIsOpen}
      contentLabel={contentLabel}
    >
      <div className="bg-grey-200">
        <div className="flex items-center justify-between border-b p-4 border-grey-900">
          <h2 className="text-xl font-semibold">Create New Goal</h2>
        </div>

        <div className="p-4 grid grid-cols-3 gap-x-8 gap-y-6">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-2 py-1 outline-none rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <span>End date</span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              className="px-2 py-1 outline-none rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="buyIn">Buy In</label>
            <div className="bg-white rounded-md flex items-center">
              <span className="pl-2 opacity-60">$</span>
              <input
                id="buyIn"
                name="buyIn"
                value={buyIn}
                onChange={(e) => {
                  // @ts-ignore
                  if (isNaN(e.target.value)) return;

                  setBuyIn(Number(e.target.value));
                }}
                className="outline-none flex-grow py-1 bg-transparent"
              />
            </div>
          </div>

          <div className="flex flex-col col-span-3">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-2 py-1 outline-none rounded-md"
              rows={3}
            />
          </div>

          <div className="flex flex-col col-span-3 relative">
            <label htmlFor="userQuery">Search for users to add</label>
            <div className="bg-white rounded-md flex items-center pr-2">
              <input
                id="userQuery"
                name="userQuery"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="px-2 py-1 outline-none rounded-md flex-grow"
                placeholder="Enter an email..."
              />
              <button type="button" onClick={() => setUserQuery("")}>
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {addedUsers && (
              <div className="mt-2 flex items-center gap-x-2">
                {addedUsers.map((user) => (
                  <div
                    className="text-sm rounded-full px-2 py-1 bg-white w-fit flex items-center gap-x-2"
                    key={user.id}
                  >
                    <span>{user.email}</span>
                    <button onClick={() => removeUser(user.id)}>
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {userQuery.length >= 3 && users && users.length > 0 && (
              <div className="mt-2 absolute top-14 z-50 w-full shadow-md bg-grey-100 rounded-md p-2">
                {users.map((user: any) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between"
                  >
                    <span>{user.email}</span>
                    <button
                      disabled={checkExisting(user.id)}
                      onClick={() =>
                        // @ts-ignore
                        addUserToGoal({ id: user.id, email: user.email })
                      }
                    >
                      {!checkExisting(user.id) &&
                        user.id !== userId &&
                        "Add user"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end border-t p-4 border-grey-900 relative z-10">
          <button
            type="button"
            className=" font-semibold bg-white rounded-md px-4 py-2"
            onClick={createGoal}
          >
            Create
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
