import React, { useEffect, useState } from "react";
import "./Calendar.scss";
import { Day } from "./Day";
import { MonthHeader } from "./MonthHeader";
import { YEARLY_CALENDAR } from "../../constants/constants";

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

  const eventForDate = (date: string) => {
    const resEvents: any[] = [];

    if (eventList?.length) {
      const currDateObj = new Date(date);
      eventList?.map((eventObj) => {
        eventObj?.dates?.map((dateStr: string) => {
          const dateObject = new Date(dateStr);
          if (currDateObj.toDateString() === dateObject.toDateString()) {
            resEvents.push({
              name: eventObj.name,
              startDate: currDateObj,
              color: eventObj.color,
            });
          }
        });
      });
    }
    return resEvents;
  };

  useEffect(() => {
    const dateObj = new Date();
    if (nav !== 0) {
      dateObj.setMonth(new Date().getMonth() + nav);
    }
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    setMonthName(
      `${dateObj.toLocaleDateString("en-us", { month: "long" })} ${year}`
    );
    const paddingDays = YEARLY_CALENDAR.FULL_WEEKDAYS.indexOf(
      dateString.split(", ")[0]
    );

    const daysArr = [];
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;

      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          events: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArr.push({
          value: "padding",
          events: null,
          isCurrentDay: false,
          date: "",
        });
      }
    }
    setDays(daysArr);
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
