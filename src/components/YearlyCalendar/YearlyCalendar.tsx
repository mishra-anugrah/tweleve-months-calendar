import React from "react";
import { Month } from "./Month";
import { YEARLY_CALENDAR } from "../../constants/constants";

interface ICalendarProps {
  eventList: any[];
  months?: number[];
  onDayClick?: (day: any) => void;
  customClass?: string;
  hideEventTooltip?: boolean;
}

export const YearlyCalendar = (props: ICalendarProps) => {
  const { eventList, months, onDayClick, customClass, hideEventTooltip } =
    props;
  const navList = months ? months : YEARLY_CALENDAR.NAV_MONTHS;

  return (
    <div className={customClass ? customClass : `calendar-container`}>
      {navList.map((navItem, index) => (
        <Month
          nav={navItem}
          key={`month-${index}`}
          eventList={eventList}
          onDayClick={onDayClick}
          hideEventTooltip={hideEventTooltip}
        />
      ))}
    </div>
  );
};
