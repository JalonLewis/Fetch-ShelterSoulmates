import React, { useState } from "react";
import DogCard from "../DogCard";
import { Dog } from "../../../types";
import { Grid } from "@mui/material";
import Match from "../Match";
import MatchButton from "../MatchButton";

// Define the props for the DogList component
interface DogListProps {
  dogs: Dog[];
}

// The DogList component displays a list of dogs and handles favorites and matching
const DogList: React.FC<DogListProps> = ({ dogs }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isMatch, setIsMatch] = useState<boolean>(false);

  // onToggleFavorite toggles the favorite status of a dog
  const onToggleFavorite = (dog: Dog) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(dog.id)) {
      newFavorites.delete(dog.id);
    } else {
      newFavorites.add(dog.id);
    }
    setFavorites(newFavorites);
  };

  // Create an array of favorite dogs from the favorites Set
  const favoriteDogs = dogs.filter((dog) => favorites.has(dog.id));

  // Define the resetMatch function
  const resetMatch = () => {
    setIsMatch(false);
  };

  // Determine the appropriate grid size if there are 4 or fewer dogs to display
  const gridSize = dogs.length <= 4 ? 12 : undefined;

  return (
    <div>
      {/* Render the Match component if isMatch is true, otherwise render the list of dogs and the favorite button */}
      {isMatch ? (
        // Pass the favoriteDogs array and resetMatch function to the Match component
        <Match favoriteDogs={favoriteDogs} onReset={resetMatch} />
      ) : (
        <>
          <MatchButton
            favoritesSize={favorites.size}
            onMatch={() => setIsMatch(true)}
          />
          <Grid container spacing={4}>
            {dogs.map((dog) => (
              <Grid
                item
                key={dog.id}
                xs={gridSize || 12}
                sm={gridSize || 6}
                md={gridSize || 4}
                lg={gridSize || 3}
              >
                <DogCard
                  key={dog.id}
                  dog={dog}
                  onToggleFavorite={onToggleFavorite}
                  isFavorited={favorites.has(dog.id)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default DogList;
