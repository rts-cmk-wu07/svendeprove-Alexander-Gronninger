import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextProvider from "../context/ContextProvider";

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
          {/* NAVIGATION */} <p>HEADER</p>
        </header>
        <main>
          <Outlet />
        </main>
      </ContextProvider>
    </>
  );
};

export default Layout;
