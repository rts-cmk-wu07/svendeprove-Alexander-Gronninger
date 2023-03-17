import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CalendarCard from "../components/CalendarCard";
import Heading from "../components/Heading";
import UserContext from "../context/UserContext";
import useFetch from "../hooks/useFetch";

const Calendar = () => {
  const { user } = useContext(UserContext);

  const { data, error } = useFetch(
    "http://localhost:4000/api/v1/users/" + user?.userId,
    user?.token
  );

  let userActivities = data.activities;

  const { data: activities, error: activitiesError } = useFetch(
    "http://localhost:4000/api/v1/activities"
  );

  if (user?.role === "instructor") {
    let instructorCalendar =
      activities[0] &&
      activities?.filter((activity) => activity?.instructorId === user?.userId);
    userActivities = instructorCalendar;
  }

  error && toast.error("Kunne ikke hente data, prøv igen senere");
  activitiesError && toast.error("Kunne ikke hente data, prøv igen senere");

  const navigate = useNavigate();

  /* the toast is rendered twice, but this only happens in developer mode */
  useEffect(() => {
    if (!user) {
      toast.error("Du skal være logget ind for at se kalender");
      navigate("/hjem");
    }
  }, []);

  return (
    <>
      <section className="p-[28px] pt-[32px]">
        <Heading>Kalender</Heading>
        {userActivities && userActivities[0] ? (
          userActivities?.map((activity) => {
            return (
              (user.role === "default" && (
                <Link to={"/klasse/" + activity.id}>
                  <CalendarCard
                    classTitle={activity.name}
                    classDay={activity.weekday}
                    classTime={activity.time}
                  />
                </Link>
              )) ||
              (user.role === "instructor" && (
                <Link to={"/tilmeldte/" + activity.id}>
                  <CalendarCard
                    classTitle={activity.name}
                    classDay={activity.weekday}
                    classTime={activity.time}
                  />
                </Link>
              ))
            );
          })
        ) : (
          <p className="text-secondaryText text-small mt-4">
            Du er ikke tilmeldt nogle klasser
          </p>
        )}
      </section>
    </>
  );
};

export default Calendar;
