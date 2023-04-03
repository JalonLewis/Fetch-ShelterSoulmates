import React from "react";
import Button from "@mui/material/Button";

// Define the props for the MatchButton component
interface MatchButtonProps {
  favoritesSize: number;
  onMatch: () => void;
}

// The MatchButton component displays a button to initiate a match
const MatchButton: React.FC<MatchButtonProps> = ({
  favoritesSize,
  onMatch,
}) => {
  // handleMatch checks if there are any favorites, alerts the user if not, and calls onMatch
  const handleMatch = () => {
    if (favoritesSize === 0) {
      alert("No favorites to match with!");
      return;
    }

    onMatch();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      {/* Render the Match me! button if there are any favorites */}
      {favoritesSize > 0 && (
        <Button
          onClick={handleMatch}
          variant="contained"
          color="primary"
          sx={{ height: 50 }}
        >
          Match me!
        </Button>
      )}
    </div>
  );
};

export default MatchButton;
