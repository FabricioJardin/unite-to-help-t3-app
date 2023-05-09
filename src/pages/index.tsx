import { type GetServerSidePropsContext } from "next";
import MainLayout from "~/components/main-layout";
import { getServerSideHelpers } from "~/utils/helpers";
import Image from "next/image";
import { AspectRatio } from "~/ui/aspect-ratio";
import { Card, CardDescription, CardHeader, CardTitle } from "~/ui/card";
import { api } from "~/utils/api";
import BannerImg from "../../public/banner.png";

function Home() {
  const { data: groupData } = api.group.getList.useQuery({});
  const { data: causes } = api.cause.getAll.useQuery();

  return (
    <MainLayout>
      <div className="flex flex-col gap-5">
        <section className="relative flex w-full">
          <AspectRatio ratio={6 / 2}>
            <Image src={BannerImg} alt="Banner home" fill />
          </AspectRatio>
          <div className="t-0 l-0 absolute flex h-full w-full items-end justify-center">
            <Card className="mb-24 w-1/2 border-none">
              <CardHeader className="gap-10">
                <CardTitle className="text-3xl">
                  Sua plataforma de conexão com pessoas que querem fazer o bem
                </CardTitle>
                <CardDescription className="text-1xl">
                  Junte-se a uma comunidade de voluntários apaixonados e comprometidos em ajudar
                  grupos locais. Na Volunteer Connect, você pode encontrar oportunidades de
                  voluntariado em sua área e se conectar com outras pessoas com interesses
                  semelhantes. Trabalhe em conjunto para criar impacto positivo na sua comunidade.
                  Junte-se a nós e faça a diferença hoje!
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
        <div className="p-10">
          <div className="grid grid-cols-3 gap-4">
            {causes?.map((cause) => (
              <Card key={cause.id} className="min-h-[300px] border-none">
                <CardHeader>{cause.name}</CardHeader>
              </Card>
            ))}
          </div>
          {groupData?.items.map((group) => (
            <div key={group.id}>
              <h1>{group.name}</h1>
            </div>
          ))}
        </div>
      </div>
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
