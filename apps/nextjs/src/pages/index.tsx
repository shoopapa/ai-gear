import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SessionCard } from '../components/session-card';

const Home: NextPage = () => {
  const sessionQuery = trpc.session.recentWithDisplayData.useQuery({ limit: 5 })

  return (
    <>
      <Head>
        <title>AI Gear HI JAMIE</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center ">
        <div className="container flex flex-row items-center justify-center gap-12 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            AI Gear
          </h1>
          <AuthShowcase />
        </div>
        <div className="flex w-1/2 h-max justify-center overflow-y-scroll px-4 text-2xl">
          {sessionQuery.data ? (
            <div className="flex flex-col gap-4 w-full">
              {sessionQuery.data?.map((p) => {
                return <SessionCard key={p.id} session={p} />;
              })}
            </div>
          ) : (
            <p>Loading...</p>
          )}

        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isSignedIn && (
        <div className="flex items-center justify-center">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "4rem",
                  height: "4rem",
                },
              },
            }}
          />
        </div>
      )}
      {!isSignedIn && (
        <p className="text-center text-2xl">
          <Link href="/sign-in">Sign In</Link>
        </p>
      )}
    </div>
  );
};
