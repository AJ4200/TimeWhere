import React, { useState, useEffect } from "react";
import Time from "./Time";
import classNames from "classnames";

interface TimeZoneProps {}

const TimeZone: React.FC<TimeZoneProps> = ({}) => {
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const [filteredTimeZones, setFilteredTimeZones] = useState<string[]>([]);
  const [showAllTimeZones, setShowAllTimeZones] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTimeZone, setSelectedTimeZone] = useState("");

  useEffect(() => {
    const fetchTimeZones = async () => {
      try {
        const response = await fetch("http://worldtimeapi.org/api/timezone");
        const data = await response.json();
        setTimeZones(data);
        setFilteredTimeZones(data);
        setShowAllTimeZones(true);
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
      timezone.toLowerCase().includes(filterValue),
    );
    setFilteredTimeZones(filtered);
  };

  const handleTimeZoneClick = (timezone: string) => {
    setSelectedTimeZone(timezone);
    setShowAllTimeZones(false);
  };

  return (
    <>
      <div
        className={classNames(
          "flex h-4/5 w-4/5 flex-col items-center justify-center space-x-4 space-y-4 rounded-2xl border p-4",
          "bg-slate-400 shadow-2xl backdrop-blur-lg",
        )}
      >
        <div className={classNames("right-4 flex w-4/5 space-x-4")}>
          <input
            className={classNames("w-3/4 rounded-full border p-2 shadow-md")}
            type="text"
            placeholder="Filter time zones"
            onChange={handleFilter}
          />
          <button
            className={classNames(
              "w-1/4 rounded-full bg-black/25 p-2 shadow-lg ",
              "transition-transform"
            )}
            onClick={() => setShowAllTimeZones(!showAllTimeZones)}
          >
            {showAllTimeZones ? "⋰" : "⋱"}
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : showAllTimeZones ? (
          <div
            className={classNames(
              "left-0 flex h-4/5 w-full items-center justify-center",
            )}
          >
            <ul className={classNames("w-2/3 rounded-2xl border p-4")}>
              {filteredTimeZones.map((timezone) => (
                <li
                  key={timezone}
                  onClick={() => handleTimeZoneClick(timezone)}
                  className={
                    selectedTimeZone === timezone ? "bg-gray-900/10" : ""
                  }
                >
                  {timezone}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      {selectedTimeZone && <Time timeZone={selectedTimeZone} />}
    </>
  );
};

export default TimeZone;
