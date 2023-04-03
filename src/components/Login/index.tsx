import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import backgroundImage from "../../assets/dog.jpg";

// Login component
const Login: React.FC = () => {
  // State variables for name and email input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Initialize the useNavigate hook to navigate between pages
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make a request to the API to log in the user
      await api.post("/auth/login", { name, email });
      // Navigate to the search page after successful login
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Container
      maxWidth="xl"
      // Styling for background image
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: -8,
      }}
    >
      {/* Form for user login */}
      <form onSubmit={handleSubmit} style={{ marginTop: 250 }}>
        {/* Name input field with */}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "6px 12px" }}
          />
        </div>
        {/* Email input field */}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "6px 12px" }}
          />
        </div>
        {/* Login button */}
        <Button variant="contained" color="primary" type="submit">
          Log In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
