import React from "react";
import { Button } from "@mui/material";
import api from "../../../api";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"; // Import Cookies

const cookies = new Cookies(); // Instantiate a new Cookies object

// The LogoutButton component displays a button that logs the user out and navigates them back to the login page.
export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      cookies.remove("fetch-access-token", { path: "/" }); // Clear the user's access token from cookies
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Render the Logout button with an onClick event handler that calls handleLogout.
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleLogout}
      style={{ height: 30, marginLeft: 10 }}
    >
      Logout
    </Button>
  );
};
