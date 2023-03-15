import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useParams } from "react-router";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";

const ClassDetails = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const {
    data: activity,
    isLoading,
    error,
  } = useFetch("http://localhost:4000/api/v1/activities/" + id);
  console.log(activity);

  return (
    <>
      {/* big is 489, small is 268 */}
      <section className="bg-primaryBackground">
        <div className="grid overflow-hidden h-[60vh]">
          <img
            className="h-auto w-full scale-150 origin-top col-start-1 col-end-2 row-start-1 row-end-2"
            src={activity.id && activity.asset.url}
            alt={activity.id && activity?.name}
          />
          <div className="col-start-1 col-end-2 row-start-1 row-end-2 place-self-end mb-6 mr-[21px]">
            {user && (
              <Button>
                <button className="w-full h-full text-tertiaryText">
                  Tilmeld
                </button>
              </Button>
            )}
          </div>
        </div>
        <div className="p-8 pt-6">
          <h2 className="text-secondaryText font-medium">{activity.name}</h2>
          <p className="text-secondaryText font-small">
            {activity.id && activity.minAge + "-" + activity.maxAge + " år"}
          </p>
          <p className="text-secondaryText font-small mt-2 mb-16">
            {activity.id && activity.description}
          </p>
        </div>
      </section>
    </>
  );
};

export default ClassDetails;
