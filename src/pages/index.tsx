import { type GetServerSidePropsContext } from "next";
import MainLayout from "~/components/main-layout";
import { getServerSideHelpers } from "~/utils/helpers";
// import { Card, CardDescription, CardHeader, CardTitle } from "~/ui/card";
import { api } from "~/utils/api";
import { Card, CardHeader } from "~/ui/card";

function Home() {
  const { data: groupData } = api.group.getList.useQuery({});
  const { data: causes } = api.cause.getAll.useQuery();

  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-4 p-10">
        {causes?.map((cause) => (
          <Card key={cause.id} className="min-h-[300px] border-none bg-[#003459] text-white">
            <CardHeader>{cause.name}</CardHeader>
          </Card>
        ))}
      </div>
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
