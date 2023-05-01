import { YEARLY_CALENDAR } from "../constants/constants";
import { ICreateMonthOptions } from "../interfaces/types";

export const matchDates = (date1: Date, date2: Date) : boolean => {
  return date1.toDateString() === date2.toDateString();
}

export const eventForDate = (date: string, eventList: any[]) => {
    const resEvents: any[] = [];

    if (eventList?.length) {
      const currDateObj = new Date(date);
      eventList?.forEach((eventObj): void => {
        eventObj?.dates?.forEach((dateStr: string) : void => {
          const dateObject = new Date(dateStr);
          if (matchDates(dateObject, currDateObj)) {
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


export const createMonth = (options: ICreateMonthOptions) => {
  const {nav, eventList, setDays, setMonthName} = options;

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
        events: eventForDate(dayString, eventList),
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
}
