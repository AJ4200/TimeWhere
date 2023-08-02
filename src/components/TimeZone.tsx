import React, { useState, useEffect } from "react"; 
import Time from "./Time"; 
 
interface TimeZoneProps {} 
 
const TimeZone: React.FC<TimeZoneProps> = ({}) => { 
  const [timeZones, setTimeZones] = useState<string[]>([]); 
  const [filteredTimeZones, setFilteredTimeZones] = useState<string[]>([]); 
  const [showAllTimeZones, setShowAllTimeZones] = useState(true); 
  const [loading, setLoading] = useState(true); 
  const [selectedTimeZone, setSelectedTimeZone] = useState(""); 
 
  useEffect(() => { 
    const fetchTimeZones = async () => {
      try {
        const response = await fetch(
          "http://worldtimeapi.org/api/timezone",
        );
        const data = await response.json();
        setTimeZones(data);
        setFilteredTimeZones(data);
      } catch (error) {
        console.error("Error fetching time zones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeZones(); 
  }, []); 
 
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const filterValue = event.target.value.toLowerCase(); 
    const filtered = timeZones.filter((timezone) => 
      timezone.toLowerCase().includes(filterValue) 
    ); 
    setFilteredTimeZones(filtered); 
  }; 
 
  const handleTimeZoneClick = (timezone: string) => { 
    setSelectedTimeZone(timezone); 
  }; 
 
  return ( 
    <> 
      <div> 
        <input 
          type="text" 
          placeholder="Filter time zones" 
          onChange={handleFilter} 
        /> 
        <button onClick={() => setShowAllTimeZones(!showAllTimeZones)}> 
          {showAllTimeZones ? "Hide" : "Show"} 
        </button> 
        {loading ? ( 
          <p>Loading...</p> 
        ) : showAllTimeZones ? ( 
          <ul> 
            {filteredTimeZones.map((timezone) => ( 
              <li 
                key={timezone} 
                onClick={() => handleTimeZoneClick(timezone)} 
                className={selectedTimeZone === timezone ? "active" : ""} 
              > 
                {timezone} 
              </li> 
            ))} 
          </ul> 
        ) : null} 
      </div> 
      {selectedTimeZone && <Time timeZone={selectedTimeZone} />} 
    </> 
  ); 
}; 
 
export default TimeZone;