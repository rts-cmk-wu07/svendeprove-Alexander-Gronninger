import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextProvider from "./context/ContextProvider";
import Welcome from "./pages/Welcome";

const App = () => {
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
        <Routes>
          <Route path="/" element={<Welcome />} key="Welcome" />
        </Routes>
      </ContextProvider>
    </>
  );
};

export default App;
