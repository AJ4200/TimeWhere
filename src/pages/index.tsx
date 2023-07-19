import Image from "next/image";
import { Inter } from "next/font/google";
import TimeZone from "@/components/TimeZone";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <h1>TimeWhere</h1>
      <div>
<TimeZone/>
      </div>
    </main>
  );
}
