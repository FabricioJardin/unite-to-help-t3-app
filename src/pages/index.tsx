import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";

import { api } from "~/utils/api";

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#495EEC] to-[#495EECE6]"></main>
  );
}

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.profile.getData.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      {!!sessionData?.user.image && <img src={sessionData.user.image} alt="Imagem do usuário" />}
      <Button
        variant="default"
        onClick={sessionData ? () => void signOut() : () => void signIn("google")}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
      {/* <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn("google")}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button> */}
    </div>
  );
};
