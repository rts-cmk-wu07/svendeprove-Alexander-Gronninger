import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiSearch,
} from "react-icons/fi";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import UseCookie from "react-use-cookie";

const Nav = () => {
  const [tokenCookie, setTokenCookie] = UseCookie("tokenCookie", undefined);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    tokenCookie !== "undefined" &&
      tokenCookie &&
      setUser(JSON.parse(tokenCookie));
  }, [tokenCookie, setUser]);

  const linkCss =
    "w-[41px] h-[41px] block border-[1px] border-primaryBorder flex justify-center items-center rounded-full";

  return (
    <>
      <nav className="h-full flex px-4 justify-between items-center z-50 sm:max-w-[640px] mx-auto">
        <Link className={linkCss} to="/hjem">
          <FiHome size="24" />
        </Link>
        <Link className={linkCss} to="/søg">
          <FiSearch size="24" />
        </Link>
        {user === null ? (
          <Link className={linkCss} to="/login">
            <FiLogIn size="24" />
          </Link>
        ) : (
          <a
            onClick={() => {
              setTokenCookie(undefined);
            }}
            className={linkCss}
            href="/"
          >
            <FiLogOut size="24" />
          </a>
        )}
        <Link className={linkCss} to="/kalender">
          <FiCalendar size="24" />
        </Link>
        <p>I AM NEW</p>
      </nav>
    </>
  );
};

export default Nav;
