import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import UseCookie from "react-use-cookie";

const schema = yup
  .object({
    username: yup.string().required("Brugernavn er påkrævet"),
    password: yup.string().required("Kodeord er påkrævet"),
  })
  .required();

const Login = () => {
  const [, setTokenCookie] = UseCookie("tokenCookie", undefined);
  const { setUser } = useContext(UserContext);

  // To navigate back to main page when login successful
  const navigate = useNavigate();

  /* Bunch of jangle to make form stay center in responsive way */
  const [formMarginLeft, setFormMarginLeft] = useState(null);
  const loginDiv = useRef();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    /* windows width minus login divs width divided by 2 gives the margin required for center */
    setFormMarginLeft(
      `${(windowSize.width - loginDiv?.current.offsetWidth) / 2}px`
    );
  }, [loginDiv, windowSize]);

  /*
   login fetch
   */

  const saveMe = useRef();

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
        if (saveMe.current.checked) {
          const milliseconds = data.validUntil - Date.now();
          const validFor = milliseconds / (1000 * 60 * 60 * 24);
          setTokenCookie(JSON.stringify(data), {
            Days: validFor,
            SameSite: "Strict",
          });
        }
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
          <Heading>Log ind</Heading>
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
            <div>
              <input
                ref={saveMe}
                label="remember"
                type="checkbox"
                name="remember"
              />
              <label htmlFor="remember">Husk mig</label>
            </div>
            <div className="h-12">
              <p className="text-quaternaryText whitespace-normal w-[50vw]">
                {errors.username?.message}
              </p>
            </div>
            <div className="mx-auto shadow-[3px_4px_4px_0_#00000025] rounded-[10px]">
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
