import React, { useEffect, useState } from "react";
interface TimeProps {
  timeZone: string;
}
const Time: React.FC<TimeProps> = ({ timeZone }) => {
  const [currentTime, setCurrentTime] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const response = await fetch(
          `http://worldtimeapi.org/api/timezone/${timeZone}`);
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
    <div>
      <h2>{timeZone} Time</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        currentTime && (
          <div>
            {/* TODO: Display all time data and format properly */}
            <p>Current time: {currentTime.datetime}</p>
            <p>Time zone: {currentTime.timezone}</p>
            <p>Day of week: {currentTime.day_of_week}</p>
            <p>Day of year: {currentTime.day_of_year}</p>
            <p>UTC offset: {currentTime.utc_offset}</p>
          </div>
        )
      )}
    </div>
  );
};
export default Time;
