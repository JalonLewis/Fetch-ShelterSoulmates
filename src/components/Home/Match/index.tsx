import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import api from "../../../api";
import { Dog } from "../../../types";

// Define the prop types for the Match component
interface MatchProps {
  favoriteDogs: Dog[];
  onReset: () => void;
}

const Match: React.FC<MatchProps> = ({ favoriteDogs, onReset }) => {
  // State to store the matched dog
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  // Fetch the matched dog based on favorite dogs
  const fetchMatchedDog = async (dogIds: Dog[]) => {
    try {
      const response = await api.post("/dogs/match", dogIds);
      const matchedDogId: string = response.data.match.id;
      const matchedDog: Dog[] = dogIds.filter((dog) => dog.id === matchedDogId);
      setMatchedDog(matchedDog[0]);
    } catch (error) {
      console.error("Error fetching matched dog:", error);
    }
  };

  // Fetch the matched dog when the favoriteDogs array changes
  useEffect(() => {
    fetchMatchedDog(favoriteDogs);
  }, [favoriteDogs]);

  // Show a loading message while waiting for the matched dog
  if (!matchedDog) {
    return <div>Loading...</div>;
  }

  // Render the matched dog's information in a Card component
  return (
    <>
      <Card sx={{ mt: 2 }}>
        <CardMedia
          component="img"
          height="500"
          image={matchedDog.img}
          alt={`Image of ${matchedDog.name}`}
          sx={{ width: "500px", margin: "auto", borderRadius: 4 }}
        />
        <CardContent>
          <Typography variant="h3" align="center">
            {matchedDog.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center">
            Breed: {matchedDog.breed}
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center">
            Age: {matchedDog.age}
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center">
            Zip Code: {matchedDog.zip_code}
          </Typography>
        </CardContent>
      </Card>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        {/* Create a new button to reset the match */}
        <Button variant="contained" color="primary" onClick={onReset}>
          Find another match
        </Button>
      </div>
    </>
  );
};

export default Match;
