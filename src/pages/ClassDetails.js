import { useContext, useEffect, useState } from "react";
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

  /* 
  
  
  
  
  
  
  
  
  
  MAKE SIGNUP CHECK IF MAX PARTICIPANTS MET
  
  
  
  
  
  
  
  
  
  
  */
  function SignUpHandler() {
    const toastNotification = toast.loading("Skriver op til klasse...", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const currentDate = new Date();
    const currentDay = new Intl.DateTimeFormat("da-DA", {
      weekday: "long",
    }).format(currentDate);

    if (currentDay?.toLowerCase() === activity?.weekday?.toLowerCase()) {
      return toast.update(toastNotification, {
        render:
          "Du kan ikke skrive op til en klasse der starter samme dag, prøv igen i morgen!",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }

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
        if (response.status === 200) {
          toast.update(toastNotification, {
            render: "Du er nu skrevet op til " + activity.name,
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
          setSignedUp(true);
        }
        if (response.status === 500) {
          toast.update(toastNotification, {
            render:
              "Ups! Der skete en fejl, er du sikker på du har den korrekte alder til denne klasse?",
            type: "error",
            isLoading: false,
            autoClose: 2500,
          });
        }
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

  function SignOffHandler() {
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
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      ).then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.update(toastNotification, {
            render: "Du er nu fjernet fra holdet: " + activity.name,
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
          setSignedUp(false);
        }
        if (response.status === 500) {
          toast.update(toastNotification, {
            render: "Ups! Der skete en fejl, prøv igen senere!",
            type: "error",
            isLoading: false,
            autoClose: 2500,
          });
        }
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
          <div className="col-start-1 col-end-2 row-start-1 row-end-2 place-self-end mb-auto mt-[50vh] mr-[21px] z-40">
            {user?.role === "default" && (
              <Button>
                <button
                  onClick={() =>
                    !signedUp ? SignUpHandler() : SignOffHandler()
                  }
                  className="w-full h-full text-tertiaryText"
                >
                  {!signedUp ? "Tilmeld" : "Afmeld"}
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
