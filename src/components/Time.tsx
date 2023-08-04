import classNames from "classnames";
import React, { useEffect, useState } from "react";
interface TimeProps {
  timeZone: string;
}
const Time: React.FC<TimeProps> = ({ timeZone }) => {
  const [currentTime, setCurrentTime] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const Daysoftheweek = ["Default","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  function dayofweek(dayNO:number) {
    
  }
  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const response = await fetch(
          `http://worldtimeapi.org/api/timezone/${timeZone}`,
        );
        const data = await response.json();
        setCurrentTime(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching current time:", error);
        setIsLoading(false);
      }
    };
    fetchCurrentTime();
  }, [timeZone]);
  return (
    <div className="flex w-4/5 flex-col items-center space-y-4 rounded-xl border p-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        currentTime && (
          <>
            <div className={classNames("flex items-center justify-center flex-col space-y-4")}>
              {currentTime.datetime && (
                <>
                  {" "}
                  <p className={classNames('font-slabo text-7xl')}>
                    {" "}
                    {currentTime.datetime
                      .split("T")[1]
                      .split(".")[0]
                      .slice(0, -3)}
                  </p>
                  <h2 className="font-arvo text-2xl">{timeZone} Time</h2>
                  <p>{currentTime.datetime.split("T")[0]}</p>
                </>
              )}
            </div>
            <p> {Daysoftheweek[currentTime.day_of_week]}</p>
            <p>Day of year: {currentTime.day_of_year}</p>
            <p>UTC offset: {currentTime.utc_offset}</p>
          </>
        )
      )}
    </div>
  );
};
export default Time;
