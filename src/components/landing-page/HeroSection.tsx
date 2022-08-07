import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      aria-labelledby="hero-title"
      className="py-32 px-6 grid grid-cols-2"
    >
      <div className="flex flex-col justify-center">
        <h1
          id="hero-title"
          className="pb-6 text-transparent text-5xl sm:text-6xl md:text-7xl bg-clip-text font-bold bg-cover bg-center bg-gradient-to-r from-indigo-500 to-teal-500"
        >
          Financialize your goals with friends.
        </h1>
        <h2 className="font-medium text-2xl opacity-60 max-w-3xl">
          MOTIV3 is the app for you to keep yourself accountable by putting
          money on the line. If you don&apos;t hit milestones, your friends
          profit.
        </h2>

        <div className="pt-8">
          <Link href="/signin">
            <a className="bg-indigo-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out">
              Join Today
            </a>
          </Link>
        </div>
      </div>
      <div className="relative h-96">
        <Image
          src="/hero_graphic.svg"
          layout="fill"
          alt="hero section graphic"
        />
      </div>
    </section>
  );
};

export default HeroSection;
