import Head from "next/head";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (server: Date, client: Date): string => {
  const difference = Math.abs(server.getTime() - client.getTime());
  return formatDistanceToNow(difference, { includeSeconds: true });
};

export default function Home({ serverTime }: { serverTime: Date }): JSX.Element {
  const [browserTime, setBrowserTime] = useState<Date | null>(null);
  const [timeDifference, setTimeDifference] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getTimeFromBrowser = () => {
      const currentTime = new Date();
      setBrowserTime(currentTime);
    };

    getTimeFromBrowser();
  }, []);

  useEffect(() => {
    if (browserTime && serverTime) {
      const difference = calculateTimeDifference(serverTime, browserTime);
      setTimeDifference(difference);
    }
  }, [browserTime, serverTime]);

  const moveToTaskManager = () => {
    router.push("/tasks");
  };

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          <p>
            Server time:{" "}
            <span className="serverTime">
              {serverTime.toLocaleString("en-GB")}
            </span>
          </p>
          <p>
            Time diff:{" "}
            <span className="serverTime">
              {timeDifference || "Calculating..."}
            </span>
          </p>
        </div>
        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
