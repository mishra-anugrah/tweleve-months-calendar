/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Calendar.scss";
import { Day } from "./Day";
import { MonthHeader } from "./MonthHeader";
import { YEARLY_CALENDAR } from "../../constants/constants";
import { createMonth } from "../../utils";

interface IMonthProps {
  nav: number;
  eventList: any[];
  onDayClick?: (day: string) => void;
  hideEventTooltip?: boolean;
}

export const Month = (props: IMonthProps) => {
  const { nav, eventList, onDayClick, hideEventTooltip } = props;
  const [events, setEvents] = useState([]);
  const [days, setDays] = useState([]);
  const [monthName, setMonthName] = useState("");

  useEffect(() => {
    setEvents(eventList);
  }, [eventList]);

  useEffect(() => {
    createMonth({ nav, eventList, setDays, setMonthName });
  }, [events]);

  return (
    <div className="month-container">
      <MonthHeader month={monthName} />
      <div className="weekdays-container">
        {YEARLY_CALENDAR.SHORT_WEEKDAYS.map((item, index) => (
          <div className="week-days" key={index}>
            {item}
          </div>
        ))}
      </div>

      <div className="calendar">
        {days?.map((day, index: number) => (
          <Day
            key={index}
            day={day}
            isCurrentMonth={nav === 0 ? true : false}
            onDayClick={onDayClick}
            hideEventTooltip={hideEventTooltip}
          />
        ))}
      </div>
    </div>
  );
};
