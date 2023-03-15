import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string().required("Username er påkrævet"),
    password: yup.string().required("Password er påkrævet"),
  })
  .required();

const Login = () => {
  const { setUser } = useContext(UserContext);

  // To navigate back to main page when login successful
  const navigate = useNavigate();

  /* Bunch of jangle to make form stay center in responsive way */
  const [formMarginLeft, setFormMarginLeft] = useState(null);
  const loginDiv = useRef();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setFormMarginLeft(
      `${(windowSize.width - loginDiv?.current.offsetWidth) / 2}px`
    );
  }, [loginDiv, windowSize]);

  /*
   */
  // login fetch

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const toastNotification = toast.loading("Logger ind...", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    fetch("http://localhost:4000/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`${response.status} ${response.statusText}`);
        }
      })
      .then((data) => {
        toast.update(toastNotification, {
          render: "Log ind fuldført",
          type: "success",
          isLoading: false,
          autoClose: 2500,
        });
        setUser(data);
        navigate("/hjem");
      })
      .catch((err) => {
        toast.update(toastNotification, {
          render:
            "Login fejlet, ukorrekt brugernavn eller kodeord. Prøv igen...",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
        setError("username", {
          type: "custom",
          message:
            "Login fejlet, ukorrekt brugernavn eller kodeord. Prøv igen...",
        });
        setError("password", {
          type: "custom",
          message:
            "Login fejlet, ukorrekt brugernavn eller kodeord. Prøv igen...",
        });
      });
  };

  // Unified rules for form input
  const inputCss = "pl-[22px] py-2 my-2 bg-senaryBackground max-w-[332px]";

  return (
    <>
      <div className="bg-[url('./backgrounds/splash-image.jpg')] bg-cover bg-no-repeat bg-top h-screen overflow-hidden grid">
        <div className="bg-septenaryBackground h-[60vh] w-[200vw] -rotate-[27.19deg] right-[50vw] top-[15vh] relative col-start-1 col-end-2 row-start-1 row-end-2"></div>
        <div
          className="col-start-1 col-end-2 row-start-1 row-end-2 mt-[30vh] z-50 h-fit w-fit block"
          ref={loginDiv}
          style={{ marginLeft: formMarginLeft }}
        >
          <h1 className="text-large text-tertiaryText">Log ind</h1>
          <form
            className="max-w-[50vh] h-fit flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className={inputCss}
              label="username"
              placeholder="brugernavn"
              {...register("username")}
            />
            <input
              className={inputCss}
              label="password"
              placeholder="kodeord"
              {...register("password")}
              type="password"
            />
            <div className="h-12">
              <p className="text-quaternaryText">{errors.username?.message}</p>
            </div>
            <div className="mx-auto">
              <Button>
                <input
                  className="w-full h-full text-quaternaryText"
                  type="submit"
                />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
