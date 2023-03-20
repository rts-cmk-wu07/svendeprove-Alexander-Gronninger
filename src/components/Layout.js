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
        <header className="bg-secondaryBackground h-[66px] w-full fixed bottom-0 max-w-[1024px] z-40">
          <Nav />
        </header>
        <main className="w-screen h-screen bg-primaryBackground max-w-[1024px]">
          <Outlet />
        </main>
      </ContextProvider>
    </>
  );
};

export default Layout;
