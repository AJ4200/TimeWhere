import axios from "axios";
import React, { useState, useEffect } from "react";

interface TimeZoneProps {}

const TimeZone: React.FC<TimeZoneProps> = ({}) => {
  const [timeZoneData, setTimeZoneData] = useState([]);

  useEffect(() => {
    getTimezones();
  }, []);

  async function getTimezones() {
    try {
      const res = await axios.get(
        "https://www.timeapi.io/api/TimeZone/AvailableTimeZones",
      );
      setTimeZoneData(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const searchValue = event.target.value.toLowerCase();
    const filteredTimeZones = timeZoneData.filter((timeZone: string) =>
      timeZone.toLowerCase().includes(searchValue),
    );
    setTimeZoneData(filteredTimeZones);
  };


  return (
    <>
      <input
        title="Search TimeZone"
        placeholder="Type timezone"
        onChange={handleSearch}
      ></input>
      <ul>
        {timeZoneData.map((timeZone: string) => (
          <li key={timeZone}>{timeZone}</li>
        ))}
      </ul>
    </>
  );
};
export default TimeZone;
