import { toast } from "react-toastify";

export default function SignUpHandler(
  id,
  user,
  userActivities,
  userData,
  activity,
  setSignedUp
) {
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
        "Du kan ikke skrive op til en klasse der starter i dag, prøv igen i morgen!",
      type: "error",
      isLoading: false,
      autoClose: 2500,
    });
  }

  userActivities?.forEach((userActivity) => {
    if (userActivity.weekday.toLowerCase() === activity.weekday.toLowerCase()) {
      return toast.update(toastNotification, {
        render: `Du kan kun skrive op til 1 klasse per dag, du er allerede skrevet op til ${userActivity.name}`,
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  });

  if (userData.age > activity.maxAge || userData.age < activity.minAge) {
    return toast.update(toastNotification, {
      render: `Din alder passer ikke med aldersgrænsen for: ${activity.name}`,
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
