import TimeZone from "@/components/TimeZone";
import classNames from "classnames";

export default function Home() {
  return (
    <main
      className={classNames(
        "relative flex h-full w-full flex-col items-center justify-center space-y-4",
      )}
      
    >
      <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
        <h1 className="text-5xl font-stoke sm:">Time•Where</h1>
        <TimeZone />
      </div>
    </main>
  );
}
