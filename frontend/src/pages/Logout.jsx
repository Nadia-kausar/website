import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = () => {
    try {
      // Clear user from context
      setAuthUser({ user: null });

      // Remove from localStorage
      localStorage.removeItem("Users");

      // Notify and reload
      toast.success("Logged out successfully");

      setTimeout(() => {
        window.location.href = "/login"; // go to login instead of reload
      }, 1500);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
    >
      Logout
    </button>
  );
}

export default Logout;
