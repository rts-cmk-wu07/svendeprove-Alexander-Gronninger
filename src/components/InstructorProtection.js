import { useContext } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";

export default function InstructorProtection({ children }) {
  const { user } = useContext(UserContext);

  return user && user.role === "instructor" ? children : <Navigate to="/" />;
}
