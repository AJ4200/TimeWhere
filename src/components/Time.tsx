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
            <div>
              {/* Splitting date and time */}
              {currentTime.datetime && (
                <>
                  {" "}
                  <p>
                    {" "}
                    {currentTime.datetime
                      .split("T")[1]
                      .split(".")[0]
                      .slice(0, -3)}
                  </p>
                  <p>{currentTime.datetime.split("T")[0]}</p>
                </>
              )}
            </div>
            <p>Day of week: {Daysoftheweek[currentTime.day_of_week]}</p>
            <p>Day of year: {currentTime.day_of_year}</p>
            <p>UTC offset: {currentTime.utc_offset}</p>
          </>
        )
      )}
    </div>
  );
};
export default Time;
