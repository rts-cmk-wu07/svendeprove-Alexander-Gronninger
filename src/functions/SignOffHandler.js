import { toast } from "react-toastify";

export default function SignOffHandler(id, user, activity, setSignedUp) {
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
