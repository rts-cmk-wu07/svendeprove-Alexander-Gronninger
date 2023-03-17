import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useParams } from "react-router";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import SignUpHandler from "../functions/SignUpHandler";
import SignOffHandler from "../functions/SignOffHandler";

const ClassDetails = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const { data: userData } = useFetch(
    "http://localhost:4000/api/v1/users/" + user?.userId,
    user?.token
  );

  let userActivities = userData.activities;

  const {
    data: activity,
    isLoading,
    error,
  } = useFetch("http://localhost:4000/api/v1/activities/" + id);

  error && toast.error("Kunne ikke hente data, prøv igen senere");

  const [signedUp, setSignedUp] = useState(false);

  useEffect(() => {
    !isLoading &&
      activity?.users?.map((userObject) => {
        if (userObject?.id === user?.userId) {
          setSignedUp(true);
        }
      });
  }, [activity]);

  return (
    <>
      <section className="bg-primaryBackground">
        <div className="grid overflow-hidden h-[60vh]">
          <img
            className="h-auto w-full scale-150 origin-top col-start-1 col-end-2 row-start-1 row-end-2"
            src={activity.id && activity.asset.url}
            alt={activity.id && activity?.name}
          />
          <div className="col-start-1 col-end-2 row-start-1 row-end-2 place-self-end mb-auto mt-[50vh] mr-[21px] z-40">
            {user?.role === "default" && (
              <Button>
                <button
                  onClick={() =>
                    !signedUp
                      ? SignUpHandler(
                          id,
                          user,
                          userActivities,
                          userData,
                          activity,
                          setSignedUp
                        )
                      : SignOffHandler(id, user, activity, setSignedUp)
                  }
                  className="w-full h-full text-tertiaryText"
                >
                  {!signedUp ? "Tilmeld" : "Forlad"}
                </button>
              </Button>
            )}
          </div>
        </div>
        <div className="p-[28px] pt-[32px]">
          <h2 className="text-secondaryText text-medium">{activity.name}</h2>
          <p className="text-secondaryText text-small capitalize">
            {activity.weekday} {activity.time}
          </p>
          <p className="text-secondaryText text-small">
            {activity.id && activity.minAge + "-" + activity.maxAge + " år"}
          </p>
          <p className="text-secondaryText text-small mt-2 mb-16">
            {activity.id && activity.description}
          </p>
        </div>
      </section>
    </>
  );
};

export default ClassDetails;
