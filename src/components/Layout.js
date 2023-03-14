import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextProvider from "../context/ContextProvider";
import Nav from "../templates/Nav";

const Layout = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ContextProvider>
        <header>
          <Nav />
        </header>
        <main>
          <Outlet />
        </main>
      </ContextProvider>
    </>
  );
};

export default Layout;
