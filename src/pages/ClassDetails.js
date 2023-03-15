import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useParams } from "react-router";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

const ClassDetails = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const {
    data: activity,
    isLoading,
    error,
  } = useFetch("http://localhost:4000/api/v1/activities/" + id);

  function SignUpHandler() {
    console.log("Sining up");
    const toastNotification = toast.loading("Skriver op til klasse...", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    try {
      fetch(
        `http://localhost:4000/api/v1/users/${user.userId}/activities/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      ).then((response) => {
        console.log(response);
        toast.update(toastNotification, {
          render: "Du er nu skrevet op til" + activity.name,
          type: "success",
          isLoading: false,
          autoClose: 2500,
        });
      });
    } catch (error) {
      console.log(error);
      toast.update(toastNotification, {
        render: "Ups! Der skete en fejl, prøv igen senere..." + error,
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  }

  return (
    <>
      <section className="bg-primaryBackground">
        <div className="grid overflow-hidden h-[60vh]">
          <img
            className="h-auto w-full scale-150 origin-top col-start-1 col-end-2 row-start-1 row-end-2"
            src={activity.id && activity.asset.url}
            alt={activity.id && activity?.name}
          />
          <div className="col-start-1 col-end-2 row-start-1 row-end-2 place-self-end mb-6 mr-[21px] z-40">
            {user && (
              <Button onClick={() => SignUpHandler()}>
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
