import classNames from "classnames";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
interface TimeProps {
  timeZone: string;
}
const Time: React.FC<TimeProps> = ({ timeZone }) => {
  const [currentTime, setCurrentTime] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const Daysoftheweek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const response = await fetch(
          `https://worldtimeapi.org/api/timezone/${timeZone}`,
        );
        const data = await response.json();
        setCurrentTime(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching current time:", error);
      }
    };
    fetchCurrentTime();
  }, [timeZone]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      className={classNames(
        "flex w-4/5 flex-col items-center space-y-4 rounded-xl border p-4 shadow-lg backdrop-blur-sm",
      )}
    >
      {isLoading ? (
        <div className="mdloader"></div>
      ) : currentTime != null ? (
        <>
          <div
            className={classNames(
              "flex flex-col items-center justify-center space-y-4",
            )}
          >
            {currentTime.datetime && (
              <>
                {" "}
                <p className={classNames("time text-9xl")}>
                  {" "}
                  {currentTime.datetime
                    .split("T")[1]
                    .split(".")[0]
                    .slice(0, -3)}
                </p>
                <h2 className="zonename text-7xl">{timeZone}</h2>
                <h3 className="text-5xl">
                  {currentTime.datetime.split("T")[0]}
                </h3>
              </>
            )}
          </div>
          <h4 className="text-3xl">
            {" "}
            {Daysoftheweek[currentTime.day_of_week]}
          </h4>
          <p>Day of year: {currentTime.day_of_year}</p>
          <p>UTC offset: {currentTime.utc_offset}</p>
        </>
      ) : (
        <>
          <div
            className={classNames(
              "flex flex-col items-center justify-center space-y-4",
            )}
          >
              <>
                {" "}
                <p className={classNames("time text-9xl")}>--:--</p>
                <h2 className="zonename text-7xl">No Data</h2>
                <h3 className="text-5xl">--:--:----</h3>
              </>
            
          </div>
          <h4 className="text-3xl">Someday</h4>
          <p>Day of year: 🤷‍♂️</p>
          <p>UTC offset: 🤷‍♀️</p>
        </>
      )}
    </motion.div>
  );
};
export default Time;
