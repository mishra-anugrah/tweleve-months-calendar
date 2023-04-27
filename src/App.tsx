import "./App.css";
import { YearlyCalendar } from "./components/YearlyCalendar";

function App() {
  const events = [
    {
      name: "Daily",
      dates: [
        "2023-05-11T00:00:00.000Z",
        "2023-05-12T00:00:00.000Z",
        "2023-05-13T00:00:00.000Z",
        "2023-05-14T00:00:00.000Z",
      ],
      color: "#a6fbcc",
    },
    {
      name: "Weekly",
      dates: [
        "2023-05-19T00:00:00.000Z",
        "2023-05-26T00:00:00.000Z",
        "2023-06-02T00:00:00.000Z",
      ],
      color: "blue",
    },
  ];
  return (
    <YearlyCalendar
      eventList={events}
      onDayClick={(a: string) => console.log("clicked", a)}
    />
  );
}

export default App;
