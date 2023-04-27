import React, { useEffect, useState } from "react";
import { EVENT_COLORS } from "../../constants/constants";

interface IDayProps {
  day: any;
  isCurrentMonth: boolean;
  onDayClick?: (day: any) => void;
  hideEventTooltip?: boolean;
  key: number;
}

export const Day = (props: IDayProps) => {
  const { day, isCurrentMonth, onDayClick, hideEventTooltip } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipEvents, setTooltipEvents] = useState<any[] | null | undefined>(
    []
  );
  const [fullDate, setFullDate] = useState("");
  const [horizontalTooltipAdjust, setHorizontalTooltipAdjust] = useState(false);
  const [verticalTooltipAdjust, setVerticalTooltipAdjust] = useState(false);

  useEffect(() => {
    const dateString = new Date(day.date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFullDate(dateString);
  }, []);

  useEffect(() => {
    if (showTooltip) {
      checkTooltipPosition();
    }
  }, [showTooltip]);

  let boxShadow = "";

  if (day.events?.length === 1) {
    const eve = day.events[0];
    boxShadow += `${eve.color} 0px -2px 0 0 inset`;
  } else if (day.events?.length <= 3) {
    let colorInd = 0;
    day.events.map((item: any, index: number) => {
      if (!item?.inset) {
        item.inset = (index + 1) * -2;
      }
    });

    day.events.map((item: any, index: number) => {
      item.color = item.color ? item.color : EVENT_COLORS[colorInd + 1];
      if (!item?.inset) {
        item.inset = (index + 1) * -2;
      }

      boxShadow += `${boxShadow !== "" ? "," : ""} ${item.color} 0px ${
        item.inset
      }px 0 0 inset`;
      colorInd += 1;
    });
  } else if (day.events?.length > 3) {
    boxShadow += `#000000 0px -5px 0 0 inset`;
  }

  const onDayEnter = () => {
    if (!hideEventTooltip && day.events?.length) {
      setShowTooltip(true);
      setTooltipEvents([...day.events]);
    }
  };

  const onDayLeave = () => {
    setShowTooltip(false);
  };

  const checkTooltipPosition = () => {
    const tooltip = document.getElementById("calendar-tooltip-id");
    const tooltipBoundingRect = tooltip?.getBoundingClientRect();
    const container = document
      .getElementsByClassName("schedule-calendar-container")[0]
      ?.getBoundingClientRect();
    if (tooltipBoundingRect?.right > container?.right) {
      setHorizontalTooltipAdjust(true);
    } else if (tooltipBoundingRect?.bottom > container?.bottom) {
      setVerticalTooltipAdjust(true);
    }
  };

  boxShadow +=
    isCurrentMonth && day.value === new Date().getDate()
      ? boxShadow !== ""
        ? ", #004a52 0px 0px 0px 2px"
        : "#004a52 0px 0px 2px 1px"
      : "";

  const dayClass = day.value !== "padding" ? "date-container" : "padding-date";
  const eventClass = day.events ? "event-date" : "";
  const eventStyle = day.events ? { boxShadow } : {};
  return (
    <div
      className={`${dayClass} ${eventClass}`}
      style={eventStyle}
      onMouseEnter={onDayEnter}
      onMouseLeave={onDayLeave}
      onClick={() => {
        if (day.value !== "padding" && onDayClick) {
          onDayClick(day.date);
        }
      }}
    >
      {showTooltip && (
        <div
          className="calendar-tooltip"
          id="calendar-tooltip-id"
          style={
            horizontalTooltipAdjust
              ? { right: "25px", bottom: "21px" }
              : verticalTooltipAdjust
              ? { left: "18px", bottom: "21px" }
              : { left: "18px", top: "18px" }
          }
        >
          <div className="calendar-tooltip-date">{fullDate}</div>

          <ul className="calendar-tooltip-event-list">
            {tooltipEvents.map((item, index: number) => {
              return (
                <li className="calendar-tooltip-event-item" key={index}>
                  <div className="calendar-tooltip-event">{item.name}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className={`date`}>
        {day.value !== "padding" ? day.date?.split("/")[1] : " "}
      </div>
    </div>
  );
};
