"use client";
import React, { useState, useEffect } from "react";
import Time from "./Time";
import classNames from "classnames";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 , duration: 1.5},
};

interface TimeZoneProps {}

const TimeZone: React.FC<TimeZoneProps> = ({}) => {
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const [filteredTimeZones, setFilteredTimeZones] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
    const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchTimeZones = async () => {
      try {
        const response = await fetch("http://worldtimeapi.org/api/timezone");
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
      timezone.toLowerCase().includes(filterValue),
    );
    setFilteredTimeZones(filtered);
  };

  const handleTimeZoneClick = (timezone: string) => {
    setSelectedTimeZone(timezone);

  };
    const handlebuttonlist = () => {
      setIsOpen(isOpen => !isOpen);
  };


  return (
    <>
      <div
        className={classNames(
          "flex h-4/5 w-4/5 flex-col items-center justify-center space-x-4 space-y-4 rounded-2xl border p-4",
          " shadow-2xl backdrop-blur-md",
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
              "transition-transform",
            )}
            onClick={handlebuttonlist}
          >
            {isOpen ? "close" : "filter"}
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : isOpen ? (
          <div
            className={classNames(
              " left-0 flex h-4/5 w-full items-center justify-center",
            )}
          >
            <motion.ul
              animate={isOpen ? "open" : "closed"}
              variants={variants}
              className={classNames(
                "z-10 h-1/2 w-2/3 overflow-y-scroll rounded-2xl border p-4",
              )}
              style={{ maxHeight: "30rem" }} // Adjust the height as needed
            >
              {filteredTimeZones.map((timezone) => (
                <li
                  key={timezone}
                  onClick={() => handleTimeZoneClick(timezone)}
                  className={
                    selectedTimeZone === timezone
                      ? "rounded-xl bg-gray-900/10 p-1"
                      : "cursor-pointer transition-all hover:scale-y-125 hover:backdrop:blur-xl"
                  }
                >
                  {timezone}
                </li>
              ))}
            </motion.ul>
          </div>
        ) : null}
      </div>
      {selectedTimeZone && <Time timeZone={selectedTimeZone} />}
    </>
  );
};

export default TimeZone;
