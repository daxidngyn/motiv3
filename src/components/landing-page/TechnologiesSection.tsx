import Image from "next/image";

const TechnologiesSection = () => {
  return (
    <section className="text-center flex flex-col pt-12 pb-6">
      <h2 className="text-xl font-semibold">Powered by these companies</h2>
      <div className="flex items-center justify-center gap-x-12">
        <Image src="/tech/cock.png" alt="CockroachDB" width={200} height={30} />
        <Image src="/tech/rdv.jpg" alt="RDV logo" width={200} height={200} />
        <Image
          src="/tech/domain.png"
          alt="Domain.com"
          width={200}
          height={45}
        />
      </div>
    </section>
  );
};

export default TechnologiesSection;
