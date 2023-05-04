import { type GetServerSidePropsContext } from "next";
import MainLayout from "~/components/main-layout";
import { getServerSideHelpers } from "~/utils/helpers";
// import { Card, CardDescription, CardHeader, CardTitle } from "~/ui/card";
import { api } from "~/utils/api";

function Home() {
  const { data: groupData } = api.group.getList.useQuery({});
  const { data: causes } = api.cause.getAll.useQuery();

  return (
    <MainLayout>
      {causes?.map((cause) => (
        <div key={cause.id}>
          <p>{cause.name}</p>
        </div>
      ))}
      {groupData?.items.map((group) => (
        <div key={group.id}>
          <h1>{group.name}</h1>
        </div>
      ))}
    </MainLayout>
  );
}

type ServerSideQuery = {
  q?: string;
};

async function getServerSideProps(context: GetServerSidePropsContext<ServerSideQuery>) {
  const helpers = await getServerSideHelpers(context);

  await helpers.cause.getAll.prefetch();
  await helpers.group.getList.prefetch({});

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}

export default Home;

export { getServerSideProps };
