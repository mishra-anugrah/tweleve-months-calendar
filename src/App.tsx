import "./App.css";
import { YearlyCalendar } from "./components/YearlyCalendar";

function App() {
  const events = [
    {
      name: "Daily",
      dates: [
        "2023-09-11T00:00:00.000Z",
        "2023-09-12T00:00:00.000Z",
        "2023-10-13T00:00:00.000Z",
        "2024-05-13T00:00:00.000Z",
        "2023-12-14T00:00:00.000Z",
      ],
      color: "#a6fbcc",
    },
    {
      name: "Weekly",
      dates: [
        "2023-09-19T00:00:00.000Z",
        "2024-04-26T00:00:00.000Z",
        "2024-02-02T00:00:00.000Z",
      ],
      color: "blue",
    },
  ];
  return (
    <div className="schedule-calendar-container">
      <YearlyCalendar
        eventList={events}
        onDayClick={(a: string) => console.log("clicked", a)}
      />
    </div>
  );
}

export default App;
