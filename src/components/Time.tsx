import React, { useEffect, useState } from "react";
import axios from "axios";
interface TimeProps {
  timeZone: string;
}
const Time: React.FC<TimeProps> = ({ timeZone }) => {
  const [currentTime, setCurrentTime] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add isLoading state
  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const response = await axios.get(
          `https://www.timeapi.io/api/Time/current/zone?timeZone=${timeZone}`,
        );
        setCurrentTime(response.data);
        setIsLoading(false); // Set isLoading to false after data is fetched
      } catch (error) {
        console.error("Error fetching current time:", error);
        setIsLoading(false); // Set isLoading to false in case of error
      }
    };
    fetchCurrentTime();
  }, [timeZone]);
  return (
    <div>
      <h2>Current Time</h2>
      {isLoading ? ( // Display loading state
        <p>Loading...</p>
      ) : (
        currentTime && (
          <div>
            <p>Year: {currentTime.year}</p>
            <p>Month: {currentTime.month}</p>
            <p>Day: {currentTime.day}</p>
            <p>Hour: {currentTime.hour}</p>
            <p>Minute: {currentTime.minute}</p>
            <p>Seconds: {currentTime.seconds}</p>
            <p>MilliSeconds: {currentTime.milliSeconds}</p>
            <p>DateTime: {currentTime.dateTime}</p>
            <p>Date: {currentTime.date}</p>
            <p>Time: {currentTime.time}</p>
            <p>TimeZone: {currentTime.timeZone}</p>
            <p>Day of Week: {currentTime.dayOfWeek}</p>
            <p>DST Active: {currentTime.dstActive ? "Yes" : "No"}</p>
          </div>
        )
      )}
    </div>
  );
};
export default Time;
