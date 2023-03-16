import { useContext } from "react";
import CalendarCard from "../components/CalendarCard";
import Heading from "../components/Heading";
import UserContext from "../context/UserContext";
import useFetch from "../hooks/useFetch";

const Calendar = () => {
  const { user } = useContext(UserContext);

  const { data, isLoading, error } = useFetch(
    "http://localhost:4000/api/v1/users/" + user?.userId,
    user?.token
  );

  console.log(data.activities);

  return (
    <>
      <section className="p-[28px] pt-[32px]">
        <Heading>Kalender</Heading>
        {data?.activities.map((activity) => {
          console.log(activity);
          return (
            <CalendarCard
              classTitle={activity.name}
              classDay={activity.weekday}
              classTime={activity.time}
            />
          );
        })}
      </section>
    </>
  );
};

export default Calendar;
