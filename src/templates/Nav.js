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
  const [tokenCookie] = UseCookie("tokenCookie", undefined);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    tokenCookie && setUser(JSON.parse(tokenCookie));
  }, [tokenCookie, setUser]);

  console.log(user);

  const linkCss =
    "w-[41px] h-[41px] block border-[1px] border-primaryBorder flex justify-center items-center rounded-full";

  return (
    <>
      <nav className="bg-secondaryBackground h-[66px] w-full fixed bottom-0 flex px-4 justify-between items-center z-50">
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
              document.cookie =
                "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
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
      </nav>
    </>
  );
};

export default Nav;
