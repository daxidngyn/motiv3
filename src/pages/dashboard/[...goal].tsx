export default function GoalPage() {
  return (
    <div>
      <div>Hello</div>
    </div>
  );
}

export async function getServerSideProps(ctx: any) {
  return { props: {} };
}
